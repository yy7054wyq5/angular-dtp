import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvincesCitiesMapComponent } from './provinces-cities-map.component';
import { AbmModule } from 'angular-baidu-maps';
import { BaiDuMapApiKey } from '@src/app/config';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [ProvincesCitiesMapComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    AbmModule.forRoot({
      apiKey: BaiDuMapApiKey // app key为必选项
    })
  ],
  exports: [ProvincesCitiesMapComponent]
})
export class ProvincesCitiesMapModule {}
