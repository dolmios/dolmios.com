"use client";

import Image from "next/image";
import React, { JSX } from "react";
import { Badge, Stack, Text } from "stoop-ui";

import { useSong } from "../hooks/useSong"; // Assuming useSong is in the same directory

export function Song(): JSX.Element {
  const {
    fallbackURL,
    singleLiner,
    trackAlbum,
    trackArtist,
    trackCover,
    trackCoverRaw,
    trackName,
    youtubeURL,
    dominantColor,
    textColor,
    loading,
    error,
  } = useSong();

  if (loading && !error) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading song data. Quota probably exceeded.</Text>;

  return (
    <Stack
      css={{
        width: "100%",
        height: "100%",
        borderRadius: "$small",
        padding: "$medium",
        backgroundColor: dominantColor,
        "*": {
          color: textColor + " !important",
        },
      }}>
      {/* Song Info at the Top */}
      <Stack
        align="center"
        css={{
          background: dominantColor || "transparent",
          borderColor: textColor,
        }}
        direction="row">
        {trackCoverRaw && (
          <Image
            alt={singleLiner}
            height={50}
            src={trackCover || trackCoverRaw}
            style={{ borderRadius: "5px", marginRight: "10px" }}
            width={50}
          />
        )}
        <Text
          as="h1"
          css={{ marginLeft: "10px", textTransform: "capitalize", opacity: 0.5 }}
          variant="h1">
          {trackName}
        </Text>
        <Text as="h1" css={{ marginLeft: "10px" }} variant="h1">
          {trackArtist} ({trackAlbum})
        </Text>
      </Stack>

      <Stack
        css={{
          display: "grid",
          gap: "10px",
          // 50/50
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",

          mobile: {
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "auto",
          },
        }}>
        {/* Left Side: YouTube Video or Fallback Image */}
        <Stack css={{ padding: "10px" }}>
          {youtubeURL ? (
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              height="100%"
              src={`https://www.youtube.com/embed/${youtubeURL.split("v=")[1]}`}
              style={{
                borderRadius: "5px",
                border: 0,
                overflow: "hidden",
              }}
              title={singleLiner}
              width="100%"
            />
          ) : (
            trackCoverRaw && (
              <Image
                alt={singleLiner}
                fill
                src={trackCover || trackCoverRaw}
                style={{
                  borderRadius: "5px",
                  objectFit: "cover",
                  width: "100%",
                  height: "auto",
                }}
              />
            )
          )}
        </Stack>

        {/* Right Side: Color and Links */}
        <Stack
          align="center"
          css={{
            padding: "10px",
          }}
          direction="column"
          gap="small"
          justify="center">
          <Badge
            css={{
              color: textColor,
              backgroundColor: dominantColor,
            }}>
            Dominant Color: {dominantColor}
          </Badge>
          <Badge variant="outline">
            <a href={fallbackURL} rel="noopener noreferrer" target="_blank">
              {fallbackURL.replace(/(^\w+:|^)\/\//, "").replace("www.", "")}
            </a>
          </Badge>
          {youtubeURL && (
            <Badge variant="outline">
              <a href={youtubeURL} rel="noopener noreferrer" target="_blank">
                {youtubeURL.replace(/(^\w+:|^)\/\//, "").replace("www.", "")}
              </a>
            </Badge>
          )}
          <Badge variant="outline">
            <a href="https://open.spotify.com/user/jd.ol" rel="noopener noreferrer" target="_blank">
              spotify.com/user/jd.ol
            </a>
          </Badge>
        </Stack>
      </Stack>
    </Stack>
  );
}
