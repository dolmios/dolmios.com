import Head from "next/head";

import { Grid, Song, Bio } from "../components";

export default function Home(): JSX.Element {
  return (
    <Grid as="main">
      <Head>
        <title>Jackson Dolman</title>
      </Head>
      <Grid as="section" direction="row">
        <Grid direction="column" width={42} collapse={100}>
          <Bio />
        </Grid>
      </Grid>
      <Grid as="section" direction="row">
        <Grid direction="column">
          <Song />
        </Grid>
      </Grid>
    </Grid>
  );
}
