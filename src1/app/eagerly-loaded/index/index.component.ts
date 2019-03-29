import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ShareModuleConfigService } from '../../core/share-module-config.service';
import { IndexService } from './index.service';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css'],
	providers: [
		// {
		// 	provide: ShareModuleConfigService,
		// 	useValue: {
		// 		helloCompTxt: '急性模块组件搞一下hello组件',
		// 		data: [33]
		// 	}
		// },
		IndexService
	]
})
export class IndexComponent implements OnInit {
	constructor(public config: ShareModuleConfigService, private cdr: ChangeDetectorRef) {}

	ngOnInit() {}
}
