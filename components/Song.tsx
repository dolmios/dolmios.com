import Image from "next/image";
import { useState } from "react";

import { Grid, Text, Tag, useSpotifyScrobbler, useFindColor, useFindYouTube } from ".";

export function Song(): JSX.Element {
  const [details, setDetails] = useState(false);

  const { fallbackURL, singleLiner, trackArtist, trackCover, trackAlbum, trackName } =
    useSpotifyScrobbler();
  const { youtubeURL } = useFindYouTube(trackName, trackArtist);

  const { dominantColor, textColor } = useFindColor(trackCover);

  return (
    <Grid>
      <Grid top={6}>
        <Grid bottom={4}>
          <Text as="code" onClick={(): void => setDetails(!details)}>
            Listening to:
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
          <a href={youtubeURL || fallbackURL || ""} target="_blank" rel="noreferrer">
            {trackCover && trackCover !== "#" && (
              <Grid
                css={{
                  borderRadius: "$1",
                  display: "inline-flex",
                  img: { borderRadius: "$1" },
                }}>
                <Image src={trackCover} alt={singleLiner} width={30} height={30} />
              </Grid>
            )}
            <Text css={{ marginLeft: "$4" }}>{singleLiner}</Text>
          </a>
        </Tag>
      </Grid>
      {details && (
        <Grid top={5} bottom={5}>
          <Grid>
            <Text as="p" inline={4}>
              <Text as="strong">Track:</Text>
            </Text>
            <Text as="p" inline={1}>
              {trackName.slice(0, 40)}
            </Text>
          </Grid>
          <Grid>
            <Text as="p" inline={4}>
              <Text as="strong">Artist:</Text>
            </Text>
            <Text as="p" inline={1}>
              {trackArtist.slice(0, 40)}
            </Text>
          </Grid>
          <Grid>
            <Text as="p" inline={4}>
              <Text as="strong">Album:</Text>
            </Text>
            <Text as="p" inline={1}>
              {trackAlbum.slice(0, 40)}
            </Text>
          </Grid>
          <Grid>
            <Text as="p" inline={4}>
              <Text as="strong">Cover Art:</Text>
            </Text>
            <Text as="p" inline={1}>
              <a href={trackCover} target="_blank" rel="noreferrer">
                {trackCover.slice(0, 40)}
              </a>
            </Text>
          </Grid>
          <Grid>
            <Text as="p" inline={4}>
              <Text as="strong">Cover Accent:</Text>
            </Text>
            <Text as="p" inline={3}>
              {dominantColor} for background
            </Text>
            <Text as="p" inline={1}>
              {textColor} for text
            </Text>
          </Grid>
          <Grid>
            <Text as="p" inline={4}>
              <Text as="strong">Last.FM URL:</Text>
            </Text>
            <Text as="p" inline={1}>
              <a href={fallbackURL} target="_blank" rel="noreferrer">
                {fallbackURL.slice(0, 40)}
              </a>
            </Text>
          </Grid>

          <Grid>
            <Text as="p" inline={4}>
              <Text as="strong">YouTube URL:</Text>
            </Text>
            <Text as="p" inline={1}>
              <a href={youtubeURL || fallbackURL} target="_blank" rel="noreferrer">
                {youtubeURL || "Error with YouTube API"}
              </a>
            </Text>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
