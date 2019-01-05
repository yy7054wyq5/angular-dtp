### 写在最前，本文提到的“模板”都是

```html
<ng-template></ng-template>
```

### 在开发过程中，难免会遇到公共组件内容需要Input模板或input组件的时候，以增加公共组件交互或展示的灵活性。

> 题外话：input组件的方式，可以扩展为依靠服务在业务模块中进行配置，以达到每个模块所用的同一个公共组件拥有不同的交互。下一篇文章将会谈谈。

<hr>

假设我们要写一个共享组件，名为share，组件ts有如下内容：

```javascript
import { Input, TemplateRef, Type } from '@angular/core';
@Input() customContent: TemplateRef<any> | Type<any>;
```

传入了模板和组件该怎么生成呢？

#### 1. 使用 [ngTemplateOutlet](https://angular.cn/api/common/NgTemplateOutlet) 和 [ngComponentOutlet](https://angular.cn/api/common/NgComponentOutlet)

```html
// 创建模板
<ng-container *ngTemplateOutlet="customContent; context:outContext;"></ng-container>
// 创建组件
<ng-container *ngComponentOutlet="componentTypeExpression;
                                  injector: injectorExpression;
                                  content: contentNodesExpression;">
</ng-container>
```

#### 2. 使用[ViewContainerRef](https://angular.cn/api/core/ViewContainerRef)

```javascript
  // 创建模板
  createEmbeddedView();
  // 创建组件
  createComponent();
```

#### 3. 使用[ApplicationRef](https://angular.cn/api/core/ApplicationRef)

```javascript
  attachView();
```