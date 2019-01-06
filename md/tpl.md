### 写在最前，本文提到的“模板”都是

```html
<ng-template></ng-template>
```

### 在开发过程中，难免会遇到公共组件需要Input模板或input组件的时候，以增加公共组件交互或展示的灵活性。以下几点皆为个人浅显的理解。

> 题外话：input组件的方式，可以扩展为依靠服务在业务模块中进行配置，以达到每个模块所用的同一个公共组件拥有不同的交互。下一篇文章将会谈谈。

<hr>

#### 1. 使用 [ngTemplateOutlet](https://angular.cn/api/common/NgTemplateOutlet) 和 [ngComponentOutlet](https://angular.cn/api/common/NgComponentOutlet)

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

假设要写一个模态框组件wmodal，需要将模板或组件在模态框里展示。但是又不想html里用*ngIf来判断内容的显示，两个三个还可以接受，那要是7、8个或以上呢？程序员嘛，都想少写一点代码。好了，就让我们看看这个，具体见[线上代码](https://stackblitz.com/edit/angular-creat-tpl-or-comp?file=src%2Fapp%2Fwmodal%2Fwmodal.component.ts)。

* 在wmodal内需要做点什么呢？首先是html

```html
  // 占个位，这里我要放传入的模板或组件了
  <ng-template #container></ng-template>
```

* 接着是wmodal的ts

```javascript
  // { read: ViewContainerRef } 是必须的
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  @Input() content: 

  ngAfterContentInit() {

  }
  // 创建模板
  createEmbeddedView();
  // 创建组件
  createComponent();
```

#### 3. 使用[ApplicationRef](https://angular.cn/api/core/ApplicationRef)

```javascript
  attachView();
```

### 参考资料：

* [Angular 4.x 修仙之路: Angular 2 TemplateRef & ViewContainerRef](https://segmentfault.com/a/1190000008672478)
* [深入Angular：理解Component动态加载](https://zhuanlan.zhihu.com/p/40015871)