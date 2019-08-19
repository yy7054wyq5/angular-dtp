import { Component, OnInit, Renderer2, ApplicationRef, Injector, ComponentFactoryResolver, AfterContentInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Entry2Component } from '../entry2/entry2.component';

@Component({
  selector: 'scm-entry1',
  templateUrl: './entry1.component.html',
  styleUrls: ['./entry1.component.less']
})
export class Entry1Component implements OnInit, AfterContentInit {

  constructor(
    private http: HttpClient,
    private render: Renderer2,
    private appRef: ApplicationRef,
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.creatEntryComp();
  }

  private creatEntryComp() {
    const container = document.querySelector('.entry2-container');
    // 生成Item组件并添加@input
    const entry2Comp = this.componentFactoryResolver
      .resolveComponentFactory(Entry2Component)
      .create(this.injector);
    this.render.appendChild(container, entry2Comp.location.nativeElement);
    this.appRef.attachView(entry2Comp.hostView);
  }

}
