import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json({ error: "Latitude and longitude parameters are required" }, { status: 400 });
  }

  const apiKey = process.env.MAPBOX_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const width = 300;
    const height = 200;
    const zoom = 12;
    const style = "light-v11";

    const mapboxUrl = `https://api.mapbox.com/styles/v1/mapbox/${style}/static/pin-s+000000(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}@2x?access_token=${apiKey}`;

    const response = await fetch(mapboxUrl, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Mapbox API error: ${response.status}`);
    }

    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error generating static map:", error);

    return NextResponse.json({ error: "Failed to generate map" }, { status: 500 });
  }
}
