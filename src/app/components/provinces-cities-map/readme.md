
# 思路

* 使用[高德的区域浏览功能](https://lbs.amap.com/api/amap-ui/demos/amap-ui-districtexplorer/index)

* 鼠标经过事件，高亮该区域，并显示指定信息。

* 点击区域事件。

## 注意

* 地图的渲染完全靠外部数据的传入，内部不做状态化管理

* 组件在首次运行时是需要异步加载地图js的，所以外部需要根据地图的生命周期来传值
  * [markPoints] 需要地图加载完成后，对应的是clusterComplete周期
  * [subAreaData] 需要ui加载完成后，对应的是uiComplete周期

* 在组件内是通过ngChanges来监听这两个值得变化

* [subAreaData]在内部的逻辑
  * subAreaData和areaData是有区域关联的，不符合关联将不会成功渲染
  * 除组件第一次加载需要在对应的周期内传值，之后都无此限制
  * 每次subAreaData的变化，都会触发内部的重新渲染

## 交互

* 点击区域，将把该区域的信息output出去；外部再根据此信息，请求数据再对[area]和[subArea]重新赋值
* 右键操作：回到初始，回到上级；同样会output区域信息；
* 内部的loading效果：loading的触发是来自内部，默认将在渲染完成后关闭；若外部请求出现问题，请手动将loading值设为false

## 类说明

|类名|说明|用途|
|--|--|--|
|ClickedFeatures|被点击的区域集合|回到上一级功能|
|PointsCluster|高德的点聚合功能|显示传入数据的坐标点；会随地图的缩放，自动展示|
|TxtMarkers|高德的文本标记|显示区域名|
