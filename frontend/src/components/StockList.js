// frontend/src/components/StockList.js

import React, { useState } from 'react';

const StockList = ({ stocks, onUpdateQuantity }) => {
  const [editQuantity, setEditQuantity] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);

  const handleUpdateQuantity = (id, quantity) => {
    onUpdateQuantity(id, quantity);
    setEditQuantity(null);  // Clear edit state after update
  };

  return (
    <ul>
      {stocks.map(stock => (
        <li key={stock.id}>
          {stock.stock.name} ({stock.stock.symbol}) - Quantity: {stock.quantity}
          <button onClick={() => setEditQuantity(stock.id)}>Edit</button>
          <span>Total Value: ${stock.quantity * stock.stock.price}</span>
          {editQuantity === stock.id && (
            <div>
              <input
                type="number"
                placeholder="New Quantity"
                value={newQuantity}
                onChange={(e) => setNewQuantity(Number(e.target.value))}
              />
              <button onClick={() => handleUpdateQuantity(stock.id, newQuantity)}>Update</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default StockList;

