import type { JSX } from "react";

import Link from "next/link";

import gradient from "@/public/gradient.svg";
import { Block, Tag, Typography } from "@/ui";
import { Card } from "@/ui/Card";

import styles from "./page.module.css";

interface Matchbook {
  id: string;
  location: string;
  story: string;
  title: string;
  year: string;
}

const MatchbookItem = ({ matchbook }: { matchbook: Matchbook }): JSX.Element => {
  return (
    <Card border className={styles.matchbookCard} image={{ alt: matchbook.title, height: 250, url: gradient }}>
      <div>
        <Typography as="h3" className={styles.matchbookTitle}>
          {matchbook.title}
        </Typography>
        <Typography className={styles.matchbookMeta}>
          {matchbook.location}, {matchbook.year}
        </Typography>
        <Typography as="p" className={styles.matchbookDescription}>
          {matchbook.story}
        </Typography>
      </div>
    </Card>
  );
};

export const metadata = {
  description: "A collection of matchbooks and their stories from around the world.",
  title: "Matchbooks | Jackson Dolman",
};

export default function Matchbooks(): JSX.Element {
  // Simulated matchbook data
  const matchbooks: Matchbook[] = [
    {
      id: "m1",
      location: "New York",
      story: "Found this matchbook after a late night jazz session at Bemelmans Bar. The piano player had been there for 30 years.",
      title: "The Carlyle",
      year: "2019",
    },
    {
      id: "m2",
      location: "Paris",
      story: "Left behind by a writer who spent every morning typing away on an ancient typewriter by the window.",
      title: "Cafe Bohemia",
      year: "2018",
    },
    {
      id: "m3",
      location: "New York",
      story: "Their negronis are legendary. This matchbook reminds me of the first time I visited with friends from college.",
      title: "Dante",
      year: "2020",
    },
    {
      id: "m4",
      location: "Seville",
      story: "The hotel where I stayed during a solo trip through Spain. The architecture was breathtaking.",
      title: "Hotel Alfonso XIII",
      year: "2017",
    },
    {
      id: "m5",
      location: "New York",
      story: "A perfect summer evening with aperitivos on the sidewalk watching the city go by.",
      title: "Bar Pisellino",
      year: "2021",
    },
    {
      id: "m6",
      location: "London",
      story: "Afternoon tea that turned into evening cocktails. This matchbook was in my pocket when I got caught in the rain.",
      title: "Claridge's",
      year: "2019",
    },
  ];

  return (
    <Block
      as="main"
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
        minHeight: "100vh",
      }}
    >
      <Block
        css={{
          border: "1px solid var(--border)",
          marginBottom: "var(--space-4)",
          padding: 0,
        }}
      >
        <Typography
          as="h2"
          css={{
            borderBottom: "1px solid var(--border)",
            fontSize: "14px",
            fontWeight: "normal",
            marginBottom: 0,
            padding: "var(--space-2) var(--space-3)",
            textTransform: "uppercase",
          }}
        >
          Matchbooks
        </Typography>

        <Block css={{ padding: "var(--space-3)" }}>
          <Typography>A collection of matchbooks and the stories behind them.</Typography>
        </Block>

        <div className={styles.matchbooksContainer}>
          {matchbooks.map((matchbook) => (
            <MatchbookItem key={matchbook.id} matchbook={matchbook} />
          ))}
        </div>
      </Block>

      <Block
        css={{
          display: "flex",
          gap: "var(--space-2)",
          justifyContent: "flex-end",
        }}
      >
        <Tag small>© {new Date().getFullYear()}</Tag>
        <Tag link small>
          <Link href="/privacy">Privacy</Link>
        </Tag>
      </Block>
    </Block>
  );
}
