import type { JSX } from "react";

import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge, Stack, Text } from "stoop-ui";

import { Map } from "@/app/matchbooks/components/Map";
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

  const addressParts = [
    matchbook.street,
    matchbook.city,
    matchbook.state,
    matchbook.country,
  ].filter(Boolean);
  const addressString = addressParts.join(", ");

  const locationParts = [matchbook.city, matchbook.state, matchbook.country].filter(Boolean);
  const locationString = locationParts.join(", ");
  const hasAllLocationFields = matchbook.city && matchbook.state && matchbook.country;

  return (
    <Stack direction="column" gap="large">
      <Stack direction="column" gap="medium">
        <Stack align="center" direction="row" gap="small" wrap>
          <Text bottom="none">{matchbook.title}</Text>
          {matchbook.description && (
            <Text
              bottom="none"
              css={{
                opacity: "$hover",
              }}
              variant="small">
              &quot;{matchbook.description}&quot;
            </Text>
          )}
        </Stack>

        <Stack direction="column" gap="medium">
          <Stack direction="row" gap="small" wrap>
            <Badge variant="outline">
              Scanned{" "}
              {new Date(matchbook.date).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </Badge>
            {matchbook.established && (
              <Badge variant="outline">Established: {matchbook.established}</Badge>
            )}
            {addressString && <Badge variant="outline">{addressString}</Badge>}
          </Stack>
        </Stack>
      </Stack>

      {hasAllLocationFields && (
        <Stack
          css={{
            height: "300px",
            width: "100%",
          }}>
          <Map location={locationString} />
        </Stack>
      )}

      <Stack
        css={{
          gap: "$large",
          mobile: {
            flexDirection: "column",
          },
        }}
        direction="row"
        wrap>
        <Stack
          css={{
            aspectRatio: "3/4",
            backgroundColor: "#000",
            flex: 1,
            position: "relative",
          }}>
          <Image
            alt={matchbook.title}
            fill
            priority
            quality={100}
            sizes="(max-width: 768px) 100vw, 50vw"
            src={matchbook.primaryImage}
            style={{
              borderRadius: "8px",
              objectFit: "contain",
            }}
          />
        </Stack>

        <Stack
          css={{
            aspectRatio: "3/4",
            backgroundColor: "#000",
            flex: 1,
            position: "relative",
          }}>
          <Image
            alt={`${matchbook.title} - back`}
            fill
            priority
            quality={100}
            sizes="(max-width: 768px) 100vw, 50vw"
            src={matchbook.secondaryImage}
            style={{
              borderRadius: "8px",
              objectFit: "contain",
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
