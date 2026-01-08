"use client";

import type { JSX } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Stack, Text } from "stoop-ui";

export function Header(): JSX.Element {
  const pathname = usePathname();
  const isMatchbooksPage = pathname?.startsWith("/matchbooks");
  const isMatchbookDetail = pathname?.match(/^\/matchbooks\/[^/]+$/);

  return (
    <Stack
      align="center"
      as="header"
      css={{
        backgroundColor: "$background",
        borderBottom: "1px solid $border",
        height: "48px",
        mobile: {
          paddingLeft: "$small",
          paddingRight: "$small",
        },
        padding: 0,
      }}
      direction="row"
      justify="between"
      left="medium"
      right="medium">
      <Link
        href="/"
        style={{
          flexShrink: 0,
          minWidth: 0,
          textDecoration: "none",
        }}>
        <Text
          as="h5"
          css={{
            fontWeight: "$bold",
            margin: 0,
            whiteSpace: "nowrap",
          }}>
          dolmios.com
        </Text>
      </Link>
      <Stack direction="row" gap="small">
        {isMatchbookDetail ? (
          <Button as="a" href="/matchbooks" size="small">
            ← Back
          </Button>
        ) : (
          <>
            <Button
              as="a"
              href="/"
              size="small"
              variant={!isMatchbooksPage ? "secondary" : "default"}>
              Home
            </Button>
            <Button
              as="a"
              href="/matchbooks"
              size="small"
              variant={isMatchbooksPage ? "secondary" : "default"}>
              Matchbooks
            </Button>
          </>
        )}
      </Stack>
    </Stack>
  );
}
