import Link from "next/link";
import { useRouter } from "next/router";

import { Grid, Icons, Tag, Text } from "./";

export function Header(): JSX.Element {
  const router = useRouter();
  return (
    <Grid as="header" direction="row" flex="center" top={3}>
      <Grid direction="column">
        <Grid
          css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Grid>
            <Link href="/">
              <Text
                as="strong"
                css={{
                  minWidth: "max-content",
                }}
                inline={3}>
                Jackson Dolman
              </Text>
            </Link>

            {router.pathname === "/resume" && (
              <Grid>
                <Text inline={3}>Brooklyn, NY 11237</Text>

                <Text inline={3}>
                  <a href="tel:+19294389964">(929) 438-9964</a>
                </Text>

                <Text inline={3}>
                  <a href="mailto:mail@dolmios.com">mail@dolmios.com</a>
                </Text>
                <Text inline={1}>
                  <a href="https://github.com/dolmios" rel="noopener noreferrer" target="_blank">
                    github.com/dolmios
                  </a>
                </Text>
              </Grid>
            )}
          </Grid>
          {router.pathname !== "/resume" && (
            <Tag>
              <Icons.GitHub />
              <Text as="span" css={{ marginLeft: "$2" }}>
                <a href="https://github.com/dolmios" rel="noopener noreferrer" target="_blank">
                  github.com/dolmios
                </a>
              </Text>
            </Tag>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
