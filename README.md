# cra-mobx

## 介绍

* 用 [create-react-app](https://github.com/facebook/create-react-app) 创建
* 用 [react-app-rewired](https://github.com/timarney/react-app-rewired) 修改配置
* 配置了 mobx, less

### 目录结构

。。。

## 使用说明

### 下载依赖

`npm install`

### 运行

`npm start`

### 设置接口代理

设置 package.json 添加 `proxy`

```js
{
  name: 'cra-mobx',
  ...
  "proxy": {
    "/api": {
      "target": "http://localhost:3001",
      "changeOrigin": true
    }
  }
}
```

### 构建

`npm run build`

### 跑生产

`npm run prod`

<!--
### Docker 部署

`sh ./startup-code.sh`
 -->

#### 详细文档 请看[CRA-README.md](./CRA-README.md)

#### 开发时，一些代码的注意事项 请看[mark.md](./mark.md)
