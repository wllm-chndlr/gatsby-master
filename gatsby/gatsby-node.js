import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
    // Get a template for this page
    const pizzaTemplate = path.resolve('./src/templates/Pizza.js');

    // Query all pizzas
    const { data } = await graphql(`
        query {
            pizzas: allSanityPizza {
                nodes {
                    name
                    slug {
                        current
                    }
                }
            }
        }

    `);

    // Loop over each pizza and create a page
    data.pizzas.nodes.forEach(pizza => {
        actions.createPage({
            path: `pizza/${pizza.slug.current}`,
            component: pizzaTemplate,
            context: {
                slug: pizza.slug.current,
            }
        });
    });
}

async function turnToppingsIntoPages({ graphql, actions }) {
    const toppingsTemplate = path.resolve('./src/pages/pizzas.js');

    const { data } = await graphql(`
        query {
            toppings: allSanityTopping {
                nodes {
                    name
                    id
                }
            }
        }
    `);

    data.toppings.nodes.forEach(topping => {
        actions.createPage({
            path: `topping/${topping.name}`,
            component: toppingsTemplate,
            context: {
                topping: topping.name,
                // TODO regex for topping
            }
        })
    })

}

export async function createPages(params) {
    // Create pages dynamically
    // Wait for all promises to resolve
    await Promise.all([
        turnPizzasIntoPages(params),
        turnToppingsIntoPages(params),
    ]);
    // 1. Pizzas
    // 2. Toppings
    // 3. Slicemasters
}