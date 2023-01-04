import Image from "next/image";
import { useState } from "react";

import { Grid, Text, Tag, useSpotifyScrobbler, useFindColor, useFindYouTube } from ".";

export function Song(): JSX.Element {
  const [details, setDetails] = useState(false);

  const {
    fallbackURL,
    singleLiner,
    trackArtist,
    trackCover,
    trackCoverRaw,
    trackAlbum,
    trackName,
    streamDate,
  } = useSpotifyScrobbler();
  const { youtubeURL } = useFindYouTube(trackName, trackArtist);

  const { dominantColor, textColor } = useFindColor(trackCover || trackCoverRaw);

  return (
    <Grid>
      <Tag
        css={{
          "*": {
            color: textColor || "inherit",
            lineHeight: "normal",
            verticalAlign: "middle",
          },
          cursor: "pointer",
          alignItems: "center",
          background: dominantColor || "transparent",
          paddingLeft: 0,
        }}
        onClick={(): void => setDetails(!details)}>
        {trackCoverRaw && trackCoverRaw !== "#" && (
          <Grid
            css={{
              borderRadius: "$1",
              display: "inline-flex",
              img: { borderRadius: "$1" },
              opacity: details ? 0.2 : 1,
            }}>
            <Image alt={singleLiner} height={30} src={trackCover || trackCoverRaw} width={30} />
          </Grid>
        )}
        <Text css={{ marginLeft: "$4" }}>{singleLiner}</Text>
      </Tag>

      {details && (
        <Grid align="left" top={7}>
          {trackCoverRaw && trackCoverRaw !== "#" && (
            <Grid
              css={{
                height: "50rem",
                width: "100%",
                position: "relative",

                img: { borderRadius: "$1", objectFit: "cover" },
              }}>
              <Image alt={singleLiner} fill quality={100} src={trackCover || trackCoverRaw} />
            </Grid>
          )}

          <Text as="p" top={6}>
            <Text as="strong">{streamDate}</Text>
          </Text>

          <Text as="p" top={6}>
            <Text as="strong">Track:</Text> {trackName}
          </Text>

          <Text as="p">
            <Text as="strong">Artist:</Text> {trackArtist}
          </Text>

          <Text as="p">
            <Text as="strong">Album:</Text> {trackAlbum}
          </Text>

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

          <Grid top={5}>
            <a href={youtubeURL || fallbackURL || ""} rel="noreferrer" target="_blank">
              <code>
                Listen to {trackName} on {youtubeURL ? "YouTube" : "Last.fm"}
              </code>
            </a>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
