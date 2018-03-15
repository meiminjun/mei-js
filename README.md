# 说明文档

> npm run start

## 下载依赖

npm i webpack babel-loader babel-core babel-preset-env webpack-merge -S

## 升级webpack4

将module 中的loaders 改成 rules

否则会报：

``` bash
Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.
 - configuration.module has an unknown property 'loaders'. These properties are valid:
   object { exprContextCritical?, exprContextRecursive?, exprContextRegExp?, exprContextRequest?, noParse?, rules?, defaultRules?, unknownContextCritical?, unknownContextRecursive?, unknownContextRegExp?, unknownContextRequest?, unsafeCache?, wrappedContextCritical?, wrappedContextRecursive?, wrappedContextRegExp?, strictExportPresence?, strictThisContextOnImports? }
   -> Options affecting the normal modules (`NormalModuleFactory`).
```