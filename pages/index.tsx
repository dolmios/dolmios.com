import Head from "next/head";
import type { JSX } from "react";

import { Grid, Tag } from "../components";

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
        padding: "$6 $3",
        height: "100vh",
      }}>
      <Head>
        <title>dolmios.com</title>
        <meta
          content="Jackson Dolman is a full-stack web developer based in New York City. Working with startups and founders to build modern apps and websites that scale."
          name="description"
        />
      </Head>

      <Grid
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          textAlign: "center",
          gap: "$2",
        }}>
        <Tag
          css={{
            backgroundColor: "$background !important",
            color: "$text !important",
            verticalAlign: "middle",
          }}>
          Jackson Dolman
        </Tag>
        <Tag link>
          <a href="mailto:contact@dolmios.com">✺ contact@dolmios.com</a>
        </Tag>
      </Grid>
    </Grid>
  );
}
