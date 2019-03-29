import { Component, OnInit } from '@angular/core';
import { IndexService } from './index.service';
import { ShareModuleConfigService } from '../../core/share-module-config.service';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css'],
	providers: [
		IndexService,
		// {
		// 	provide: ShareModuleConfigService,
		// 	useValue: {
		// 		helloCompTxt: '惰性模块组件搞一下hello组件',
		// 		data: [44]
		// 	}
		// }
	]
})
export class IndexComponent implements OnInit {
	constructor(public config: ShareModuleConfigService) {}

	ngOnInit() {}
}
