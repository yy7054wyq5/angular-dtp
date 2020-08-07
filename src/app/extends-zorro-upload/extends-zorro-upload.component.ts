import { Component, OnInit, ContentChild, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { NzUploadComponent, UploadFile, NzModalService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

const imgTypes = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif', 'image/bmp'];

@Component({
  selector: 'scm-extends-zorro-upload',
  templateUrl: './extends-zorro-upload.component.html',
  styleUrls: ['./extends-zorro-upload.component.less']
})
export class ExtendsZorroUploadComponent implements OnInit {
  constructor(private http: HttpClient, private modalService: NzModalService) {}
  fileList: UploadFile[] = [];
  ajaxing = false;

  ///// NzUploadComponent /////
  @ContentChild(TemplateRef, { static: true})
  @Input()
  uploadComp: NzUploadComponent;

  @Input() tpl;

  ///// 上传文件不自动上传 /////
  private get local() {
    return !this.nzBeforeUploadReturnValue ? true : false;
  }

  ///// FileList长度始终为1 /////
  @Input() nzFileListOnlyOneItem = false;

  ///// 设置nzBeforeUpload函数返回值 /////
  private _nzBeforeUploadReturnValue = false;
  @Input() set nzBeforeUploadReturnValue(bool: boolean) {
    this._nzBeforeUploadReturnValue = bool;
  }
  get nzBeforeUploadReturnValue() {
    return this._nzBeforeUploadReturnValue;
  }

  ///// 移除文件 /////
  private _nzRemoveAction: string;
  @Input() set nzRemoveAction(action: string) {
    this._nzRemoveAction = action || this.uploadComp.nzAction;
  }
  get nzRemoveAction() {
    return this._nzRemoveAction;
  }
  @Input() nzRemoveMethod = 'delete';

  ngOnInit() {}

  private imgSrc(file): Observable<string> {
    const reader = new FileReader();

    return Observable.create((ob: Observer<string>) => {
      reader.onloadend = () => {
        ob.next(reader.result as string);
        ob.complete();
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    });
  }

  private removeLocalFile(file: UploadFile) {
    if (!this.nzFileListOnlyOneItem) {
      this.fileList = this.fileList.filter(_file => file.uid !== _file.uid);
    }
  }

  private removeRemoteFile(uploadFile) {
    const removeApi = this.nzRemoveAction;
    let fileId = null;
    if (uploadFile.response && uploadFile.response.data && uploadFile.response.data.file_id) {
      fileId = uploadFile.response.data.file_id;
    } else {
      fileId = uploadFile.file_id;
    }
    this.ajaxing = true;
    this.http
      .request(this.nzRemoveMethod, removeApi, {
        body: {
          ...this.uploadComp.nzData,
          file_id: fileId
        }
      })
      .subscribe(
        res => {
          if (!res['status']) {
            this.removeLocalFile(uploadFile);
          }
        },
        err => console.log(err),
        () => (this.ajaxing = false)
      );
  }

  nzBeforeUpload = (file: UploadFile, fileList: UploadFile[]) => {
    if (this.nzFileListOnlyOneItem) {
      this.fileList = [fileList[fileList.length - 1]];
    } else {
      this.fileList = fileList;
    }
    return this.nzBeforeUploadReturnValue;
  }

  nzRemove = (uploadFile: UploadFile) => {
    if (this.local) {
      this.removeLocalFile(uploadFile);
      return;
    }

    this.removeRemoteFile(uploadFile);
  }

  nzPreview = (uploadFile: UploadFile) => {
    console.log('UI_preview', uploadFile);
    let img$: Observable<string>;
    if (uploadFile.response) {
      const id: string = uploadFile.response.data.file_id;
      if (imgTypes.join(',').indexOf(id) > -1) {
        img$ = of(`<img src="${id}">`);
      }
    } else {
      img$ = this.imgSrc(uploadFile).pipe(map(src => `<img src="${src}">`));
    }

    img$.subscribe(img => {
      this.modalService.create({
        nzContent: `<div style="display: flex; justify-content: center;">${img}</div>`,
        nzFooter: null,
        nzClassName: 'preview-img-modal'
      });
    });
  }
}
