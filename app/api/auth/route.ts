import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const correctPassword = process.env.DVA_ACCESS_PASSWORD;

  if (!correctPassword) {
    return NextResponse.json(
      { message: "Server-Konfigurationsfehler: DVA_ACCESS_PASSWORD fehlt." },
      { status: 500 },
    );
  }

  if (password !== correctPassword) {
    return NextResponse.json(
      { message: "Falsches Passwort." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("dva-auth", "authenticated", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return response;
}
