# Personal Blog

A minimalist personal blog built with **Express.js** and **TypeScript**. Create, read, update, and delete articles with protected authentication.

## 🚀 Features

- **RESTful API** for managing articles
- **Authentication** on admin endpoints
- **JSON file-based storage** (no database required)
- **Reusable article service** for reading and writing
- **HTML interface** to view individual articles
- **Admin panel** for content management (protected with middleware)

## 📋 Requirements

- **Node.js** 18+
- **pnpm** (package manager)

## 🔧 Installation

```bash
# Install dependencies
pnpm install
```

## 📁 Project Structure

```
Personal Blog/
├── src/
│   ├── index.ts              # Main Express server
│   ├── articleService.ts     # Article management logic
│   └── auth.ts               # Authentication middleware
├── articles/                 # Article storage (JSON files)
├── public/                   # Static files (HTML, CSS)
├── package.json
├── tsconfig.json
└── README.md
```

## 📝 Endpoints

### Public

| Method | Endpoint         | Description                                |
| ------ | ---------------- | ------------------------------------------ |
| `GET`  | `/api/articles`  | Get all articles                           |
| `GET`  | `/article/:slug` | View individual article with rendered HTML |

### Admin (require authentication)

| Method   | Endpoint              | Description        |
| -------- | --------------------- | ------------------ |
| `GET`    | `/admin`              | Admin panel        |
| `POST`   | `/admin/articles`     | Create new article |
| `DELETE` | `/api/articles/:slug` | Delete article     |

## 🔐 Authentication

Admin endpoints are protected with the `authMiddleware`. Make sure to implement authentication logic in `src/auth.ts`.

## 📄 Article Format

Articles are stored as JSON files in the `articles/` folder:

```json
{
  "slug": "my-first-article",
  "title": "My First Article",
  "date": "2025-12-23",
  "content": "Article content goes here..."
}
```

**File name**: `{slug}.json`

## ▶️ Running the Server

```bash
# Start the server
pnpm run start
```

The server will be available at `http://localhost:3000` (or the port specified in `PORT` environment variable).

## 🛠️ Development

```bash
# Install dev dependencies (TypeScript, ts-node, etc.)
pnpm install -D

# Run in development mode (if configured in package.json)
pnpm run dev
```

## 📦 Main Dependencies

- **express** - Web framework
- **@types/express** - TypeScript types for Express
- **@types/node** - TypeScript types for Node.js
- **typescript** - TypeScript language
- **tsx** - TypeScript executor

## 📝 Notes

- Articles are stored locally as JSON files
- The `articles/` folder must exist before running the application
- You can serve static files from the `public/` folder (HTML, CSS, etc.)
- Make sure to properly configure the authentication middleware
