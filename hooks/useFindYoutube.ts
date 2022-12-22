import useSWR from "swr";

export function useFindYoutube(
  song: string,
  artist: string
): {
  youtubeURL: string;
} {
  const { data, error } = useSWR(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${song}+${artist}&type=video&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
  );

  if (error) return { youtubeURL: "" };
  if (!data) return { youtubeURL: "" };

  const vTag = data?.items[0]?.id?.videoId || "";
  const youtubeURL = `https://www.youtube.com/watch?v=${vTag}`;

  return { youtubeURL };
}
