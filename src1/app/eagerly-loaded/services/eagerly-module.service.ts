import { Injectable } from '@angular/core';
import { EagerlyLoadedModule } from '../eagerly-loaded.module';

@Injectable({
	providedIn: EagerlyLoadedModule
})
export class EagerlyModuleService {
	constructor() {}
}
