// StockForm.js
import React from 'react';

const StockForm = ({ stocks, newStock, setNewStock, newQuantity, setNewQuantity, onAddStock }) => {
  return (
    <div>
      <h3>Add Stock</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        onAddStock();
      }}>
        <div>
          <label>Stock Symbol</label>
          <select value={newStock} onChange={(e) => setNewStock(e.target.value)}>
            <option value="">Select a stock</option>
            {stocks.map(stock => (
              <option key={stock} value={stock}>{stock}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
          />
        </div>
        <button type="submit">Add Stock</button>
      </form>
    </div>
  );
};

export default StockForm;




