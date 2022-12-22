import { useRouter } from "next/router";
import { ReactNode } from "react";

import { Text, Grid } from ".";

export function Layout({ children }: { children: ReactNode }): JSX.Element {
  const router = useRouter();
  return (
    <Grid>
      {router.pathname !== "/resume" && (
        <Grid as="header" direction="row" top={5} bottom={4}>
          <Grid direction="column">
            <Text>✺ Jackson Dolman</Text>
          </Grid>
        </Grid>
      )}

      {children}

      {router.pathname !== "/resume" && <Grid as="footer">&nbsp;</Grid>}
    </Grid>
  );
}
