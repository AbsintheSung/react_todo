<h1 align="center">React-todoList</h1>
<div align="center" >
<a href="" >專案網址</a >
</div>

## 功能介紹
    
- 使用者可以 登入/註冊。
- 使用者登入後，可以添加、修改、刪除代辦事項。
- 此專案為針對並熟練 React 框架所做的。


## 專案使用

複製專案

```bash
  git clone 
```

進入專案

```bash
  cd 
```

安裝套件

```bash
  npm install
```

啟動專案

```bash
  npm run dev
```

---

## 資料夾結構 (Project Structure)
- `src/` - 主要的 React 程式碼
- `assets` - 主要放置 全局css樣式、圖片檔案
- `components/` - UI 元件
- `styles/` - style-components 的樣式設定
- `types/` - TypeScript 型別定義
- `page/` - 此專案有 登入、註冊、以及首頁，內部資料夾分別對應各router

```
.
├── public/
├── src/
│   ├── components/
│   ├── styles/
│   ├── types/
│   ├── pages/
│   │   ├── home/
│   │   ├── login/
│   │   ├── register/
│   ├── App.tsx
│   ├── main.tsx
│   ├── vite-env.d.ts
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts

```


---

<h2 align="start">前端技術</h2>

- **TypeScript**
- **React.js**
- **Vite.js**
- **styled-components**
- **Vercel (部署)**