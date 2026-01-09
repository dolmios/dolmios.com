"use client";

import type { JSX } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Stack, Text, useTheme } from "stoop-ui";

export function Header(): JSX.Element | null {
  const pathname = usePathname();
  const { themeName, toggleTheme } = useTheme();
  const isMatchbooksPage = pathname?.startsWith("/matchbooks");
  const isMatchbookDetail = pathname?.match(/^\/matchbooks\/[^/]+$/);
  const isProjectsPage = pathname?.startsWith("/projects");
  const isProjectDetail = pathname?.match(/^\/projects\/[^/]+$/);
  const isHomePage = pathname === "/";

  if (isHomePage) {
    return null;
  }

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
          variant="strong">
          dolmios.com
        </Text>
      </Link>
      <Stack direction="row" gap="small">
        {isMatchbookDetail ? (
          <Button as="a" href="/matchbooks" size="small">
            Back
          </Button>
        ) : isProjectDetail ? (
          <Button as="a" href="/projects" size="small">
            Back
          </Button>
        ) : (
          <>
            <Button
              as="a"
              disabled={isHomePage}
              href="/"
              size="small"
             >
              Home
            </Button>
            <Button
              as="a"
              disabled={isMatchbooksPage}
              href="/matchbooks"
              size="small"
>
              Matchbooks
            </Button>
            <Button
              as="a"
              disabled={isProjectsPage}
              href="/projects"
              size="small">
              Projects
            </Button>
          </>
        )}
        <Button size="small" onClick={toggleTheme}>
          {themeName === "light" ? "\u263E" : "\u2600"}
        </Button>
      </Stack>
    </Stack>
  );
}
