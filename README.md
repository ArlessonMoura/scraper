# 🛒 Amazon Scraping Project

![Bun](https://img.shields.io/badge/Runtime-Bun-%23000000?logo=bun&logoColor=white)
![Express](https://img.shields.io/badge/Backend-Express-blue?logo=express)
![Vite](https://img.shields.io/badge/Frontend-Vite-%23646CFF?logo=vite&logoColor=yellow)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📌 Project Description

This project allows you to search for products on Amazon using a keyword. It consists of:

- ⚙️ **Backend**: Bun + Express API that scrapes Amazon using `axios` and `jsdom`.
- 🖥️ **Frontend**: Simple web page built with Vite, HTML, CSS, and plain JavaScript, consuming the API and displaying results.

---

## 📂 Project Structure

```
.
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── controller/
│   │   │   └── scraperController.ts
│   │   ├── middlewares/
│   │   │   └── keywordCheck.ts
│   │   ├── model/
│   │   │   └── scraperModel.ts
│   │   ├── routes/
│   │   │   └── scraperRoutes.ts
│   │   └── service/
│   │       └── scraperService.ts
│   ├── .gitignore
│   ├── bun.lockb
│   ├── config.ts
│   ├── index.ts
│   ├── package.json
│   ├── tsconfig.json
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── main.js
│   │   └── style.css
│   ├── .gitignore
│   ├── bun.lockb
│   ├── index.html
│   ├── package.json
│   └── README.md
```

---

## 🔄 System Flow (Diagram)

```txt
         👤 User
           │
           │ (1) enters keyword + clicks "Search"
           ▼
    🌐 Frontend (Vite + JS)
           │
           │ (2) sends GET /api/scrape?keyword=...
           ▼
 ⚙️ Backend (Bun + Express + Axios + JSDOM)
           │
           │ (3) scrapes Amazon results page
           ▼
     🛒 Amazon Website
           │
           │ (4) returns HTML data
           ▼
 ⚙️ Backend parses data → JSON response
           │
           │ (5) returns products (title, rating, reviews, image)
           ▼
    🌐 Frontend renders product list
           │
           ▼
         👤 User sees formatted results
```

---

## 🚀 Quick Links

- 📂 [Backend Setup](#️-backend)
- 🖥️ [Frontend Setup](#-frontend)
- 🔗 [API Endpoint](#-endpoint)
- ⚠️ [Notes](#️-notes)

---

## 🚀 How to Run the Project

Clone the repository:

```bash
git clone git@github.com:ArlessonMoura/scraper.git
```

### ✅ Prerequisites

- [Bun](https://bun.sh) must be installed.

---

## ⚙️ Backend

### 📥 Installation

- Navigate to the backend folder:

```bash
cd backend
```

- Install dependencies:

```bash
bun install
```

### ▶️ Execution

Run normally:

```bash
bun run index.js
```

Or with **hot reload**:

```bash
bun dev
```

📡 The backend will be available at: `http://localhost:3000`

---

### 🔗 Endpoint

- **GET /api/scrape?keyword=YOUR_KEYWORD**
  Returns products in JSON format, including:

  - 🏷️ `title` — product title
  - ⭐ `rating` — rating (1 to 5 stars)
  - 📝 `reviews` — number of reviews
  - 🖼️ `image` — product image URL

---

## 🎨 Frontend

### 📥 Installation

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
bun install
```

### ▶️ Execution

```bash
bun dev
```

🌐 The frontend will run at the address shown in the terminal (usually `http://localhost:5173`).

---

### ✨ Features

- 🔎 Input field to type a keyword.
- 📤 "Search" button to trigger scraping.
- 📋 Display of formatted product results:

  - 🖼️ Image
  - 🏷️ Title
  - ⭐ Rating and reviews

---

## ⚠️ Notes

- 🚧 Amazon may block automated requests in production. For real-world usage, consider proxies or official APIs.
- 📝 All files contain comments explaining the implementation logic.

---
