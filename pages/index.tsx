/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import Image from "next/image";

import { Grid, Tag, Text } from "../components";
import { useAudio } from "../hooks";

export default function Home(): JSX.Element {
  const { listening, image } = useAudio();

  return (
    <Grid as="main">
      <Head>
        <title>Jackson Dolman</title>
      </Head>
      <Grid as="section" direction="row">
        <Grid direction="column" top={6} bottom={6} width={50} collapse={50} flex="baseline">
          <Text as="h1">Developer, based in Brooklyn NY.</Text>
          <Text as="p">
            Goes as <code>dolmios</code> on the internet mostly. No relation to this delicious
            Australian pasta sauce brand, owned by Mars Corp.
          </Text>
          <Text as="p" top={4}>
            I'm a software engineer, currently working with startups via Planare. I'm also advising
            and writing code for Cosmo, a company I co-founded in 2019.
          </Text>

          <Grid top={6}>
            <Text bottom={2} as="small" css={{ display: "block" }}>
              Currently listening to:
            </Text>
            <Tag>
              <Image src={image} alt={listening} width={22} height={22} />
              <Text css={{ marginLeft: "$4" }}>{listening}</Text>
            </Tag>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
