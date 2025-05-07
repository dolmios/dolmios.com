import Head from "next/head";
import Link from "next/link";
import type { JSX } from "react";

import { Grid, Text, Tag, Box, Projects, Mindmap, AnalogClock, Song, LatestMatchbook } from "../components";

export default function Home(): JSX.Element {
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
        <title>Jackson Dolman</title>
        <meta
          content="Jackson Dolman is a full-stack web developer based in New York City."
          name="description"
        />
      </Head>
      
      <Box border padding={3}>
        <Text>Jackson Dolman is a full-stack developer based in New York City.</Text>
        <Text bottom={3} top={2}>
          He is currently leading design at <Link href="#">farewell</Link>
          {' '}and wearing all the hats at <Link href="#">Numeric<sup>123</sup></Link>.
        </Text>
          <Tag bold link>Available for Q2 2025 ✺</Tag>
      </Box>
      
      {/* Skills Mindmap */}
      <Mindmap />
      
      <Grid
        css={{
          display: "grid",
          gridTemplateColumns: "4fr 4fr 2fr",
          gap: "$4",
          
          "@media (max-width: 768px)": {
            gridTemplateColumns: "1fr",
          },
        }}>
        <Box border shadow>
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
            Services
          </Text>
          <Grid css={{ padding: "$3" }}>
            <Text css={{ margin: "$1 0" }}>Full-Stack Development</Text>
            <Text css={{ margin: "$1 0" }}>Digital Product Design</Text>
            <Text css={{ margin: "$1 0" }}>API Integrations</Text>
            <Text css={{ margin: "$1 0" }}>Cloud Architecture</Text>
            <Text css={{ margin: "$1 0" }}>Technical Strategy</Text>
            <Text css={{ margin: "$1 0" }}>UI/UX Implementation</Text>
          </Grid>
        </Box>
        
        <Box border shadow>
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
            Clients
          </Text>
          <Grid css={{ padding: "$3" }}>
            <Text css={{ margin: "$1 0" }}>Cosmo Group</Text>
            <Text css={{ margin: "$1 0" }}>Tech Innovators</Text>
            <Text css={{ margin: "$1 0" }}>Future Labs</Text>
            <Text css={{ margin: "$1 0" }}>Product Systems</Text>
          </Grid>
        </Box>
        
        <AnalogClock />
      </Grid>
      
      {/* Projects section */}
      <Projects />
      
      {/* Currently Listening & Latest Matchbook */}
      <Grid 
        css={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr", // Two equal columns
          gap: "$4",
          "@media (max-width: 1024px)": { // Stack on smaller screens
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Song />
        <LatestMatchbook />
      </Grid>
    </Grid>
  );
}
