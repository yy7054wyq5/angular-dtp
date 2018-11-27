import {
  Component,
  ViewChild,
  TemplateRef,
  OnInit,
  ElementRef,
  AfterViewInit,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  OnDestroy,
  ApplicationRef,
  AfterContentInit,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { DDirective } from './share/d.directive';
// import { AComponent } from './share/a/a.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'angular-test';
  isCollapsed = false;
  isReverseArrow = false;
  width = 200;

  drag = false;

  collapsedChange$ = new Subject<any>();

  component: ComponentRef<any>;

  dyComponent;

  @ViewChild(DDirective) dHost: DDirective;

  @ViewChild('myTable') table: any;

  rows: any[] = [];
  expanded: any = {};
  timeout: any;

  constructor() {
    this.fetch((data: any[]) => {
      this.rows = data.splice(1, 20);
    });
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
}
