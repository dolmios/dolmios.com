"use client";

import type { JSX } from "react";

import { Section, Stack, useBreakpoints } from "stoop";
import Bio from "@/components/Bio";
import { Song } from "@/components/Song";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
export default function Home(): JSX.Element {
  return (
    <Section top="large" bottom="large" wide as="main"  >
      <Stack direction="column" gap="medium">
    <Bio />
    <Projects />

    <Stack direction="row" gap="medium" minimal>
        <Services />
        <Song />
      </Stack>
      </Stack>
    </Section>
  );
} 