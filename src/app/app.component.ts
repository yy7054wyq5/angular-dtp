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
	ViewEncapsulation,
	Renderer2,
} from '@angular/core';
import { Subject, fromEvent, interval, of, concat, merge, zip } from 'rxjs';
import { DDirective } from './share/d.directive';
import { mergeMapTo, mergeMap, map } from 'rxjs/operators';
import { Entry1Component } from './entry1/entry1.component';
// import { AComponent } from './share/a/a.component';

const width = [1, 2, 3, 4, 5];
const height = [1, 2, 1, 2, 1];

function f() {
	console.log('f(): evaluated');
	return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
		console.log('f(): called', propertyKey);
	};
}

function g() {
	console.log('g(): evaluated');
	return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
		console.log('g(): called', propertyKey);
	};
}

class C {
	@f()
	@g()
	method() {}
}

// 类装饰器
// @Frozen
// class IceCream { }

// function Frozen(constructor: Function) {
//   Object.freeze(constructor);
//   Object.freeze(constructor.prototype);
// }

// console.log(Object.isFrozen(IceCream)); // true

// class FroYo extends IceCream { } // 报错，类不能被扩展

// 属性装饰器
export class IceCreamComponent {
	@Emoji()
	flavor = 'vanilla';
}

// Property Decorator
function Emoji() {
	return function(target: Object, key: string | symbol) {
		let val = target[key];

		const getter = () => {
			return val;
		};
		const setter = next => {
			console.log('updating flavor...');
			val = `🍦 ${next} 🍦`;
		};

		Object.defineProperty(target, key, {
			get: getter,
			set: setter,
			enumerable: true,
			configurable: true,
		});
	};
}

const iceCream = new IceCreamComponent();
// iceCream.flavor = '1212';
console.log(iceCream.flavor);

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit, AfterContentInit {
	moveData: { width: string; height: string }[] = (function g() {
		return width.map((w, idx) => {
			return {
				width: w * 50 + 'px',
				height: height[idx] * 50 + 'px',
			};
		});
	})();

	tClick(e) {
		console.log('tClick', e);
	}

	title = 'angular-test';
	isCollapsed = false;
	isReverseArrow = false;
	width = 200;

	drag = false;

	collapsedChange$ = new Subject<any>();

	component: ComponentRef<any>;

	dyComponent;

	@ViewChild(DDirective, { static: false }) dHost: DDirective;

	@ViewChild('myTable', { static: false }) table: any;

	rows: any[] = [];
	expanded: any = {};
	timeout: any;

	onPushData = {
		input: null,
	};

	constructor(
		private render: Renderer2,
		private appRef: ApplicationRef,
		private injector: Injector,
		private componentFactoryResolver: ComponentFactoryResolver
	) {
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

	ngAfterContentInit() {
		this.creatEntryComp();
	}

	private creatEntryComp() {
		const container = document.querySelector('.entry-container');
		// 生成Item组件并添加@input
		const entry1Comp = this.componentFactoryResolver.resolveComponentFactory(Entry1Component).create(this.injector);
		this.render.appendChild(container, entry1Comp.location.nativeElement);
		this.appRef.attachView(entry1Comp.hostView);
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
