/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';

export default function Resume(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Resume - Jackson Dolman</title>
      </Head>
      <section>
        <header style={{ textAlign: 'center' }}>
          <div>
            <p>Jackson Dolman</p>
            <p>
              <span style={{ marginRight: '1rem' }}>Brooklyn, NY</span>✺
              <a href='mailto:mail@dolmios.com' style={{ marginRight: '1rem' }}>
                mail@dolmios.com
              </a>
              ✺
              <a
                href='tel:+1-929-438-9964'
                style={{ marginLeft: '1rem', marginRight: '1rem' }}>
                929-438-9964
              </a>
              ✺
              <a
                href='https://github.com/dolmios'
                style={{ marginLeft: '1rem', marginRight: '1rem' }}>
                github.com/dolmios
              </a>
            </p>
          </div>
        </header>
      </section>
      <section>
        <table>
          <tbody>
            <tr>
              <td className='category' colSpan={2}>
                SUMMARY:
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='justify'>
                Extensive experience with applying analytical and numerical methods
                (such as the finite element method) to model a broad range of systems
                from molecular structures to large-scale mechanical structures. Proven
                track record of creating and improving new computational methods to
                perform dynamic and static analysis of otherwise intractable engineering
                and biological systems. Strong ability to collaborate and work in a team
                environment on multi-disciplinary projects. Legally authorized to work
                in the United States (Green Card holder).
              </td>
            </tr>

            <tr>
              <td colSpan={2} className='category'>
                Employment:
              </td>
            </tr>
            <tr>
              <td className='item'>
                Technology Director, <a href='https://cosmogroup.io'>Cosmo</a>
              </td>
              <td className='date'>2019 - 2022</td>
            </tr>
            <tr>
              <td colSpan={2} className='list'>
                &bull; Developed, implemented, and maintained the company's website,
                database, and backend systems.
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='list'>
                &bull; Designed and developed a web application for the company's
                clients to view their data, and interact with the company's database
                alongside API's and other integrated systems.
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='list'>
                &bull; Implemented internal technology systems and processes for the
                company.
              </td>
            </tr>
            <tr>
              <td className='item'>
                Owner, <a href='https://cosmogroup.io'>LOWER & EAST</a>
              </td>
              <td className='date'>2016 - 2022</td>
            </tr>
            <tr>
              <td colSpan={2} className='list'>
                &bull; Provided website design and development services for small-medium
                sized businesses and organizations across multiple sectors.
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='list'>
                &bull; Noted clients include Crime Stoppers Victoria, Irrigated Cropping
                Council, InLife Independent Living.
              </td>
            </tr>
            <tr>
              <td className='item'>
                Information Technology Consultant, Uptake Digital
              </td>
              <td className='date'>2019 - 2020</td>
            </tr>
            <tr>
              <td colSpan={2} className='list'>
                &bull; Web development for a wide range of clients, including web
                platforms, e-commerce sites, and large-scale website projects.
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='list'>
                &bull; Oversaw documentation for all internal and external projects,
                including development of project data flows.
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='list'>
                &bull; Utilized Zendesk to provide customer service and sales service
                for general IT.
              </td>
            </tr>
            <tr>
              <td className='item'>
                Information Technology Intern, JCP Investment Partners
              </td>
              <td className='date'>2017</td>
            </tr>
            <tr>
              <td className='item'>Web Development Intern,Uptake Digital</td>

              <td className='date'>2015</td>
            </tr>
            <tr>
              <td className='item'>Web Development Intern, Turncode Productions</td>
              <td className='date'>2015</td>
            </tr>
            <tr>
              <td colSpan={2} className='category'>
                Capabilities:
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='concat'>
                <b>Front-End:</b> Next.js, Typescript, React, Redux, HTML/CSS (SASS,
                Styled Components, et. al.), Javascript (ES6+),
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='concat'>
                <b>Supplemental Back-End:</b> Node.js, PostgreSQL, REST, Firebase, Git,
                Docker
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='concat'>
                <b>Information Technology:</b> Zendesk, Intercom, Hubspot, Slack,
                Notion, Adobe Photoshop
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='category'>
                EDUCATION:
              </td>
            </tr>
            <tr>
              <td className='item'>Girton Grammar School</td>
              <td className='date'>Class of 2018</td>
            </tr>
            <tr>
              <td colSpan={2} className='list'>
                &bull; High School Diploma
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='list'>
                &bull; Academic Scholarship; Percentile rank: 99.6 (2012, Australian
                Council for Educational Research Testing)
              </td>
            </tr>
            <tr>
              <td className='item'>Melbourne Institute of Technology</td>
              <td className='date'>2018</td>
            </tr>
            <tr>
              <td colSpan={2} className='list'>
                &bull; Candidate for Bachelor of Information Technology
              </td>
            </tr>

            <tr>
              <td colSpan={2} className='category'>
                Professional & Public Service:
              </td>
            </tr>
            <tr>
              <td className='item'>Advisor, Cosmo</td>
              <td className='date'>Present</td>
            </tr>
            <tr>
              <td colSpan={2} className='list'>
                &bull; Advising the board of directors on technology concerns.
              </td>
            </tr>
            <tr>
              <td className='item'>Committee Member, Synergize Hub</td>
              <td className='date'>2019</td>
            </tr>
            <tr>
              <td className='list' colSpan={2}>
                Contributed to recruitment and organization policy, alongside managing
                the organization's website.
              </td>
            </tr>
            <tr>
              <td className='item'>
                Volunteer, Red Shield Appeal (Salvation Army Australia)
              </td>
              <td className='date'>2013-2016</td>
            </tr>
            <tr>
              <td colSpan={2} className='list'>
                &bull; Local outreach raising awareness, collecting donations and
                fielding questions regarding homeless services and social services.
              </td>
            </tr>
            <tr>
              <td className='item'>Volunteer, Zonta Club of Bendigo</td>
              <td className='date'>2014</td>
            </tr>
            <tr>
              <td colSpan={2} className='list'>
                &bull; Prepared birthing kits for distribution overseas, for women
                without access to sound medical care.
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='category'>
                Achivements:
              </td>
            </tr>
            <tr>
              <td className='list'>
                &bull; Attained Permanent Residency status in the United States of
                America.
              </td>
              <td className='date'>2021</td>
            </tr>
            <tr>
              <td className='list'>
                &bull; Competed in the 2018 Shell Eco-marathon in Singapore.
              </td>
              <td className='date'>2018</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className='date quote'>
        <small>"The reward for good work, is more work." - Tom Sachs</small>
      </section>
      <style jsx>{`
        * {
    box-sizing: border-box;
    line-height: 1.7rem;
    font-size: 1.5rem;
    font-family: 'Times New Roman', Times, serif;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    max-width: 100%;
  }
  .category {
    font-weight: 600;
    border-bottom: 0.1rem solid rgba(0, 0, 0, 0.25);
    padding-top: 0.75rem;
    padding-bottom: 0.25rem;
    text-transform: uppercase;
  }
  .item {
    padding-top: 0.25rem;
    font-weight: 600;
  }
  .concat {
    padding-top: 0.25rem;
  }
  .date {
    text-align: right;
    min-width: 10rem;
    vertical-align: top;
    padding-top: 0.25rem;
  }
  .list {
    padding-left: 2rem;
  }
  .quote {
    font-style: italic;
    padding-top: 5rem;
  }
      }`}</style>
    </div>
  );
}
