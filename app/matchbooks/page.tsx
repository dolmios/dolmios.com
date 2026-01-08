import type { JSX } from "react";

import { Stack, Text } from "stoop-ui";

import { MatchbookCard } from "@/components/Matchbook";
import { db } from "@/db";
import { matchbooks, type Matchbook } from "@/db/schema";

export default async function MatchbooksPage(): Promise<JSX.Element> {
  const allMatchbooks = await db.select().from(matchbooks);

  return (
    <Stack direction="column" gap="large">
      <Text as="h1" size="xlarge">
        Matchbooks
      </Text>
      <Stack
        css={{
          "@media (max-width: 400px)": {
            gridTemplateColumns: "1fr",
          },
          "@media (max-width: 600px)": {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
          "@media (max-width: 900px)": {
            gridTemplateColumns: "repeat(3, 1fr)",
          },
          "@media (max-width: 1200px)": {
            gridTemplateColumns: "repeat(4, 1fr)",
          },
          display: "grid",
          gap: "$medium",
          gridTemplateColumns: "repeat(5, 1fr)",
        }}>
        {allMatchbooks.map((matchbook: Matchbook) => (
          <MatchbookCard key={matchbook.id} matchbook={matchbook} />
        ))}
      </Stack>
    </Stack>
  );
}
