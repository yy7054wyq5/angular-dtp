import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { Routes, RouterModule } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { ShareModuleConfigService } from '../core/share-module-config.service';
import { EagerlyModuleService } from './services/eagerly-module.service';

const eagerlyRoutes: Routes = [
	{
		path: 'eagerly',
		component: IndexComponent
	}
];

@NgModule({
	imports: [CommonModule, ShareModule, RouterModule.forChild(eagerlyRoutes)],
	declarations: [IndexComponent],
	providers: [
		{
			provide: ShareModuleConfigService,
			useValue: {
				helloCompTxt: '急性模块搞一下hello组件',
				data: [3]
			}
		}
	]
})
export class EagerlyLoadedModule {}
