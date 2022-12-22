/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

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
        <Grid direction="column" top={6} bottom={6} width={40} collapse={100} flex="baseline">
          <Text as="h1">Frontend-forward Developer, based in New York (by way of Melbourne)</Text>
          <Text>
            Monikered as{" "}
            <code>
              <a href="https://github.com/dolmios" target="_blank" rel="noreferrer">
                dolmios
              </a>
            </code>{" "}
            on the internet superhighway. No relation to the delicious Australian pasta sauce brand
            owned by Mars, Incorporated. Unfortunately.
          </Text>

          <Text top={4}>
            I write code for the web, and I love to do it. I'm currently working with startups at{" "}
            <code>
              <a href="https://planare.dev" target="_blank" rel="noreferrer">
                Planare
              </a>
            </code>
            . I also advise to a few companies on their tech stack and product strategy, notably{" "}
            <code>
              <a href="https://cosmogroup.io" target="_blank" rel="noreferrer">
                Cosmo
              </a>
            </code>
            .
          </Text>

          <Text top={4}>
            I have a firm focus on delivering the most organized, maintainable, and performant code
            I can. I'm a big fan of the timeless{" "}
            <code>
              <a
                href="https://www.youtube.com/watch?v=tc4ROCJYbm0"
                target="_blank"
                rel="noreferrer">
                Unix Philosophy
              </a>
            </code>
            .
          </Text>

          <Text top={4}>
            I mostly work with Typescript and Next.js, alongside a variety of other technologies.
            You can find my resume at{" "}
            <Link href="/resume">
              <code>dolmios.com/resume</code>
            </Link>
            .
          </Text>

          <Text top={4}>
            I enjoy when strangers hit me up by email, and I love talking shop. If you'd like to get
            in touch, you can reach me at{" "}
            <code>
              <a href="mailto:mail@dolmios.com">mail@dolmios.com</a>
            </code>
          </Text>
          <Text top={4}>Thank you for stopping by.</Text>

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
