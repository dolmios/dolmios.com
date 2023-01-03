import Image from "next/image";
import { useState } from "react";

import { Grid, Text, Tag, useSpotifyScrobbler, useFindColor, useFindYouTube, Icons } from ".";

export function Song(): JSX.Element {
  const [details, setDetails] = useState(false);

  const { fallbackURL, singleLiner, trackArtist, trackCover, trackAlbum, trackName, streamDate } =
    useSpotifyScrobbler();
  const { youtubeURL } = useFindYouTube(trackName, trackArtist);

  const { dominantColor, textColor } = useFindColor(trackCover);

  return (
    <Grid>
      <Grid bottom={4}>
        <Text as="code" css={{ cursor: "pointer" }} onClick={(): void => setDetails(!details)}>
          <Text as="span" css={{}} inline={3}>
            <Icons.Spotify />
          </Text>
          <Text as="span" inline={1}>
            Last Played
          </Text>
        </Text>
      </Grid>
      <Tag
        css={{
          "*": {
            color: textColor || "inherit",
            lineHeight: "normal",
            verticalAlign: "middle",
          },
          alignItems: "center",
          background: dominantColor || "transparent",
          paddingLeft: 0,
        }}>
        <a href={youtubeURL || fallbackURL || ""} rel="noreferrer" target="_blank">
          {trackCover && trackCover !== "#" && (
            <Grid
              css={{
                borderRadius: "$1",
                display: "inline-flex",
                img: { borderRadius: "$1" },
              }}>
              <Image alt={singleLiner} height={25} src={trackCover} width={25} />
            </Grid>
          )}
          <Text css={{ marginLeft: "$4" }}>{singleLiner}</Text>
        </a>
      </Tag>
      {details && (
        <Grid top={5}>
          <Grid>
            <Text as="p" inline={4}>
              <Text as="strong">Track:</Text>
            </Text>
            <Text as="p" inline={1}>
              {trackName}
            </Text>
          </Grid>
          <Grid>
            <Text as="p" inline={4}>
              <Text as="strong">Artist:</Text>
            </Text>
            <Text as="p" inline={1}>
              {trackArtist}
            </Text>
          </Grid>
          <Grid>
            <Text as="p" inline={4}>
              <Text as="strong">Album:</Text>
            </Text>
            <Text as="p" inline={1}>
              {trackAlbum}
            </Text>
          </Grid>
          <Grid>
            <Text as="p" inline={4}>
              <Text as="strong">Accent:</Text>
            </Text>
            <Text
              as="span"
              css={{ background: dominantColor, height: "15px", width: "15px" }}
              inline={4}>
              &nbsp;
            </Text>
            <Text as="p" inline={3}>
              {dominantColor}
            </Text>
          </Grid>
          <Grid>
            <Text as="p" inline={4}>
              <Text as="strong">Streamed:</Text>
            </Text>
            <Text as="p" inline={3}>
              {streamDate}
            </Text>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
