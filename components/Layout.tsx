import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import globalStyles from '../styles/globals';

import Grid from './Grid';
import Tag from './Tag';
import Text from './Text';

export function Layout({ children }: { children: ReactNode }): JSX.Element {
  const router = useRouter();
  return (
    <Grid as='main' left={4} leftCollapse={3} right={4} rightCollapse={3}>
      {router.pathname !== '/resume' && (
        <Grid as='header' direction='row' flex='center' top={2} bottom={2}>
          <Grid direction='column' width={75} widthCollapse={90} align='left'>
            <Text>✺ Jackson Dolman</Text>
          </Grid>
          <Grid direction='column' width={25} hiddenCollapse align='right'>
            <Tag as='button'>Todo</Tag>
          </Grid>
        </Grid>
      )}

      {children}

      <style jsx global>
        {globalStyles}
      </style>
    </Grid>
  );
}
