import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;

  return NextResponse.json({
    message: `Reservation ${params.id} released`,
  });
}