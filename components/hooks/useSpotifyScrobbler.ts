import useSWR from "swr";

export function useSpotifyScrobbler(): {
  trackCover: string;
  singleLiner: string;
  trackName: string;
  trackArtist: string;
  trackAlbum: string;
  fallbackURL: string;
} {
  const { data, error } = useSWR(
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=dolmios&api_key=${process.env.NEXT_PUBLIC_SCROBBLER_API_KEY}&format=json`
  );

  if (error || !data) {
    return {
      fallbackURL: "",
      singleLiner: "",
      trackAlbum: "",
      trackArtist: "",
      trackCover: "",
      trackName: "",
    };
  }

  const { recenttracks } = data || {};
  const { track } = recenttracks || {};
  const latestTrack = track[0];
  const trackAlbum = latestTrack?.album["#text"] || "";
  const trackArtist = latestTrack?.artist["#text"] || "";
  const trackName = latestTrack?.name || "";
  const trackCover =
    latestTrack?.image[3]["#text"] ||
    latestTrack?.image[2]["#text"] ||
    latestTrack?.image[1]["#text"] ||
    latestTrack?.image[0]["#text"] ||
    "";
  // for single liner, concat the track name and artist if they are each over 25 characters with an ellipsis, but if they are under 25 characters, just show them
  const singleLiner =
    trackArtist && trackName
      ? `${trackName.length > 25 ? `${trackName.slice(0, 25)}...` : trackName} - ${
          trackArtist.length > 25 ? `${trackArtist.slice(0, 25)}...` : trackArtist
        } `
      : "";
  const fallbackURL = latestTrack?.url || "";

  return {
    fallbackURL,
    singleLiner,
    trackAlbum,
    trackArtist,
    trackCover,
    trackName,
  };
}
