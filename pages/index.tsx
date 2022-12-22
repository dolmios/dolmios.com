/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

import { Grid, Tag, Text } from "../components";
import { useAudio } from "../hooks";

export default function Home(): JSX.Element {
  const { listening, image } = useAudio();
  return (
    <Grid as="main">
      <Grid as="section" direction="row">
        <Grid direction="column" top={6} bottom={6} width={50} collapse={100}>
          <Text as="h4">Developer, based in Brooklyn NY.</Text>
          <Text as="p">
            Goes as <code>dolmios</code> on the internet mostly. No relation to this delicious
            Australian pasta sauce brand, owned by Mars Corp.
          </Text>
          <Text as="p">
            I'm a software engineer, currently working with startups via Planare. I'm also advising
            and writing code for Cosmo, a company I co-founded in 2019.
          </Text>
          {image && image !== "" && (
            <Grid top={6}>
              <Tag>
                <Grid
                  css={{
                    display: "inline-block",
                    marginRight: "0.5rem",
                    verticalAlign: "middle !important",
                  }}>
                  <Image
                    src={image}
                    alt={listening}
                    width={22}
                    height={22}
                    style={{
                      borderRadius: "100%",
                    }}
                  />
                </Grid>
                <Text as="small" inline={1}>
                  {listening}
                </Text>
              </Tag>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
