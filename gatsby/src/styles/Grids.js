import styled from 'styled-components';

export const HomePageGrid = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(2, minmax(auto, 1fr));
`;

export const ItemsGrid = styled.div`
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr 1fr;
`;
