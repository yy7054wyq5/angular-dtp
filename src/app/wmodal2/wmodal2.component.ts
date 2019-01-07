import {
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  Type,
  Injector,
  ApplicationRef,
  AfterContentInit,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'wmodal2',
  templateUrl: './wmodal2.component.html',
  styleUrls: ['./wmodal2.component.less']
})
export class Wmodal2Component implements OnInit, AfterContentInit {
  constructor(
    private _appref: ApplicationRef,
    private _injector: Injector,
    private _compFaRes: ComponentFactoryResolver,
    private _e: ElementRef
  ) {}

  @Input() content: Type<any>;

  ngOnInit() {}

  ngAfterContentInit() {
    const _comp = this._compFaRes.resolveComponentFactory(this.content).create(this._injector);
    this._e.nativeElement.appendChild(_comp.location.nativeElement);
    this._appref.attachView(_comp.hostView);
  }
}
