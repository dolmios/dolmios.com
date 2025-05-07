import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import type { JSX } from "react";

import { Grid, Text, Box, Tag } from "../components";
import gradient from "../public/gradient.svg";
import { styled } from "../stitches.config";

interface Matchbook {
  id: string;
  location: string;
  story: string;
  title: string;
  year: string;
}

const MatchbooksGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "$4",
  width: "100%",
  padding: "$3",

  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
  },
});

const ImageContainer = styled("div", {
  width: "100%",
  position: "relative",
  aspectRatio: "1/1",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  overflow: "hidden",
  marginBottom: "$3",
});

const MatchbookItem = ({ matchbook }: { matchbook: Matchbook }): JSX.Element => {
  return (
    <Box 
      border 
      css={{ 
        padding: 0,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          cursor: "pointer",
        }
      }}
    >
      <ImageContainer>
        <Image 
          alt={matchbook.title} 
          fill
          priority
          src={gradient}
          style={{ objectFit: "cover", opacity: 0.7 }}
        />
      </ImageContainer>
      <Grid css={{ padding: "$3" }}>
        <Text as="h3" css={{ fontSize: "18px", fontWeight: "500", marginBottom: "$2" }}>
          {matchbook.title}
        </Text>
        <Text css={{ opacity: 0.7, fontSize: "14px", marginBottom: "$2" }}>
          {matchbook.location}, {matchbook.year}
        </Text>
        <Text as="p" css={{ 
          opacity: 0.7, 
          fontSize: "14px", 
          lineHeight: 1.5,
          height: "63px", 
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          textOverflow: "ellipsis",
        }}>
          {matchbook.story}
        </Text>
      </Grid>
    </Box>
  );
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
    <Grid
      as="main"
      css={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        gap: "$4",
      }}>
      <Head>
        <title>Matchbooks | Jackson Dolman</title>
        <meta
          content="A collection of matchbooks and their stories from around the world."
          name="description"
        />
      </Head>

      <Box border css={{ padding: 0, marginBottom: "$4" }}>
        <Text
          as="h2"
          css={{
            fontSize: "14px",
            fontWeight: "normal",
            textTransform: "uppercase",
            marginBottom: 0,
            padding: "$2 $3",
            borderBottom: "1px solid $border",
          }}>
          Matchbooks
        </Text>
        
        <Box css={{ padding: "$3" }}>
          <Text>A collection of matchbooks and the stories behind them.</Text>
        </Box>
        
        <MatchbooksGrid>
          {matchbooks.map((matchbook) => (
            <MatchbookItem key={matchbook.id} matchbook={matchbook} />
          ))}
        </MatchbooksGrid>
      </Box>

      <Grid css={{ 
        display: "flex", 
        justifyContent: "flex-end",
        gap: "$2"
      }}>
        <Tag small>© {new Date().getFullYear()}</Tag>
        <Tag link small><Link href="/privacy">Privacy</Link></Tag>
      </Grid>
    </Grid>
  );
} 