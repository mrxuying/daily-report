# Getting Started with Create React App

```shell
  yarn add antd
  yarn add less
  yarn add less-loader@8.1.1
  yarn add @craco/craco -g --save # 以支持less
  yarn add craco-less -g --save
  yarn add qs
  yarn add axios --save
  yarn add @reduxjs/toolkit -g
  yarn add redux-logger redux-thunk -g
  yarn add react-redux -g

  yarn add antd
  yarn add @ant-design/icons -g
  yarn add antd-mobile
  yarn add antd-mobile-icons

  yarn add styled-components
  yarn add postcss-pxtorem lib-flexible
  yarn add react-router-dom
  yarn add redux-promise
```

```shell
  REM:
  - 参照比例，设计稿比例：一般750px，设置html font-size一个初始值1rem=100px
  - 根据当前设备的宽度，计算相对于750px设计稿，对应缩放比例
  - 一般会设置最大宽度限制，当达到最大宽度时，则不再放大
  <style>
    html {
      font-size: 100px;
    }

    .box {
      # width:328px;
      # height:164px;

      width: 3.28rem;
      height: 1.64rem;
      line-height: 1.64rem;
      text-align: center;
      font-size: .4rem;
      background: lightblue;
    }
  <style>
  <script>
    (function(){
      const computed = () => {
        let html = document.documentElement,
          deviceWidth = html.clientWidth,
          designWidth = 750;
        let ratio = device * 100 / designWidth;
        html.style.fontSize = ratio + 'px';
      };
      computed();
      windowed.addEventListener('resize', computed)
    })();
  </script>

```

# PrePare

# 日报-WebApp zhihu

技术栈：create-react-app、React18、redux/react-redux「你可以使用 mobx 或者 reduxjs/toolkit」、react-router-dom V6、Fetch、less、AntdMobile...

# 从零开始构建 React 项目「本项目不采用任何系解决方案（例如：淘系），就是基于最纯正的 React 实现开发」

1. 基于 create-react-app 创建工程化项目
   $ npm i create-react-app -g
   $ create-react-app 项目名
   ***
   $ yarn eject 暴露 webpack 配置项
   修改脚手架默认的配置
   - 配置 less：less/less-loader@8
   - 配置别名 @ 代表 src 目录「选配」
   - 配置浏览器兼容
   - 配置客户端启动服务的信息
   - 配置跨域代理：http-proxy-middleware
   - 配置 REM 响应式布局的处理：过程中 lib-flexible、postcss-pxtorem
   - 配置打包优化
   - ...
2. 准备一些项目开发必备的材料
   src/api/http.js：fetch 请求的二次封装
   src/assets：
   - reset.min.css 清除浏览器默认样式
   - images 静态资源图片
   - utils.js 自己封装的常用方法库
   - ...
3. 配置好 REM 响应式布局 && 样式处理
   lib-flexible 设置 REM 和 PX 换算比例的

   - 根据设备宽度的变化自动计算
   - html.style.fontSize=设备的宽度/10+'px';
   - 750 设计稿中 1REM=75PX : 初始换算比例
   - 375 设备上 1REM=37.5PX
     postcss-pxtorem 可以把我们写的 PX 单位，按照当时的换算比例，自动转换为 REM，不需要我们自己算了

   ***

   @1 假设设计稿还是 750 的，我们测出来多少尺寸，我们写样式的时候，就写多少尺寸，并且不需要手动转换为 REM「我们在 webpack 中，针对 postcss-pxtorem 做配置，让插件帮我们自动转换」
   const px2rem = require('postcss-pxtorem');
   px2rem({
   rootValue: 75, // 基于 lib-flexible,750 设计稿,就会设置为 1REM=75PX；此时在 webpack 编译的时候，我们也需要让 px2rem 插件，按照 1REM=75PX，把我们测出来的并且编写的 PX 样式，自动转换为 REM；
   propList: ['*'] // 对所有文件中的样式都生效{AntdMobile 组件库中的样式}
   })
   @2 在入口中，我们导入 lib-flexible，确保在不同的设备上，可以等比例的对 REM 的换算比例进行缩放！！
   @3 手动设置：设备宽度超过 750PX 后，不再继续放大！！

4. 配置路由管理
5. 配置 redux 架子
6. 其它的基础框架配置
7. 逐一开发项目，注意组件的抽离封装
8. 开发完毕后
   - 项目优化
   - 封装提取
   - 内部测试
   - 部署上线

知乎日报-后端 zhihu_admin
后端的数据接口分为两部分 + 从知乎日报官方实时拉取数据「新闻、新闻详情、新闻的评论数...」 + 自己研发的个人中心系统「登录/注册、发送验证码、个人信息获取和修改、收藏体系...」
后端技术栈： + Node、Express + 数据存储：我采用 json 文件的方式代替了专业的数据库存储「mongodb、MySQL」
如何启动和配置更改
@1 跑环境
@2 在 package.json 中，修改后端服务的配置项
"config": {
"server": 7100, //后端启动服务器的端口号
"secret": "ZFPX", //和 JWT 算法相关的
"maxAge": "7d"
}
@3 API.txt 接口文档
code.txt 存储发送的手机验证码
@4 启动后端
$ node server.js 终端窗口关闭，启动的服务器就会停止

---

$ pm2 start server.js --name ZHIHU 基于 pm2 持久管理服务
@5 验证后端是否启动成功
http://127.0.0.1:7100/news_latest 可以获取数据，则说明启动成功

=====================
React DOM-DIFF 算法
在 ReactV16 及以前：新老虚拟 DOM 对比
在 ReactV17 及以后：老的 DOM 会构建出 Fiber 链表，拿最新创建的虚拟 DOM 和 Fiber 链表做对比

1. 优化原则

   - 同级对比
   - 不同类型的元素,会产出不同的结构:销毁老结构,创建新结构
   - 可以通过 key 标识移动的元素

2. 原来和现在都只有一个节点
   如果不设置 key，则默认元素的“索引”就是 key
   key 和“类型”都相同：

   - 更新且复用老的节点 Update(4)

key 和“类型”只要有一个不同： + 删除老的 Deletion(8) + 插入新的 Placement(2)
插入并更新，也就是挪动位置：PlacementAndUpdate(6)

3. 原来多个节点，现在一个节点
   key 不同，继续向下比，当前标记为删除！！
   key 相同，遵循 2
   其余旧的节点全部标记为删除！！

4. 原来一个节点，现在多个节点
   key 不同，继续向下比，当前标记为新增！！
   key 相同，遵循 2
   其余新的节点全部标记为新增！！

5. 原来和现在都是多节点
   会经历二轮遍历

   - 第一轮：主要是处理节点的更新
   - 第二轮：主要处理节点的新增、删除和移动
   - 移动时的原则是尽量少量的移动，如果必须有一个要动，新地位高的不动，新地位低的动 lastPlacedIndex=0
   - key 不同退出第一轮循环
     例如：之前是 A/B/C/D/E/F 现在是 A/C/E/B/G
     第二轮遍历之前，会拿老的节点创建 map 对象，拿新的节点去老的节点中找相同 key 值进行比较！！
     最后渲染的时候，先执行标记为 8 的（也就是删除）、然后执行标记为 4 的（也就是更新）、然后是标记为 6 的（也就是移动）、最后是标记为 2 的（也就是新增）

6. 循环创建元素需要设置唯一的 key，不建议使用索引作为 key 值！！！
