// Portfolio.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import PortfolioList from '../components/PortfolioList';
import PortfolioForm from '../components/PortfolioForm';
import StockForm from '../components/StockForm';
import StockList from '../components/StockList';
import './Auth.css';

const Portfolio = () => {
  const { username } = useParams();
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [newStock, setNewStock] = useState('');
  const [newQuantity, setNewQuantity] = useState(0);
  const [editQuantity, setEditQuantity] = useState({});
  const navigate = useNavigate();

  // Hardcoded list of stock symbols - used to avoid issue with StockList from backend.
  const stocks = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", 
    "FB", "NVDA", "BRK-B", "JPM", "JNJ"
  ];

  // authenticate and display portfolios
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

    fetchPortfolios();
  }, [username, navigate]);

// add portfolio
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

  // delete portfolio
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
      const stockSymbol = newStock.toUpperCase();
      if (!stocks.includes(stockSymbol)) {
        console.error('Stock not found in the list');
        return;
      }
      const response = await API.post(`/portfolios/${selectedPortfolio.id}/add_stock/`, {
        stock_symbol: stockSymbol,
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
      setNewStock(''); // set back to default
      setNewQuantity(0); // set back to default
      window.location.reload(); // required to show new stock quantity
    } catch (error) {
      console.error('Error adding stock to portfolio', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const updateStockQuantity = async (portfolioStockId) => {
    try {
      const token = localStorage.getItem('token');
      const newQuantityValue = editQuantity[portfolioStockId] || 0;
      const stock = selectedPortfolio.stocks.find(stock => stock.id === portfolioStockId);
      
      await API.put(`/portfolios/${selectedPortfolio.id}/update_stock/${portfolioStockId}/`, {
        stock_symbol: stock.stock.symbol,
        quantity: newQuantityValue,
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setSelectedPortfolio({
        ...selectedPortfolio,
        stocks: selectedPortfolio.stocks.map(stock =>
          stock.id === portfolioStockId ? { ...stock, quantity: newQuantityValue } : stock
        ),
      });
      setEditQuantity({
        ...editQuantity,
        [portfolioStockId]: 0
      });
    } catch (error) {
      console.error('Error updating stock quantity', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const deleteStockFromPortfolio = async (portfolioStockId) => {
    try {
      const token = localStorage.getItem('token');
      await API.delete(`/portfolios/${selectedPortfolio.id}/delete_stock/${portfolioStockId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setSelectedPortfolio({
        ...selectedPortfolio,
        stocks: selectedPortfolio.stocks.filter(stock => stock.id !== portfolioStockId),
      });
    } catch (error) {
      console.error('Error deleting stock from portfolio', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleEditQuantityChange = (portfolioStockId, value) => {
    setEditQuantity({
      ...editQuantity,
      [portfolioStockId]: value,
    });
  };

  const calculateTotalValue = (portfolio) => {
    const totalValue = portfolio.stocks.reduce((total, stock) => {
      return total + stock.quantity * stock.stock.price;
    }, 0);
    return totalValue.toFixed(2);
  };

  return (
    <div className="main-container">
      <h1>{username}'s Portfolios</h1>
      <PortfolioList portfolios={portfolios} onSelect={setSelectedPortfolio} onDelete={deletePortfolio} />
      <PortfolioForm onSubmit={addPortfolio} />
      {selectedPortfolio && (
        <div>
          <h2>{selectedPortfolio.name}</h2>
          <StockList
            stocks={selectedPortfolio.stocks}
            onUpdateQuantity={updateStockQuantity}
            onEditQuantityChange={handleEditQuantityChange}
            editQuantity={editQuantity}
            onDeleteStock={deleteStockFromPortfolio}
          />
          <StockForm
            stocks={stocks}
            newStock={newStock}
            setNewStock={setNewStock}
            newQuantity={newQuantity}
            setNewQuantity={setNewQuantity}
            onAddStock={addStockToPortfolio}
          />
          <h3>Portfolio Total Value: ${calculateTotalValue(selectedPortfolio)}</h3>
        </div>
      )}
    </div>
  );
};

export default Portfolio;






