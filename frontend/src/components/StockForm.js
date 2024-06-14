// frontend/src/components/StockForm.js

import React from 'react';
import Autosuggest from 'react-autosuggest';

const StockForm = ({
  stockSuggestions,
  newStock,
  setNewStock,
  newQuantity,
  setNewQuantity,
  onAddStock,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  getSuggestionValue,
  renderSuggestion,
}) => {
  return (
    <div>
      <Autosuggest
        suggestions={stockSuggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: 'Type a stock symbol',
          value: newStock,
          onChange: (e, { newValue }) => setNewStock(newValue),
        }}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={newQuantity}
        onChange={(e) => setNewQuantity(Number(e.target.value))}
      />
      <button onClick={onAddStock}>Add Stock</button>
    </div>
  );
};

export default StockForm;
