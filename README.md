# pkg-placeholder

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

[npm-version-src]: https://img.shields.io/npm/v/pkg-placeholder?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/pkg-placeholder
[npm-downloads-src]: https://img.shields.io/npm/dm/pkg-placeholder?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/pkg-placeholder
[bundle-src]: https://img.shields.io/bundlephobia/minzip/pkg-placeholder?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=pkg-placeholder
[license-src]: https://img.shields.io/github/license/antfu/pkg-placeholder.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/antfu/pkg-placeholder/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/pkg-placeholder

## workspace

### 新增catalog依赖

1. 项目中执行 `corepack pnpm add -D eslint-plugin-react` 等待安装成功
2. 在 pnpm-workspace.yaml 中添加刚刚安装的依赖包和指明版本号如 `eslint-plugin-react: ^7.37.5`
3. 在 package.json 中对应包的版本号改为 `catalog:`，如 `"eslint-plugin-react": "catalog:",`

此时项目根路径已存在该依赖包，接下来只需要进入子项目安装依赖，就会默认使用根路径下的依赖包。

1. `cd playground/vite-react-ts/` 进入子项目目录
2. 执行 `corepack pnpm add -D eslint-plugin-react` 安装依赖

子项目的 package.json 中成功增加一项依赖 `"eslint-plugin-react": "catalog:",`

## 协同开发

在 packages 中开发库组件时，同时在 playground 的项目中引用并实时预览。目前暂时没有特别好的解决方案。唯一有可行性的方案是：

```javascript
// packages/pkg-other 为库项目
// playground/vite-react-ts 为预览项目，依赖库项目
//
// packages/pkg-other:
// pnpm build 打包
// playground/vite-react-ts 中
// package.json:
// "pkg-other": "workspace:*",
// vite.config.ts 中,以保证在pkg-other变更后，vite能热更新
// resolve: {
//   alias: {
//     "pkg-other": path.resolve(__dirname, '../../packages/pkg-other/src'),
//   }
// }
// 缺点是，pkg-other中的ts类型无法实时更新，类型变化后需要手动build，vite-react-ts才不会有ts报错
```
