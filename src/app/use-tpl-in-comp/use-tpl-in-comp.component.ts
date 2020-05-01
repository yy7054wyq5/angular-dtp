import {
  Component,
  ApplicationRef,
  Injector,
  ComponentFactoryResolver,
  ElementRef,
  OnInit,
  AfterContentInit,
} from "@angular/core";
// private _compFaRes: ComponentFactoryResolver,
import { TestComponent } from "../test/test.component";
import { NzModalService } from "ng-zorro-antd";

@Component({
  selector: "use-tpl-in-comp",
  templateUrl: "./use-tpl-in-comp.component.html",
  styleUrls: ["./use-tpl-in-comp.component.less"],
})
export class UseTplInCompComponent implements OnInit, AfterContentInit {
  name = "Angular";
  ttt;

  constructor(
    private _e: ElementRef,
    private appRef: ApplicationRef,
    private _injector: Injector,
    private nzModalService: NzModalService,
    private _compFaRes: ComponentFactoryResolver
  ) {
    // appRef.attachView();
  }

  ngOnInit() {}

  ngAfterContentInit() {
    const comp = this._compFaRes
      .resolveComponentFactory(TestComponent)
      .create(this._injector);
    this.ttt = comp.instance.ooo;
    this.nzModalService.create({
      nzContent: this.ttt,
      nzOnOk: () => {
        comp.instance.data;
      },
    });
    // $div.appendChild(comp.location.nativeElement);
    // this.appRef.attachView(comp.hostView);
  }
}
