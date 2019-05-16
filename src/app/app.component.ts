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
import { Subject, fromEvent, interval, of, concat, merge, zip } from 'rxjs';
import { DDirective } from './share/d.directive';
import { mergeMapTo, mergeMap, map } from 'rxjs/operators';
// import { AComponent } from './share/a/a.component';

const width = [1, 2, 3, 4, 5];
const height = [1, 2, 1, 2, 1]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  moveData: { width: string, height: string }[] = (function g() {
    return width.map((w, idx) => {
      return {
        width: w * 50 + 'px',
        height: height[idx] * 50 + 'px'
      };
    });
  })();

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

  onPushData = {
    input: null
  };

  constructor() {
    this.fetch((data: any[]) => {
      this.rows = data.splice(1, 20);
    });
  }

  ngOnInit() {
    this.onPushData.input = 1;

    const clicks = of(1, 2, 3, 4);
    const result = clicks.pipe(mergeMapTo(of(5555)));
    result.subscribe(x => console.log(x));

    // const letters = of('a', 'b', 'c');
    // const result = letters.pipe(mergeMap(x => interval(1000).pipe(map(i => x + i))));
    // result.subscribe(x => console.log(x));

    const o1 = of(1);
    const o2 = of([1]);
    zip(o1, o2)
      // .pipe(map(x => x))
      .subscribe(x => {
        console.log(x);
      });
  }

  changeInput(n) {
    this.onPushData.input = n;
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

  start(data) {
    console.log('start', data);
  }

  move(data) {
    console.log('move', data);
  }

  release(data) {
    console.log('release', data);
  }

  end(data) {
    console.log('end', data);
  }

  drop(data) {
    console.log('drop', data);
  }

  enter(data) {
    console.log('enter', data);
  }

  exit(data) {
    console.log('exit', data);
  }
}
