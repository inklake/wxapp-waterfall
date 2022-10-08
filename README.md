微信小程序 瀑布流组件

## 实现原理

1. 双列瀑布流布局。
2. 每次插入一条数据，动态获取左右两列的高度。
3. 将下一条数据插入较短的一列。
4. 可以在前端获取图片的宽高，但尽量与后端协商获取图片的高宽，可大幅度提高性能。

## 小程序代码片段

> https://developers.weixin.qq.com/s/D5pyRRmO7eCh

## 文件夹结构

```
wxapp-waterfall
├─ components                   # 公用组件库
|  ├─ product                   # 商品列表组件
|  |  ├─ index.js
|  |  ├─ index.json
|  |  ├─ index.wxml
|  |  └─ index.wxss
│  └─ waterfall                 # 瀑布流组件
|     ├─ index.js
|     ├─ index.json
|     ├─ index.wxml
│     └─ lines.wxss
├─ index                        # 首页
|  ├─ index.js
|  ├─ index.json
|  ├─ index.wxml
|  └─ index.wxss
├─ utils                        # 工具库
|  └─ util.js
├─ .eslintrc.js
├─ app.js
├─ app.json
├─ app.wxss
├─ LICENSE
├─ project.config.json
├─ project.private.config.json
├─ README.md
└─ sitemap.json
```
