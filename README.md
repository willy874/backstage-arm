# Poseidon-Backstage

## Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

## Information

- 本專案採用 SPA 架構

## Plugins

- API 套件：[Axios](https://www.npmjs.com/package/axios)
- CSS 套件：[Bootstrap Vue](https://bootstrap-vue.org/)
- 資料驗證套件：[Validate.js](https://validatejs.org/)
- 伺服器框架：[Express](https://expressjs.com/)

## Introduction

## Auto Tool

本專案內包含自動化工具

### 索引產生工具

於 `./auto/create-index/index.js` 可設定哪幾個資料夾要產生**index module**，可於專案鍵入指令:
可於專案鍵入指令:

```
npm run index
```

### Model 產生工具

於 `./auto/model/config.js` 可設定輸出檔案的資料夾位置，專案啟動後要把**overwrite**更改為**false**。
相關**Model**基礎設定於 `./src/models/schema` 內來進行調整。
可於專案鍵入指令:

```
npm run model
```

### SVG 產生工具

於 `./auto/model/config.js` 可設定輸入輸出檔案的資料夾位置。可以將 SVG 轉為 JS 檔案供**Icon Component**使用。
要注意是否有多餘向量，否則產生的圖案會有形狀上的缺陷。

```
npm run svg
```

### API 模擬伺服器

當後端未完成時，可使用該模擬的**JSON SERVER**，可運行**RestfulAPI**各規範方法。

```
npm run app
```
