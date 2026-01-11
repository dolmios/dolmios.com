import type { JSX } from "react";

import { Stack, Text } from "stoop-ui";

import { Filters } from "@/app/matchbooks/components/Filters";
import { db } from "@/db";
import { matchbooks } from "@/db/schema";

export default async function MatchbooksPage(): Promise<JSX.Element> {
  const allMatchbooks = await db.select().from(matchbooks);

  return (
    <Stack direction="column" gap="large">
      <Stack>
        <Text>Matchbooks</Text>
      </Stack>
      <Filters matchbooks={allMatchbooks} />
    </Stack>
  );
}
