import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

const Portfolio = () => {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await API.get(`/portfolios/${username}/`);
        setPortfolio(response.data);
      } catch (error) {
        console.error('Error fetching portfolio', error);
      }
    };

    fetchPortfolio();
  }, [username]);

  return (
    <div>
      <h1>{username}'s Portfolio</h1>
      <ul>
        {portfolio.map(item => (
          <li key={item.id}>{item.name}: {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default Portfolio;




