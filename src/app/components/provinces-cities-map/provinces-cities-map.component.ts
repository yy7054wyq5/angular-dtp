import {
  Component,
  OnInit,
  Renderer2,
  AfterContentInit,
  OnDestroy,
  Input,
  Optional,
  Inject,
  ElementRef,
  Output,
  EventEmitter,
  NgZone,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  ChangeDetectorRef
} from '@angular/core';
import { LocalCity, AMapLifeCycle, AMapConfig, LoadAreaOptions, MapPolyFeature, MapHandle, MapUtils, RenderUseParams } from './utils';
import { AMapUrl, AMapKey, AMapUiUrl, AMapRenderConfigs, ChinaAreaCode, MapConfig, MinZoom } from './config';
import { DOCUMENT } from '@angular/common';
import { Subscription, Observable, of } from 'rxjs';
import { ProvincesCitiesMapService } from './provinces-cities-map.service';
import { mergeMap } from 'rxjs/operators';
import { ClickedFeatures, ClickedFeatureType, TxtMarkers, MarkPoints, PointsCluster } from './class';

export interface HoverAreaEmitData {
  areaData: any;
  feature: MapPolyFeature;
  $tipContent: HTMLElement;
  creatDefaultTipContentFunc: (params: { areaName: string; total: number; bulding: number; person: number }) => string;
}

declare const AMap: any;
const mapContainerClassName = 'map-container';
const defaultMapKey = 'f59ebac17192979ceb031a3a53a61fe1';

@Component({
  selector: 'app-provinces-cities-map',
  templateUrl: './provinces-cities-map.component.html',
  styleUrls: ['./provinces-cities-map.component.scss']
})
export class ProvincesCitiesMapComponent implements OnChanges, OnInit, AfterContentInit, OnDestroy {
  private sub$ = new Subscription();
  private mapInstance: any;
  mapUiInstance: any;
  private mapConfig: AMapConfig = MapConfig;
  private mapContextMenuInstance;
  private mapElementId = 'amap-container';
  private get crtMapZoom(): number {
    if (this.mapInstance) {
      return this.mapInstance.getZoom();
    }
    return null;
  }
  @Input() amapKey: string;
  @Output() mapLifeCycle$ = new EventEmitter<AMapLifeCycle>();

  ///// 点聚合--默认关闭 /////
  @Input() enableMarkPoints = false;
  @Input() markPoints: MarkPoints;
  private pointsClusterInstance: PointsCluster;

  ///// 文字标记--用于显示区域名的 /////
  private txtMarkers: TxtMarkers;

  ///// 事件 /////
  private hoverTipMarker;
  private $hoverTipMarkerContent: HTMLElement;
  @Output() hoverArea = new EventEmitter<HoverAreaEmitData>();
  private clickedFeatures = new ClickedFeatures();
  @Output() clickArea = new EventEmitter<MapPolyFeature | number>();
  private emitClickAreaEvent(feature: MapPolyFeature | number) {
    this.clickArea.emit(feature);
    this.loading = true;
  }
  @Output() toHome = new EventEmitter();

  ///// 初始状态 /////
  private initRenderAreaParams: {
    loadAreaOptions?: LoadAreaOptions;
    zoom?: number;
    center?: any;
    areaAdcodes?: string[];
  } = {};

  ///// 自动获取当前城市信息--默认关闭 /////
  @Input() autoLocation = false;
  localCityInfo: LocalCity;

  ///// 渲染 /////
  @Input() areaData: any;
  @Input() subAreaData: any[];
  @Input() renderAllSubArea = false; // 设置为true后将渲染全部子区域
  private subAreaDataKeyAsCode: { [areaCode: number]: any } = {};
  private isSingleProvince = false;
  private isRenderedSubArea(adcode: number) {
    return this.subAreaDataKeyAsCode[adcode] ? true : false;
  }

  ///// 交互 /////
  @Input() loading = true;
  private get disabledHandle() {
    return this.loading;
  }

  constructor(
    @Optional() @Inject(AMapKey) private amapKeyFromInject: string,
    private ngZone: NgZone,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
    private mapService: ProvincesCitiesMapService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.markPoints && this.mapInstance && this.pointsClusterInstance) {
      const markPointsChange: SimpleChange = changes.markPoints;
      if (this.enableMarkPoints) {
        this.pointsClusterInstance.renderPoints(markPointsChange.currentValue);
      }
    }
    if (changes.subAreaData || changes.areaData) {
      try {
        this.dataChanged(changes.areaData, changes.subAreaData);
      } catch (error) {}
    }
  }

  ngOnInit() {}

  ngAfterContentInit() {
    this.beforeLoadMap(this.amapKeyFromInject);
    this.sub$.add(
      this.loadAMap()
        .pipe(mergeMap(() => this.loadAMapUI()))
        .subscribe(() => {
          this.mapLifeCycleFunc();
        })
    );
  }

  ngOnDestroy() {
    if (this.mapInstance) {
      this.mapInstance.destroy();
      this.mapInstance = null;
    }
    if (this.mapUiInstance) {
      this.mapUiInstance.off(
        `${MapHandle.featureClick} ${MapHandle.outsideClick} ${MapHandle.featureMouseout} ${MapHandle.featureMouseover}`
      );
      this.mapUiInstance = null;
    }
    if (this.pointsClusterInstance) {
      this.pointsClusterInstance = null;
    }
    this.sub$.unsubscribe();
  }

  private async dataChanged(areaDataChange: SimpleChange, subAreaDatachange: SimpleChange) {
    if (this.mapUiInstance && this.mapInstance && subAreaDatachange.currentValue && areaDataChange.currentValue) {
      const areaCode = areaDataChange.currentValue.areaCode;
      const data = subAreaDatachange.currentValue;
      // 返回code并组装subAreaDataKeyAsCode，此值用于hover展示区域的信息
      let subAdcodes = [];
      data.forEach(item => {
        const areaCode = item.areaInfo.areaCode;
        this.subAreaDataKeyAsCode[areaCode] = item;
        subAdcodes.push(Number(areaCode));
      });
      // 测试单城市渲染
      // if (Number(areaCode) === ChinaAreaCode) {
      //   subAdcodes = [Number(this.localCityInfo.adcode)];
      // }
      if (subAdcodes.length) {
        const params: RenderUseParams = MapUtils.renderAreaParams(areaCode, subAdcodes);
        let areaAdcodes = params.areaAdcodes.map(item => item.toString());
        // 记录初始参数，以备他用
        if (Number(areaCode) === ChinaAreaCode) {
          this.initRenderAreaParams = {
            ...this.initRenderAreaParams,
            areaAdcodes,
            loadAreaOptions: JSON.parse(JSON.stringify(params.loadAreaOptions)), // 隔绝引用，因为下面的代码会对params.loadAreaOptions重新赋值
            zoom: this.crtMapZoom,
            center: this.mapInstance.getCenter()
          };
        }
        // 初次渲染，子集只有1个时
        this.isSingleProvince = false;
        if (Number(areaCode) === ChinaAreaCode && subAdcodes.length === 1) {
          this.isSingleProvince = true;
          this.emitClickAreaEvent(subAdcodes[0]);
          return;
        }
        // 子区域渲染的回调函数
        this.txtMarkers.clear();
        params.loadAreaOptions.subAreaSettingFunc = (feature: MapPolyFeature) => {
          this.txtMarkers.add(MapUtils.creatTxtMarker(feature, this.mapInstance, subAdcodes), () => {
            this.clickFeature(feature);
          });
          return of(true);
        };
        // 执行渲染
        params.loadAreaOptions.renderAllSubArea = this.renderAllSubArea;
        await this.renderAreas(areaAdcodes, params.loadAreaOptions);
      }
      // debugger;
      this.loading = false;
    }
  }

  async UI_toInitStatus() {
    if (this.disabledHandle) {
      return;
    }
    this.clickedFeatures.clear();
    this.loading = true;
    this.toHome.emit();
  }

  private appendJsTo(fileUrl: string, target = this.document.head): Observable<boolean> {
    const isAppended = this.document.querySelector(`script[src="${fileUrl}"]`);
    if (isAppended) {
      return of(true);
    }
    return new Observable(ob => {
      const $script: HTMLElement = this.renderer.createElement('script');
      $script['src'] = fileUrl;
      $script['charset'] = 'utf-8';
      this.renderer.appendChild(target, $script);
      $script.onload = () => {
        ob.next(true);
      };
    });
  }

  private beforeLoadMap(amapKeyFromInject) {
    this.amapKey = this.amapKey || amapKeyFromInject ? amapKeyFromInject : null || defaultMapKey;
    this.mapElementId += this.mapService.updateIdx();
    this.renderer.setAttribute(this.elementRef.nativeElement.querySelector(`.${mapContainerClassName}`), 'id', this.mapElementId);
  }

  private loadAMap() {
    return this.appendJsTo(AMapUrl + this.amapKey);
  }

  private loadAMapUI() {
    return this.appendJsTo(AMapUiUrl);
  }

  /**
   * 重要
   *
   */
  private async mapLifeCycleFunc() {
    // 实例化地图 //
    const map = (this.mapInstance = await MapUtils.initMap(this.mapElementId, this.mapConfig));
    this.mapLifeCycle$.emit({
      status: 'mapComplete',
      instance: this.mapInstance,
      config: this.mapConfig
    });
    // 实例化区域名标记 //
    this.txtMarkers = new TxtMarkers(map);
    // 实例化点聚合 //
    if (this.enableMarkPoints) {
      this.pointsClusterInstance = new PointsCluster(map, AMap, []);
      this.mapLifeCycle$.emit({
        status: 'clusterComplete',
        instance: this.mapInstance,
        clusterInstance: this.pointsClusterInstance
      });
    }
    // 创建右键菜单 //
    this.mapContextMenuInstance = MapUtils.creatContextMenu([
      {
        name: '回到初始状态',
        func: () => {
          if (this.crtMapZoom !== MinZoom) {
            this.UI_toInitStatus();
          }
        }
      },
      {
        name: '回到上一级',
        func: () => {
          const preFeature = this.clickedFeatures.preClickedFeature;
          if (preFeature) {
            this.emitClickAreaEvent(preFeature);
            // this.renderAreas([preFeature.properties.adcode.toString()], {
            //   autoFitView: true
            // });
            return;
          }
          this.UI_toInitStatus();
        }
      }
    ]);
    // 自动定位 //
    if (this.autoLocation) {
      const locationRes = (this.localCityInfo = await MapUtils.locationMap(map));
      this.mapLifeCycle$.emit({
        status: locationRes && locationRes.info === 'OK' ? 'locationSuccess' : 'locationFail',
        instance: map,
        localCity: locationRes
      });
    }
    // 实例化Map UI //
    const { districtExplorer } = await MapUtils.initMapUi(map, {
      eventSupport: true // 打开事件支持
    });
    this.mapUiInstance = districtExplorer;
    // 生成hover marker并默认隐藏 //
    this.hoverTipMarker = this.creatHoverTipMarker();
    this.hoverTipMarker.setMap(this.mapInstance);
    // 事件绑定 //
    this.bindEvent(districtExplorer, this.mapContextMenuInstance);
    // 默认visibility: hidden;避免初始状态白屏
    this.renderer.removeClass(this.elementRef.nativeElement.querySelector(`.${mapContainerClassName}`), 'hidden');
    this.mapLifeCycle$.emit({
      status: 'uiComplete',
      instance: map,
      uiInstance: districtExplorer
    });
  }

  private creatHoverTipMarker() {
    // 鼠标hover提示内容
    this.$hoverTipMarkerContent = this.renderer.createElement('div');
    this.renderer.addClass(this.$hoverTipMarkerContent, 'map-hover-tip');
    return new AMap.Marker({
      content: this.$hoverTipMarkerContent,
      // tslint:disable-next-line
      offset: new AMap.Pixel(-50, -150),
      // offset: new AMap.Pixel(0, 0),
      bubble: false,
      zIndex: 11,
      visible: false
    });
  }

  /**
   * 渲染区域
   * @description
   */
  private renderAreas(adcodes: string[], options?: LoadAreaOptions): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const districtExplorer = this.mapUiInstance;
      const renderPromises: Promise<boolean>[] = [];
      MapUtils.clearFeaturePolygons(this.mapUiInstance);
      MapUtils.loadArea(adcodes, districtExplorer).then(areaNodes => {
        for (const areaNode of areaNodes) {
          renderPromises.push(MapUtils.renderAreaPolygons(areaNode, districtExplorer, options));
        }
        Promise.all(renderPromises).then(() => {
          if (options && options.autoFitView) {
            MapUtils.fitView(this.mapInstance, this.mapUiInstance);
            // MapUtils.renderChina(districtExplorer);
          }
          resolve(areaNodes);
        });
      });
    });
  }

  private toggleHoverFeature(feature: MapPolyFeature, isHover, position) {
    if (!feature) {
      return;
    }
    let props = feature.properties;
    const clickedNoChildrenFeature = this.clickedFeatures.get(ClickedFeatureType.noChildrenFeature);
    const canChangeAreaColor = (feature: MapPolyFeature) => {
      // 必须是指定渲染的区域
      if (this.isRenderedSubArea(feature.properties.adcode)) {
        // 当没有点击区域时，都可以改变区域颜色
        if (!clickedNoChildrenFeature) {
          return true;
        }
        // 不是高亮的区域可以改色
        if (clickedNoChildrenFeature && feature.properties.adcode !== clickedNoChildrenFeature.properties.adcode) {
          return true;
        }
      }
      return false;
    };
    if (isHover) {
      // 只有是指定的区域才显示冒泡效果
      if (this.isRenderedSubArea(feature.properties.adcode)) {
        this.hoverTipMarker.setPosition(position || props.center);
        this.hoverTipMarker.show();
      }
      // 添加高亮
      if (canChangeAreaColor(feature)) {
        MapUtils.changeAreaFillColor(
          this.mapUiInstance,
          props.adcode,
          AMapRenderConfigs.AreaHoverFillColor,
          AMapRenderConfigs.AreaHoverFillOpacity
        );
      }
      this.ngZone.run(() => {
        // 外部控制数据的展示
        this.hoverArea.emit({
          feature,
          areaData: this.subAreaDataKeyAsCode[feature.properties.adcode],
          $tipContent: this.$hoverTipMarkerContent,
          creatDefaultTipContentFunc: MapUtils.creatDefaultTipContentFunc
        });
      });
      return;
    }
    this.hoverTipMarker.hide();
    // 取消高亮
    if (canChangeAreaColor(feature)) {
      MapUtils.changeAreaFillColor(this.mapUiInstance, props.adcode, AMapRenderConfigs.AreaFillColor, AMapRenderConfigs.AreaFillOpacity);
    }
  }

  private isInitProvince(adcode: number): boolean {
    if (this.isSingleProvince) {
      return this.initRenderAreaParams.areaAdcodes.includes(adcode.toString());
    }
    return this.initRenderAreaParams.loadAreaOptions.subAreaCodes.includes(adcode);
  }

  private clickFeature(feature: MapPolyFeature) {
    const props = feature.properties;
    if (this.disabledHandle) {
      return;
    }
    if (!this.isRenderedSubArea(feature.properties.adcode)) {
      return;
    }
    this.clickedFeatures.addClickedPath(feature);
    // console.log('featureClick', feature);
    // 如果不存在子节点
    if (props.childrenNum === 0) {
      this.clickedFeatures.clickOnNoChildrenFeature(this.mapUiInstance, feature);
      this.emitClickAreaEvent(feature);
      return;
    }
    // 点的不是初始状态的省份
    if (props.level === 'province' && !this.isInitProvince(props.adcode)) {
      return;
    }
    // this.renderAreas([props.adcode.toString()], {
    //   autoFitView: true
    // });
    this.clickedFeatures.set(ClickedFeatureType.hasChildrenFeature, { ...feature });
    this.emitClickAreaEvent(feature);
  }

  bindEvent(uiInstance, contextMenuInstance) {
    this.mapInstance.on('rightclick', e => {
      contextMenuInstance.open(this.mapInstance, e.lnglat);
    });
    this.mapInstance.on('zoomchange', e => {
      if (this.crtMapZoom === MinZoom) {
        this.UI_toInitStatus();
      }
      this.txtMarkers.zoomChange();
    });

    const districtExplorer = uiInstance;
    // 监听feature的hover事件
    districtExplorer.on(`${MapHandle.featureMouseout} ${MapHandle.featureMouseover}`, (e, feature: MapPolyFeature) => {
      this.ngZone.runOutsideAngular(() => {
        const props = feature.properties;
        if (props.level === 'province' && !this.isInitProvince(feature.properties.adcode)) {
          return;
        }
        this.toggleHoverFeature(feature, e.type === 'featureMouseover', e.originalEvent ? e.originalEvent.lnglat : null);
      });
    });

    // feature被点击
    districtExplorer.on(MapHandle.featureClick, (e, feature: MapPolyFeature) => {
      this.clickFeature(feature);
    });

    // 去掉外部区域被点击；区域加载无法筛选加载子区域，当只渲染几个子区域时，这时的外部区域可能就是父区域下的子区域
    // districtExplorer.on(MapHandle.outsideClick, (e) => {
    //   if (this.isSingleProvince || this.disabledHandle) {
    //     return;
    //   }
    //   const lnglat = e.originalEvent.lnglat;
    //   districtExplorer.locatePosition(
    //     lnglat,
    //     (error, routeFeatures: MapPolyFeature[]) => {
    //       if (routeFeatures && routeFeatures.length > 1) {
    //         const [chinaFeature, crtParentFeature] = routeFeatures;
    //         let provinceCode = crtParentFeature.properties.adcode;
    //         if (this.isInitProvince(provinceCode)) {
    //           this.clickedFeatures.addClickedPath(crtParentFeature);
    //           // this.renderAreas([provinceCode.toString()], {
    //           //   autoFitView: true
    //           // });
    //           this.emitClickAreaEvent(crtParentFeature);
    //           return;
    //         }
    //       }
    //       // console.log(routeFeatures);
    //       this.UI_toInitStatus();
    //     },
    //     {
    //       levelLimit: 2
    //     }
    //   );
    // });
  }
}
