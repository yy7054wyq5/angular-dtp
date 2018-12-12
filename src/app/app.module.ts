import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { MuiItemComponent } from './mui-item/mui-item.component';
import { MuiGridComponent } from './mui-grid/mui-grid.component';
import { AComponent } from './share/a/a.component';
import { DDirective } from './share/d.directive';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RowDetailsComponent } from './ngx-row-detail/ngx-row-detail.component';
import { SelectComponent } from './select/select/select.component';
import { OptionComponent } from './select/option/option.component';
import { OptionMultiComponent } from './select/option-multi/option-multi.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    MuiItemComponent,
    MuiGridComponent,
    AComponent,
    DDirective,
    RowDetailsComponent,
    SelectComponent,
    OptionComponent,
    OptionMultiComponent
  ],
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, HttpClientModule, NgZorroAntdModule, NgxDatatableModule],
  entryComponents: [],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule {}
