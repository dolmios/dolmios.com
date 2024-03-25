import Link from "next/link";
import { useRouter } from "next/router";

import { Grid, Text } from "./";

export function Header(): JSX.Element {
  const router = useRouter();

  return (
    <Grid as="header" direction="row" flex="center" top={4}>
      <Grid direction="column">
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
            <Text inline={3}>Brooklyn, NY</Text>

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
    </Grid>
  );
}
