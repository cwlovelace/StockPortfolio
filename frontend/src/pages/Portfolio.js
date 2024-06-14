// frontend/src/pages/Portfolio.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import Autosuggest from 'react-autosuggest';
import PortfolioList from '../components/PortfolioList';
import PortfolioForm from '../components/PortfolioForm';
import StockForm from '../components/StockForm';
import StockList from '../components/StockList';

const Portfolio = () => {
  const { username } = useParams();
  const [portfolios, setPortfolios] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [newStock, setNewStock] = useState('');
  const [newQuantity, setNewQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await API.get('/portfolios/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setPortfolios(response.data);
        if (response.data.length > 0) {
          setSelectedPortfolio(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching portfolios', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    const fetchStocks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await API.get('/stocks/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching stocks', error);
      }
    };

    fetchPortfolios();
    fetchStocks();
  }, [username, navigate]);

  const addPortfolio = async (name) => {
    try {
      const token = localStorage.getItem('token');
      const response = await API.post('/portfolios/', { name }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setPortfolios([...portfolios, response.data]);
    } catch (error) {
      console.error('Error adding portfolio', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const deletePortfolio = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await API.delete(`/portfolios/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setPortfolios(portfolios.filter(portfolio => portfolio.id !== id));
    } catch (error) {
      console.error('Error deleting portfolio', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const addStockToPortfolio = async () => {
    try {
      const token = localStorage.getItem('token');
      const stock = stocks.find(stock => stock.symbol.toLowerCase() === newStock.toLowerCase());
      if (!stock) {
        console.error('Stock not found');
        return;
      }
      const response = await API.post(`/portfolios/${selectedPortfolio.id}/add_stock/`, {
        stock_id: stock.id,
        quantity: newQuantity,
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setSelectedPortfolio({
        ...selectedPortfolio,
        stocks: [...selectedPortfolio.stocks, response.data],
      });
      setNewStock('');
      setNewQuantity(0);
    } catch (error) {
      console.error('Error adding stock to portfolio', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const updateStockQuantity = async (portfolioStockId, newQuantity) => {
    try {
      const token = localStorage.getItem('token');
      await API.put(`/portfolios/${selectedPortfolio.id}/update_stock/${portfolioStockId}/`, {
        quantity: newQuantity,
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setSelectedPortfolio({
        ...selectedPortfolio,
        stocks: selectedPortfolio.stocks.map(stock =>
          stock.id === portfolioStockId ? { ...stock, quantity: newQuantity } : stock
        ),
      });
    } catch (error) {
      console.error('Error updating stock quantity', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const getStockSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : stocks.filter(stock =>
      stock.symbol.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getStockSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = suggestion => suggestion.symbol;

  const renderSuggestion = suggestion => (
    <div>
      {suggestion.symbol} - {suggestion.name}
    </div>
  );

  const calculateTotalValue = portfolio => {
    return portfolio.stocks.reduce((total, stock) => {
      return total + stock.quantity * stock.stock.price;
    }, 0);
  };

  return (
    <div>
      <h1>{username}'s Portfolios</h1>
      <PortfolioList portfolios={portfolios} onSelect={setSelectedPortfolio} onDelete={deletePortfolio} />
      <PortfolioForm onSubmit={addPortfolio} />
      {selectedPortfolio && (
        <div>
          <h2>{selectedPortfolio.name}</h2>
          <StockList
            stocks={selectedPortfolio.stocks}
            onUpdateQuantity={updateStockQuantity}
          />
          <StockForm
            stockSuggestions={suggestions}
            newStock={newStock}
            setNewStock={setNewStock}
            newQuantity={newQuantity}
            setNewQuantity={setNewQuantity}
            onAddStock={addStockToPortfolio}
            getStockSuggestions={getStockSuggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
          />
          <h3>Portfolio Total Value: ${calculateTotalValue(selectedPortfolio)}</h3>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
