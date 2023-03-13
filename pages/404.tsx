import Head from "next/head";
import Link from "next/link";

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
        <Grid collapse={100} direction="column" width={42}>
          <Tag bold>Error 404</Tag>

          <Text top={5}>
            The page you are looking for does not exist. Please check the URL and try again.
          </Text>
          <Link href="/">
            <Text
              css={{
                marginLeft: "$3",
              }}
              top={3}>
              ✺ Return to homepage
            </Text>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}
