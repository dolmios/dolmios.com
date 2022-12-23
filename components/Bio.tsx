import Link from "next/link";
import { useState } from "react";

import { Grid, Text, Icons } from ".";

export function Bio(): JSX.Element {
  const [disclaimer, setDisclaimer] = useState(false);
  const [socials, setSocials] = useState(false);

  return (
    <Grid>
      <Text as="h1">Frontend Developer</Text>
      <Text as="h3" inline={4}>
        Brooklyn, NY
      </Text>
      <Text as="h3" inline={6}>
        {new Date().toLocaleString("en-US", {
          timeStyle: "short",
          timeZone: "America/New_York",
        })}
      </Text>
      <Text top={6}>
        Monikered as{" "}
        <Text as="code">
          <a href="https://github.com/dolmios" target="_blank" rel="noreferrer">
            dolmios
          </a>
        </Text>{" "}
        on the information superhighway. Not affilitated with the delicious pasta sauce brand owned
        by{" "}
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
        . I also advise several early-to-mid stage companies on their tech stacks and product
        strategies, recently{" "}
        <Text as="code">
          <a href="https://cosmogroup.io" target="_blank" rel="noreferrer">
            Cosmo
          </a>
        </Text>
      </Text>
      <Text top={4}>
        My daily mainstays are Typescript and Next.js, alongside a variety of other technologies.
        You can find my resume at{" "}
        <Link href="/resume">
          <Text as="code">dolmios.com/resume</Text>
        </Link>
      </Text>
      <Text top={4}>
        I have a firm focus on delivering the most organized, maintainable, and performant code I
        can. I&apos;m a big fan of the timeless{" "}
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
        I enjoy when strangers hit me up by email, and I love talking shop. If you&apos;d like to
        get in touch, you can reach me at{" "}
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
    </Grid>
  );
}
