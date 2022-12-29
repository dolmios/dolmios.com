import useSWR from "swr";

export function useFindYouTube(
  song: string,
  artist: string
): {
  youtubeURL: string;
} {
  const { data, error } = useSWR(
    song && artist
      ? `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${song}+${artist}&type=video&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
      : null,
    {
      errorRetryCount: 1,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );

  if (error) return { youtubeURL: "" };
  if (!data) return { youtubeURL: "" };

  const vTag = data?.items[0]?.id?.videoId || "";
  const youtubeURL = `https://www.youtube.com/watch?v=${vTag}`;

  return { youtubeURL };
}
