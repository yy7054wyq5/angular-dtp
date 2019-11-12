import { MapUtils, PointsType } from '../utils';
export interface MarkPoints {
  type: PointsType;
  data: Array<string | number[]>;
}

export class PointsCluster {
  AMap;
  clusterInstance: any;
  constructor(mapInstance, AMap, data: number[][]) {
    this.AMap = AMap;
    this.init(mapInstance, data);
  }

  private exchange(data: number[][]) {
    return data.map((points) => {
      return new this.AMap.Marker({
        position: points
      });
    });
  }

  private init(mapInstance, data: number[][]) {
    const markers = this.exchange(data);
    this.clusterInstance = new this.AMap.MarkerClusterer(mapInstance, markers, {
      gridSize: 30,
      renderClusterMarker: MapUtils.renderClusterMarkerFactory(markers.length || 100)
    });
  }

  public async renderPoints(data: MarkPoints | number[][]): Promise<number[][]> {
    let tmp = data;
    if (!Array.isArray(data)) {
      const res = await this.converPoints(data);
      tmp = res.map((item) => {
        return [item.lng, item.lat];
      });
    }
    this.clusterInstance.clearMarkers();
    this.clusterInstance.addMarkers(this.exchange(tmp as number[][]));
    return tmp as number[][];
  }

  private converPoints(res: MarkPoints) {
    let data = res.data;
    const tmp = data.map((item) => {
      if (!Array.isArray(item)) {
        return item.split(',').map((item) => Number(item));
      }
      return item;
    });
    return MapUtils.convertLngLats(tmp as number[][], res.type);
  }
}
