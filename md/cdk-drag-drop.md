
# Angular-用cdk实现可拖拽布局

实现此功能用的是[@angular/cdk/drag-drop](https://material.angular.cn/cdk/drag-drop/overview)，组件是采用[ng-zorro-antd](https://ng.ant.design/docs/introduce/zh)。真的想吐槽一下，官方博客在7.0发布时为该功能安利了一下，展示了一个gif，[拖拽自适应布局，需翻墙](https://blog.angular.io/version-7-of-angular-cli-prompts-virtual-scroll-drag-and-drop-and-more-c594e22e7b8c)，遗憾的是没有透露一点实现的思路。就像给小孩看一个糖就是不给你吃的感觉，手动鄙视，-。-

<插入gif>

## 需求

<插入草图>

交互：拖拽进入布局局域，鼠标释放，弹出配置模态框，点击“确定”后，生成相应的组件。

## 拆分需求

1. 需求包含：拖拽功能，配置组件，动态生成组件。

2. 拖拽可由cdk实现；zorro可提供模态框，配置即组件的@Input；动态生成则可见[Angular-3种创建动态内容的方式](https://zhuanlan.zhihu.com/p/54085160)。

## 难点

在angular/cdk中可用来实现的拖拽功能为cdkDropList，使用@Input() id: string就行了。所以拖拽不算难点了。剩下的就是下面这两点。

### 1.组件的布局

最开始认为组件大小不一，不好做整体的布局。但最终采用简单的实现，即先有“行布局”占位，划出格子，再将组件放到“行布局”的格子中。

<插入控件>

### 2.组件的自定义配置

组件本身交互不一致，所需配置肯定不一样。如何才能统一各个组件，对接到拖拽里面呢？最终采用的是模板的方式，即不管配置是什么，直接渲染表单模板，获取其中的值赋值给组件。

## 思路

<插入布局>

我对图上的线框做了颜色对应，左侧的“布局”，拖拽到右侧的”可布局区域“，可以生成右侧蓝色的部分，称为“行布局”，它可以被输入的”列数“（拖拽释放时弹出输入列数的模态框，点击确定后生成”行布局“）划分成多等份，被划出来的部分称为”单元格“。再将左侧的蓝色边框的“组件”拖拽到”单元格“内。这样组件的布局即完成了，但是已在”行布局“中的组件，只可在同一行内拖拽。-.- 虽然可做全”行布局“拖拽，但不太想去实现。

这只是完成了其中的一小部分工作，接着要来实现组件了。考虑到以后的扩展，除了组件本身的编写以外还需要配置的模板的编写，那么两者需要放在一起。这样在调用时只需知道这个组件是啥，我就知道了它对应的配置模板即可。这其中，配置模板使用的是响应式表单。组件本身无外乎就是一些实现了[ControlValueAccessor](https://angular.cn/api/forms/ControlValueAccessor)这个接口的组件。因为组件最终是用于表单提交的，所以这一点需要注意。再根据依赖注入即可注入外部的组件。这样看起来，似乎一切都那么顺利。

<插入demo>

## 坑

cdk所需的id的变化。配置模板：获取模板；模板数据的更新和获取。展示时的座子实现。配置的保存。组件本身的验证配置等等。

## 代码

<插入最终实现>
很抱歉，代码目前暂不考虑开放。

## 参考

  https://zhuanlan.zhihu.com/p/54085160
  
  https://ng.ant.design/docs/introduce/zh

  https://material.angular.cn/cdk/drag-drop/api
  
  https://angular.cn/api/forms/ControlValueAccessor