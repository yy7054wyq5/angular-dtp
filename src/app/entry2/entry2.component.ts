import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'scm-entry2',
  templateUrl: './entry2.component.html',
  styleUrls: ['./entry2.component.less']
})
export class Entry2Component implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get('dasjdlksajdas ').subscribe();
  }

}
