import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// If SERVER_URL is missing in .env.local, use the local Express server
const SERVER_URL = process.env.SERVER_URL || "http://127.0.0.1:5000";

async function handler(req, { params }) {
  const { path } = params;
  const search = new URL(req.url).search;
  const target = `${SERVER_URL}/api/${path.join("/")}${search}`;

  // read the HTTPOnly cookie on the server and pass it to Express
  const token = req.cookies.get("studio_token")?.value;
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const options = { method: req.method, headers, cache: "no-store" };
  if (req.method !== "GET" && req.method !== "HEAD") {
    options.body = await req.text();
  }

  try {
    const response = await fetch(target, options);
    const text = await response.text();
    return new NextResponse(text, {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // the real reason is printed in the CLIENT terminal (helps debugging)
    const reason = error?.cause?.code || error?.message || "unknown error";
    console.error("[proxy] Cannot reach Express server:", target, "->", reason);
    return NextResponse.json({ message: "Cannot reach the server. Please try again." }, { status: 502 });
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };