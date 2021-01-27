import React from "react";
import { graphql } from 'gatsby';
import { Link } from "gatsby";

export default function SlicemastersPage({ data }) {
    const slicemasters = data.slicemasters.nodes;

	return (
        <>
            <div>
                {slicemasters.map(person => (
                    <div>
                        <Link to={`/slicemaster/${person.slug.current}`}>
                            <h2>
                                <span className="mark">{person.name}</span>
                            </h2>
                        </Link>
                    </div>
                ))}
            </div>

        </>
    )
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