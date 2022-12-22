import Head from "next/head";

import { Grid, Text } from "../components";

export default function Custom404(): JSX.Element {
  return (
    <Grid as="main">
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <Grid direction="column" align="left" top={6}>
        <Text as="h1">404 - Page Not Found</Text>
        <Text>
          The page you are looking for does not exist. Please check the URL and try again.
        </Text>
        <Text>
          You may also view the source code for this site on{" "}
          <a href="https://github.com/dolmios/dolmios.com">GitHub</a>, see the{" "}
          <Text as="code">pages</Text> directory.
        </Text>
      </Grid>
    </Grid>
  );
}
