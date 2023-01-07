import Image from "next/image";
import { useState } from "react";

import { Grid, Text, Tag, useSpotifyScrobbler, useFindColor, useFindYouTube, Icons } from ".";

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
          whiteSpace: "nowrap",
          overflow: "scroll",
          textOverflow: "ellipsis",
          paddingRight: "$3",

          svg: {
            marginRight: "$3",
          },
        }}
        onClick={(): void => setDetails(!details)}>
        {trackCoverRaw && trackCoverRaw !== "#" && (
          <Grid
            css={{
              borderTopLeftRadius: "$1",
              borderBottomLeftRadius: "$1",
              display: "inline-flex",
              img: {
                borderTopLeftRadius: "$1",
                borderBottomLeftRadius: "$1",
              },
              opacity: details ? 0.42 : 1,
              marginRight: "$3",
            }}>
            <Image alt={singleLiner} height={25} src={trackCover || trackCoverRaw} width={25} />
          </Grid>
        )}

        <Icons.Spotify />
        <Text as="strong" inline={3}>
          {trackName}
        </Text>
        <Text as="span">{trackArtist}</Text>
      </Tag>

      {details && (
        <Grid top={5}>
          <Grid>
            {trackCoverRaw && trackCoverRaw !== "#" && (
              <Grid
                css={{
                  height: "42vh",
                  borderRadius: "$1",
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,

                  img: {
                    borderRadius: "$1",
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    objectFit: "cover",
                    objectPosition: "top",
                  },
                }}>
                <Image alt={singleLiner} fill src={trackCover || trackCoverRaw} />
              </Grid>
            )}
          </Grid>
          <Grid
            align="center"
            css={{
              borderRadius: "$1",
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              background: dominantColor,

              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              color: textColor || "inherit",
            }}>
            <Text as="small" bottom={3} inline={1} top={3}>
              {dominantColor}
            </Text>
          </Grid>
          <Text top={5}>
            {streamDate}, from the {trackAlbum} album by {trackArtist}.
          </Text>
          <Text top={5}>
            <a href={fallbackURL} rel="noopener noreferrer" target="_blank">
              {fallbackURL.replace(/(^\w+:|^)\/\//, "").replace("www.", "")}
            </a>
          </Text>
          {youtubeURL && (
            <Text top={3}>
              <a href={youtubeURL} rel="noopener noreferrer" target="_blank">
                {youtubeURL.replace(/(^\w+:|^)\/\//, "").replace("www.", "")}
              </a>
            </Text>
          )}

          <Text top={3}>
            <a href="https://open.spotify.com/user/jd.ol" rel="noopener noreferrer" target="_blank">
              spotify.com/user/jd.ol{" "}
            </a>
          </Text>
          {youtubeURL && (
            <Grid top={5}>
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                allowTransparency
                height={210}
                src={`https://www.youtube.com/embed/${youtubeURL.split("v=")[1]}`}
                style={{ borderRadius: "0.5rem", border: 0, overflow: "hidden", maxWidth: "100%" }}
                title={singleLiner}
                width={420}
              />
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
}
