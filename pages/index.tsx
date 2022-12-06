/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';

import { useAudio } from '../components/Audio';
import Grid from '../components/Grid';
import Tag from '../components/Tag';
import Text from '../components/Text';

export default function Home(): JSX.Element {
  const { listening, image } = useAudio();
  return (
    <Grid top={6} bottom={6}>
      <Grid as='section' direction='row'>
        <Grid direction='column' width={40} widthCollapse={100}>
          <Image src={image} alt={listening} fill className='fill' />
        </Grid>
        <Grid
          direction='column'
          width={60}
          widthCollapse={100}
          top={6}
          bottom={6}
          left={5}>
          <p>
            Jackson Dolman is a frontend developer based in{' '}
            <i>
              Brooklyn, NY (
              {new Date().toLocaleString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'America/New_York',
              })}
              )
            </i>
            .
          </p>
          <p>
            He's currently working on technology for short-term rentals at{' '}
            <a href='https://cosmogroup.io' target='_blank' rel='noreferrer'>
              Cosmo
            </a>
            , a company he co-founded in 2019. He works on other projects via Planare.
          </p>
          <Text as='small' transform='uppercase'>
            Contact
          </Text>
          <p>
            My best work is with React (Next.js) and TypeScript. I'm interested in
            developing for the web, and optimizing for performance and cogent code.
          </p>

          <p>
            Aside from all that, at the moment I'm enjoying reading more than usual and
            I've started collecting matchbooks and documenting the stories associated
            with them.
          </p>
          <p>
            I'm open for work at a flat rate of $150/hr, but I'm also open to talk shop
            and share ideas and that doesn't cost a thing.
          </p>

          {image && image !== '' && (
            <Grid top={5} flex='center'>
              <Tag inline='true' minimal>
                <Grid
                  flex='center'
                  right={3}
                  css={{
                    display: 'inline-block',
                    position: 'relative',
                    verticalAlign: 'middle',
                  }}>
                  <Image
                    src={image}
                    alt={listening}
                    width={28}
                    height={28}
                    style={{
                      borderBottomLeftRadius: '0.420rem',
                      borderTopLeftRadius: '0.420rem',
                    }}
                  />
                </Grid>
                <Text inline={1}>{listening}</Text>
              </Tag>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid as='section' direction='row' top={2} bottom={6}>
        <Grid direction='column'>
          <Text as='small'>
            I'm a software engineer based in the San Francisco Bay Area. I'm
          </Text>
        </Grid>
      </Grid>
    </Grid>
  );
}
