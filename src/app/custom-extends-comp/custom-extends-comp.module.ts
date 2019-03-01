import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleComponent } from './toggle/toggle.component';
import { ToggleDirective } from './toggle/toggle.directive';
import { IndexComponent } from './index/index.component';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [CommonModule, FormsModule, NgZorroAntdModule],
  declarations: [ToggleComponent, ToggleDirective, IndexComponent],
  exports: [IndexComponent]
})
export class CustomExtendsCompModule {}
