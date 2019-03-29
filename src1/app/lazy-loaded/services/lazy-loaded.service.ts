import { Injectable } from '@angular/core';
import { LazyLoadedModule } from '../lazy-loaded.module';

@Injectable({
	providedIn: LazyLoadedModule
})
export class LazyLoadedService {
	constructor() {}
}
