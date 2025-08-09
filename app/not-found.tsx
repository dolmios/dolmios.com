"use client";

import Link from "next/link";
import type { JSX } from "react";

import { Text, Stack, Button } from "stoop";


export default function NotFound(): JSX.Element {
  return (
        <Stack
        top="massive"
        bottom="massive"
      align="center"
      as="main"
      direction="column"
      justify="center"
    >
        <Stack align="center" direction="column" gap="medium">
          <Text as="h1" css={{ fontSize: 32, fontWeight: 700 }}>
            Page Not Found
          </Text>
          <Text css={{ opacity: 0.7 }}>
            The page you are looking for does not exist.<br />
            Please check the URL and try again.
          </Text>
          <Button>
            <Link href="/">Return to homepage</Link>
          </Button>
        </Stack>

    </Stack>
  );
} 