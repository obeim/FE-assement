# How to Run the App

## 1. Setup: Environment Variables & Database

### For the API (`/api`)
- **Create a `.env` file** inside the `api` directory.
    - Make sure it has the correct database URL and any other required environment variables for your backend (API).
    - Example:
      ```env
      DATABASE_URL="your_database_connection_string"
      ```

### For the Web (`/web`)
- **Create a `.env` file** inside the `web` directory.
    - At least set the backend API URL:
      ```env
      NEXT_PUBLIC_API_URL="http://localhost:your_api_port"
      ```
    - Adjust as needed for your setup.

---

## 2. Set Up the Database with Prisma

In the `api` directory, run:

```bash
npx prisma generate
npx prisma migrate deploy
```

---

## 3. Running the App in Development Mode

**From the root directory:**

```bash
pnpm run dev
# OR
npm run dev
```

- This starts both the API and Web apps in development mode (check your scripts and ports).

---

## 4. Build & Run in Production

To build for production and run both API and Web:

```bash
pnpm run build:api        # or npm run build:api

pnpm run build:web        # or npm run build:web 

pnpm run start            # or npm run start
```

---

## Summary Table

| Step         | Directory | Command(s)                           | Notes                        |
|--------------|-----------|--------------------------------------|------------------------------|
| Env setup    | api/      | create `.env`                        | Set DB URL, etc.             |
| Env setup    | web/      | create `.env`                        | Set backend API URL          |
| Prisma/DB    | api/      | `npx prisma generate`, `npx prisma migrate deploy` | DB migration/setup           |
| Dev start    | root      | `pnpm run dev` or `npm run dev`      |                              |
| Production   | api/      | `pnpm build` or `npm run build`      | Build backend                |
| Production   | web/      | `pnpm build` or `npm run build`      | Build frontend               |
| Production   | root      | `pnpm run start` or `npm run start`  | Run both in production       |

---
