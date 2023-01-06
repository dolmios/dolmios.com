import Head from "next/head";

import { Grid, Tag, Text } from "../components";

export default function Custom404(): JSX.Element {
  return (
    <Grid as="main">
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <Grid as="section" bottom={5} direction="row" top={5}>
        <Grid collapse={100} css={{ margin: "0 auto" }} direction="column" width={60}>
          <Tag bold>404 (PAGE NOT FOUND)</Tag>

          <Text top={5}>
            The page you are looking for does not exist. Please check the URL and try again.
          </Text>
          <Text top={4}>
            You may also view the source code for this site on GitHub:{" "}
            <a
              href="https://github.com/dolmios/dolmios.com/tree/main/pages"
              rel="noopener noreferrer"
              target="_blank">
              github.com/dolmios/dolmios.com/tree/main/pages
            </a>
          </Text>
        </Grid>
      </Grid>
    </Grid>
  );
}
