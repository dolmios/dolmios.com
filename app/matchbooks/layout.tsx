import type { ReactNode } from "react";

import { Stack } from "stoop-ui";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function MatchbooksLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <>
      <Header />
      <Stack
        as="main"
        bottom="medium"
        css={{
          flex: 1,
          mobile: {
            paddingLeft: "$small",
            paddingRight: "$small",
          },
        }}
        left="medium"
        right="medium"
        top="medium">
        {children}
      </Stack>
      <Footer />
    </>
  );
}
