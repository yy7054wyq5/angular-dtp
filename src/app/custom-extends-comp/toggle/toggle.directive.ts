import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line
  selector: '[toggler]'
})
export class ToggleDirective {
  // @HostBinding('attr.role') get role() { return 'switch' };
  @HostBinding('attr.role') role = 'switch';

  @HostBinding('attr.aria-checked')
  @Input()
  on;

  constructor() {}
}
