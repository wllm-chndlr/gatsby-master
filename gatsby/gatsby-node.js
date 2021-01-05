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

export async function createPages(params) {
    // Create pages dynamically
    await turnPizzasIntoPages(params);
}