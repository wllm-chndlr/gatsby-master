import { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

export default function usePizza({ pizzas, values }) {
    const [order, setOrder] = useContext(OrderContext);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

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

    async function submitOrder(e) {
        e.preventDefault();

        console.log(e);
        setLoading(true);

        const body = {
            order: order,
            total: formatMoney(calculateOrderTotal(order, pizzas)),
            name: values.name,
            email: values.email,
        }
        console.log(body);
    }

    // TODO
    return {
        order,
        addToOrder,
        removeFromOrder,
        error,
        loading,
        message,
        submitOrder,
    }
}
