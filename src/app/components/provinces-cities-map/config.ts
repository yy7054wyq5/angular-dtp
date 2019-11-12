import { InjectionToken } from '@angular/core';

const MainColor = 'rgb(2, 214, 220)';

export enum MapStyleVersions {
  init = 'init',
  blue = 'blue',
  black = 'black'
}

export const MapStyles = {
  [MapStyleVersions.init]: {
    // 初版
    AMapStyle: 'amap://styles/f3740aa8bd33e01d0036c2134e1a1348',
    AreaStrokeColor: '#d96969',
    SubAreaStrokeColor: '#393939',
    AreaFillColor: '#00cacf',
    AreaFillOpacity: 0.6,
    AreaHoverFillColor: '#00cacf',
    AreaHoverFillOpacity: 0.7,
    AreaClickedFillColor: '#d96969',
    AreaClickedFillOpacity: 0.9 // 底色是黑得，所以越透越深
  },
  [MapStyleVersions.blue]: {
    // 蓝色
    AMapStyle: 'amap://styles/cac941c58db652147a7a3cf266d5e9b8',
    AreaStrokeColor: '#d96969',
    SubAreaStrokeColor: '#2b3a7c',
    AreaFillColor: '#144d59',
    AreaFillOpacity: 0.3,
    AreaHoverFillColor: '#00cacf',
    AreaHoverFillOpacity: 0.5,
    AreaClickedFillColor: '#d96969',
    AreaClickedFillOpacity: 0.9 // 底色是黑得，所以越透越深
  },
  [MapStyleVersions.black]: {
    // 黑色
    AMapStyle: 'amap://styles/c0e31891bc8d27626a91fb58ec29a543',
    AreaStrokeColor: null,
    SubAreaStrokeColor: '#25b5b5',
    AreaFillColor: '#25b5b5',
    AreaFillOpacity: 0.5,
    AreaHoverFillColor: '#25b5b5',
    AreaHoverFillOpacity: 1,
    AreaClickedFillColor: MainColor,
    AreaClickedFillOpacity: 1 // 底色是黑得，所以越透越深
  }
};

// 在此处添加插件
export const AMapUrl = '//webapi.amap.com/maps?v=1.4.15&plugin=AMap.CitySearch,AMap.MarkerClusterer,AMap.Geocoder,AMap.MouseTool&key=';
export const AMapUiUrl = '//webapi.amap.com/ui/1.0/main.js?v=1.0.11';
export const AMapKey = new InjectionToken<string>('AMap key');
export const ChinaAreaCode = 100000;
export const AMapRenderConfigs = MapStyles[MapStyleVersions.black];

export const MinZoom = 3;
export const MaxZoom = 13;
export const MapConfig = {
  // zoomEnable: false,
  // dragEnable: false,
  resizeEnable: true,
  zoom: MinZoom,
  zooms: [MinZoom, MaxZoom],
  mapStyle: AMapRenderConfigs.AMapStyle
};

export const CountryAreaStyleOptions = {
  strokeColor: null,
  strokeOpacity: 1, // 线透明度
  strokeWeight: 1, // 线宽
  fillColor: null, // 填充色
  fillOpacity: 0 // 填充透明度,
};
