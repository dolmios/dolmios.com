import Head from "next/head";

import { Grid, Tag, Text } from "../components";

export default function Custom404(): JSX.Element {
  return (
    <Grid
      as="main"
      bottom={5}
      css={{
        svg: {
          marginRight: "$3",
        },
      }}
      top={5}>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <Grid as="section" direction="row">
        <Grid direction="column">
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
