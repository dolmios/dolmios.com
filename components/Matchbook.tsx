import type { JSX } from "react";

import Image from "next/image";
import Link from "next/link";
import { Stack } from "stoop-ui";

import type { Matchbook } from "@/db/schema";

export function MatchbookCard({ matchbook }: { matchbook: Matchbook }): JSX.Element {
  return (
    <Link href={`/matchbooks/${matchbook.id}`} prefetch>
      <Stack
        css={{
          "&:hover .primary": {
            opacity: 0,
          },
          "&:hover .secondary": {
            opacity: 1,
          },
          aspectRatio: "3/4",
          cursor: "pointer",
          position: "relative",
        }}>
        <Image
          alt={matchbook.title}
          className="primary"
          fill
          priority
          src={matchbook.primaryImage}
          style={{
            borderRadius: "8px",
            objectFit: "cover",
            opacity: 1,
            transition: "opacity 0.3s ease",
          }}
        />
        <Image
          alt={`${matchbook.title} - back`}
          className="secondary"
          fill
          src={matchbook.secondaryImage}
          style={{
            borderRadius: "8px",
            objectFit: "cover",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
        />
      </Stack>
    </Link>
  );
}
