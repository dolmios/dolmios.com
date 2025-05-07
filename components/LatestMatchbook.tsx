import Image from "next/image";
import { type JSX } from "react";

import gradient from "../public/gradient.svg";
import { Card, Typography } from "../ui";
import styles from "./LatestMatchbook.module.css";

interface MatchbookData {
  id: string;
  location: string;
  story: string;
  title: string;
  year: string;
}

const allMatchbooks: MatchbookData[] = [
  {
    id: "m1",
    title: "The Carlyle",
    location: "New York",
    year: "2019",
    story: "A classic spot, late night jazz.",
  },
  {
    id: "m2",
    title: "Cafe Bohemia",
    location: "Paris",
    year: "2018",
    story: "Artistic vibes, morning coffee.",
  },
  {
    id: "m3",
    title: "Dante",
    location: "New York",
    year: "2020",
    story: "Negronis on point, historic bar.",
  },
  {
    id: "m4",
    title: "Hotel Alfonso XIII",
    location: "Seville",
    year: "2017",
    story: "Spanish charm, solo trip memory.",
  },
  {
    id: "m5",
    title: "Bar Pisellino",
    location: "New York",
    year: "2021",
    story: "Perfect aperitivo, summer evening.",
  },
  {
    id: "m6",
    title: "Claridge's",
    location: "London",
    year: "2019",
    story: "Timeless elegance, afternoon tea.",
  },
];

// Get the 3 latest matchbooks
const latestThreeMatchbooks = allMatchbooks.slice(-3);

const SingleMatchbookDisplay = ({ matchbook }: { matchbook: MatchbookData }) => (
  <div className={styles.matchbookItem}>
    <div className={styles.imageContainer}>
      <Image
        alt={matchbook.title}
        fill
        priority
        src={gradient}
        style={{ objectFit: "cover", opacity: 0.7 }}
      />
    </div>
    <div className={styles.matchbookInfo}>
      <Typography as="h4" className={styles.matchbookTitle}>
        {matchbook.title}
      </Typography>
      <Typography className={styles.matchbookMeta}>
        {matchbook.location}, {matchbook.year}
      </Typography>
    </div>
  </div>
);

export function LatestMatchbook(): JSX.Element | null {
  if (latestThreeMatchbooks.length < 3) {
    return null;
  }

  return (
    <Card border header="Latest Matchbooks" className={styles.fill}>
      <div className={styles.matchbookGrid}>
        <SingleMatchbookDisplay matchbook={latestThreeMatchbooks[0]} />
        <SingleMatchbookDisplay matchbook={latestThreeMatchbooks[1]} />
        <SingleMatchbookDisplay matchbook={latestThreeMatchbooks[2]} />
      </div>
    </Card>
  );
} 