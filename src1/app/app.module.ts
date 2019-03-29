import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ShareModule } from './share/share.module';
import { AppComponent } from './app.component';
import { EagerlyLoadedModule } from './eagerly-loaded/eagerly-loaded.module';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CoreModule } from './core/core.module';

const appRoutes: Routes = [
	{
		path: 'lazy',
		loadChildren: './lazy-loaded/lazy-loaded.module#LazyLoadedModule'
	}
];

@NgModule({
	imports: [
		CoreModule,
		BrowserModule,
		FormsModule,
		ShareModule,
		EagerlyLoadedModule,
		RouterModule.forRoot(appRoutes, {
			preloadingStrategy: PreloadAllModules,
			useHash: true
		})
	],
	declarations: [AppComponent],
	bootstrap: [AppComponent],
	providers: []
})
export class AppModule {}
