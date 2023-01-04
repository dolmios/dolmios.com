import Head from "next/head";

import { Grid, Song, Bio } from "../components";

export default function Home(): JSX.Element {
  return (
    <Grid as="main">
      <Head>
        <title>Jackson Dolman</title>
        <meta content="Jackson Dolman's personal website" name="description" />
      </Head>
      <Grid align="center" as="section" bottom={7} direction="row" top={7}>
        <Grid collapse={100} css={{ margin: "0 auto" }} direction="column" width={50}>
          <Bio />
          <Grid top={6}>
            <Song />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
