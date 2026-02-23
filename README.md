# 🪐 ONE DESK NOTE
### 快速记录灵感与碎片 — 极简 · 现代 · 纯净

ONE DESK NOTE 是一款专为捕捉瞬间灵感而设计的纯前端本地笔记系统。它利用浏览器原生能力，为您提供一个安全、私密且极具科技感的创作空间。

---

## ✨ 功能特性

* **🚀 极致速度**：基于 Vite 构建，零服务器延迟，秒级启动。
* **✍️ 沉浸式编辑**：支持加粗、斜体、下划线、删除线等富文本格式。
* **🖼️ 媒体集成**：支持直接插入图片，自动转为 Base64 格式持久化存储。
* **💾 本地存储**：数据存储在浏览器 `localStorage` 中，隐私不出本地。
* **📥 导入导出**：支持将笔记导出为 `.json` 文件。
* **🌑 科技感 UI**：深色主题，侧边栏毛玻璃特效，大面积留白。

---

## 🛠️ 技术栈

* **构建工具:** Vite
* **核心逻辑:** Vanilla JavaScript (ES6+)
* **样式表现:** CSS3 (Variables, Backdrop-filter)
* **存储方案:** LocalStorage API

---

## 📦 快速开始

1. **安装依赖**: `npm install`
2. **本地开发**: `npm run dev`
3. **生产构建**: `npm run build`

---

## 🚀 自动部署指南 (GitHub Pages)

本项目已集成 GitHub Actions。
1. 在 GitHub 仓库设置中，进入 **Settings > Pages**。
2. 在 **Build and deployment > Source** 处选择 **GitHub Actions**。
3. 每次 `git push origin main` 后，项目会自动更新到您的 GitHub Pages 网址。

---

## 📂 结构

- `src/main.js`: 核心交互
- `src/editor.js`: 编辑器控制
- `src/noteManager.js`: 数据持久化
- `src/style.css`: 科技感 UI
- `index.html`: 主入口

---
**ONE DESK NOTE** - *让每一滴灵感都有处可栖。*
