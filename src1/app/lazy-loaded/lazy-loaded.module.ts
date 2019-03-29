import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { ShareModule } from '../share/share.module';
import { Routes, RouterModule } from '@angular/router';
import { ShareModuleConfigService } from '../core/share-module-config.service';

const testRoutes: Routes = [
	{
		path: '',
		component: IndexComponent
	}
];

@NgModule({
	imports: [CommonModule, ShareModule, RouterModule.forChild(testRoutes)],
	declarations: [IndexComponent],
	providers: [
		{
			provide: ShareModuleConfigService,
			useValue: {
				helloCompTxt: '惰性模块搞一下hello组件',
				data: [4]
			}
		}
	]
})
export class LazyLoadedModule {}
