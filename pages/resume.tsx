import Head from "next/head";

import { Grid, Tag, Text } from "../components";

export default function Resume(): JSX.Element {
  const data = {
    capabilities: {
      frontEnd: [
        "Next.js",
        "Typescript",
        "React",
        "Redux",
        "HTML/CSS (SASS, Styled Components, et. al.)",
        "Javascript (ES6+)",
      ],
      informationTechnology: [
        "Zendesk",
        "Intercom",
        "Hubspot",
        "Slack",
        "Notion",
        "Adobe Photoshop",
      ],
      supplementalBackEnd: ["Node.js", "PostgreSQL", "REST", "Firebase", "Git", "Docker"],
    },
    education: [
      {
        school: "Girton Grammar School",
        stamp: "2008 - 2013, Melbourne AU",
        title: "High School Diploma",
      },
      {
        school: "Melbourne Institute of Technology",
        stamp: "2018, Melbourne AU",
        title: " Candidate for Bachelor of Information Technology",
      },
    ],

    employment: [
      {
        company: "Cosmo",
        notes: [
          "Developed, implemented, and maintained the company's website, database, and backend systems.",
          "Designed and developed a web application for the company's clients to view their data, and interact with the company's database alongside API's and other integrated systems.",
          "Implemented internal technology systems and processes for the company.",
        ],
        stamp: "2019 - 2022, Melbourne AU",
        title: "Technical Director & Co-Founder",
      },
      {
        company: "Lower & East",
        notes: [
          "Provided website design and development services for small-medium sized businesses and organizations across multiple sectors.",
          "Noted clients include Crime Stoppers Victoria, Irrigated Cropping Council, InLife Independent Living.",
        ],
        stamp: "2016 - 2022, Melbourne AU",
        title: "Managing Director",
      },
      {
        company: "Uptake Digital",
        notes: [
          "Web development for a wide range of clients, including web platforms, e-commerce sites, and large-scale website projects.",
          "Oversaw documentation for all internal and external projects, including development of project data flows.",
          "Utilized Zendesk to provide customer service and sales service for general IT.",
        ],
        stamp: "2019 - 2020, Melbourne AU",
        title: "Web Developer",
      },
    ],
    internships: [
      {
        company: "JCP Investment Partners",
        stamp: "2017, Melbourne AU",
        title: "Information Technology Intern",
      },
      {
        company: "Uptake Digital",
        stamp: "2015, Bendigo AU",
        title: "Web Development Intern",
      },
      {
        company: "Turncode Productions",
        stamp: "2015, Melbourne AU",
        title: "Web Development Intern",
      },
    ],
    volunteer: [
      {
        company: "Cosmo",
        notes: ["Advising the board of directors on technology concerns."],
        stamp: "Present",
        title: "Advisor",
      },
      {
        company: "Synergize Hub",
        notes: [
          "Contributed to recruitment and organization policy, alongside managing the organization's website.",
        ],
        stamp: "2019",
        title: "Committee Member",
      },
      {
        company: "Red Shield Appeal (Salvation Army Australia)",
        notes: [
          "Local outreach raising awareness, collecting donations and fielding questions regarding homeless services and social services.",
        ],
        stamp: "2013 - 2017",
        title: "Volunteer",
      },
      {
        company: "Zonta Club of Bendigo",
        notes: [
          "Prepared birthing kits for distribution overseas, for women without access to sound medical care.",
        ],
        stamp: "2014-2016",
        title: "Volunteer",
      },
    ],
  };

  return (
    <Grid as="main" bottom={4} top={4}>
      <Head>
        <title>Resume - Jackson Dolman</title>
      </Head>
      <Grid align="center" bottom={6} top={6}>
        <Text as="h1">Working on this page. Check back soon.</Text>
      </Grid>
      <Grid direction="row">
        <Grid direction="column">
          {data.employment && (
            <Grid css={{ borderTop: "1px solid $border" }}>
              <Grid top={4}>
                <Tag bold>EMPLOYMENT</Tag>
              </Grid>
              {data.employment.map((item, index) => (
                <Grid key={index} css={{ paddingLeft: "$2", paddingRight: "$2" }} top={2}>
                  <Grid css={{ display: "flex", justifyContent: "space-between" }}>
                    <Grid>
                      <Text inline={4}>
                        <Text as="strong">{item.company}</Text>
                      </Text>
                      <Text inline={1}>{item.title}</Text>
                    </Grid>
                    <Text align="right">{item.stamp}</Text>
                  </Grid>
                  <Grid top={2}>
                    {item.notes.map((note, index) => (
                      <Text key={index}>&bull; {"Rewriting"}</Text>
                    ))}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          )}

          {data.capabilities && (
            <Grid css={{ borderTop: "1px solid $border" }} top={4}>
              <Grid top={4}>
                <Tag bold>CAPABILITIES</Tag>
              </Grid>
              <Grid css={{ padding: "0 $2" }}>
                <Grid top={2}>
                  <Text inline={4}>
                    <Text as="strong">Front-end</Text>
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
                    <Text as="strong">Supplemental back-end</Text>
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
                    <Text as="strong">Information technology</Text>
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
            </Grid>
          )}
          {data.education && (
            <Grid css={{ borderTop: "1px solid $border" }} top={4}>
              <Grid top={4}>
                <Tag bold>EDUCATION</Tag>
              </Grid>
              {data.education.map((item, index) => (
                <Grid key={index} css={{ paddingLeft: "$2", paddingRight: "$2" }} top={2}>
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
          )}
          {data.internships && (
            <Grid css={{ borderTop: "1px solid $border" }} top={4}>
              <Grid top={4}>
                <Tag bold>INTERNSHIPS</Tag>
              </Grid>

              {data.internships.map((item, index) => (
                <Grid key={index} css={{ paddingLeft: "$2", paddingRight: "$2" }} top={2}>
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
          )}
          {data.volunteer && (
            <Grid css={{ borderTop: "1px solid $border" }} top={4}>
              <Grid top={4}>
                <Tag bold>PROFESSIONAL & PUBLIC SERVICE</Tag>
              </Grid>
              {data.volunteer.map((item, index) => (
                <Grid key={index} css={{ paddingLeft: "$2", paddingRight: "$2" }} top={2}>
                  <Grid css={{ display: "flex", justifyContent: "space-between" }}>
                    <Grid>
                      <Text inline={4}>
                        <Text as="strong">{item.company}</Text>
                      </Text>
                      <Text inline={1}>{item.title}</Text>
                    </Grid>
                    <Text align="right">{item.stamp}</Text>
                  </Grid>
                  <Grid top={2}>
                    {item.notes.map((note, index) => (
                      <Text key={index}>&bull; {"Rewriting"}</Text>
                    ))}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
