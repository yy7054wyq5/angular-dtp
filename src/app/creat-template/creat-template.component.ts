import { Compiler, Component, NgModule, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'scm-creat-template',
  templateUrl: './creat-template.component.html'
})
export class CreatTemplateComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private compiler: Compiler) {}

  ngOnInit() {}

  dynamicTest() {
    this.addComponent(
      `<h4  (click)="increaseCounter()">
        <ng-template>
          Click to increase: {{counter}}
        </ng-template>
       </h4>
       `,
      {
        counter: 1,
        increaseCounter: function() {
          this.counter++;
        }
      }
    );
  }

  private addComponent(template: string, properties: any = {}) {
    @Component({ template })
    class TemplateComponent {}

    @NgModule({ declarations: [TemplateComponent] })
    class TemplateModule {}

    const mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
    const factory = mod.componentFactories.find(comp => comp.componentType === TemplateComponent);
    const component = this.container.createComponent(factory);
    Object.assign(component.instance, properties);
    // If properties are changed at a later stage, the change detection
    // may need to be triggered manually:
    // component.changeDetectorRef.detectChanges();
  }
}
