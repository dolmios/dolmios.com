import Link from "next/link";
import { useRouter } from "next/router";

import { Grid, Icons, Text } from "./";

export function Header(): JSX.Element {
  const router = useRouter();
  return (
    <Grid as="header" direction="row" top={4} flex="center">
      <Grid
        direction="column"
        width={router.pathname !== "/resume" ? 50 : 100}
        collapse={router.pathname !== "/resume" ? 50 : 100}>
        <Text>
          <Text as="strong">
            <Link href="/">Jackson Dolman</Link>
          </Text>
        </Text>

        {router.pathname === "/resume" && (
          <>
            <Text inline={4}>Brooklyn, NY 11237</Text>

            <Text inline={4}>
              <a href="tel:+19294389964">(929) 438-9964</a>
            </Text>

            <Text inline={1}>
              <a href="mailto:mail@dolmios.com">mail@dolmios.com</a>
            </Text>
          </>
        )}
      </Grid>
      {router.pathname !== "/resume" && (
        <Grid direction="column" width={50} collapse={50} align="right">
          <Text as="code">
            <Text as="span" inline={3}>
              <Icons.GitHub />
            </Text>
            <a href="https://github.com/dolmios">github.com/dolmios</a>
          </Text>
        </Grid>
      )}
    </Grid>
  );
}
