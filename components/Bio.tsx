import Link from "next/link";
import { useState } from "react";

import { useTimestamp } from "./hooks/useTimestamp";

import { Grid, Text, Icons } from ".";

export function Bio(): JSX.Element {
  const [socials, setSocials] = useState(false);

  const { isMounted, date, time } = useTimestamp();

  return (
    <Grid>
      <Text as="h1">FRONTEND DEVELOPER</Text>
      {isMounted && (
        <Text as="h3">
          {date}
          <br />
          New York, {time}
        </Text>
      )}

      <Text>
        Monikered on the information superhighway as{" "}
        <Text as="code">
          <a href="https://github.com/dolmios" rel="noreferrer" target="_blank">
            dolmios
          </a>
        </Text>{" "}
        &mdash; not affiliated with the pasta sauce brand owned by Mars Incorporated. I work with
        startups at{" "}
        <Text as="code">
          <a href="https://planare.dev" rel="noreferrer" target="_blank">
            Planare
          </a>
        </Text>
        . I also advise several early-to-mid stage companies on their technology and product
        strategies, recently{" "}
        <Text as="code">
          <a href="https://cosmogroup.io" rel="noreferrer" target="_blank">
            Cosmo
          </a>
        </Text>
        .
      </Text>
      <Text top={4}>
        I mostly work with Next.js, with experience among related technologies. My resume and
        contact information can be found at
        <Link href="/resume">
          <Text as="code">dolmios.com/resume</Text>
        </Link>
        . Find me on{" "}
        <Text as="code" css={{ cursor: "pointer" }} onClick={(): void => setSocials(!socials)}>
          social media
        </Text>
        .
      </Text>
      {socials && (
        <Grid bottom={5} top={5}>
          <Grid>
            <Icons.Arena />{" "}
            <Text as="p" css={{ marginLeft: "$4" }} inline={1}>
              <Text as="strong" inline={4}>
                Are.na
              </Text>
              <a href="https://are.na/dolmios" rel="noreferrer" target="_blank">
                are.na/dolmios
              </a>
            </Text>
          </Grid>
          <Grid>
            <Icons.Letterboxd />{" "}
            <Text as="p" css={{ marginLeft: "$4" }} inline={1}>
              <Text as="strong" inline={4}>
                Letterboxd
              </Text>
              <a href="https://letterboxd.com/dolmios/" rel="noreferrer" target="_blank">
                letterboxd.com/dolmios
              </a>
            </Text>
          </Grid>
          <Grid>
            <Icons.Literal />{" "}
            <Text as="p" css={{ marginLeft: "$4" }} inline={1}>
              <Text as="strong" inline={4}>
                Literal
              </Text>
              <a href="https://literal.club/dolmios" rel="noreferrer" target="_blank">
                literal.club/dolmios
              </a>
            </Text>
          </Grid>
          <Grid>
            <Icons.Twitter />{" "}
            <Text as="p" css={{ marginLeft: "$4" }} inline={1}>
              <Text as="strong" inline={4}>
                Twitter
              </Text>
              <a href="https://twitter.com/jacksondolman" rel="noreferrer" target="_blank">
                twitter.com/jacksondolman
              </a>
            </Text>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
