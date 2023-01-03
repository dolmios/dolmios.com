import Head from "next/head";

import { Grid, Text } from "../components";

export default function Custom404(): JSX.Element {
  return (
    <Grid as="main">
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <Grid align="left" direction="column" top={6}>
        <Text as="h2">404 - Page Not Found</Text>
        <Text>
          The page you are looking for does not exist. Please check the URL and try again.
        </Text>
        <Text>
          You may also view the source code for this site on{" "}
          <Text as="code">
            <a href="https://github.com/dolmios/dolmios.com">GitHub</a>
          </Text>{" "}
          (see the{" "}
          <Text as="code">
            <a href="https://github.com/dolmios/dolmios.com/tree/main/pages">pages</a>
          </Text>{" "}
          directory)
        </Text>
      </Grid>
    </Grid>
  );
}
