import Head from "next/head";

import { Grid, Text, Tag } from "../components";

export default function Home(): JSX.Element {
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
        <title>Jackson Dolman</title>
        <meta content="(a frontend developer based in brooklyn)" name="description" />
      </Head>

      <Text as="h1">
        Jackson Dolman
        <br />
        Frontend Developer
        <br />
        Brooklyn, NY
      </Text>

      <Text
        bottom={5}
        css={{
          opacity: 0.6,
        }}>
        As another year wraps up, I&apos;m giving my website a much needed update. <br />
        I&apos;m currently available for new projects, so feel free to reach out if you would like
        to work together.
      </Text>
      <Tag
        css={{
          opacity: 0.8,
        }}
        link>
        <a href="mailto:mail@dolmios.com">✺ mail@dolmios.com</a>
      </Tag>
    </Grid>
  );
}
