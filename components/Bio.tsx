import Link from "next/link";
import { useState } from "react";

import { useTimestamp } from "./hooks/useTimestamp";

import { Grid, Text, Icons } from ".";

export function Bio(): JSX.Element {
  const [disclaimer, setDisclaimer] = useState(false);
  const [socials, setSocials] = useState(false);

  const { isMounted, date, time } = useTimestamp();

  return (
    <Grid>
      <Text as="h1">Frontend Developer</Text>
      <Text as="h3">
        {isMounted && (
          <>
            {date}
            <br />
            New York, {time}
          </>
        )}
      </Text>

      <Text top={5}>
        Monikered on the information superhighway as{" "}
        <Text as="code">
          <a href="https://github.com/dolmios" target="_blank" rel="noreferrer">
            dolmios
          </a>
        </Text>{" "}
        &mdash; not affiliated with the delicious pasta sauce brand owned by{" "}
        <Text
          as="span"
          css={{ cursor: "pointer" }}
          onClick={(): void => setDisclaimer(!disclaimer)}>
          Mars Incorporated.
        </Text>
      </Text>
      {disclaimer && (
        <Text as="small" top={5} bottom={5}>
          © {new Date().getFullYear()} Mars, Incorporated. All Rights Reserved. ® TM DOLMIO,
          BEN&apos;S ORIGINAL™ MARS are Trademarks of Mars, Incorporated and its affiliates. An
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
        . I also advise several early-to-mid stage companies on their technology and product
        strategies, recently{" "}
        <Text as="code">
          <a href="https://cosmogroup.io" target="_blank" rel="noreferrer">
            Cosmo
          </a>
        </Text>
        .
      </Text>
      <Text top={4}>
        I mostly work with Next.js applications, with experience working with other technologies as
        well. My resume can be found at{" "}
        <Link href="/resume">
          <Text as="code">dolmios.com/resume</Text>
        </Link>
        .
      </Text>
      <Text top={4}>
        If you&apos;d like to talk shop, you can reach me at{" "}
        <Text as="code">
          <a href="mailto:mail@dolmios.com">mail@dolmios.com</a>
        </Text>{" "}
        or find me on{" "}
        <Text as="code" css={{ cursor: "pointer" }} onClick={(): void => setSocials(!socials)}>
          social media
        </Text>
        .
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
    </Grid>
  );
}
