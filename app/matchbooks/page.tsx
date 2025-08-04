import Link from "next/link";
import type { JSX } from "react";

import styles from "./page.module.css";

import gradient from "@/public/gradient.svg";
import { Block, Typography, Tag } from "@/ui";
import { Card } from "@/ui/Card";

interface Matchbook {
  id: string;
  location: string;
  story: string;
  title: string;
  year: string;
}

const MatchbookItem = ({ matchbook }: { matchbook: Matchbook }): JSX.Element => {
  return (
    <Card border className={styles.matchbookCard} image={{ url: gradient, alt: matchbook.title, height: 250 }}>
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
  title: "Matchbooks | Jackson Dolman",
  description: "A collection of matchbooks and their stories from around the world.",
};

export default function Matchbooks(): JSX.Element {
  // Simulated matchbook data
  const matchbooks: Matchbook[] = [
    {
      id: "m1",
      title: "The Carlyle",
      location: "New York",
      year: "2019",
      story: "Found this matchbook after a late night jazz session at Bemelmans Bar. The piano player had been there for 30 years."
    },
    {
      id: "m2",
      title: "Cafe Bohemia",
      location: "Paris",
      year: "2018",
      story: "Left behind by a writer who spent every morning typing away on an ancient typewriter by the window."
    },
    {
      id: "m3",
      title: "Dante",
      location: "New York",
      year: "2020",
      story: "Their negronis are legendary. This matchbook reminds me of the first time I visited with friends from college."
    },
    {
      id: "m4",
      title: "Hotel Alfonso XIII",
      location: "Seville",
      year: "2017",
      story: "The hotel where I stayed during a solo trip through Spain. The architecture was breathtaking."
    },
    {
      id: "m5",
      title: "Bar Pisellino",
      location: "New York",
      year: "2021",
      story: "A perfect summer evening with aperitivos on the sidewalk watching the city go by."
    },
    {
      id: "m6",
      title: "Claridge's",
      location: "London",
      year: "2019",
      story: "Afternoon tea that turned into evening cocktails. This matchbook was in my pocket when I got caught in the rain."
    }
  ];

  return (
    <Block
      as="main"
      css={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        gap: "var(--space-4)",
      }}>
      <Block 
        css={{ 
          border: "1px solid var(--border)",
          padding: 0,
          marginBottom: "var(--space-4)",
        }}>
        <Typography
          as="h2"
          css={{
            fontSize: "14px",
            fontWeight: "normal",
            textTransform: "uppercase",
            marginBottom: 0,
            padding: "var(--space-2) var(--space-3)",
            borderBottom: "1px solid var(--border)",
          }}>
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

      <Block css={{ 
        display: "flex", 
        justifyContent: "flex-end",
        gap: "var(--space-2)"
      }}>
        <Tag small>© {new Date().getFullYear()}</Tag>
        <Tag link small><Link href="/privacy">Privacy</Link></Tag>
      </Block>
    </Block>
  );
} 