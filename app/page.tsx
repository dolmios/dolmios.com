"use client";

import type { JSX } from "react";
import { Button, Stack, Text } from "stoop-ui";

export default function Home(): JSX.Element {
  return (
    <Stack
      as="main"
      css={{
        // dead center
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center",
      }}>

      <Stack
      gap="small"
      direction="column"
      >
        <Text top="medium" color="secondary">
        <b>Jackson Dolman</b>, Full-Stack Developer in New York. I build web applications, work with AI, and help teams ship product.
        </Text>
      </Stack>
      <Stack top="large">

        <Button size="small">
          <a href="mailto:contact@dolmios.com">✺ contact@dolmios.com</a>
        </Button>
      </Stack>

    </Stack>
  );
}
