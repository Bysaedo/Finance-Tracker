Personal Finance Tracker (Nuxt, Vue, Supabase, TypeScript)

A full-stack personal finance tracking application that allows users to securely log income and expenses, categorize transactions, visualize financial history, and analyze spending trends over time.

Built with **Nuxt 4, Vue 3, Supabase (Postgres), TypeScript, Tailwind CSS, and Chart.js**.

---

Features:

Secure Authentication
- Email + password authentication (Supabase Auth)
- Row-Level Security policies to protect user data
- Only the signed-in user can access their own transactions

Transaction Management (CRUD)
- Add income & expense transactions
- Optional description, category, and date fields
- Edit & delete records
- Client-side validation and error handling

Data Visualization & Insights
- Monthly income vs expense line chart
- Category spending breakdown pie chart
- Summary cards showing:
  - Total Income
  - Total Expenses
  - Net Balance

Filtering & Sorting
- Filter by:
  - Transaction type (income / expense)
  - Category
  - Time period (month / year / all-time)
- Sort by:
  - Date
  - Amount
  - Asc / Desc order

Responsive UI
- Mobile-first layout
- Clean dashboard style
- Built with Tailwind CSS

---

Tech Stack

**Frontend**
- Nuxt 4
- Vue 3 (Composition API)
- TypeScript
- Tailwind CSS
- Chart.js

**Backend / Database**
- Supabase (PostgreSQL)
- Supabase Auth
- Row-Level Security (RLS)
- Policies to isolate user data

**Other Tools**
- Vite
- ESLint
- Vercel Deployment

---

Database Schema (Supabase)

Table: `transactions`

| Column       | Type      | Notes |
|-------------|---------|------|
| id          | uuid (PK) | Auto-generated |
| user_id     | uuid | References `auth.users` |
| amount      | numeric | Positive or negative |
| type        | text | `income` or `expense` |
| category    | text | Optional |
| description | text | Optional |
| date        | timestamptz | Stored in UTC |
| created_at  | timestamptz | Default now() |

Row-level security ensures users can only:

- read their own transactions  
- insert rows tied to their user id  
- delete only their own data  

---

Running Locally

Clone repo and install dependencies:

```bash
npm install
```

Add environment variables in `.env`:

```bash
NUXT_SUPABASE_URL=
NUXT_SUPABASE_ANON_KEY=
```

Start dev server:

```bash
npm run dev
```

---

Deployment

This project is deployed on **Vercel** with Supabase as a managed backend.

Production build:

```bash
npm run build
```

Preview locally:

```bash
npm run preview
```

---

Author

**Sebastian Aedo Vidal**  
Waukesha, WI  
GitHub: github.com/Bysaedo  
LinkedIn: linkedin.com/in/sebastian-aedo-vidal

