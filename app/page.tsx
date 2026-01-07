"use client";

import type { JSX } from "react";

import Image from "next/image";
import { Button, Stack, Text } from "stoop-ui";

import { Song } from "../components";

export default function Home(): JSX.Element {
  return (
    <Stack
      as="main"
      css={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        margin: "0 auto",
        maxWidth: "1200px",
        minHeight: "100vh",
        padding: "$medium",
      }}
      direction="column"
      gap="small">
      <Stack
        align="center"
        css={{
          marginBottom: "$large",
          maxWidth: "600px",
          textAlign: "center",
        }}
        direction="column"
        gap="large">
        <Image
          alt="Jackson Dolman"
          height={300}
          src="/me.jpeg"
          style={{
            borderRadius: "8px",
            objectFit: "cover",
            objectPosition: "center",
          }}
          width={300}
        />
        <Text color="secondary">
          <b>Jackson Dolman</b>, Full-Stack Developer in New York. I build web applications, work
          with AI, and help teams ship product.
        </Text>
      </Stack>

      <Stack direction="row" gap="small">
        <Button size="small">
          <a href="mailto:contact@dolmios.com">✺ contact@dolmios.com</a>
        </Button>
        <Song />
      </Stack>
    </Stack>
  );
}
