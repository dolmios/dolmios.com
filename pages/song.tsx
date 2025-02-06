import Head from "next/head";
import type { JSX } from "react";

import { Grid, Song } from "../components";

<Grid css={{ marginTop: "$4" }}>
  <Song />
</Grid>;

export default function Home(): JSX.Element {
  return (
    <Grid
      as="main"
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        height: "100vh",
        padding: "$3",
      }}>
      <Head>
        <title>JACKSON DOLMAN: CURRENTLY LISTENING</title>
        <meta
          content="A real-time display of the music I'm currently listening to on Spotify. Powered by the Last.fm and YouTube APIs."
          name="description"
        />
      </Head>

      <Song />
    </Grid>
  );
}
