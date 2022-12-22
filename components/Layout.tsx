import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

import { Text, Grid } from ".";

export function Layout({ children }: { children: ReactNode }): JSX.Element {
  const router = useRouter();
  return (
    <Grid>
      <Grid as="header" direction="row" top={4} flex="center">
        <Grid direction="column" width={50} collapse={100}>
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
        <Grid direction="column" width={50} collapse={100} align="right">
          <Text inline={1}>
            <a href="https://github.com/dolmios">github.com/dolmios</a>
          </Text>
        </Grid>
      </Grid>

      {children}
    </Grid>
  );
}
