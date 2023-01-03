import Head from "next/head";

import { Grid, Song, Bio } from "../components";

export default function Home(): JSX.Element {
  return (
    <Grid as="main">
      <Head>
        <title>Jackson Dolman</title>
        <meta content="Jackson Dolman's personal website" name="description" />
      </Head>
      <Grid as="section" direction="row" top={6}>
        <Grid collapse={100} direction="column" width={44}>
          <Bio />
        </Grid>
      </Grid>
      <Grid as="section" bottom={6} direction="row" top={7}>
        <Grid direction="column">
          <Song />
        </Grid>
      </Grid>
    </Grid>
  );
}
