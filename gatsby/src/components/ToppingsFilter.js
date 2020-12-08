import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

function countPizzasInToppings(pizzas) {

    console.log(pizzas);

    const counts = pizzas
        .map(pizza => pizza.toppings)
        .flat()
        .reduce((acc, topping) => {
            const existingTopping = acc[topping.id];

            if (existingTopping) {
                existingTopping.count += 1;
            } else {
                acc[topping.id] = {
                    id: topping.id,
                    name: topping.name,
                    count: 1,
                }
            }

            return acc;
        }, {});

        const sortedToppings = Object.values(counts).sort((a,b) => b.count - a.count);

        return sortedToppings;
}

export default function ToppingsFilter() {

    const { toppings, pizzas } = useStaticQuery(graphql`
        query {
            toppings: allSanityTopping {
                nodes {
                    name
                    id
                    vegetarian
                }
            }
            pizzas: allSanityPizza {
                nodes {
                    toppings {
                        name
                        id
                    }
                }
            }
        }
    `);
    console.clear();
    // console.log(toppings, pizzas);

    const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);

    console.log(toppingsWithCounts);

    return <div>
        <p>Toppings</p>
    </div>
}