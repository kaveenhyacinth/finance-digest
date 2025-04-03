# Finance Digest

Finance Digest is a full-stack web application built using **Next.js** (Frontend) and **Express.js** (Backend) that
displays finance news articles from two sources: Finnhub API and user-generated content. The app is responsive,
user-friendly, and meets the requirements specified in the Full Stack Assessment.

## 🧠 Features

- Fetches general finance news from the [Finnhub API](https://finnhub.io/docs/api/market-news)
- Allows users to create their own news posts
- Posts are tagged by source: `Finnhub` or `Blott`
- Clickable headlines redirect to external articles
- Fully responsive UI built based on the provided Figma design
- Pagination for browsing articles efficiently
- Graceful error handling for API failures
- Backend powered by Express.js and CockroachDB (RDBMS)
- RESTful API with modular structure and error handling
- Authentication for sensitive operations

---

## 💡 Optimization Discussion

Currently, the feed consists of a maximum of 200 posts — 100 from the Finnhub API and 100 from Blott. Since this is a
relatively small dataset, the application performs well with the current implementation:

``` ts
const finnhubPosts = await findAllFinnhubPosts();
const blottPosts = await findAllBlottPosts();

const feed = [...blottPosts, ...finnhubPosts];
const sortedFeed = feed.sort(
  (a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime(),
);

const paginatedFeed = sortedFeed.slice(offset, offset + size);
```

However, for improved scalability and performance, especially if the number of Finnhub articles increases in the future,
a better approach would be to:

### 🧠 Suggested Optimization

- Implement a caching layer (e.g., Redis) to temporarily store Finnhub API responses.
- Schedule a cron job to fetch and persist Finnhub news into the database (e.g., every hour or every 30 minutes).
- This would reduce dependency on real-time API calls, lower latency, and protect against rate limits or API downtime.
- By persisting Finnhub articles in the database:
- Sorting, filtering, and paginating the unified feed becomes more efficient.

It allows to implement advanced features like search, trending topics, or analytics.

This optimization isn't necessary for the current scale but is highly recommended for production-level readiness and
long-term maintainability.

---

## 🌐 Live URLs

- WEB: https://finance-digest.khprojects.xyz
- REST API: https://finance-digest-api.khprojects.xyz (/api/posts - public)
    - [Postman collection](https://drive.google.com/file/d/16COFN06emudF3xKMgN4t-d6gRVByJJ8W/view?usp=sharing)

---

## 🛠️ Tech Stack

### Frontend

- [Next.js](https://nextjs.org/)
- [HeroUI](https://www.heroui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- Axios / Aspida / Zustand

### Backend

- [Express.js](https://expressjs.com/)
- [CockroachDB](https://www.cockroachlabs.com/)
- [Prisma](https://www.prisma.io/)
- [Firebase Storage](https://firebase.google.com/docs/storage)

### Other

- API Source: Finnhub API
- Hosting & Monitoring: AWS EC2 & PM2

---

## 📁 Project Structure

```
finance-digest/
├── api/  # Express.js backend
├── client/  # Next.js frontend
```

---

## ✅ Development Checklist

### Core Features

- [x] Display Finnhub news with proper tags
- [x] User-generated posts with Blott tags
- [x] External links for articles
- [x] Responsive UI (Figma-based)
- [x] Error handling for failed API requests
- [x] Pagination (Frontend: infinite scroll, Backend: offset-based pagination)
- [x] Express backend with relational database
- [x] Modular backend with controllers/services
- [x] Migrations for DB schema

### Bonus Features

- [x] Basic authentication for post creation/edit
- [ ] Unit tests for key API routes
- [x] Project deployment (AWS)

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 22.x
- PostgreSQL or another supported SQL database
- `pnpm` v9.12.3

### 1. Clone the repository

```bash
  git clone git@github.com:kaveenhyacinth/finance-digest.git
  cd finance-digest
```

### 2. Install Dependencies

```bash
  pnpm install
```

### 3. Setup Environment Variables

  ```bash
    cd api
    cp .env.example .env
    
    cd client
    cp .env.example .env
    
    # Please contact for env variables
  ```

### 4. Start Development Servers

```bash
  cd api
  pnpm run dev
  
  cd client
  pnpm run dev
```

---

MIT © Kaveen Hyacinth