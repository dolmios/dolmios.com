import { ReactNode } from "react";

import { Grid, Header } from ".";

export function Layout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <Grid>
      <Header />
      {children}
    </Grid>
  );
}
