import { Grid, Text } from '../components';

export default function Legal(): JSX.Element {
  return (
    <Grid top={6} bottom={6}>
      <Text as='h1'>Legal notice</Text>
      <Text as='p'>This website doesn&apos;t use any cookies.</Text>
      <Text as='p'>All trademarks, logos, brand and company names are the property of their respective owners.</Text>
      <Text as='h3'>Third party services</Text>
      <Text as='p'>This site is hosted by Vercel. You can find their privacy policy on their website.</Text>
      <Text as='p'>
        This site uses Pirsch Analytics to collect anonymous data about visitors. You can find their privacy policy on
        their website.
      </Text>
    </Grid>
  );
}
