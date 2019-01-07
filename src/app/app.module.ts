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
import { TestNzSelectComponent } from './test-nz-select/test-nz-select.component';
import { TestNgxTableComponent } from './test-ngx-table/test-ngx-table.component';
import { TestNgxTableSummaryComponent } from './test-ngx-table-summary/test-ngx-table-summary.component';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { TreeNodeComponent } from './tree-view/tree-node/tree-node.component';
import { TestNgForComponent } from './test-ng-for/test-ng-for.component';
import { CreatTemplateComponent } from './creat-template/creat-template.component';
import { WmodalComponent } from './wmodal/wmodal.component';
import { TestComponent } from './test/test.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    MuiItemComponent,
    MuiGridComponent,
    AComponent,
    DDirective,
    RowDetailsComponent,
    TestNzSelectComponent,
    TestNgxTableComponent,
    TestNgxTableSummaryComponent,
    TreeViewComponent,
    TreeNodeComponent,
    TestNgForComponent,
    CreatTemplateComponent,
    WmodalComponent,
    TestComponent
  ],
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, HttpClientModule, NgZorroAntdModule, NgxDatatableModule],
  entryComponents: [],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule {}
