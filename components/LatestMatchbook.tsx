import Image from "next/image";
import { type JSX } from "react";

import gradient from "../public/gradient.svg";
import { Card, Text } from "stoop";

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

const matchbookItemStyle = {
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: "var(--space-2)",
  alignItems: "center",
  width: "100%",
};

const imageContainerStyle = {
  position: "relative" as const,
  width: 60,
  height: 45,
  minWidth: 60,
  borderRadius: 4,
  overflow: "hidden" as const,
  boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
};

const matchbookInfoStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: 0,
  overflow: "hidden" as const,
};

const matchbookTitleStyle = {
  fontSize: 13,
  fontWeight: 500,
  margin: 0,
  whiteSpace: "nowrap" as const,
  overflow: "hidden" as const,
  textOverflow: "ellipsis" as const,
};

const matchbookMetaStyle = {
  opacity: 0.7,
  margin: 0,
  fontSize: 11,
  whiteSpace: "nowrap" as const,
  overflow: "hidden" as const,
  textOverflow: "ellipsis" as const,
};

const matchbookGridStyle = {
  flexGrow: 1,
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "var(--space-2)",
  padding: "var(--space-3) var(--space-2)",
  alignItems: "center",
};

const SingleMatchbookDisplay = ({ matchbook }: { matchbook: MatchbookData }) => (
  <div style={matchbookItemStyle}>
    <div style={imageContainerStyle}>
      <Image
        alt={matchbook.title}
        fill
        priority
        src={gradient}
        style={{ objectFit: "cover", opacity: 0.7 }}
      />
    </div>
    <div style={matchbookInfoStyle}>
        <Text as="h4" css={matchbookTitleStyle}>
        {matchbook.title}
      </Text>
      <Text css={matchbookMetaStyle}>
        {matchbook.location}, {matchbook.year}
      </Text>
    </div>
  </div>
);

export function LatestMatchbook(): JSX.Element | null {
  if (latestThreeMatchbooks.length < 3) {
    return null;
  }

  return (
    <Card variant="default" css={{ height: "100%" }}>
      <div style={matchbookGridStyle}>
        <SingleMatchbookDisplay matchbook={latestThreeMatchbooks[0]} />
        <SingleMatchbookDisplay matchbook={latestThreeMatchbooks[1]} />
        <SingleMatchbookDisplay matchbook={latestThreeMatchbooks[2]} />
      </div>
    </Card>
  );
} 