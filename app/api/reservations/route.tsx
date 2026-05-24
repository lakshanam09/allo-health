import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    message: "Warehouse reserved successfully",
    reservationId: Date.now(),
  });
}