import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Link } from '@mui/material';


const FunFactsPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchNews = async () => {
        try {
          const response = await axios.get(
            'https://newsapi.org/v2/everything?q=tesla&from=2023-06-29&sortBy=publishedAt&apiKey=0107fd845ff8402fb93c22d76b76887d'
          );
          setNews(response.data.articles);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching news:', error);
          setLoading(false);
        }
      };
  
      fetchNews();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <Grid container spacing={2}>
        {news.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {article.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {new Date(article.publishedAt).toDateString()}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {article.description}
                </Typography>
                <Link href={article.url} target="_blank" rel="noopener noreferrer">
                  Read More
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };
  
  export default FunFactsPage;

