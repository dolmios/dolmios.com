import Head from "next/head";

import { Grid, Tag, Text } from "../components";

export default function Resume(): JSX.Element {
  const data = {
    capabilities: {
      frontEnd: ["TypeScript", "React", "Next.js", "HTML", "CSS"],
      informationTechnology: [
        "Zendesk",
        "Intercom",
        "Hubspot",
        "Slack",
        "Notion",
        "Adobe Photoshop",
        "Figma",
      ],
      supplementalBackEnd: ["Git", "Node.js", "PostgreSQL", "GraphQL/REST", "Firebase/Supabase"],
    },
    education: [
      {
        school: "Girton Grammar School",
        stamp: "Bendigo, 2013 - 2018",
        title: "High School Diploma",
      },
      {
        school: "Melbourne Institute of Technology",
        stamp: "Melbourne, 2018",
        title: "Candidate for Bachelor of Information Technology",
      },
    ],

    employment: [
      {
        company: "Planare",
        notes:
          "Provided website design and development services for small-medium sized businesses and organizations, notably Crime Stoppers Australia, Irrigated Cropping Council, and InLife Independent Living. This business was based in Melbourne, Australia from 2016-2022.",
        stamp: "Brooklyn, 2016 - Present",
        title: "Owner",
      },
      {
        company: "Cosmo",
        notes:
          "Designed and developed a company's website, web apps, and backend systems with TypeScript, Supabase and Next.js. Managed a small marketing team while implementing internal technology systems and processes.",
        stamp: "Melbourne, 2019 - 2023",
        title: "Technology Lead (Founder)",
      },
      {
        company: "Uptake Digital",
        title: "Web Developer & IT Support",
        notes:
          "Responsible for web development, documentation, IT support and general hardware tasks. Utilized Zendesk to provide ticketing support for a wide range of clients, including onboarding with the Microsoft 365 suite.",
        stamp: "Melbourne, 2019 - 2020",
      },
    ],
    internships: [
      {
        company: "JCP Investment Partners",
        stamp: "2017",
        title: "Information Technology",
      },
      {
        company: "Uptake Digital",
        stamp: "2015",
        title: "Web Development",
      },
      {
        company: "Turncode Productions",
        stamp: "2015",
        title: "Web Development",
      },
    ],
    volunteer: [
      {
        company: "Cosmo",
        notes: "Advising the board of directors on technology concerns.",
        stamp: "2023 - Present",
        title: "Software Engineering Advisor",
      },
      {
        company: "Synergize Hub Bendigo",
        notes:
          "Contributed to recruitment and organization policy, alongside managing the organization's website.",
        stamp: "2019 - 2020",
        title: "Co-op Committee Member",
      },
      {
        company: "Zonta Club of Bendigo",
        notes:
          "Prepared birthing kits for distribution overseas, for women without access to sound medical care.",
        stamp: "2014 - 2016",
        title: "Volunteer",
      },
      {
        company: "Red Shield Appeal (Salvation Army Australia)",
        notes:
          "Local outreach raising awareness, collecting donations and fielding questions regarding homeless services and social services.",
        stamp: "2013 - 2016",
        title: "Volunteer",
      },
    ],
    summary:
      "I am a frontend developer based in New York City. I grew up in Melbourne, Australia and relocated to the U.S. in 2022 (Form I-551). I'm currently working as a freelance developer, and am open to new opportunities, full time or contract.",
  };

  return (
    <Grid as="main" bottom={4} top={4}>
      <Head>
        <title>Resume - Jackson Dolman</title>
      </Head>
      <Grid direction="row">
        <Grid direction="column">
          <Grid>
            <Tag bold>SUMMARY</Tag>
            <Grid
              css={{
                maxWidth: "1000px",
                borderLeft: "2px solid $border",
                paddingLeft: "$3",
              }}
              top={3}>
              <Text>{data.summary || ""}</Text>
            </Grid>
          </Grid>
          <Grid top={4}>
            <Tag bold>EMPLOYMENT</Tag>
            {data.employment.map((item, index) => (
              <Grid
                key={index}
                css={{
                  marginTop: index === 0 ? "$3" : "$2",
                }}>
                <Grid css={{ display: "flex", justifyContent: "space-between" }}>
                  <Grid>
                    <Text inline={4}>
                      <Text as="strong">{item.company}</Text>
                    </Text>
                    <Text inline={1}>{item.title}</Text>
                  </Grid>
                  <Text align="right">{item.stamp}</Text>
                </Grid>
                <Grid
                  css={{
                    maxWidth: "1000px",
                    borderLeft: "2px solid $border",
                    paddingLeft: "$3",
                  }}>
                  <Text>{item.notes}</Text>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid top={4}>
            <Tag bold>CAPABILITIES</Tag>
            <Grid top={3}>
              <Text inline={4}>
                <Text as="strong">Frontend</Text>
              </Text>
              <Text inline={1}>
                {data.capabilities.frontEnd.map((item, index) => (
                  <Text key={index} as="span" inline={2}>
                    {item}
                    {index !== data.capabilities.frontEnd.length - 1 && ", "}
                  </Text>
                ))}
              </Text>
            </Grid>
            <Grid top={2}>
              <Text inline={4}>
                <Text as="strong">Supplemental Backend</Text>
              </Text>
              <Text inline={1}>
                {data.capabilities.supplementalBackEnd.map((item, index) => (
                  <Text key={index} as="span" inline={2}>
                    {item}
                    {index !== data.capabilities.supplementalBackEnd.length - 1 && ", "}
                  </Text>
                ))}
              </Text>
            </Grid>
            <Grid top={2}>
              <Text inline={4}>
                <Text as="strong">Information Technology</Text>
              </Text>
              <Text inline={1}>
                {data.capabilities.informationTechnology.map((item, index) => (
                  <Text key={index} as="span" inline={2}>
                    {item}
                    {index !== data.capabilities.informationTechnology.length - 1 && ", "}
                  </Text>
                ))}
              </Text>
            </Grid>
          </Grid>
          <Grid top={4}>
            <Tag bold>EDUCATION</Tag>
            {data.education.map((item, index) => (
              <Grid
                key={index}
                css={{
                  marginTop: index === 0 ? "$3" : "$2",
                }}>
                <Grid css={{ display: "flex", justifyContent: "space-between" }}>
                  <Grid>
                    <Text inline={4}>
                      <Text as="strong">{item.school}</Text>
                    </Text>
                    <Text inline={1}>{item.title}</Text>
                  </Grid>
                  <Text align="right">{item.stamp}</Text>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid top={4}>
            <Tag bold>INTERNSHIPS</Tag>
            {data.internships.map((item, index) => (
              <Grid
                key={index}
                css={{
                  marginTop: index === 0 ? "$3" : "$2",
                }}>
                <Grid css={{ display: "flex", justifyContent: "space-between" }}>
                  <Grid>
                    <Text inline={4}>
                      <Text as="strong">{item.company}</Text>
                    </Text>
                    <Text inline={1}>{item.title}</Text>
                  </Grid>
                  <Text align="right">{item.stamp}</Text>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid top={4}>
            <Tag bold>PROFESSIONAL & PUBLIC SERVICE</Tag>
            {data.volunteer.map((item, index) => (
              <Grid key={index} css={{ marginTop: index === 0 ? "$3" : "$2" }}>
                <Grid css={{ display: "flex", justifyContent: "space-between" }}>
                  <Grid>
                    <Text inline={4}>
                      <Text as="strong">{item.company}</Text>
                    </Text>
                    <Text inline={1}>{item.title}</Text>
                  </Grid>
                  <Text align="right">{item.stamp}</Text>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
