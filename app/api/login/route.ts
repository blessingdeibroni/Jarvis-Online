import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.SITE_PASSWORD;

    if (!correctPassword) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    if (password !== correctPassword) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set("jarvis_auth", correctPassword, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Login failed:", err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}