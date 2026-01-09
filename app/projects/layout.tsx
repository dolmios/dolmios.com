import type { ReactNode } from "react";

import { Stack } from "stoop-ui";

export default function ProjectsLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <Stack
      as="main"
      bottom="large"
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
  );
}
