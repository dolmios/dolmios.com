import Head from "next/head";
import Link from "next/link";
import type { JSX } from "react";

import { Grid, Tag, Text } from "../components";

export default function Custom404(): JSX.Element {
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
        <title>404 - Page Not Found</title>
      </Head>

      <Text as="h1">Page Not Found</Text>

      <Text
        bottom={5}
        css={{
          opacity: 0.6,
        }}>
        The page you are looking for does not exist. Please check the URL and try again.
      </Text>

      <Tag bold link>
        {" "}
        <Link href="/">✺ Return to homepage</Link>
      </Tag>
    </Grid>
  );
}
