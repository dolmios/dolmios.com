import { styled, type CSS } from "@stitches/react";
import Image from "next/image";
import { type JSX } from "react";

import gradient from "../public/gradient.svg";

import { Box } from "./Box";
import { Grid } from "./Grid";
import { Text } from "./Text";

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

const MatchbookImageContainer = styled("div", {
  position: 'relative',
  width: '60px', // 4 part of 4:3 ratio
  height: '45px', // 3 part of 4:3 ratio
  minWidth: '60px',
  borderRadius: '4px',
  overflow: 'hidden',
  boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
  backgroundColor: "rgba(255, 255, 255, 0.05)",
});

interface LatestMatchbookProps {
  css?: CSS;
}

const SingleMatchbookDisplay = ({ matchbook }: { matchbook: MatchbookData }) => (
  <Grid
    css={{
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: "$2",
      alignItems: "center",
      width: '100%',
    }}
  >
    <MatchbookImageContainer>
      <Image
        alt={matchbook.title}
        fill
        priority
        src={gradient}
        style={{ objectFit: "cover", opacity: 0.7 }}
      />
    </MatchbookImageContainer>
    <Grid css={{ display: "flex", flexDirection: "column", gap: "$0", overflow: "hidden" }}>
      <Text as="h4" css={{ fontSize: "13px", fontWeight: 500, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {matchbook.title}
      </Text>
      <Text css={{ opacity: 0.7, margin: 0, fontSize: "11px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {matchbook.location}, {matchbook.year}
      </Text>
      {/* Story is likely too much for this density, keeping it omitted */}
    </Grid>
  </Grid>
);

export function LatestMatchbook({ css }: LatestMatchbookProps): JSX.Element | null {
  if (latestThreeMatchbooks.length < 3) { // Check for at least 3 matchbooks
    return null; 
  }

  return (
    <Box border css={{ padding: 0, position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', ...css }}>
      <Text
        as="h2"
        css={{
          fontSize: "14px",
          fontWeight: "normal",
          textTransform: "uppercase",
          margin: 0,
          padding: "$2 $3",
          borderBottom: "1px solid $border",
          position: 'relative',
          zIndex: 2,
          flexShrink: 0,
        }}
      >
        Latest Matchbooks
      </Text>

      <Grid
        css={{
          flexGrow: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr", // Three items side-by-side
          gap: "$2", // Slightly reduced gap for 3 items
          padding: "$3 $2", // Adjust padding slightly if needed
          alignItems: "center",
        }}
      >
        <SingleMatchbookDisplay matchbook={latestThreeMatchbooks[0]} />
        <SingleMatchbookDisplay matchbook={latestThreeMatchbooks[1]} />
        <SingleMatchbookDisplay matchbook={latestThreeMatchbooks[2]} />
      </Grid>
    </Box>
  );
} 