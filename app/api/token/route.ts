import { AccessToken } from "livekit-server-sdk";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("jarvis_auth");
    const correctPassword = process.env.SITE_PASSWORD;

    if (!correctPassword || !authCookie || authCookie.value !== correctPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      return NextResponse.json({ error: "Missing LiveKit credentials" }, { status: 500 });
    }

    const token = new AccessToken(apiKey, apiSecret, {
      identity: "Blessing",
    });

    token.addGrant({
      room: "jarvis-room",
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      roomCreate: true,
    });

    return NextResponse.json({ token: await token.toJwt() });
  } catch (err) {
    console.error("Token generation failed:", err);
    return NextResponse.json({ error: "Failed to generate token" }, { status: 500 });
  }
}