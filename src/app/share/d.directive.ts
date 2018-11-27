import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line
  selector: '[d-host]'
})
export class DDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
