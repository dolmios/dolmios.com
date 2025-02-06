import Head from "next/head";
import Image from "next/image";
import type { JSX } from "react";
import { Balancer } from "react-wrap-balancer";

import { Grid, Text, Tag } from "../components";

export default function Home(): JSX.Element {
  return (
    <Grid
      as="main"
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "$4",
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
          maxWidth: "40rem",
        }}>
        <Text as="h1">
          <Balancer>Jackson Dolman &mdash; Full-Stack Developer based in New York City.</Balancer>
        </Text>

        <Text>
          Shipping modern web applications with architecture built for scale and interfaces that are
          a pleasure to use. Over a decade of development expertise across Australia and the US.
          Founded a successful startup in 2019, bringing both technical depth and founder
          perspective to every project.
        </Text>
        <Text top={3}>
          Focused on selective, long-term partnerships with founders building meaningful products.
          Experience in early-stage development means understanding how to optimize runway and
          minimize costs while building robust foundations that support sustained growth.
        </Text>
        <Text bottom={5} top={4}>
          Currently developing a platform for a grant compliance agency, with availability for new
          projects from Q2 2025.
        </Text>

        <a
          href="https://cosmogroup.io/blog/introducing-cosmo-app-v2-for-airbnb-owners#:~:text=Special%20recognition%20goes%20to%20Jackson%20Dolman%2C%20whose%20technical%20expertise%20and%20dedication%20have%20made%20the%20Cosmo%20App%20a%20reality."
          target="_blank">
          <Grid
            css={{
              alignItems: "center",
              gap: "$4",
              background: "$background",
              display: "inline-flex",
              width: "fit-content",
              color: "$text",
              padding: "$2 $3",
              transition: "background 0.5s, color 0.2s",

              "&:hover": {
                background: "rgba(255, 255, 255, 0.1)",
                color: "$background",
              },
            }}
            top={5}>
            <Image
              alt="Cosmo App V2"
              height={33}
              src="https://cosmogroup.io/images/blog/2024-11-01/01.jpg"
              width={33}
            />
            <Text as="small">
              Recent Feature: &quot;Cosmo App V2: A New Era in Short-Term Rental Portfolio
              Management&quot; (November 2024)
            </Text>
          </Grid>
        </a>
        <Tag
          css={{
            marginTop: "$6",
          }}
          link>
          <a href="mailto:contact@dolmios.com">✺ contact@dolmios.com</a>
        </Tag>
      </Grid>
    </Grid>
  );
}
