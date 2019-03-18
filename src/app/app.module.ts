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
import { NgxDatatableModule } from 'ngx-datatable-wy';
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
import { Wmodal2Component } from './wmodal2/wmodal2.component';
import { OnPushComponent } from './on-push/on-push.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './custom-extends-comp/index/index.component';
import { CustomExtendsCompModule } from './custom-extends-comp/custom-extends-comp.module';
import { ExtendsZorroUploadComponent } from './extends-zorro-upload/extends-zorro-upload.component';
import { UploadDemoComponent } from './extends-zorro-upload/upload-demo/upload-demo.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { BehaviorSubjectsService } from './services/behavior-subjects.service';
import { CounterComponent } from './components/counter/counter.component';

registerLocaleData(zh);

const routes: Routes = [
  {
    path: 'test/:id/:token',
    component: TestComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'custom-extends-comp',
    component: IndexComponent
  },
  {
    path: 'extends-upload-comp',
    component: UploadDemoComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/custom-extends-comp'
  }
];

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
    TestComponent,
    Wmodal2Component,
    OnPushComponent,
    HomeComponent,
    ExtendsZorroUploadComponent,
    UploadDemoComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    NgxDatatableModule,
    CustomExtendsCompModule,
    RouterModule.forRoot(routes, {
      useHash: true
    }),
    StoreModule.forRoot(reducers, { metaReducers })
  ],
  entryComponents: [],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, BehaviorSubjectsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
