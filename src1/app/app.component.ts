import { Component, OnInit } from '@angular/core';
import { ShareModuleConfigService } from './core/share-module-config.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
})
export class AppComponent {

  constructor(
    public config: ShareModuleConfigService
  ) {
    console.log(config.data);
  }
  
}
