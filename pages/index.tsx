import Head from "next/head";

import { Grid, Song, Bio } from "../components";

export default function Home(): JSX.Element {
  return (
    <Grid as="main">
      <Head>
        <title>Jackson Dolman</title>
        <meta name="description" content="Jackson Dolman's personal website" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content="Jackson Dolman" />
        <meta property="og:description" content="Jackson Dolman's personal website" />
        {/* <meta property="og:image" content="https://jacksondolman.com/og-image.png" />  */}
      </Head>
      <Grid as="section" direction="row" top={6}>
        <Grid direction="column" width={44} collapse={100}>
          <Bio />
        </Grid>
      </Grid>
      <Grid as="section" direction="row" top={7} bottom={6}>
        <Grid direction="column">
          <Song />
        </Grid>
      </Grid>
    </Grid>
  );
}
