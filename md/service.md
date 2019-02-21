# 标题

感谢各位的点赞和关注，我将持续更新日常开发中的angular点滴。

回到正题，上一篇文章写到：
> input组件的方式，可以扩展为依靠服务在业务模块中进行配置，以达到每个模块所用的同一个公共组件拥有不同的交互。

结合官网的这篇文档可以一窥究竟：[Angular - 多级依赖注入器](https://angular.cn/guide/hierarchical-dependency-injection)，可以从“元素注入器”读起。
那其实有一句挺有意思的：
> 在不同层次上重新配置一个或多个提供商的能力，开启了一些既有趣又有用的可能性。

那是时候展现真正的技术了。[完整代码](https://stackblitz.com/edit/angularservicedemo)

<hr>

## 服务的分类

以下示例均采用可以摇树优化的方式提供服务

1.[整个应用的单例服务](https://angular.cn/guide/dependency-injection#injector-hierarchy-and-service-instances)：有以下两种方式

```javascript
  // 若在服务内部已标记为'root'，那么则会优先采用它
  @Injectable({
    providedIn: 'root'
  })
```

```javascript
  @NgModule({
    providers: []
  })
  export class AppModule { }
```

2.特性模块服务：

```javascript
  @Injectable({
    providedIn: ShareModule
  })
```

3.组件服务
