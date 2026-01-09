import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export type GeocodeResponse =
  | { lat: number; lng: number; address: string }
  | { error: string };

export async function GET(request: Request): Promise<NextResponse<GeocodeResponse>> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
  }

  const apiKey = process.env.MAPBOX_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedQuery}.json?access_token=${apiKey}&limit=1`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Mapbox API error: ${response.status}`);
    }

    const data = await response.json();
    const feature = data?.features?.[0];

    if (!feature) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }

    const [lng, lat] = feature.center;
    const address = feature.place_name || query;

    return NextResponse.json({
      address,
      lat,
      lng,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error geocoding location:", error);

    return NextResponse.json({ error: "Failed to geocode location" }, { status: 500 });
  }
}
