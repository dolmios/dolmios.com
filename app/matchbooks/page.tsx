import type { JSX } from "react";

import { Card, Stack, Text } from "stoop-ui";

import { MatchbookCard } from "@/components/Matchbook";
import { db } from "@/db";
import { matchbooks, type Matchbook } from "@/db/schema";

export default async function MatchbooksPage(): Promise<JSX.Element> {
  const allMatchbooks = await db.select().from(matchbooks);

  return (
    <Stack direction="column" gap="large">
      <Stack>
        <Text>Matchbooks</Text>
        <Card css={{ padding: "$small" }}>
          <Text as="small">
            I am re-doing my scans this weekend (1/10). Check back Monday. (Below is placeholders.)
          </Text>
        </Card>
      </Stack>
      <Stack
        css={{
          desktop: {
            gridTemplateColumns: "repeat(5, 1fr)",
          },
          display: "grid",
          gap: "$medium",
          gridTemplateColumns: "repeat(3, 1fr)",
          mobile: {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
        }}>
        {allMatchbooks.map((matchbook: Matchbook) => (
          <MatchbookCard key={matchbook.id} matchbook={matchbook} />
        ))}
      </Stack>
    </Stack>
  );
}
