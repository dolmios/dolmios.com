import type { JSX } from "react";

import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Stack, Text } from "stoop-ui";

import { Map } from "@/components/Map";
import { db } from "@/db";
import { matchbooks } from "@/db/schema";

export const dynamicParams = true;

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  const allMatchbooks = await db.select().from(matchbooks);

  return allMatchbooks.map((matchbook) => ({
    id: matchbook.id,
  }));
}

export default async function MatchbookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<JSX.Element> {
  const { id } = await params;
  const [matchbook] = await db.select().from(matchbooks).where(eq(matchbooks.id, id)).limit(1);

  if (!matchbook) {
    notFound();
  }

  const locationParts = [matchbook.city, matchbook.state, matchbook.country].filter(Boolean);
  const locationString = locationParts.join(", ");

  return (
    <Stack direction="column" gap="large">
      <Stack direction="column" gap="medium">
        <Text bottom="none">{matchbook.title}</Text>

        <Stack direction="column" gap="medium">
          <Text color="secondary">{matchbook.description}</Text>
          <Stack direction="row" gap="small">
            <Text color="secondary" variant="small">
              {new Date(matchbook.date).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </Text>
            {locationParts.length > 0 && (
              <>
                <Text color="secondary" variant="small">
                  •
                </Text>
                <Text color="secondary" variant="small">
                  {locationString}
                </Text>
              </>
            )}
          </Stack>
        </Stack>
      </Stack>

      <Stack
        css={{
          "@media (max-width: 768px)": {
            flexDirection: "column",
          },
          gap: "$large",
        }}
        direction="row">
        <Stack
          css={{
            aspectRatio: "3/4",
            flex: 1,
            position: "relative",
          }}>
          <Image
            alt={matchbook.title}
            fill
            priority
            src={matchbook.primaryImage}
            style={{
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        </Stack>

        <Stack
          css={{
            aspectRatio: "3/4",
            flex: 1,
            position: "relative",
          }}>
          <Image
            alt={`${matchbook.title} - back`}
            fill
            priority
            src={matchbook.secondaryImage}
            style={{
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        </Stack>
      </Stack>

      {locationString && (
        <Stack
          css={{
            "@media (min-width: 768px)": {
              height: "400px",
            },
            height: "300px",
            width: "100%",
          }}>
          <Map location={locationString} />
        </Stack>
      )}
    </Stack>
  );
}
