import Head from "next/head";
import { useState, useEffect } from "react";

import { Grid, Text, Song, Tag } from "../components";

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
        const now = new Date();
        setTime(now.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" }));
        setDate(
          now.toLocaleDateString("en-US", {
            weekday: "long",
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
          <Tag bold>Frontend Developer</Tag>
          <Text>
            Thank you for visiting my personal website. I&apos;m a frontend developer based in NY,
            serving up web apps and websites for a variety of organizations and startups. I&apos;m
            currently working out of my dev shop, Planare.
          </Text>
          <Text
            css={{
              marginLeft: "$3",
            }}
            top={4}>
            ✺ <a href="mailto:mail@dolmios.com">mail@dolmios.com</a>
          </Text>
          <Text
            css={{
              marginLeft: "$3",
            }}>
            ✺{" "}
            <a
              href="https://workingnotworking.com/166253-jackson"
              rel="noopener noreferrer"
              target="_blank">
              workingnotworking.com
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

          <Grid top={6}>
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
