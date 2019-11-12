export class TxtMarkers {
  map;
  data: any[] = [];

  constructor(map) {
    this.map = map;
  }

  clear() {
    this.map.remove(this.data);
  }

  add(item, cb: () => void) {
    if (item) {
      this.data.push(item);
      item.on('click', (e) => {
        cb();
      });
    }
  }

  update(data: any[]) {
    this.data = data;
  }

  hide() {
    this.data.forEach((txt) => {
      txt.hide();
    });
  }

  show() {
    this.data.forEach((txt) => {
      txt.show();
    });
  }

  zoomChange() {
    const mapZoom = this.map.getZoom();
    if(mapZoom <= 4) {
      this.hide();
      return;
    }
    this.show();
  }
}
