import type { JSX } from "react";

import { Mindmap, AnalogClock, Song, LatestMatchbook } from "@/components";
  import { Block, Card, Tag, Typography } from "@/ui";
import Link from "next/link";
import { clients, services } from "@/data";

import { Projects } from "@/components/Projects";


export default function Home(): JSX.Element {
  return (
    <Block
      direction="column"
      as="main"
      gap={4}>
      <Card border>
        <Typography>Jackson Dolman is a full-stack developer based in New York City.</Typography>
        <Typography bottom={3} top={2}>
          He is currently leading design at <Link href="#">farewell</Link>
          {' '}and wearing all the hats at <Link href="#">Numeric<sup>123</sup></Link>.
        </Typography>
        <Tag bold link>Available for Q2 2025 ✺</Tag>
      </Card>
      <Mindmap />
      
      <Block direction="row" gap={4}>
        <Card
          border
          shadow
          header="Services">
          {services.map((service) => (
            <Typography key={service} css={{ margin: "var(--space-1) 0" }}>
              {service}
            </Typography>
          ))}
        </Card>
        <Card
          border
          shadow
          header="Clients">
          {clients.map((client) => (
            <Typography key={client} css={{ margin: "var(--space-1) 0" }}>
              {client}
            </Typography>
          ))}
        </Card>
        <AnalogClock />
      </Block>

      <Projects />
    
      <Block direction="row" gap={4} align="stretch">
        <Song />
        <LatestMatchbook />
      </Block>
    </Block>
  );
} 