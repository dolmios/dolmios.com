import Link from "next/link";
import type { JSX } from "react";

import { Block, Card, Tag, Typography } from "@/ui";

export const metadata = {
  title: "404 - Page Not Found",
};

export default function NotFound(): JSX.Element {
  return (
    <Block
      as="main"
      direction="column"
      align="center"
      justify="center"
      css={{
        minHeight: "100vh",
        width: "100%",
        background: "rgba(0,0,0,0.85)",
      }}
    >
      <Card border shadow header="404 - Not Found" css={{ maxWidth: 420, width: "100%" }}>
        <Block direction="column" align="center" gap={3}>
          <Typography as="h1" css={{ fontSize: 32, fontWeight: 700 }}>
            Page Not Found
          </Typography>
          <Typography css={{ opacity: 0.7 }}>
            The page you are looking for does not exist.<br />
            Please check the URL and try again.
          </Typography>
          <Tag bold link>
            <Link href="/">✺ Return to homepage</Link>
          </Tag>
        </Block>
      </Card>
    </Block>
  );
} 