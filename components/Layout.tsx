import { ReactNode } from "react";

import { Header } from "./Header";

import { Grid } from ".";

export function Layout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <Grid>
      <Header />

      {children}
    </Grid>
  );
}
