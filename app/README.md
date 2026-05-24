# Reservation System

## Features

- Product listing API
- Warehouse API
- Reservation API
- Reservation confirmation
- Reservation release
- Concurrency-safe stock reservation
- Frontend with live countdown timer
- 409 and 410 error handling

---

## Concurrency Handling

The reservation endpoint checks stock before creating a reservation.

When two requests try to reserve the last available unit simultaneously:

- The first request succeeds
- The second request receives a 409 Conflict response

Stock is reduced immediately after successful reservation to prevent overselling.

---

## Reservation Expiry Approach

This project uses a lazy cleanup approach for reservation expiry.

Each reservation has an expiration timer.

When a user tries to confirm an expired reservation:

- The API checks whether the reservation has expired
- If expired, the reservation is released automatically
- Reserved stock is returned back to available inventory
- The API returns:

```json
{
  "error": "Reservation expired"
}
```

with HTTP status:

```txt
410 Gone
```

This approach avoids the need for background workers or cron jobs while still ensuring expired reservations do not permanently consume stock.

## Idempotency Support (Bonus)

The reservation endpoint supports idempotency using the `Idempotency-Key` request header.

When a request is received:

- The server checks whether the same key was already processed
- If found, the original response is returned
- Duplicate reservations are prevented
- Stock is reduced only once

This ensures safe retries when network failures or client retries occur.

## Tech Stack

- Next.js App Router
- TypeScript
- React
- Next.js API Routes

Optional technologies like Prisma, Redis, Zod, and Tailwind were not used in this implementation.
# Inventory Reservation System

## Features
- User authentication
- Inventory management
- Reservation system

## Tech Stack
- React
- Node.js
- Express
- MongoDB

## Installation
npm install

## Run
npm start

## Live Demo
<deployment-link>

## GitHub Repository
<repo-link>