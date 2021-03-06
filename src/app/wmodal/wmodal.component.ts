import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  Type,
  Input,
  AfterContentInit,
  ComponentFactoryResolver,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wmodal',
  templateUrl: './wmodal.component.html',
  styleUrls: ['./wmodal.component.less']
})
export class WmodalComponent implements OnInit, AfterContentInit, OnDestroy {
  constructor(private _compFac: ComponentFactoryResolver) {}

  private _compSubs: Subscription[] = [];

  // 如果是组件，则需要将该组件放入所属模块的entryComponents数组内
  @Input() content: TemplateRef<any> | Type<any>;
  @Input() compParams: any;
  @Output() compOut = new EventEmitter<any>();

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  ngOnInit() {}

  ngAfterContentInit() {
    // 依然是判断content类型
    if (this.content instanceof Type) {
      const comp = this.container.createComponent(this._compFac.resolveComponentFactory(this.content));
      // 将组件所需参数合并到组件实例中
      Object.assign(comp.instance, this.compParams);
      // 订阅
      for (const prop in comp.instance) {
        if (comp.instance.hasOwnProperty(prop)) {
          const subject = comp.instance[prop];
          // 筛选组件output事件
          if (subject instanceof EventEmitter) {
            this._compSubs.push(
              // 订阅组件output事件
              subject.subscribe(data => {
                this.compOut.emit(data);
              })
            );
          }
        }
      }
    } else {
      // 创建模板就比较简单了
      // 留意一下第二个参数，若是需要将组建的某些数据传出则可以这样
      const _data = {a: 1, b: 2};
      this.container.createEmbeddedView(this.content, {$implicit: _data, other: 2});
    }
  }

  ngOnDestroy() {
    this._compSubs.forEach(s => {
      s.unsubscribe();
    });
  }
}
