import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { Text, Grid } from './';

export function Layout({ children }: { children: ReactNode }): JSX.Element {
  const router = useRouter();
  return (
    <Grid as='main'>
      {router.pathname !== '/resume' && (
        <Grid as='header' direction='row' flex='center' top={4} bottom={4}>
          <Grid direction='column' align='center'>
            <Text>✺ Jackson Dolman</Text>
          </Grid>
        </Grid>
      )}

      {children}

      <Grid as='footer' direction='row' flex='center' top={4} bottom={4}>
        <Grid direction='column' align='center'>
          <Text>✺ Jackson Dolman</Text>
        </Grid>
      </Grid>
    </Grid>
  );
}
