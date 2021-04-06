import { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
    // const [order, setOrder] = useState([]);

    const [order, setOrder] = useContext(OrderContext);

    function addToOrder(orderedPizza) {
        setOrder([...order, orderedPizza]);
    }

    function removeFromOrder(index) {
        setOrder([
            // everything before the item we want to remove
            ...order.slice(0, index),
            ...order.slice(index + 1)
            // everything after the item we want to remove
        ])
    }

    // TODO
    return {
        order,
        addToOrder,
        removeFromOrder,
    }
}
