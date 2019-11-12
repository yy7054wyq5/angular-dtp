import { MapPolyFeature, AreaLevel, MapUtils } from '../utils';
import { AMapRenderConfigs } from '../config';

export enum ClickedFeatureType {
  noChildrenFeature = 'noChildrenFeature',
  hasChildrenFeature = 'hasChildrenFeature'
}

export class ClickedFeatures {
  private crtPath: MapPolyFeature;
  private clickedPath: { [key: string]: MapPolyFeature } = {}; // 记录被点击的省市；key其实是AreaLevel中的省
  private [ClickedFeatureType.noChildrenFeature]: MapPolyFeature; // 有些城市下是没有区的
  private [ClickedFeatureType.hasChildrenFeature]: MapPolyFeature;

  private clickedRecords = {};

  constructor(options?: object) {
    if (options) {
      for (const key in options) {
        if (options.hasOwnProperty(key) && ClickedFeatureType[key]) {
          const value = options[key] || null;
          this[key] = value;
        }
      }
    }
  }

  get crt() {
    return this.crtPath;
  }

  addClickedPath(data: MapPolyFeature) {
    if (data) {
      this.crtPath = data;
      if (data.properties.level === AreaLevel.province) {
        this.clickedPath[data.properties.level] = data;
      }
    }
  }

  get preClickedFeature() {
    const province = this.clickedPath[AreaLevel.province];
    if (this.crtPath && this.crtPath.properties.level === AreaLevel.province) {
      this.clickedPath[AreaLevel.province] = null;
      return null;
    }
    this.crtPath = province;
    return province;
  }

  get isClicked() {
    const clickedRecords = this.clickedRecords;
    const keys = Object.keys(clickedRecords);
    if (!keys.length) {
      return false;
    }
    for (const key of keys) {
      if (clickedRecords[key]) {
        return true;
      }
    }
    return false;
  }

  clear() {
    this.noChildrenFeature = null;
    this.hasChildrenFeature = null;
    this.clickedRecords = {};
  }

  set(type: ClickedFeatureType, data: MapPolyFeature) {
    this[type] = data;
    this.clickedRecords[type] = true;
  }

  get(type: ClickedFeatureType) {
    return this[type];
  }

  remove(type: ClickedFeatureType) {
    this[type] = null;
    this.clickedRecords[type] = false;
  }

  clickOnNoChildrenFeature(uiInstance: any, feature: MapPolyFeature) {
    const props = feature.properties;
    const tmp = this.get(ClickedFeatureType.noChildrenFeature);
    if (tmp) {
      // 取消之前的高亮区域
      MapUtils.changeAreaFillColor(uiInstance, tmp.properties.adcode, AMapRenderConfigs.AreaFillColor, AMapRenderConfigs.AreaFillOpacity);
    }
    this.set(ClickedFeatureType.noChildrenFeature, feature);
    MapUtils.changeAreaFillColor(
      uiInstance,
      props.adcode,
      AMapRenderConfigs.AreaClickedFillColor,
      AMapRenderConfigs.AreaClickedFillOpacity
    );
  }
}
