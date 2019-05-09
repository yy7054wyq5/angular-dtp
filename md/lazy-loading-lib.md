在开发应用时，有些功能不太常用但却必须有（ 比如编辑器）。直接集成到项目里又会增加主包(main.js)的大小。为了避免这些问题，通过懒加载的方式似乎比较好。
具体实现请看线上例子：angular-lazy-loading-lib-lddvq1f - StackBlitz，代码比较简单就不赘述了。只提几点关键的。

1. 以rxjs的ReplaySubject实现: https://rxjs-dev.firebaseapp.com/api/index/class/ReplaySubject
private loadedLibraries: { [url: string]: ReplaySubject<any> } = {};

2. 当然若请求发生了异常则需要捕获，所以使用了原生的XMLHttpRequest来预先请求。

```javascript
private _load(url: string, cb: () => Element): Observable<any> {
            if (this.loadedLibraries[url]) {
              return this.loadedLibraries[url].asObservable();
            }
            this.loadedLibraries[url] = new ReplaySubject();
            const element = cb();
            // 骚操作，先用原生方法获取url的资源，若失败则返回错误
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
```


3. 第三方库的引用地址：https://unpkg.com/ ，如果你不想打包那么多的js，那么这个地址将会有所帮助。

4. 当然这样的操作是有弊端的，就是没有代码提示的。不过用得少也不纠结了。
参考地址：
https://stackoverflow.com/questions/46240293/how-to-lazyload-library-in-angular-4-module