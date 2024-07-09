This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## create-next-app
```bash
// 创建项目
npx create-next-app demo
```


## prisma使用
```bash
# 初始化数据库
npx prisma init --datasource-provider sqlite

# 创建本地数据库
npx prisma db push
```

## action
参考：https://github.com/actions/starter-workflows/blob/main/pages/nextjs.yml

## 样式
可以使用tailwindcss/style/less

## 问题
### 1. 无法处理less
解决：
```bash
npm install next-plugin-antd-less --dev
```
在 next.config.mjs 中添加
```js
import withAntdLess from 'next-plugin-antd-less';
export default withAntdLess(nextConfig);
```

### 2. 存储token
要实现token存储，可参考：
https://github.com/shi-gui/react-admin-template/blob/master/src/utils/store.ts