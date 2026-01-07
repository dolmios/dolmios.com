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
} {
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
            ? `${trackName.length > 25 ? `${trackName.slice(0, 25)}...` : trackName} - ${trackArtist.length > 25 ? `${trackArtist.slice(0, 25)}...` : trackArtist}`
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
            const { data } = ctx.getImageData(0, 0, 10, 1);
            const rgb = data[0] + "," + data[1] + "," + data[2];

            setDominantColor(`rgb(${rgb})`);
            const luminance = 0.2126 * data[0] + 0.7152 * data[1] + 0.0722 * data[2];

            setTextColor(luminance > 128 ? "rgb(0,0,0)" : "rgb(255, 255, 255)");
        };
    }, [trackCoverRaw]);

    return {
        dominantColor,
        error: spotifyError,
        fallbackURL,
        loading: !spotifyData,
        singleLiner,
        streamDate,
        textColor,
        trackAlbum,
        trackArtist,
        trackCover,
        trackCoverRaw,
        trackName,
    };
}
