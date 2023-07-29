import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const MotivationPage = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchMotivationalQuotes = async () => {
      try {
        const response = await axios.get('https://type.fit/api/quotes');
        setQuotes(response.data);
      } catch (error) {
        console.error('Error fetching motivational quotes:', error);
      }
    };

    fetchMotivationalQuotes();
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Motivational Quotes
      </Typography>
      {quotes.map((quote, index) => (
        <Card key={index} variant="outlined" style={{ margin: '8px 0' }}>
          <CardContent>
            <Typography variant="body1">{quote.text}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MotivationPage;
