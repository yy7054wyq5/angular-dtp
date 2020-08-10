import {
    Component,
    Input,
    Output,
    EventEmitter,
    TemplateRef,
    ContentChild,
    ViewChild
} from '@angular/core';

@Component({
    // tslint:disable-next-line
    selector: 'toggle',
    // exportAs: 'toggle',
    template: `
        <ng-content></ng-content>
        <ng-container
            *ngTemplateOutlet="
                layoutTemplate;
                context: { on: this.on, fns: { toggle: this.toggle } }
            "
        >
        </ng-container>
    `
})
export class ToggleComponent {
    @Input() on: boolean;
    @Output() toggled: EventEmitter<boolean> = new EventEmitter();

    @ContentChild(TemplateRef, { static: true }) layoutTemplate: TemplateRef<any>;

    toggle = () => {
        this.setOnState(!this.on);
        console.log('调用ToggleComponent的toggle');
    };

    setOnState(on: boolean) {
        this.on = on;
        this.toggled.emit(this.on);
    }
}
