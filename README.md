
CODE TAG(记录变量命名)
================
  

USAGE dev
=========
// 确保node环境已安装

git clone xxx

npm install

npm run dev

Dev
===
Client 文件目录结构:
```js
├── api // 前端请求集合
├── assets // 静态目录存放
├── components // 前端业务无关组件
├── data // 数据存储
├── pages // 前端业务组件
├── utils // 业务无关单元逻辑
├── server // 后端服务
│   ├── db // 数据库链接
│   ├── routes // 请求路由
```
ToDo List
=========

- [ ] 接入翻译API，输入单词自动翻译
- [x] 新增tag弹窗内容
- [x] tag出现动画处理
- [ ] 帐号权限体系
- [x] 点击tag出现功能框
  - [ ] 删除
  - [ ] 编辑
  - [x] 搜索
- [ ] github入口
- [ ] Quick Search快捷搜索
- [ ] 请求生命周期流程优化
- [ ] 后端数据校验方案
- [x] logo替换 => \<code tag \/\>
- [ ] 引入模块module概念
