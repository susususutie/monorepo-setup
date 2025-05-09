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

packages 新增一项子包后，需要先在 pnpm-workspace.yaml 的 catalog 中添加依赖包和指明版本号如 `react: ^19.1.0`，再更改根路径下 package.json 中添加依赖`"react": "catalog:"`，然后在根目录执行` pnpm install` 安装依赖，最后才可在子包的 `package.json` 中添加依赖并使用。

## 协同开发

在 packages 中开发库组件时，同时在 playground 的项目中引用并实时预览。目前暂时没有特别好的解决方案。唯一有可行性的方案是：

```javascript
// packages/pkg-other 为库项目
// playground/react-ts 为预览项目，依赖库项目
//
// packages/pkg-other:
// pnpm build 打包
// playground/react-ts 中
// package.json:
// "pkg-other": "workspace:*",
// vite.config.ts 中,以保证在pkg-other变更后，vite能热更新
// resolve: {
//   alias: {
//     "pkg-other": path.resolve(__dirname, '../../packages/pkg-other/src'),
//   }
// }
// 缺点是，pkg-other中的ts类型无法实时更新，类型变化后需要手动build，react-ts才不会有ts报错
```
