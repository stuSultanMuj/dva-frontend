import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { message: "Server-Konfigurationsfehler: N8N_WEBHOOK_URL fehlt." },
      { status: 500 },
    );
  }

  try {
    const { chatInput, sessionId } = await req.json();

    if (!chatInput || typeof chatInput !== "string") {
      return NextResponse.json(
        { message: "Bitte gib eine Frage ein." },
        { status: 400 },
      );
    }

    const n8nResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatInput, sessionId: sessionId ?? "anonymous" }),
    });

    if (!n8nResponse.ok) {
      console.error(
        "n8n error:",
        n8nResponse.status,
        await n8nResponse.text(),
      );
      return NextResponse.json(
        {
          message:
            "Der Agent ist momentan nicht erreichbar. Bitte versuche es in einer Minute erneut.",
        },
        { status: 502 },
      );
    }

    const data = await n8nResponse.json();
    return NextResponse.json({ output: data.output });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { message: "Ein unerwarteter Fehler ist aufgetreten." },
      { status: 500 },
    );
  }
}
