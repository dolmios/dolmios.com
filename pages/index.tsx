/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Grid, Tag, Text, Icons, useFindYoutube, useSpotifyScrobbler } from "../components";

export default function Home(): JSX.Element {
  const [disclaimer, setDisclaimer] = useState(false);
  const [socials, setSocials] = useState(false);
  const { fallbackURL, singleLiner, trackArtist, trackCover, trackName } = useSpotifyScrobbler();
  const { youtubeURL } = useFindYoutube(trackName, trackArtist);

  return (
    <Grid as="main">
      <Head>
        <title>Jackson Dolman</title>
      </Head>
      <Grid as="section" direction="row">
        <Grid direction="column" top={6} bottom={6} width={42} collapse={100}>
          <Text as="h1">Frontend Developer</Text>
          <Text bottom={4}>
            Brooklyn, NY{" "}
            <Text as="span" css={{ opacity: 0.75 }}>
              (
              {new Date().toLocaleString("en-US", {
                timeStyle: "short",
                timeZone: "America/New_York",
              })}
              )
            </Text>{" "}
            previously Melbourne{" "}
            <Text as="span" css={{ opacity: 0.75 }}>
              (
              {new Date().toLocaleString("en-AU", {
                timeStyle: "short",
                timeZone: "Australia/Melbourne",
              })}
              )
            </Text>
          </Text>
          <Text>
            Monikered as{" "}
            <Text as="code">
              <a href="https://github.com/dolmios" target="_blank" rel="noreferrer">
                dolmios
              </a>
            </Text>{" "}
            on the information superhighway. Not affilitated with the delicious pasta sauce brand
            owned by{" "}
            <Text
              as="span"
              css={{ cursor: "pointer" }}
              onClick={(): void => setDisclaimer(!disclaimer)}>
              Mars, Incorporated*
            </Text>
          </Text>
          {disclaimer && (
            <Text as="small" top={5} bottom={5}>
              © {new Date().getFullYear()} Mars, Incorporated. All Rights Reserved. ® TM DOLMIO,
              BEN'S ORIGINAL™ MARS are Trademarks of Mars, Incorporated and its affiliates. An
              Affiliate of Mars, Incorporated.
            </Text>
          )}
          <Text top={4}>
            I work with startups at{" "}
            <Text as="code">
              <a href="https://planare.dev" target="_blank" rel="noreferrer">
                Planare
              </a>
            </Text>
            . I also advise several early-to-mid stage companies on their tech stacks and product
            strategies, recently{" "}
            <Text as="code">
              <a href="https://cosmogroup.io" target="_blank" rel="noreferrer">
                Cosmo
              </a>
            </Text>
          </Text>
          <Text top={4}>
            My daily mainstays are Typescript and Next.js, alongside a variety of other
            technologies. You can find my resume at{" "}
            <Link href="/resume">
              <Text as="code">dolmios.com/resume</Text>
            </Link>
          </Text>
          <Text top={4}>
            I have a firm focus on delivering the most organized, maintainable, and performant code
            I can. I'm a big fan of the timeless{" "}
            <Text as="code">
              <a
                href="https://www.youtube.com/watch?v=tc4ROCJYbm0?t=1420"
                target="_blank"
                rel="noreferrer">
                Unix Philosophy
              </a>
            </Text>
          </Text>

          <Text top={4}>
            I enjoy when strangers hit me up by email, and I love talking shop. If you'd like to get
            in touch, you can reach me at{" "}
            <Text as="code">
              <a href="mailto:mail@dolmios.com">mail@dolmios.com</a>
            </Text>{" "}
            or find me on{" "}
            <Text as="code" css={{ cursor: "pointer" }} onClick={(): void => setSocials(!socials)}>
              social media
            </Text>
          </Text>
          {socials && (
            <Grid top={5} bottom={5}>
              <Grid>
                <Icons.Arena />{" "}
                <Text as="p" inline={1} css={{ marginLeft: "$4" }}>
                  <Text as="strong" inline={4}>
                    Are.na
                  </Text>
                  <a href="https://are.na/dolmios" target="_blank" rel="noreferrer">
                    are.na/dolmios
                  </a>
                </Text>
              </Grid>
              <Grid>
                <Icons.Letterboxd />{" "}
                <Text as="p" inline={1} css={{ marginLeft: "$4" }}>
                  <Text as="strong" inline={4}>
                    Letterboxd
                  </Text>
                  <a href="https://letterboxd.com/dolmios/" target="_blank" rel="noreferrer">
                    letterboxd.com/dolmios
                  </a>
                </Text>
              </Grid>
              <Grid>
                <Icons.Literal />{" "}
                <Text as="p" inline={1} css={{ marginLeft: "$4" }}>
                  <Text as="strong" inline={4}>
                    Literal
                  </Text>
                  <a href="https://literal.club/dolmios" target="_blank" rel="noreferrer">
                    literal.club/dolmios
                  </a>
                </Text>
              </Grid>
              <Grid>
                <Icons.Twitter />{" "}
                <Text as="p" inline={1} css={{ marginLeft: "$4" }}>
                  <Text as="strong" inline={4}>
                    Twitter
                  </Text>
                  <a href="https://twitter.com/jacksondolman" target="_blank" rel="noreferrer">
                    twitter.com/jacksondolman
                  </a>
                </Text>
              </Grid>
            </Grid>
          )}
          <Grid top={6}>
            <Text bottom={3} as="small">
              Listening to:
            </Text>
            <Tag
              css={{
                "*": {
                  lineHeight: "normal",
                  verticalAlign: "middle",
                },
                alignItems: "center",
                paddingLeft: 0,
              }}>
              <a href={youtubeURL || fallbackURL || ""} target="_blank" rel="noreferrer">
                {trackCover && trackCover !== "#" && (
                  <Grid
                    css={{
                      borderRadius: "$1",
                      display: "inline-flex",
                      img: { borderRadius: "$1" },
                    }}>
                    <Image src={trackCover} alt={singleLiner} width={30} height={30} />
                  </Grid>
                )}
                <Text css={{ marginLeft: "$4" }}>{singleLiner}</Text>
              </a>
            </Tag>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
