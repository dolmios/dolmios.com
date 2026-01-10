"use client";

import type { JSX } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Stack, Text, Tooltip, useTheme } from "stoop-ui";

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
        <Text variant="strong">dolmios.com</Text>
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
              css={{
                hidden: "phone",
              }}>
              Home
            </Button>
            <Button as="a" disabled={isMatchbooksPage} href="/matchbooks" size="small">
              Matchbooks
            </Button>
            <Button as="a" disabled={isProjectsPage} href="/projects" size="small">
              Projects
            </Button>
            <Tooltip trigger={<Button size="small">&copy;</Button>}>
              <Stack
                css={{
                  maxWidth: "300px",
                }}>
                <Text>
                  The typeface used on this website is{" "}
                  <Text
                    as="strong"
                    css={{
                      textDecoration: "underline",
                    }}>
                    <a href="https://github.com/brycewilner/Standard" target="_blank">
                      Standard
                    </a>
                  </Text>
                  , by{" "}
                  <Text
                    as="strong"
                    css={{
                      textDecoration: "underline",
                    }}>
                    <a href="https://brycewilner.com/" target="_blank">
                      Bryce Wilner
                    </a>
                  </Text>
                  . The website itself uses{" "}
                  <Text
                    as="strong"
                    css={{
                      textDecoration: "underline",
                    }}>
                    <a href="https://stoop.dolmios.com/" target="_blank">
                      Stoop UI
                    </a>
                  </Text>
                  . You can find the source code for this website on{" "}
                  <Text
                    as="strong"
                    css={{
                      textDecoration: "underline",
                    }}>
                    <a href="https://github.com/dolmios/dolmios.com" target="_blank">
                      GitHub
                    </a>
                    .
                  </Text>
                </Text>
              </Stack>
            </Tooltip>
          </>
        )}
        <Button size="small" onClick={toggleTheme}>
          {themeName === "light" ? "\u263E" : "\u2600"}
        </Button>
      </Stack>
    </Stack>
  );
}
