import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloComponent } from './components/hello.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HelloComponent],
  exports: [HelloComponent],
  providers: []
})
export class ShareModule {}
