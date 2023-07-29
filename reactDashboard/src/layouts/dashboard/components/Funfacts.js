import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const FunFactsWidget = () => {
  const [funFact, setFunFact] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFunFact = async () => {
      try {
        const response = await axios.get('https://api.chucknorris.io/jokes/random');
        setFunFact(response.data.value);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching fun fact:', error);
        setLoading(false);
      }
    };

    fetchFunFact();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleWidgetClick = () => {
    // Navigate to the FunFactPage when the user clicks on the widget
    navigate('/funfacts');
  };

  return (
    <Card onClick={handleWidgetClick}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          Fun Fact
        </Typography>
        <Typography variant="body1" gutterBottom>
          {funFact}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FunFactsWidget;
