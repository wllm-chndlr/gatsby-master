import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
    siteMetadata: {
        title: 'Slicks Slices',
        siteUrl: 'https://gatsby.pizza',
        description: 'The best pizza place in Austin',
    },
    plugins: [
        'gatsby-plugin-styled-components',
        {
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: 'xgeovjml',
                dataset: 'production',
                watchMode: true,
                token: process.env.SANITY_TOKEN,
            }
        }
    ],
};
