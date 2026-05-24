import { NextResponse } from "next/server";

const products = [
  {
    id: 1,
    name: "Laptop",
    stock: 5,
  },
];

type Reservation = {
  id: number;
  productId: number;
  warehouseId: number;
  quantity: number;
};

const reservations: Reservation[] = [];

// Store processed idempotency keys
const idempotencyStore = new Map();

export async function POST(req: Request) {

  const body = await req.json();

  // Read Idempotency-Key header
  const idempotencyKey =
    req.headers.get("Idempotency-Key");

  // If same key already used,
  // return old response
  if (
    idempotencyKey &&
    idempotencyStore.has(idempotencyKey)
  ) {
    return NextResponse.json(
      idempotencyStore.get(idempotencyKey)
    );
  }

  const { productId, warehouseId, quantity } = body;

  const product = products.find(
    (p) => p.id === productId
  );

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  // 409 Conflict Check
  if (product.stock < quantity) {
    return NextResponse.json(
      { error: "Not enough stock" },
      { status: 409 }
    );
  }

  // Reduce stock
  product.stock -= quantity;

  const reservation: Reservation = {
    id: reservations.length + 1,
    productId,
    warehouseId,
    quantity,
  };

  reservations.push(reservation);

  // Save response
  const response = {
    success: true,
    data: reservation,
  };

  // Store response using idempotency key
  if (idempotencyKey) {
    idempotencyStore.set(
      idempotencyKey,
      response
    );
  }

  return NextResponse.json(response);
}