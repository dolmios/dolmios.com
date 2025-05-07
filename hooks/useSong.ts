'use client';

import { useEffect, useState } from "react";
import useSWR from "swr";

export function useSong(): {
    dominantColor: string;
    error: unknown;
    fallbackURL: string;
    loading: boolean;
    singleLiner: string;
    streamDate: string;
    textColor: string;
    trackAlbum: string;
    trackArtist: string;
    trackCover: string;
    trackCoverRaw: string;
    trackName: string;
    youtubeURL: string;
}
    
    {
    const [dominantColor, setDominantColor] = useState<string>("");
    const [textColor, setTextColor] = useState<string>("");

    const { data: spotifyData, error: spotifyError } = useSWR(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=dolmios&api_key=${process.env.NEXT_PUBLIC_SCROBBLER_API_KEY}&format=json`,
        {
            refreshInterval: 10_000,
            refreshWhenHidden: true,
            revalidateOnMount: true,
            revalidateOnReconnect: true,
        }
    );

    const { recenttracks } = spotifyData || {};
    const { track } = recenttracks || {};
    const [latestTrack] = track || [];
    const trackAlbum = latestTrack?.album["#text"] || "";
    const trackArtist = latestTrack?.artist["#text"] || "";
    const trackName = latestTrack?.name || "";
    const trackCover =
        latestTrack?.image?.[3]?.["#text"]
            .replace("/34s/", "/")
            .replace("/64s/", "/")
            .replace("/174s/", "/")
            .replace("/300x300/", "/") || "";
    const trackCoverRaw = latestTrack?.image?.[3]?.["#text"] ?? "";
    const singleLiner =
        trackArtist && trackName
            ? `${trackName.length > 25 ? `${trackName.slice(0, 25)}...` : trackName} - ${trackArtist.length > 25 ? `${trackArtist.slice(0, 25)}...` : trackArtist
            } `
            : "";
    const fallbackURL = latestTrack?.url || "";
    const streamDate = latestTrack?.date?.uts
        ? new Date(parseInt(latestTrack?.date?.uts) * 1000).toLocaleString("en-US", {
            day: "numeric",
            hour: "numeric",
            hour12: true,
            minute: "numeric",
            month: "long",
            second: "numeric",
            timeZone: "America/New_York",
            year: "numeric",
        })
        : "Currently streaming";

    const { data: youtubeData } = useSWR(
        trackName && trackArtist && process.env.NEXT_PUBLIC_GOOGLE_API_KEY
            ? `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${trackName}+${trackArtist}&type=video&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
            : null,
        {
            errorRetryCount: 1,
            shouldRetryOnError: false,
        }
    );

    const vTag = youtubeData?.items?.[0]?.id?.videoId || "";
    const youtubeURL = vTag ? `https://www.youtube.com/watch?v=${vTag}` : "";

    useEffect(() => {
        if (!trackCoverRaw) return;

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.crossOrigin = "Anonymous";
        img.src = trackCoverRaw;
        img.onload = (): void => {
            canvas.height = img.height;
            canvas.width = img.width;
            if (!ctx) return;
            ctx.drawImage(img, 0, 0);
            
            // Sample multiple areas of the image to find vibrant colors
            const sampleSize = 10;
            const colorCounts: Record<string, { count: number; rgb: number[] }> = {};
            
            // Analyze pixels from different parts of the image
            for (let x = 0; x < canvas.width; x += Math.max(1, Math.floor(canvas.width / sampleSize))) {
                for (let y = 0; y < canvas.height; y += Math.max(1, Math.floor(canvas.height / sampleSize))) {
                    const { data } = ctx.getImageData(x, y, 1, 1);
                    const [r, g, b] = [data[0], data[1], data[2]];
                    
                    // Skip colors that are too dark or too light (close to black or white)
                    const brightness = (r + g + b) / 3;

                    if (brightness < 30 || brightness > 225) continue;
                    
                    // Skip grayscale colors (where R, G, and B are very close)
                    const isGrayscale = Math.abs(r - g) < 15 && Math.abs(g - b) < 15 && Math.abs(r - b) < 15;

                    if (isGrayscale) continue;
                    
                    // Calculate saturation: higher values mean more vivid colors
                    const max = Math.max(r, g, b);
                    const min = Math.min(r, g, b);
                    const saturation = max === 0 ? 0 : (max - min) / max;
                    
                    // Skip colors with very low saturation (grayish)
                    if (saturation < 0.15) continue;
                    
                    // Create a key for this color (rounded to reduce variations)
                    const roundFactor = 15;
                    const key = [
                        Math.round(r / roundFactor) * roundFactor,
                        Math.round(g / roundFactor) * roundFactor,
                        Math.round(b / roundFactor) * roundFactor
                    ].join(',');
                    
                    if (!colorCounts[key]) {
                        colorCounts[key] = { count: 0, rgb: [r, g, b] };
                    }
                    colorCounts[key].count++;
                }
            }
            
            // Sort colors by count and pick the most common vibrant color
            const sortedColors = Object.values(colorCounts).sort((a, b) => b.count - a.count);
            
            // Fallback to a pleasant default for dark mode if no good colors found
            const defaultColor = "80,140,200";
            const dominantRgb = sortedColors.length > 0 
                ? sortedColors[0].rgb.join(',') 
                : defaultColor;
            
            // Slightly boost saturation and brightness for better visibility in dark mode
            const [r, g, b] = dominantRgb.split(',').map(Number);
            
            // Adjust color for dark mode visibility
            const adjustForDarkMode = (rgb: number[]): number[] => {
                const [r, g, b] = rgb;
                const brightness = (r + g + b) / 3;
                
                // Boost brightness if too dark
                if (brightness < 80) {
                    const factor = 1.3;

                    return [
                        Math.min(255, Math.round(r * factor)),
                        Math.min(255, Math.round(g * factor)),
                        Math.min(255, Math.round(b * factor))
                    ];
                }
                
                // If already bright enough, adjust saturation instead
                const max = Math.max(r, g, b);
                const multipliers = [1.2, 1.2, 1.2];
                
                // Identify which channel is dominant and preserve its ratio
                if (max === r) multipliers[0] = 1;
                else if (max === g) multipliers[1] = 1;
                else multipliers[2] = 1;
                
                return [
                    Math.min(255, Math.round(r * multipliers[0])),
                    Math.min(255, Math.round(g * multipliers[1])),
                    Math.min(255, Math.round(b * multipliers[2]))
                ];
            };
            
            const adjustedColor = adjustForDarkMode([r, g, b]);
            const finalRgb = adjustedColor.join(',');
            
            setDominantColor(`rgb(${finalRgb})`);
            
            // Set text color based on adjusted color brightness
            const luminance = 0.299 * adjustedColor[0] + 0.587 * adjustedColor[1] + 0.114 * adjustedColor[2];

            setTextColor(luminance > 160 ? "rgb(24, 24, 27)" : "rgb(250, 250, 250)");
        };
    }, [trackCoverRaw]);

    return {
        fallbackURL,
        singleLiner,
        streamDate,
        trackAlbum,
        trackArtist,
        trackCover,
        trackCoverRaw,
        trackName,
        youtubeURL,
        dominantColor,
        textColor,
        loading: !spotifyData,
        error: spotifyError,
    };
}