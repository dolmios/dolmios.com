import Link from "next/link";
import { useRouter } from "next/router";

import { Grid, Text } from "./";

export function Header(): JSX.Element {
  const router = useRouter();
  return (
    <Grid as="header" direction="row" top={4} flex="center">
      <Grid direction="column" width={50} collapse={60}>
        <Text inline={4}>
          <strong>
            <Link href="/">Jackson Dolman</Link>
          </strong>
        </Text>

        {router.pathname === "/resume" && (
          <>
            <Text inline={4}>Brooklyn, NY 11237</Text>
            <a href="tel:+19294389964">
              <Text inline={4}>(929) 438-9964</Text>
            </a>
            <a href="mailto:mail@dolmios.com">
              <Text inline={1}>mail@dolmios.com</Text>
            </a>
          </>
        )}
      </Grid>
      <Grid direction="column" width={50} collapse={40} align="right">
        <Text inline={1}>
          <a href="https://github.com/dolmios">github.com/dolmios</a>
        </Text>
      </Grid>
    </Grid>
  );
}