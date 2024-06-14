// frontend/src/components/PortfolioList.js

import React from 'react';

const PortfolioList = ({ portfolios, onSelect, onDelete }) => {
  return (
    <ul>
      {portfolios.map(portfolio => (
        <li key={portfolio.id}>
          {portfolio.name}
          <button onClick={() => onSelect(portfolio)}>View</button>
          <button onClick={() => onDelete(portfolio.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default PortfolioList;
