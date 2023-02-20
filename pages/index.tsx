import Head from "next/head";
import { useState, useEffect } from "react";

import { Grid, Text, Song } from "../components";

export default function Home(): JSX.Element {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      const interval = setInterval(() => {
        const date = new Date();
        const utc = date.getTime() + date.getTimezoneOffset() * 60000;
        const ny = new Date(utc + 3600000 * -5);
        setTime(ny.toLocaleTimeString());
        setDate(
          ny.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isMounted]);

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
        <meta content="(a frontend developer based in brooklyn)" name="description" />
      </Head>
      <Grid as="section" direction="row">
        <Grid align="justify" collapse={100} direction="column" width={42}>
          <Text>
            Thank you for visiting my personal website. I&apos;m a frontend developer based in NY,
            serving up web apps and websites for a variety of organizations and startups since 2016.
            I am currently exploring new full time opportunities since relocating to the U.S. from
            Australia in 2022.
          </Text>
          <Text top={5}>Feel free to reach out to me by email, or via my dev shop, Planare.</Text>
          <Text
            css={{
              marginLeft: "$3",
            }}
            top={3}>
            ✺{" "}
            <a href="mail@dolmios.com" rel="noopener noreferrer" target="_blank">
              mail@dolmios.com{" "}
            </a>
          </Text>
          <Text
            css={{
              marginLeft: "$3",
            }}>
            ✺{" "}
            <a href="https://planare.dev" rel="noopener noreferrer" target="_blank">
              planare.dev
            </a>
          </Text>

          <Grid top={5}>
            <Song />
          </Grid>

          <Text as="small" top={6}>
            {date}
            <br /> Brooklyn{time && `, ${time}`}
          </Text>
        </Grid>
      </Grid>
    </Grid>
  );
}
