import { Injectable, Inject } from '@angular/core';
import { Observable, ReplaySubject, Observer } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export function request(url: string) {
  return new Promise((resolve, reject) => {
    const oReq = new XMLHttpRequest();
    // https://caniuse.com/#search=XMLHttpRequest
    // ie11不支持json
    // oReq.responseType = 'json';
    oReq.onload = () => {
      let res;
      try {
        res = JSON.parse(oReq.response);
      } catch (error) {
        res = oReq.response;
      }
      if (oReq.status === 200) {
        resolve(res);
      } else {
        reject(res);
      }
      // console.log(res);
    };
    oReq.onerror = err => {
      reject(err);
    };
    oReq.open('get', url, true);
    oReq.send();
  });
}


@Injectable({
  providedIn: 'root'
})
export class LazyLoadingLibService {
  private loadedLibraries: { [url: string]: ReplaySubject<any> } = {};

  constructor(@Inject(DOCUMENT) private readonly document: any, private http: HttpClient) { }

  /**
   * 加载资源
   *
   * @private
   * @param {string} url
   * @param {Function} cb
   * @returns {Observable<any>}
   * @memberof LazyLoadingLibService
   */
  private _load(url: string, cb: () => Element): Observable<any> {
    if (this.loadedLibraries[url]) {
      return this.loadedLibraries[url].asObservable();
    }
    this.loadedLibraries[url] = new ReplaySubject();
    const element = cb();
    // 骚操作
    // 先用原生方法获取url的资源，若失败则返回错误
    // https://stackoverflow.com/questions/28556398/how-to-catch-neterr-connection-refused
    return new Observable((ob: Observer<any>) => {
      request(url).then(() => {
        this.document.body.appendChild(element);
        this.loadedLibraries[url].subscribe(() => {
          ob.next('');
          ob.complete();
        });
      }).catch(err => {
        this.loadedLibraries[url] = null;
        console.error('LazyLoadingLibService error', err);
        ob.error(err);
        ob.complete();
      });
    });
  }

  /**
   * 加载JS
   *
   * @param {string} url
   * @returns {Observable<any>}
   * @memberof LazyLoadingLibService
   */
  public loadJS(url: string): Observable<any> {
    return this._load(url, () => {
      const script = this.document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.onload = () => {
        this.loadedLibraries[url].next('');
        this.loadedLibraries[url].complete();
      };
      return script;
    });
  }

  /**
   * 加载CSS
   *
   * @param {string} url
   * @returns
   * @memberof LazyLoadingLibService
   */
  public loadCSS(url: string) {
    return this._load(url, () => {
      const link = this.document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.onload = () => {
        this.loadedLibraries[url].next('');
        this.loadedLibraries[url].complete();
      };
      return link;
    });
  }
}
