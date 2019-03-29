import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModuleConfigService } from './share-module-config.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ShareModuleConfigService],
})
export class CoreModule { }