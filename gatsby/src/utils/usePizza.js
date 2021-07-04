import { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
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
            // everything after the item we want to remove
            ...order.slice(index + 1)
        ])
    }

    async function submitOrder(e) {
        e.preventDefault();

        console.log(e);
        setLoading(true);

        const body = {
            order: attachNamesAndPrices(order, pizzas),
            total: formatMoney(calculateOrderTotal(order, pizzas)),
            name: values.name,
            email: values.email,
        }

        console.log(body);

        const res = await fetch(`${process.ENV.GATSBY_SERVERLESS_BASE}/placeOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });

        const text = JSON.parse(await res.text());


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
