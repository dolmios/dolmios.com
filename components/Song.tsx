"use client";

import Image from "next/image";
import { useEffect, useState, type JSX } from "react";
import { Button, Stack } from "stoop-ui";
import useSWR from "swr";

import type { SongData } from "@/app/api/song/route";

type SongColors = {
  bg: string;
  hoverBg: string;
  text: string;
};

const getColors = (imageUrl: string, onColors: (colors: SongColors) => void): void => {
  if (!imageUrl) {
    onColors({ bg: "", hoverBg: "", text: "" });

    return;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = window.Image ? new window.Image() : document.createElement("img");

  img.crossOrigin = "Anonymous";
  img.src = imageUrl;
  img.onload = (): void => {
    canvas.height = img.height;
    canvas.width = img.width;
    if (!ctx) return;

    ctx.drawImage(img, 0, 0);
    const { data } = ctx.getImageData(0, 0, 10, 1);
    const [r, g, b] = data;

    const bg = `rgb(${r},${g},${b})`;
    const hoverBg = `rgba(${r},${g},${b},0.85)`;
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const text = luminance > 128 ? "rgb(0,0,0)" : "rgb(255,255,255)";

    onColors({ bg, hoverBg: hoverBg || bg, text });
  };
};

export function Song(): JSX.Element {
  const { data } = useSWR<SongData>("/api/song", { refreshInterval: 10_000 });
  const [colors, setColors] = useState<SongColors>({ bg: "", hoverBg: "", text: "" });

  useEffect(() => {
    if (data?.coverUrl) {
      getColors(data.coverUrl, setColors);
    }
  }, [data?.coverUrl]);

  const song = data ? `${data.name} - ${data.artist}` : "";
  const hasTrack = song && data;
  const url = hasTrack ? data.url : "https://open.spotify.com/user/jd.ol";

  return (
    <Stack>
      <Button
        as="a"
        css={{
          "&:focus, &:hover": {
            backgroundColor: colors.hoverBg,
            color: colors.text,
          },
          backgroundColor: colors.bg,
          color: colors.text,
        }}
        href={url}
        icon={
          data?.coverUrl && hasTrack ? (
            <Image
              alt={song}
              height={20}
              src={data.coverUrl}
              style={{ borderRadius: "4px" }}
              width={20}
            />
          ) : undefined
        }
        rel="noopener noreferrer"
        size="small"
        target="_blank">
        {hasTrack ? song.toLowerCase() : "✺ spotify/dolmios"}
      </Button>
    </Stack>
  );
}
