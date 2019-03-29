# 标题

感谢各位的点赞和关注，也希望各位在评论区批评指正，共同进步。

上一篇文章写到：
> input组件的方式，可以扩展为依靠服务在业务模块中进行配置，以达到每个模块所用的同一个公共组件拥有不同的交互。（经过具体实践发现，在惰性加载模块进行配置是可行的；在急性加载模块配置是会出事的）

结合官网的这篇文档可以一窥究竟：[Angular - 多级依赖注入器](https://angular.cn/guide/hierarchical-dependency-injection)，可以从“元素注入器”读起。
那其实有一句挺有意思的：
> 在不同层次上重新配置一个或多个提供商的能力，开启了一些既有趣又有用的可能性。

那是时候展现真正的技术了。[完整代码](https://stackblitz.com/edit/angular-service-stv4nb-75fnjw)

<hr>

## 预备知识

### 服务提供商

做个比喻：打电话可以视为电信提供的一个服务，那么电信就可以视为打电话的服务提供商。假如就电信这么一个公司，没有它就没法使用打电话的功能。那么需要使用服务就需要服务提供商。

再经过层层“代理”，模块可以提供服务，组件也可以提供服务。它们在各自的范围内，提供服务。

### 服务的分类

以下示例均采用可以摇树优化的方式提供服务；组件提供的除外，因为一般上，组件会需要使用服务的方法或数据，若采用此方式，则会造成循环依赖。

建议：将服务放到最顶层的业务模块或组件中提供，在其子集中，通过[注入器冒泡](https://angular.cn/guide/hierarchical-dependency-injection#injector-bubbling)的特性去获取该服务的实例或方法或值。

1.单例服务

> 在 Angular 中有两种方式来生成单例服务：声明该服务应该在应用的根上提供。把该服务包含在 AppModule 或某个只会被 AppModule 导入的模块中。

```javascript
  // 前者
  @Injectable({
    providedIn: 'root'
  })
```

```javascript
  // 后者
  @NgModule({
    imports: [
      CommonModule
    ],
    declarations: [],
    providers: [ShareModuleConfigService],
  })
  export class CoreModule { }

  @NgModule({
    imports: [
      CoreModule,
      // ....
      ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: []
  })
  export class AppModule { }
```

2.模块级服务：

```javascript
  @Injectable({
    providedIn: EagerlyLoadedModule
  })
```

3.组件级服务

```javascript
  @Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css'],
    providers: [IndexService]
  })
```

## 样例实现

采用useValue简单的实践一下。

