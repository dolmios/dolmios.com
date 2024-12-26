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
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        height: "100vh",
        padding: "$3",
      }}>
      <Head>
        <title>JACKSON DOLMAN</title>
        <meta
          content="Full-stack web developer specializing in modern applications, scalable architectures, and performant user experiences. Now accepting projects for Q2 2025."
          name="description"
        />
      </Head>

      <Tag
        css={{
          position: "absolute",
          top: "$3",
          left: "$3",
        }}
        small>
        🇦🇺 Currently in: Melbourne, AU (
        {new Date().toLocaleTimeString("en-AU", {
          timeZone: "Australia/Melbourne",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
        )
      </Tag>

      <Text
        as="h1"
        css={{
          maxWidth: "60rem",
          textTransform: "uppercase",
        }}>
        <Balancer>
          Jackson Dolman
          <br />
          Frontend developer specializing in next-gen web technology. <br />
          Based in BROOKLYN, NY
        </Balancer>
      </Text>

      <Text
        bottom={5}
        css={{
          maxWidth: "40rem",
        }}>
        <Balancer>
          As another year wraps up, I&apos;m refreshing my web presence. I&apos;m currently open to
          projects starting Q2 2025. Feel free to reach out if you&apos;d like to explore working
          together.
        </Balancer>
      </Text>
      <Grid
        css={{
          display: "flex",
          alignItems: "center",
          gap: "$3",
          justifyContent: "center",
        }}
        top={5}>
        <Image
          alt="Cosmo App V2"
          height={33}
          src="https://cosmogroup.io/images/blog/2024-11-01/01.jpg"
          width={33}
        />
        <Text
          as="small"
          css={{
            "&:hover": {
              opacity: 1,
            },
            transition: "opacity 0.2s",
            opacity: 0.8,
          }}>
          <a
            href="https://cosmogroup.io/blog/introducing-cosmo-app-v2-for-airbnb-owners"
            target="_blank">
            Recent Feature: &quot;Cosmo App V2: A New Era in Short-Term Rental Portfolio
            Management&quot; (November 2024)
          </a>
        </Text>
      </Grid>

      <Tag
        css={{
          marginTop: "$6",
        }}
        link>
        <a href="mailto:contact@dolmios.com">✺ contact@dolmios.com</a>
      </Tag>
    </Grid>
  );
}
