import NextImage from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";

import { Grid, Text, Tag, Icon } from ".";

export const useFindColor = (
  src: string,
): {
  dominantColor: string;
  textColor: string;
} => {
  const [dominantColor, setDominantColor] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("");

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.crossOrigin = "Anonymous";
    img.src = src;

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
  }, [src]);

  return { dominantColor, textColor };
};

export function useFindYouTube(
  song: string,
  artist: string,
): {
  youtubeURL: string;
} {
  const { data, error } = useSWR(
    song && artist
      ? `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${song}+${artist}&type=video&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
      : null,
    {
      errorRetryCount: 1,
    },
  );

  if (error) return { youtubeURL: "" };
  if (!data) return { youtubeURL: "" };

  const vTag = data?.items[0]?.id?.videoId || "";
  const youtubeURL = `https://www.youtube.com/watch?v=${vTag}`;

  return { youtubeURL };
}

export function useSpotifyScrobbler(): {
  fallbackURL: string;
  singleLiner: string;
  streamDate: string;
  trackAlbum: string;
  trackArtist: string;
  trackCover: string;
  trackCoverRaw: string;
  trackName: string;
} {
  const { data, error } = useSWR(
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=dolmios&api_key=${process.env.NEXT_PUBLIC_SCROBBLER_API_KEY}&format=json`,
    {
      refreshInterval: 10_000,
      refreshWhenHidden: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    },
  );

  if (error || !data) {
    return {
      fallbackURL: "",
      singleLiner: "",
      streamDate: "",
      trackAlbum: "",
      trackArtist: "",
      trackCover: "",
      trackCoverRaw: "",
      trackName: "",
    };
  }

  const { recenttracks } = data || {};
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
      ? `${trackName.length > 25 ? `${trackName.slice(0, 25)}...` : trackName} - ${
          trackArtist.length > 25 ? `${trackArtist.slice(0, 25)}...` : trackArtist
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

  return {
    fallbackURL,
    singleLiner,
    streamDate,
    trackAlbum,
    trackArtist,
    trackCover,
    trackCoverRaw,
    trackName,
  };
}

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

  if (!trackName) return <> </>;

  return (
    <Grid>
      <Tag
        css={{
          "*": {
            color: textColor || "inherit",
          },
          cursor: "pointer",
          background: dominantColor || "transparent",
          paddingLeft: 0,

          paddingRight: "$3",

          svg: {
            marginLeft: "$3",
            marginRight: "$3",
          },
        }}
        overflow
        onClick={(): void => setDetails(!details)}>
        {trackCoverRaw && trackCoverRaw !== "#" && (
          <Grid
            css={{
              borderTopLeftRadius: "$1",
              borderBottomLeftRadius: "$1",
              position: "sticky",
              top: 0,
              left: 0,

              img: {
                borderTopLeftRadius: "$1",
                borderBottomLeftRadius: "$1",
              },
              opacity: details ? 0.42 : 1,
            }}>
            <NextImage alt={singleLiner} height={25} src={trackCover || trackCoverRaw} width={25} />
          </Grid>
        )}

        <Icon.Spotify />
        <Text as="strong" inline={3}>
          {trackName}
        </Text>
        <Text as="span">{trackArtist}</Text>
      </Tag>

      {details && (
        <Grid top={6}>
          <Text as="h1">
            {streamDate}, from the {trackAlbum} album by {trackArtist}.
          </Text>

          {trackCoverRaw && trackCoverRaw !== "#" && (
            <Grid
              css={{
                height: "80vh",
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
              <NextImage alt={singleLiner} fill src={trackCover || trackCoverRaw} />
            </Grid>
          )}

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
            <Text as="small" bottom={2} top={2}>
              {dominantColor}
            </Text>
          </Grid>

          <Text top={5}>
            <a href={fallbackURL} rel="noopener noreferrer" target="_blank">
              {fallbackURL.replace(/(^\w+:|^)\/\//, "").replace("www.", "")}
            </a>
          </Text>
          {youtubeURL && (
            <Text>
              <a href={youtubeURL} rel="noopener noreferrer" target="_blank">
                {youtubeURL.replace(/(^\w+:|^)\/\//, "").replace("www.", "")}
              </a>
            </Text>
          )}

          <Text>
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
                height={420}
                src={`https://www.youtube.com/embed/${youtubeURL.split("v=")[1]}`}
                style={{ borderRadius: "3px", border: 0, overflow: "hidden", maxWidth: "100%" }}
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
