import useSWR from "swr";

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
    }
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

  const latestTrack = track[0];
  const trackAlbum = latestTrack?.album["#text"] || "";
  const trackArtist = latestTrack?.artist["#text"] || "";
  const trackName = latestTrack?.name || "";
  // track cover is either latestTrack 3,2,1,0 or empty string. strip /34s/, /64s/, /174s/, /300x300/ if that text is present
  // eg: https://lastfm.freetls.fastly.net/i/u/300x300/248297b2f72690349abee85186359ea6.jpg > https://lastfm.freetls.fastly.net/i/u/248297b2f72690349abee85186359ea6.jpg
  const trackCover =
    latestTrack?.image[3 || 2 || 1 || 0]["#text"]
      .replace("/34s/", "/")
      .replace("/64s/", "/")
      .replace("/174s/", "/")
      .replace("/300x300/", "/") || "";
  const trackCoverRaw = latestTrack?.image[3 || 2 || 1 || 0]["#text"] || "";

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
    : "Currently Streaming";

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
