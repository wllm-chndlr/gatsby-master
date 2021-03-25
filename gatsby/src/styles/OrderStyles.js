import styled from 'styled-components';

const OrderStyles = styled.form`
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 1fr;

    fieldset {
        align-content: flex-start;
        display: grid;
        gap: 1rem;
        grid-column: span 2;
        max-height: 600px;
        overflow: auto;

        &.order,
        &.menu {
            grid-column: span 1;
        }
    }

    /* @media (max-width: 900px) {
        fieldset.menu, fieldset.order {
            grid-column: span 2;
        }
    } */
`;

export default OrderStyles;