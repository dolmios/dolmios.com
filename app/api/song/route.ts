import { NextResponse } from "next/server";

export type SongData = {
  artist: string;
  coverUrl: string;
  name: string;
  url: string;
};

export const dynamic = "force-dynamic";

const truncate = (str: string, maxLength: number): string =>
  str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;

export async function GET(): Promise<NextResponse<SongData | { error: string }>> {
  const apiKey = process.env.SCROBBLER_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=dolmios&api_key=${apiKey}&format=json&limit=1`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Last.fm API error: ${response.status}`);
    }

    const data = await response.json();
    const track = data?.recenttracks?.track?.[0];

    if (!track) {
      return NextResponse.json({ error: "No recent tracks found" }, { status: 404 });
    }

    const artist = track.artist["#text"] || "";
    const name = track.name || "";
    const coverUrl = track.image?.[3]?.["#text"] || "";
    const url = track.url || "";

    return NextResponse.json({
      artist: truncate(artist, 25),
      coverUrl,
      name: truncate(name, 25),
      url,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching song:", error);

    return NextResponse.json({ error: "Failed to fetch song data" }, { status: 500 });
  }
}
