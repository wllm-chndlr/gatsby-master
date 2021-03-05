import React from "react";
import SEO from '../components/SEO';
import OrderStyles from "../styles/OrderStyles";
import useForm from '../utils/useForm';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

export default function OrderPage({ data }) {
    const { values, updateValue } = useForm({
        name: '',
        email: '',
    });
    const pizzas = data.pizzas.nodes;

	return (
        <>
            <SEO title="Order a pizza!" />
            <OrderStyles>
                <fieldset>
                    <legend>Your Info</legend>

                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={updateValue}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={updateValue}
                    />
                </fieldset>
                <fieldset>
                    <legend>Menu</legend>

                    {pizzas.map(pizza => (
                        <div key={pizza.id}>
                            <Img
                                alt={pizza.name}
                                fluid={pizza.image.asset.fluid}
                                height="50"
                                width="50"
                            />
                            <h2>{pizza.name}</h2>
                        </div>
                    ))}

                </fieldset>
                <fieldset>
                    <legend>Order</legend>
                </fieldset>
            </OrderStyles>
        </>
    )
}

export const query = graphql`
    query {
        pizzas: allSanityPizza {
            nodes {
                name
                id
                slug { current }
                price
                image {
                    asset {
                        fluid(maxWidth: 100) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
        }
    }
`