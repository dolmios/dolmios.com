import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JACKSON DOLMAN: CURRENTLY LISTENING",
  description:
    "A real-time display of the music I'm currently listening to on Spotify. Powered by the Last.fm and YouTube APIs.",
};

export default function SongLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return children;
}
