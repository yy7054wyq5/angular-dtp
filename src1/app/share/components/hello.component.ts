import { Component, Input, Optional, OnInit } from '@angular/core';
import { ShareModuleConfigService } from '../../core/share-module-config.service';

@Component({
	selector: 'hello',
	template: `
		<h1>HelloComponent txt： {{ txt }}</h1>
	`,
	styles: [
		`
			h1 {
				font-family: Lato;
				font-size: 18px;
			}
		`
	]
})
export class HelloComponent implements OnInit {
	@Input() txt: string;

	constructor(
		@Optional() private config: ShareModuleConfigService // 非必要的服务
	) {}

	ngOnInit() {
		this.txt = this.config ? this.config.helloCompTxt : null;
	}
}
