import useSWR from 'swr';

export const fetcher = (url: RequestInfo | URL): Promise<void> => fetch(url).then((res) => res.json());

export function useAudio(): {
  image: string;
  listening: string;
} {
  const { data, error } = useSWR(
    'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=dolmios&api_key=6ebf4fabf3d00f803681a53820af6945&format=json',
    fetcher
  );

  if (error || !data) return { image: '', listening: '' };

  const { recenttracks } = data;
  const { track } = recenttracks;
  const { image, artist, name } = track[0];

  return {
    image: image[3]['#text'] || image[2]['#text'] || image[1]['#text'] || image[0]['#text'],
    listening: `${artist['#text']} - ${name}`,
  };
}
