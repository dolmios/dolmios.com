import type { JSX } from "react";

import Image from "next/image";
import Link from "next/link";
import { Button, Stack, Text } from "stoop-ui";

import { Song } from "@/components/Song";
import meImage from "@/public/me.jpg";

export default function Home(): JSX.Element {
  return (
    <Stack
      as="main"
      bottom="large"
      css={{
        alignItems: "center",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        mobile: {
          paddingLeft: "$small",
          paddingRight: "$small",
        },
      }}
      direction="column"
      gap="small"
      left="medium"
      right="medium"
      top="large">
      <Stack
        align="center"
        css={{
          marginBottom: "$large",
          maxWidth: "600px",
          textAlign: "center",
        }}
        direction="column"
        gap="large">
        <Image
          alt="Jackson Dolman"
          height={300}
          placeholder="blur"
          src={meImage}
          style={{
            borderRadius: "8px",
            objectFit: "cover",
            objectPosition: "center",
          }}
          width={300}
        />
        <Text>
          <b>Jackson Dolman</b>, Full-Stack Developer in New York. I build web applications, work
          with AI, and help teams ship product. I also collect{" "}
          <Link
            href="/matchbooks"
            style={{
              textDecoration: "underline",
            }}>
            matchbooks
          </Link>
          .
        </Text>
      </Stack>

      <Stack
        align="center"
        css={{
          flexWrap: "wrap",
        }}
        direction="row"
        gap="small"
        justify="center">
        <Button as="a" href="mailto:contact@dolmios.com" size="small">
          {"\u273A"} contact@dolmios.com
        </Button>
        {/* not ready yet
        <Button as="a" href="/matchbooks" size="small">
          {"\u273A"} matchbooks
        </Button>
        */}
        <Song />
      </Stack>
    </Stack>
  );
}
