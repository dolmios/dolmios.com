"use client";
import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, useState, type JSX } from "react";
import { Button, Stack } from "stoop-ui";

import type { Matchbook } from "@/db/schema";

export function MatchbookCard({ matchbook }: { matchbook: Matchbook }): JSX.Element {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsFlipped((prev) => !prev);
  };

  return (
    <Link href={`/matchbooks/${matchbook.id}`} prefetch>
      <Stack
        css={{
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
            opacity: isFlipped ? 0 : 1,
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
            opacity: isFlipped ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
        <Button
          css={{
            position: "absolute",
            right: "$small",
            top: "$small",
            zIndex: 10,
          }}
          size="small"
          onClick={handleFlip}>
          {"\u21BB"}
        </Button>
      </Stack>
    </Link>
  );
}
