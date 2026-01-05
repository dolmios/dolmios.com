"use client";

import type { JSX } from "react";
import { Stack } from "stoop-ui";

import { Song } from "../../components";

export default function SongPage(): JSX.Element {
  return (
    <Stack
      as="main"
      align="center"
      css={{
        textAlign: "center",
      }}
      direction="column"
      justify="center"
      top="small">
      <Song />
    </Stack>
  );
}
