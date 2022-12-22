import useSWR from "swr";

export function useAudio(): {
  image: string;
  listening: string;
  name: string;
  artist: string;
  url: string;
} {
  const { data, error } = useSWR(
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=dolmios&api_key=${process.env.NEXT_PUBLIC_SCROBBLER_API_KEY}&format=json`
  );

  if (error || !data) return { artist: "✺", image: "#", listening: "✺", name: "✺", url: "#" };

  const { recenttracks } = data || {};
  const { track } = recenttracks || {};
  const { image, artist, name, url } = track[0] || {};

  return {
    artist: artist["#text"],
    image: image[3]["#text"] || image[2]["#text"] || image[1]["#text"] || image[0]["#text"],
    listening: `${name.length > 20 ? `${name.slice(0, 20)}...` : name} - ${
      artist["#text"].length > 30 ? `${artist["#text"].slice(0, 30)}...` : artist["#text"]
    }`,
    name: name,
    url,
  };
}
