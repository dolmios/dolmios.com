"use client";

import type { JSX } from "react";

import { Button, Stack, Text, useTheme } from "stoop-ui";

export function Footer(): JSX.Element {
  const { themeName, toggleTheme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Stack
      align="center"
      as="footer"
      bottom="large"
      css={{
        backgroundColor: "$background",
        borderTop: "1px solid $border",
        mobile: {
          paddingLeft: "$small",
          paddingRight: "$small",
        },
      }}
      direction="row"
      justify="between"
      left="medium"
      right="medium"
      top="large">
      <Text
        css={{
          marginBottom: 0,
        }}
        variant="small">
        © {currentYear} Jackson Dolman
      </Text>

      <Button size="small" onClick={toggleTheme}>
        {themeName === "light" ? "Dark" : "Light"}
      </Button>
    </Stack>
  );
}
