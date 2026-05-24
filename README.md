# Warehouse Reservation System

A warehouse reservation system built using Next.js, TypeScript, and Tailwind CSS.

## Features

- View products
- Select multiple products
- Reservation countdown timer
- Confirm reservation
- Cancel reservation
- Auto expiration after 60 seconds
- API routes using Next.js App Router

---

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- React

---

## API Routes

### Get Products

```bash
GET /api/products
```

Returns list of products.

---

### Get Warehouses

```bash
GET /api/warehouses
```

Returns list of warehouses.

---

### Create Reservation

```bash
POST /api/reservations
```

Creates reservation.

Returns:

- `200` Success
- `409` Not enough stock

---

### Confirm Reservation

```bash
POST /api/reservations/:id/confirm
```

Confirms reservation.

Returns:

- `200` Success
- `410` Reservation expired

---

### Release Reservation

```bash
POST /api/reservations/:id/release
```

Cancels reservation and releases stock.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/warehouse-reservation-system.git
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## Folder Structure

```bash
app/
 ├── api/
 │    ├── products/
 │    ├── reservations/
 │    └── warehouses/
 │
 ├── reservation/
 │    └── [id]/
 │
 ├── layout.tsx
 └── page.tsx
```

---

## Author

Lakshana
