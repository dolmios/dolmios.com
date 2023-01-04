import Link from "next/link";
import { useRouter } from "next/router";

import { Grid, Icons, Tag, Text } from "./";

export function Header(): JSX.Element {
  const router = useRouter();
  return (
    <Grid as="header" direction="row" flex="center" top={4}>
      <Grid direction="column">
        <Grid
          css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Grid>
            <Text
              as="strong"
              css={{
                minWidth: "max-content",
              }}
              inline={4}>
              <Link href="/">Jackson Dolman</Link>
            </Text>

            {router.pathname === "/resume" && (
              <Grid>
                <Text inline={4}>Brooklyn, NY 11237</Text>

                <Text inline={4}>
                  <a href="tel:+19294389964">(929) 438-9964</a>
                </Text>

                <Text inline={1}>
                  <a href="mailto:mail@dolmios.com">mail@dolmios.com</a>
                </Text>
              </Grid>
            )}
          </Grid>

          <Tag>
            <Icons.GitHub />
            <Text as="span" css={{ marginLeft: "$3" }}>
              <a href="https://github.com/dolmios">github.com/dolmios</a>
            </Text>
          </Tag>
        </Grid>
      </Grid>
    </Grid>
  );
}
