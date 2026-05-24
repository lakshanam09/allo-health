import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {

  const params = await context.params;

  return NextResponse.json({
    message: `Reservation ${params.id} confirmed`,
  });

}