/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

import { Grid, Tag, Text } from "../components";
import { useAudio } from "../hooks";

export default function Home(): JSX.Element {
  const { listening, image } = useAudio();
  return (
    <Grid>
      <Grid as="section" direction="row">
        <Grid direction="column" width={40} collapse={30}>
          <Image src={image} alt={listening} fill className="fill" />
        </Grid>
        <Grid direction="column" width={60} collapse={70} top={6} bottom={6}>
          <Text>
            I'm a frontend developer based in Brooklyn, NY. I am currently working on technology for
            short-term rentals at{" "}
            <a href="https://cosmogroup.io" target="_blank" rel="noreferrer">
              Cosmo
            </a>
            , a I co-founded in 2019. I also work with startups over at{" "}
            <a href="https://planare.dev" target="_blank" rel="noreferrer">
              Planare
            </a>
            .
          </Text>
          <Text top={5} bottom={5}>
            My best work is with React (Next.js) and TypeScript. I'm interested in developing for
            the web, and optimizing for performance and cogent code.
          </Text>

          {image && image !== "" && (
            <Tag>
              <Grid
                flex="center"
                css={{
                  display: "inline-block",
                  marginRight: "0.5rem",
                  position: "relative",
                  verticalAlign: "middle",
                }}>
                <Image
                  src={image}
                  alt={listening}
                  width={28}
                  height={28}
                  style={{
                    borderRadius: "100%",
                  }}
                />
              </Grid>
              <Text inline={1}>{listening}</Text>
            </Tag>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
