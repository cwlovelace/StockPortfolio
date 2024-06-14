// frontend/src/components/PortfolioForm.js

import React, { useState } from 'react';

const PortfolioForm = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New Portfolio Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Portfolio</button>
    </form>
  );
};

export default PortfolioForm;
