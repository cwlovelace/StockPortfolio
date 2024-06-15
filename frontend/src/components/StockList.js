// frontend/src/components/StockList.js
import React, { useState } from 'react';

const StockList = ({ stocks, onUpdateQuantity, onEditQuantityChange, editQuantity, onDeleteStock }) => {
  const [editingStockId, setEditingStockId] = useState(null);

  const handleEditClick = (stockId) => {
    setEditingStockId(stockId);
  };

  const handleUpdateClick = (stockId) => {
    onUpdateQuantity(stockId);
    setEditingStockId(null);
  };

  return (
    <div>
      <ul>
        {stocks.map((portfolioStock) => (
          <li key={portfolioStock.id}>
            {portfolioStock.stock.name} ({portfolioStock.stock.symbol}) - Quantity: {portfolioStock.quantity} Total Value: ${(portfolioStock.quantity * portfolioStock.stock.price).toFixed(2)}
            {editingStockId === portfolioStock.id ? (
              <div>
                <input
                  type="number"
                  value={editQuantity[portfolioStock.id] || 0}
                  onChange={(e) => onEditQuantityChange(portfolioStock.id, parseInt(e.target.value))}
                />
                <button onClick={() => handleUpdateClick(portfolioStock.id)}>Update</button>
              </div>
            ) : (
              <div>
                <button onClick={() => handleEditClick(portfolioStock.id)}>Edit</button>
                <button onClick={() => onDeleteStock(portfolioStock.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockList;





