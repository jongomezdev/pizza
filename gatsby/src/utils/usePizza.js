import { useState } from 'react';

export default function usePizza({ pizzas, inputs }) {
  // 1. Create state to hold our order
  const [order, setOrder] = useState([]);
  // 2. Make a function to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. Make a function to remove things from order
  function removeFromOrder(index) {
    setOrder([
      // Everything before/after the item we want to remove
      ...order.slice(0, index),
      ...order.slice(index + 1),
    ]);
  }
  // 4. Send this data to a serverless function when they check out
  // TODO

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
