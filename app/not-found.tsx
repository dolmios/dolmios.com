"use client";

import type { JSX } from "react";

import Link from "next/link";

import { Button, Stack, Text } from "@/ui";

export default function NotFound(): JSX.Element {
  return (
    <Stack
      align="center"
      as="main"
      bottom="massive"
      direction="column"
      justify="center"
      top="massive"
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
