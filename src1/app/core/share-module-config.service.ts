import { Injectable } from '@angular/core';

@Injectable()
export class ShareModuleConfigService {
	helloCompTxt: string;
	data = [1];
	constructor() {
		console.log('ShareModuleConfigService constructor');
	}
}
