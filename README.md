
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
├── server // 后端服务
│   ├── db // 数据库链接
│   ├── routes // 请求路由
```
ToDo List
=========

- [ ] 接入翻译API，输入单词自动翻译
- [x] 新增tag弹窗内容
- [ ] tag出现动画处理
- [ ] 帐号权限体系
- [ ] 点击tag出现功能框
  - [ ] 删除
  - [ ] 编辑
  - [ ] Copy
- [ ] github入口
- [ ] Quick Search快捷搜索
- [ ] 请求生命周期流程优化
- [ ] logo替换 => \<code tag \/\>
