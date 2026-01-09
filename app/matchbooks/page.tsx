import type { JSX } from "react";

import { Stack, Text } from "stoop-ui";

import { MatchbookCard } from "@/components/Matchbook";
import { db } from "@/db";
import { matchbooks, type Matchbook } from "@/db/schema";

export default async function MatchbooksPage(): Promise<JSX.Element> {
  const allMatchbooks = await db.select().from(matchbooks);

  return (
    <Stack direction="column" gap="large">
      <Text>
        Matchbooks
      </Text>
      <Stack
        css={{
          desktop: {
            gridTemplateColumns: "repeat(5, 1fr)",
          },
          display: "grid",
          gap: "$medium",
          gridTemplateColumns: "repeat(3, 1fr)",
          mobile: {
            gridTemplateColumns: "1fr",
          },
        }}>
        {allMatchbooks.map((matchbook: Matchbook) => (
          <MatchbookCard key={matchbook.id} matchbook={matchbook} />
        ))}
      </Stack>
    </Stack>
  );
}
