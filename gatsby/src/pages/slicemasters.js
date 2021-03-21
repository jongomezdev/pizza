import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

export default function SlicemastersPage({ data }) {
  const slicemasters = data.slicemasters.nodes;
  console.log(slicemasters);
  return (
    <>
      <div>
        {slicemasters.map((person) => (
          <div>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} />
            <p className="description">{person.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export const query = graphql`
  query {
    slicemasters: allSanityPerson {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
