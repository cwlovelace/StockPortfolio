// frontend/src/components/StockList.js
import React, { useState } from 'react';

const StockList = ({ stocks, onUpdateQuantity }) => {
  const [editingStockId, setEditingStockId] = useState(null);
  const [quantity, setQuantity] = useState(0);

  const handleEditClick = (stock) => {
    setEditingStockId(stock.id);
    setQuantity(stock.quantity);
  };

  const handleUpdateClick = () => {
    onUpdateQuantity(editingStockId, quantity);
    setEditingStockId(null);
  };

  return (
    <ul>
      {stocks.map((stock) => (
        <li key={stock.id}>
          {stock.stock.name} ({stock.stock.symbol}) - Quantity: {stock.quantity} - Total Value: ${(stock.quantity * stock.stock.price).toFixed(2)}
          <button onClick={() => handleEditClick(stock)}>Edit</button>
          {editingStockId === stock.id && (
            <div>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
              <button onClick={handleUpdateClick}>Update</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default StockList;


