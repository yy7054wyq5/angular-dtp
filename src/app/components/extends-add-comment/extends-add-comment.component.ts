import { Component, OnInit, AfterContentInit } from '@angular/core';
import { LazyLoadingLibService } from '../../services/lazy-loading-lib.service';
import { forkJoin, combineLatest, zip } from 'rxjs';
import Quill from 'quill';

// declare const Quill: Quill;

@Component({
  selector: 'scm-extends-add-comment',
  templateUrl: './extends-add-comment.component.html',
  styleUrls: ['./extends-add-comment.component.less']
})
export class ExtendsAddCommentComponent implements OnInit, AfterContentInit {

  private editor: any;

  constructor(
    private lazyLoadingLibService: LazyLoadingLibService
  ) { }

  ngOnInit() {
    combineLatest([
      this.lazyLoadingLibService.loadCSS('//unpkg.com/quill@1.3.6/dist/quill.snow.css'),
      this.lazyLoadingLibService.loadJS('//unpkg.com/quill@1.3.6/dist/quill.js')
    ]).subscribe(() => {
      this.editor = new Quill('#editor', {
        modules: { toolbar: '#toolbar' },
        theme: 'snow'
      });
    });
  }

  ngAfterContentInit() {

  }

}
