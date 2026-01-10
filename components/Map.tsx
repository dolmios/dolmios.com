"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState, type JSX } from "react";

import type { GeocodeResponse } from "@/app/api/mapbox/geocode/route";

import "mapbox-gl/dist/mapbox-gl.css";

type MapProps = {
  location: string;
};

export function Map({ location }: MapProps): JSX.Element | null {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) {
      setIsLoading(false);
      setError("No location provided");

      return;
    }

    const initializeMap = async (): Promise<void> => {
      try {
        // Get coordinates from geocode API
        const geocodeResponse = await fetch(
          `/api/mapbox/geocode?q=${encodeURIComponent(location)}`,
        );

        if (!geocodeResponse.ok) {
          const errorData = await geocodeResponse.json().catch(() => ({}));

          setError(errorData.error || "Failed to geocode location");
          setIsLoading(false);

          return;
        }

        const geocodeData: GeocodeResponse = await geocodeResponse.json();

        if ("error" in geocodeData) {
          setError(geocodeData.error);
          setIsLoading(false);

          return;
        }

        // Get API key from environment (needs to be exposed as NEXT_PUBLIC_MAPBOX_API_KEY)
        const apiKey = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

        if (!apiKey) {
          setError("Mapbox API key not configured");
          setIsLoading(false);

          return;
        }

        // Initialize map
        mapboxgl.accessToken = apiKey;

        if (map.current) {
          map.current.remove();
        }

        const container = mapContainer.current;

        if (!container) {
          setError("Map container not available");
          setIsLoading(false);

          return;
        }

        map.current = new mapboxgl.Map({
          attributionControl: false,
          center: [geocodeData.lng, geocodeData.lat],
          container,
          style: "mapbox://styles/mapbox/light-v11",
          zoom: 12,
        });

        // Add marker
        new mapboxgl.Marker({
          color: "#000000",
        })
          .setLngLat([geocodeData.lng, geocodeData.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`<strong>${geocodeData.address}</strong>`),
          )
          .addTo(map.current);

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

        setIsLoading(false);
        setError(null);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Error initializing map:", err);
        setError(err instanceof Error ? err.message : "Failed to load map");
        setIsLoading(false);
      }
    };

    initializeMap();

    // Cleanup
    return (): void => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [location]);

  return (
    <div
      style={{
        borderRadius: "8px",
        height: "100%",
        minHeight: "200px",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}>
      {isLoading && (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            height: "100%",
            inset: 0,
            justifyContent: "center",
            position: "absolute",
            zIndex: 1,
          }}>
          <span style={{ color: "#666" }}>Loading map...</span>
        </div>
      )}
      {error && (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            height: "100%",
            inset: 0,
            justifyContent: "center",
            position: "absolute",
            zIndex: 2,
          }}>
          <span style={{ color: "#999" }}>{error}</span>
        </div>
      )}
      <div
        ref={mapContainer}
        style={{
          height: "100%",
          opacity: isLoading || error ? 0 : 1,
          transition: "opacity 0.3s",
          width: "100%",
        }}
      />
    </div>
  );
}
