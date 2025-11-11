import Image from "next/image";
import { type JSX } from "react";

import { Card, Text } from "@/ui";

import gradient from "../public/gradient.svg";

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
    location: "New York",
    story: "A classic spot, late night jazz.",
    title: "The Carlyle",
    year: "2019",
  },
  {
    id: "m2",
    location: "Paris",
    story: "Artistic vibes, morning coffee.",
    title: "Cafe Bohemia",
    year: "2018",
  },
  {
    id: "m3",
    location: "New York",
    story: "Negronis on point, historic bar.",
    title: "Dante",
    year: "2020",
  },
  {
    id: "m4",
    location: "Seville",
    story: "Spanish charm, solo trip memory.",
    title: "Hotel Alfonso XIII",
    year: "2017",
  },
  {
    id: "m5",
    location: "New York",
    story: "Perfect aperitivo, summer evening.",
    title: "Bar Pisellino",
    year: "2021",
  },
  {
    id: "m6",
    location: "London",
    story: "Timeless elegance, afternoon tea.",
    title: "Claridge's",
    year: "2019",
  },
];

// Get the 3 latest matchbooks
const latestThreeMatchbooks = allMatchbooks.slice(-3);

const matchbookItemStyle = {
  alignItems: "center",
  display: "grid",
  gap: "var(--space-2)",
  gridTemplateColumns: "auto 1fr",
  width: "100%",
};

const imageContainerStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: 4,
  boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
  height: 45,
  minWidth: 60,
  overflow: "hidden" as const,
  position: "relative" as const,
  width: 60,
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
  overflow: "hidden" as const,
  textOverflow: "ellipsis" as const,
  whiteSpace: "nowrap" as const,
};

const matchbookMetaStyle = {
  fontSize: 11,
  margin: 0,
  opacity: 0.7,
  overflow: "hidden" as const,
  textOverflow: "ellipsis" as const,
  whiteSpace: "nowrap" as const,
};

const matchbookGridStyle = {
  alignItems: "center",
  display: "grid",
  flexGrow: 1,
  gap: "var(--space-2)",
  gridTemplateColumns: "1fr 1fr 1fr",
  padding: "var(--space-3) var(--space-2)",
};

const SingleMatchbookDisplay = ({ matchbook }: { matchbook: MatchbookData }): JSX.Element => (
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
    <Card css={{ height: "100%" }} variant="default">
      <div style={matchbookGridStyle}>
        <SingleMatchbookDisplay matchbook={latestThreeMatchbooks[0]} />
        <SingleMatchbookDisplay matchbook={latestThreeMatchbooks[1]} />
        <SingleMatchbookDisplay matchbook={latestThreeMatchbooks[2]} />
      </div>
    </Card>
  );
}
