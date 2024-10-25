import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch("https://api.openfort.xyz/iam/v1/oauth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENFORT_SECRET_KEY}`,
    },
    body: JSON.stringify({
      provider: "telegramMiniApp",
      enabled: true,
      botToken: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN,
    }),
  });

  return NextResponse.json(await response.json());
}