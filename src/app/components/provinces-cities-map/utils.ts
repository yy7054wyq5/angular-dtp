import { AMapRenderConfigs, ChinaAreaCode, CountryAreaStyleOptions } from './config';
import { Observable, combineLatest, of } from 'rxjs';

export type AMapStatus = 'mapComplete' | 'clusterComplete' | 'locationSuccess' | 'locationFail' | 'uiComplete'; // 在组件销毁时默认销毁地图实例
export enum PointsType {
  baidu = 'baidu',
  gps = 'gps'
}

export interface LocalCity {
  bounds: any;
  adcode: string;
  city: string;
  info: 'OK';
  infocode: string;
  province: string;
  rectangle: string;
  status: string;
  type: string;
}

export interface AMapLifeCycle {
  status: AMapStatus;
  instance: any; // 地图实例
  config?: any; // mapInit周期内
  clusterInstance?: any; // clusterComplate周期内
  localCity?: LocalCity; // locationSuccess周期内
  uiInstance?: any; // uiComplete周期内
}

export interface AMapConfig {
  center?: number[];
  zoom: number;
  mapStyle: string; // 设置地图的显示样式
  [key: string]: any;
}

/**
 * 高德区域浏览功能对应的区域数据集合，非常重要
 * @description
 * @export
 */
export interface MapPolyFeature {
  type: 'Feature';
  properties: {
    acroutes: number[];
    adcode: number;
    center: number[];
    centroid: number[];
    childrenNum: number;
    level: AreaLevel;
    name: string;
    subFeatureIndex: number;
  };
  geometry: {
    type: 'MultiPolygon';
    coordinates: number[][][];
  };
}

/**
 * 渲染配置
 * @description
 * @export
 * @interface RenderAreaOptions
 */
export interface RenderAreaOptions {
  subAreaCodes?: number[]; // 子区域集合
  renderAllSubArea?: boolean;
  subAreaSettingFunc?: (feature: MapPolyFeature) => Observable<boolean>; // 子区域渲染时的回调函数
  areaConfig?: {
    // 父区域的样式设置
    strokeColor?: string; // 线颜色
    strokeOpacity?: number; // 线透明度
    strokeWeight?: number; // 线宽
    fillColor?: string; // 填充色
    fillOpacity?: number; // 填充透明度
  };
}

export interface LoadAreaOptions extends RenderAreaOptions {
  autoFitView?: boolean;
}
export enum MapHandle {
  featureMouseout = 'featureMouseout',
  featureMouseover = 'featureMouseover',
  featureClick = 'featureClick',
  outsideClick = 'outsideClick'
}
export enum AreaLevel {
  country = 'country',
  province = 'province',
  city = 'city',
  district = 'district'
}

export interface RenderUseParams {
  areaAdcodes: number[];
  loadAreaOptions: LoadAreaOptions;
}

declare const AMap: any;
declare const AMapUI: any;

function locationMap(amap): Promise<LocalCity> {
  return new Promise((resolve, reject) => {
    AMap.plugin('AMap.CitySearch', function() {
      let citySearch = new AMap.CitySearch();
      citySearch.getLocalCity(function(status, result: LocalCity) {
        if (status === 'complete') {
          resolve(result);
        }
      });
    });
  });
}

function initMap(id: string, aMapConfig: AMapConfig): Promise<any> {
  return new Promise((resolve, reject) => {
    const amap = new AMap.Map(id, aMapConfig);
    amap.on('complete', () => {
      resolve(amap);
    });
  });
}

function initMapUi(amap, options: { [key: string]: any } = { eventSupport: true }): Promise<{ districtExplorer: any }> {
  return new Promise((resolve, reject) => {
    AMapUI.load(['ui/geo/DistrictExplorer'], function(DistrictExplorer) {
      const districtExplorer = (window['districtExplorer'] = new DistrictExplorer({
        map: amap,
        ...options
      }));
      resolve({
        districtExplorer
      });
    });
  });
}

function setPolys(polys: any[], fillColor, fillOpacity) {
  for (const poly of polys) {
    poly.setOptions({
      fillColor,
      fillOpacity
    });
  }
}

function fitView(map, districtExplorer?): { center: any; zoom: any } {
  map.setFitView(districtExplorer ? districtExplorer.getAllFeaturePolygons() : null);
  return {
    center: map.getCenter(),
    zoom: map.getZoom()
  };
}

function clearFeaturePolygons(districtExplorer) {
  districtExplorer.clearFeaturePolygons();
}

function creatTxtMarker(feature: MapPolyFeature, map, includesCodes: number[]) {
  const name = feature.properties.name;
  const level = feature.properties.level;
  const code = feature.properties.adcode;
  if (includesCodes.includes(code)) {
    const text = new AMap.Text({
      cursor: 'default',
      text: name,
      zIndex: 10,
      clickable: true,
      angle: 0,
      visible: level === AreaLevel.province ? false : true,
      // visible: true,
      style: {
        'background-color': 'transparent',
        'border-width': 0,
        'text-align': 'center',
        'font-size': '12px',
        color: 'white'
      },
      position: feature.properties.center
    });
    text.setMap(map);
    return text;
  }
  return null;
}

// 绘制某个区域的边界
function renderAreaPolygons(areaNode, districtExplorer, options?: RenderAreaOptions): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!options) {
      // tslint:disable-next-line
      options = {
        renderAllSubArea: false,
        subAreaCodes: [],
        areaConfig: {},
        subAreaSettingFunc: null
      };
    }
    const { subAreaCodes, areaConfig, subAreaSettingFunc, renderAllSubArea } = options;
    const subAreaSettingFunc$: Observable<boolean>[] = [];
    // 绘制子区域
    districtExplorer.renderSubFeatures(areaNode, function(feature: MapPolyFeature, i) {
      const isIncludesArea = Array.isArray(subAreaCodes) && subAreaCodes.includes(feature.properties.adcode);
      const defaultSubAreaConfig = {
        cursor: 'default',
        bubble: true,
        strokeColor: AMapRenderConfigs.SubAreaStrokeColor, // 线颜色
        strokeOpacity: 1, // 线透明度
        strokeWeight: 1, // 线宽
        fillColor: AMapRenderConfigs.AreaFillColor, // 填充色
        fillOpacity: AMapRenderConfigs.AreaFillOpacity // 填充透明度
      };
      if (isIncludesArea) {
        subAreaSettingFunc$.push(subAreaSettingFunc ? subAreaSettingFunc(feature) : of(true));
        return defaultSubAreaConfig;
      }
      defaultSubAreaConfig.fillOpacity = 0.1;
      return defaultSubAreaConfig;
    });

    // 绘制父区域
    districtExplorer.renderParentFeature(areaNode, {
      cursor: 'default',
      bubble: true,
      strokeColor: null, // 线颜色
      strokeOpacity: 0, // 线透明度
      strokeWeight: 0, // 线宽
      fillColor: null, // 填充色
      fillOpacity: 0, // 填充透明度,
      ...areaConfig
    });

    // debugger;

    combineLatest(subAreaSettingFunc$).subscribe(res => {
      resolve(true);
    });
  });
}

function loadArea(adcodes: string[], districtExplorer): Promise<any[] | any> {
  return new Promise((resolve, reject) => {
    districtExplorer.loadMultiAreaNodes(adcodes, (err, areaNodes) => {
      if (err) {
        reject(err);
        return;
      }
      // 设置当前使用的定位用节点
      districtExplorer.setAreaNodesForLocating(areaNodes);
      districtExplorer.setHoverFeature(null);
      resolve(areaNodes);
    });
  });
}

/**
 * 将其余坐标转换为高德，默认转换百度坐标
 *
 * @export
 */
function convertLngLats(
  gps: number[][],
  type: PointsType = PointsType.baidu
): Promise<{ P: number; Q: number; lat: number; lng: number }[]> {
  return new Promise(resolve => {
    AMap.convertFrom(gps, type, function(status, result) {
      if (result.info === 'ok') {
        resolve(result.locations); // Array.<LngLat>
      }
      resolve([]);
    });
  });
}

// 此方法是用于自定义聚合点样式
function renderClusterMarkerFactory(count: number) {
  return function(context) {
    // tslint:disable-next-line
    let factor = Math.pow(context.count / count, 1 / 18);
    let div = document.createElement('div');
    // tslint:disable-next-line
    let Hue = 180 - factor * 180;
    let bgColor = 'hsla(' + Hue + ',100%,50%,0.7)';
    let fontColor = 'hsla(' + Hue + ',100%,20%,1)';
    let borderColor = 'hsla(' + Hue + ',100%,40%,1)';
    let shadowColor = 'hsla(' + Hue + ',100%,50%,1)';
    // div.style.backgroundColor = bgColor;
    div.style.backgroundColor = 'rgba(255,69,69,0.8)';
    // tslint:disable-next-line
    let size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20) / 2;
    div.style.width = div.style.height = size + 'px';
    div.style.border = 'solid 1px ' + borderColor;
    div.style.borderRadius = size / 2 + 'px';
    div.style.boxShadow = '0 0 1px ' + shadowColor;
    div.innerHTML = context.count;
    div.style.lineHeight = size + 'px';
    // div.style.color = fontColor;
    div.style.color = '#fff';
    div.style.fontSize = '12px';
    div.style.textAlign = 'center';
    context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
    context.marker.setContent(div);
  };
}

function creatDefaultTipContentFunc(params) {
  const countStyle = 'color: #d96969';
  const divStyle = 'margin-bottom: 5px';
  return (
    `<div style="${divStyle}">${params.areaName}</div>` +
    `<div style="${divStyle}">项目数量：<span style="${countStyle}">${params.total}个</span></div>` +
    `<div style="${divStyle}">在建项目：<span style="${countStyle}">${params.bulding}个</span></div>` +
    `<div style="${divStyle}">现场人数：<span style="${countStyle}">${params.person}个</span></div>`
  );
}

/**
 *
 * 绘制adcode对应的区域，并画出在subAdcodes中的子区域
 * @description
 */
function renderAreaParams(adcode: number, subAdcodes: number[]): RenderUseParams {
  let areaAdcodes = [adcode];
  let autoFitView = true;
  let parentAreaConfig = {};
  if (adcode === ChinaAreaCode) {
    parentAreaConfig = CountryAreaStyleOptions;
    if (subAdcodes.length > 1) {
      autoFitView = false;
    }
  }
  const loadAreaOptions = {
    autoFitView,
    subAreaCodes: subAdcodes,
    parentAreaConfig
  };
  return {
    areaAdcodes,
    loadAreaOptions
  };
}

// 画中国地图
function renderChina(districtExplorer) {
  return new Promise((resolve, reject) => {
    districtExplorer.loadAreaNode(ChinaAreaCode, (err, areaNode) => {
      if (err) {
        reject(err);
        return;
      }
      districtExplorer.renderParentFeature(areaNode, CountryAreaStyleOptions);
      resolve(null);
    });
  });
}

function creatContextMenu(options: { name: string; func: () => void }[]) {
  const contextMenu = new AMap.ContextMenu();
  options.forEach((option, idx) => {
    contextMenu.addItem(
      option.name,
      () => {
        option.func();
      },
      idx
    );
  });

  return contextMenu;
}

function changeAreaFillColor(ui, adcode, color, opacity) {
  const polys = ui.findFeaturePolygonsByAdcode(adcode);
  // console.log(polys, AreaHoverFillColor);
  setPolys(polys, color, opacity);
  return polys;
}

export const MapUtils = {
  fitView,
  setPolys,
  loadArea,
  initMap,
  initMapUi,
  locationMap,
  renderChina,
  convertLngLats,
  creatTxtMarker,
  creatContextMenu,
  renderAreaParams,
  renderAreaPolygons,
  changeAreaFillColor,
  clearFeaturePolygons,
  creatDefaultTipContentFunc,
  renderClusterMarkerFactory
};
