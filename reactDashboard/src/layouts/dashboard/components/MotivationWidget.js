import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const MotivationWidget = () => {
  const [quote, setQuote] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMotivationalQuote = async () => {
      try {
        const response = await axios.get(
          'https://type.fit/api/quotes'
        );
        // Pick a random quote from the response
        const randomIndex = Math.floor(Math.random() * response.data.length);
        setQuote(response.data[randomIndex].text);
      } catch (error) {
        console.error('Error fetching motivational quote:', error);
      }
    };

    fetchMotivationalQuote();
  }, []);

  const handleWidgetClick = () => {
    // Navigate to the WeatherPage when the user clicks on the widget
    navigate('/motivation');
  };

  return (
    <Card onClick={handleWidgetClick} sx={{ bgcolor: '#145da0' }}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom color="white">
          Motivation Quote
        </Typography>
        <Typography variant="body1" gutterBottom>
          {quote}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MotivationWidget;
