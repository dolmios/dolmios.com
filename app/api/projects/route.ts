import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.error("Missing Supabase environment variables:", {
      hasAnonKey: !!anonKey,
      hasUrl: !!url,
    });

    return NextResponse.json(
      { error: "Missing SUPABASE_URL or SUPABASE_ANON_KEY. Please set up your environment variables." },
      { status: 500 },
    );
  }

  const endpoint = `${url}/rest/v1/open_projects?select=*`;

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      const text = await res.text();

      return NextResponse.json(
        { error: `Supabase error: ${text || res.statusText}` },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
