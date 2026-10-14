
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { message: "Not found" },
      { status: 404 }
    );
  }

  try {
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      success: true,
      message: "Endiz database connection successful.",
    });
  } catch (error) {
    console.error("DATABASE HEALTH CHECK ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed.",
      },
      { status: 500 }
    );
  }
}
