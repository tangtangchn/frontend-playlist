# frontend-playlist
> HTML | CSS | Javascript

> Bootswatch -> free themes for Bootstrap -> https://bootswatch.com

> Vue.js

## Build Setup

```
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Vue项目发布到Github Pages步骤

```
# 手动写的Vue项目
直接将index.html上传至根目录

# 通过vue-cli创建的项目
1. 修改config/index.js里的assetsPublicPath字段，改为./
2. 打包, npm run build
3. 将生成的dist目录中的文件上传到仓库根目录master分支的docs目录下
4. 在github项目下的settings里设置：在GitHub Pages里选择master branch/docs folder，点击save按钮
5. 访问https://tangtangchn.github.io/_repository_name_
```
