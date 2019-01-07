import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef, Type, Input, AfterContentInit, ComponentFactoryResolver,Injector } from '@angular/core';

@Component({
  selector: 'wmodal',
  templateUrl: './wmodal.component.html',
  styleUrls: ['./wmodal.component.css']
})
export class WmodalComponent implements OnInit, AfterContentInit {

  constructor(
    private _compFac: ComponentFactoryResolver,
  ) { }

  // 如果是组件，则需要将该组件放入所属模块的entryComponents数组内
  @Input() content: TemplateRef<any> | Type<any>;
  @Input() compParams: any;

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  ngOnInit() {
  }

  ngAfterContentInit() {
    // 依然是判断content类型
    if (this.content instanceof Type) {
      const comp = this.container.createComponent(this._compFac.resolveComponentFactory(this.content));
    // 将组件所需参数合并到组件实例中
    Object.assign(comp.instance, this.compParams);
    } else {
      // this.container.createEmbeddedView(content);
    }
  }

}
