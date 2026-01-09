import type { JSX } from "react";

import { Button, Stack, Text } from "stoop-ui";

export default function NotFound(): JSX.Element {
  return (
    <Stack
      as="main"
      bottom="large"
      css={{
        alignItems: "center",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        mobile: {
          paddingLeft: "$small",
          paddingRight: "$small",
        },
      }}
      direction="column"
      gap="small"
      left="medium"
      right="medium"
      top="large">
      <Stack
        align="center"
        css={{
          maxWidth: "600px",
          textAlign: "center",
        }}
        direction="column"
        gap="medium">
        <Text>
          <b>404</b>, The page you're looking for doesn't exist or has been moved.
        </Text>
      </Stack>

      <Stack
        align="center"
        css={{
          flexWrap: "wrap",
          marginTop: "$medium",
        }}
        direction="row"
        gap="small"
        justify="center">
        <Button as="a" href="/" size="small">
          {"\u273A"} Go home
        </Button>
      </Stack>
    </Stack>
  );
}
