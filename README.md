# easyui_style
## 一.导入样式文件    

##### │ index.css ---------------- 框架样式
##### │ index.css.map
##### │ index.less
##### │ initEasyui.css------------ 可以直接删除easyui.css用此样式文件代替
##### │ initEasyui.css.map
##### │ initEasyui.less
##### │ layout.css--------------- 替换l公共样式内容
##### │ layout.css.map
##### │ layout.less
##### │ resetEasyui.css---------- 样式初始化,及一些特殊情况样式
##### │ resetEasyui.css.map
##### │ resetEasyui.less
##### │
##### ├─images------------------ 样式中需要的图片文件
##### │
##### └─ style_js
#####     moveHtml.js------------ 一些JS函数

### 容器命名遵循下表:

| 容器类型       | 类名         | id       |
| -------------- | ------------ | -------- |
| 页面最外层容器 | cont-area    |          |
| 面包屑导航容器 |              | crumbs   |
| 搜索条件栏容器 | query-cond   |          |
| 功能按钮容器   |              | tb       |
| 表格容器       | tableWrapper |          |
| 表格           |              | dg / dg1 |
| 表单           | edit_form    |          |

表格的自动扩大或缩小属性被默认设置为开启,表格会自动填充100% ，如果碰过表格列数较多的,可自行设置 fitColumns 为 false,此时代码中width所对应的数字就是px, 
