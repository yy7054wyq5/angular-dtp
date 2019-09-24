import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
import { delay } from 'rxjs/operators';

@Directive({
	selector: '[scmTtclick]',
})
export class TtclickDirective {
	@Output() ttclick = new EventEmitter();
	@HostListener('click', ['$event']) clicking(btn) {
		console.log('里面click', btn);
		this.ttclick.next(btn);
	}

	constructor() {}
}
