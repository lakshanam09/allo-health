import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    products: [
      {
        id: 1,
        name: "Laptop",
      },
      {
        id: 2,
        name: "Mobile",
      },
      {
        id: 3,
        name: "Keyboard",
      },
    ],
  });
}