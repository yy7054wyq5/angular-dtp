### 写在最前，本文提到的“模板”都是

```html
<ng-template></ng-template>
```

### 在开发过程中，难免会遇到公共组件需要Input模板或input组件的时候，以增加公共组件交互或展示的灵活性。

> 题外话：input组件的方式，可以扩展为依靠服务在业务模块中进行配置，以达到每个模块所用的同一个公共组件拥有不同的交互。下一篇文章将会谈谈。

<hr>

#### 1. 使用 [ngTemplateOutlet](https://angular.cn/api/common/NgTemplateOutlet) 和 [ngComponentOutlet](https://angular.cn/api/common/NgComponentOutlet)

>ngTemplateOutlet: 根据一个提前备好的 TemplateRef 插入一个内嵌视图。ngComponentOutlet: Instantiates a single Component type and inserts its Host View into current View. NgComponentOutlet provides a declarative approach for dynamic component creation.

假设要写一个表格组件，名为wtable，需要自定义单元格内容，组件ts有如下内容，为了缩减篇幅，只保留重要代码，具体见[线上代码](https://stackblitz.com/edit/angular-creat-tpl-or-comp?file=src%2Fapp%2Fwtable%2Fwtable.component.ts)：

* 使用场景

```html
  <wtable [columns]="['姓名','年龄']" [rows]="[{name: 'ww', age: 11}, {name:'yy', age: 22}]" [cellContent]="custom"></wtable>

  <ng-template #custom let-data let-column="column" let-row="row" let-index="index">
    <!-- 在这里就可以获取数据搞事情啦 -->
    {{column}}: {{data}}<br>
    {{index}} 行<br>
    行数据： {{row | json}}
  </ng-template>
```

* wtable组件的html

```html
<tbody>
  <tr *ngFor="let row of rows;index as i;">
    <td *ngFor="let cell of row | keyvalue">
      <!-- 模板 -->
      <ng-container *ngIf="tpl">
        <ng-container *ngTemplateOutlet="tpl; context:outCellContext(cell.key, cell.value, row, i);"></ng-container>
      </ng-container>
      <!-- 组件不太好用 -->
      <ng-container *ngIf="comp">
        <ng-container *ngComponentOutlet="comp"></ng-container>
      </ng-container>
    <td>
  </tr>
</tbody>
```

* wtable组件ts

```javascript
  // 此处为内部变量传递给外部模板使用，所需的数据
  outCellContext(cellKey, cellValue, row, index) {
    return {
      $implicit: cellValue, // 默认传出cellValue数据
      column: cellKey, // 指定字段
      row: row, // 行数据
      index: index // 行索引
    }
  }
}
```

#### 2. 使用[ViewContainerRef](https://angular.cn/api/core/ViewContainerRef)

> 表示可以将一个或多个视图附着到组件中的容器。

假设要写一个模态框组件wmodal，需要将模板或组件在模态框里展示。但是又不想html里用*ngIf来判断内容的显示，两个三个还可以接受，那要是7、8个或以上呢？让我们看看下面这个例子，具体见[线上代码](https://stackblitz.com/edit/angular-creat-tpl-or-comp?file=src%2Fapp%2Fwmodal%2Fwmodal.component.ts)。

* 使用场景

```html
<wmodal [content]="comp" [compParams]="{data: '我是调用wmodal传入的值'}" (compOut)="wmodalOut($event)"></wmodal>
```

* 在wmodal内需要做点什么呢？首先是html

```html
  // 占个位，这里我要放传入的模板或组件了
  <ng-template #container></ng-template>
```

* 接着是wmodal的ts

```javascript
ngAfterContentInit() {
  // 依然是判断content类型
  if (this.content instanceof Type) {
    const comp = this.container.createComponent(this._compFac.resolveComponentFactory(this.content));
    // 将组件所需参数合并到组件实例中
    if (this.compParams) {
      Object.assign(comp.instance, this.compParams);
    }
    // 订阅组件
    for (const prop in comp.instance) {
      if (comp.instance.hasOwnProperty(prop)) {
        const subject = comp.instance[prop];
        // 筛选组件output事件
        if (subject instanceof EventEmitter) {
          this._compSubs.push(
            // 订阅组件output事件
            subject.subscribe(data => {
              this.compOut.emit(data);
            })
          );
        }
      }
    }
  } else {
    // 创建模板就比较简单了
    // 留意一下第二个参数，若是需要将组建的某些数据传出则可以这样
    const _data = {a: 1, b: 2};
    this.container.createEmbeddedView(this.content, {$implicit: _data, other: 2});
  }
}
```

#### 3. 使用[ApplicationRef](https://angular.cn/api/core/ApplicationRef)

> A reference to an Angular application running on a page.

```javascript
  attachView();
```

### 结束语

本文并未对3种方式进行对比，只是个人对于3种方式的使用理解。
简单的总结一下：

* 使用1，会让html代码比较多，不易维护；而且1是通过2来实现得，[传送门](https://github.com/angular/angular/tree/master/packages/common/src/directives)；
* 1、2都需要确定插座位置，3不需要确定插座位置；
* 2是比较常见的使用方式

### 参考资料：

* [angular.cn](https://angular.cn/)
* [Angular 4.x 修仙之路: Angular 2 TemplateRef & ViewContainerRef](https://segmentfault.com/a/1190000008672478)
* [深入Angular：理解Component动态加载](https://zhuanlan.zhihu.com/p/40015871)