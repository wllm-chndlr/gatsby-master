import path, { resolve } from 'path';
import fetch from 'isomorphic-fetch';

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

async function fetchBeersAndTurnIntoNodes({ actions, createNodeId, createContentDigest}) {
    // 1. Fetch list of beers
    const res = await fetch('https://api.sampleapis.com/beers/ale');
    const beers = await res.json();

    // 2. Loop over list
    for (const beer of beers) {
        const nodeMeta = {
            id: createNodeId(`beer-${beer.name}`),
            parent: null,
            children: [],
            internal: {
                type: 'Beer',
                mediaType: 'application/json',
                contentDigest: createContentDigest(beer),
            }
        }

        // 3. Create a node for each beer
        actions.createNode({
            ...beer,
            ...nodeMeta,
        });
    }
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
    // 1. Query all slicemasters
    const { data } = await graphql(`
        query {
            slicemasters: allSanityPerson {
                totalCount
                nodes {
                    name
                    id
                    slug {
                        current
                    }
                }
            }
        }
    `);

    // 2. Turn each into his/her own page
    data.slicemasters.nodes.forEach(slicemaster => {
        actions.createPage({
            component: resolve('./src/templates/Slicemaster.js'),
            path: `/slicemaster/${slicemaster.slug.current}`,
            context: {
                name: slicemaster.person,
                slug: slicemaster.slug.current,
            },
        })
    })

    // 3. Figure out how many pages there should be
    const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
    const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);

    // 4. Loop from 1 to n and create pages for each
    Array.from({ length: pageCount }).forEach((_, i) => {
        actions.createPage({
            path: `/slicemasters/${i + 1}`,
            component: path.resolve('./src/pages/slicemasters.js'),
            context: {
                skip: i * pageSize,
                currentPage: i + 1,
                pageSize,
            },
        })
    })
}

export async function sourceNodes(params) {
    // fetch a list of beers and source them into our gatsby api
    await Promise.all([
        fetchBeersAndTurnIntoNodes(params),
    ]);
}

export async function createPages(params) {
    // Create pages dynamically
    // Wait for all promises to resolve
    await Promise.all([
        turnPizzasIntoPages(params),
        turnToppingsIntoPages(params),
        turnSlicemastersIntoPages(params),
    ]);
}
