"use client";

import Image from "next/image";
import React, { JSX } from "react";
import { Button, Stack } from "stoop-ui";

import { useSong } from "../hooks/useSong";

export function Song(): JSX.Element | null {
  const {
    dominantColor,
    error,
    fallbackURL,
    loading,
    singleLiner,
    textColor,
    trackArtist,
    trackCoverRaw,
    trackName,
  } = useSong();

  const hasTrack = trackName && trackArtist && !loading && !error;
  const spotifyProfileURL = "https://open.spotify.com/user/jd.ol";

  return (
    <Stack>
      <Button
        as="a"
        css={{
          backgroundColor: dominantColor || "transparent",
          color: textColor,
        }}
        href={hasTrack ? fallbackURL : spotifyProfileURL}
        icon={
          trackCoverRaw && hasTrack ? (
            <Image
              alt={singleLiner}
              height={20}
              src={trackCoverRaw}
              style={{ borderRadius: "4px" }}
              width={20}
            />
          ) : undefined
        }
        rel="noopener noreferrer"
        size="small"
        target="_blank">
        {hasTrack ? `${trackName} - ${trackArtist}` : "✺ spotify/dolmios"}
      </Button>
    </Stack>
  );
}
