import React, { FC } from 'react';

import { PageProps, graphql } from 'gatsby';

import { ContentSpacer, Grid } from 'Components/common';

const About: FC<PageProps<Queries.AboutQuery>> = ({ data }) => {
  const aboutData = data.allDataJson.edges[0].node;
  // const imageData = data.allFile.nodes.reduce(
  //   (acc, node) => ({ ...acc, [node.relativePath]: node.childImageSharp }),
  //   {}
  // );

  return (
    <ContentSpacer>
      <Grid>
        <h1>About Me</h1>
        {/* {aboutData.portfolio?.map((project, index) => (
          <div key={index}>
            <h2>{project?.name}</h2>
            {project?.images?.map(
              (imageName) =>
                imageName && (
                  <GatsbyImage
                    key={imageName}
                    // @ts-ignore
                    image={getImage(imageData[imageName])}
                    alt={imageName}
                  />
                )
            )}
            <p>{project?.description}</p>
            <div dangerouslySetInnerHTML={{ __html: project?.subDescription! }} />
            <UnderlineLink external url={project?.link!}>
              Project Link
            </UnderlineLink>
            <UnderlineLink external url={project?.githubLink!}>
              Github Link
            </UnderlineLink>
          </div>
        ))} */}
      </Grid>
    </ContentSpacer>
  );
};

export default About;

export const pageQuery = graphql`
  query About {
    allDataJson {
      edges {
        node {
          career
          resume {
            experience
            education
            skills
          }
          portfolio {
            name
            description
            githubLink
            link
            tags
            subDescription
            images {
              id
              childrenImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
    allFile(filter: { extension: { in: ["png", "jpg"] }, sourceInstanceName: { eq: "data" } }) {
      nodes {
        relativePath
        childImageSharp {
          gatsbyImageData(width: 200, layout: CONSTRAINED)
        }
      }
    }
  }
`;
