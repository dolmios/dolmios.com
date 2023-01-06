import Head from "next/head";
import Link from "next/link";

import { Grid, Song, useTimestamp, Text, Icons, Tag } from "../components";

export default function Home(): JSX.Element {
  const { isMounted, date, time } = useTimestamp();

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
        <title>Jackson Dolman</title>
        <meta content="Jackson Dolman's personal website" name="description" />
      </Head>
      <Grid as="section" direction="row">
        <Grid collapse={100} css={{ margin: "0 auto" }} direction="column" width={60}>
          <Tag bold>FRONTEND DEVELOPER</Tag>
          <Text top={5}>
            Monikered on the information superhighway as{" "}
            <a href="https://github.com/dolmios" rel="noopener noreferrer" target="_blank">
              dolmios
            </a>
            (not affiliated with the pasta sauce brand owned by Mars Incorporated) I make things for
            the web at{" "}
            <a href="https://planare.dev" rel="noopener noreferrer" target="_blank">
              Planare
            </a>
            . Thanks for stopping by.
          </Text>
          <Text top={5}>
            <Icons.Arena />
            <a href="https://are.na/dolmios" rel="noopener noreferrer" target="_blank">
              are.na/dolmios
            </a>
          </Text>
          <Text top={3}>
            <Icons.Letterboxd />
            <a href="https://letterboxd.com/dolmios/" rel="noopener noreferrer" target="_blank">
              letterboxd.com/dolmios
            </a>
          </Text>
          <Text top={3}>
            <Icons.Literal />
            <a href="https://literal.club/dolmios" rel="noopener noreferrer" target="_blank">
              literal.club/dolmios
            </a>
          </Text>

          <Text top={3}>
            <Icons.Quitter />
            <a href="https://twitter.com/jacksondolman" rel="noopener noreferrer" target="_blank">
              twitter.com/jacksondolman
            </a>
          </Text>

          <Text top={5}>
            <a href="mail@dolmios.com" rel="noopener noreferrer" target="_blank">
              mail@dolmios.com
            </a>
          </Text>
          <Text top={3}>
            <Link href="/resume">dolmios.com/resume</Link>
          </Text>
          <Grid top={5}>
            <Song />
          </Grid>
          {isMounted && (
            <Text as="small" top={5}>
              {date}
              <br /> Brooklyn, {time}
            </Text>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
