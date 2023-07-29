import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  TextField,
} from '@mui/material';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleCalculate = () => {
    try {
      setResult(eval(input).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <Card>
      <CardContent sx={{ bgcolor: '#b1d4e0' }}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h6">Calculator</Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Input"
              value={input}
              variant="outlined"
              fullWidth
              disabled
            />
          </Grid>
          <Grid item>
            <TextField
              label="Result"
              value={result}
              variant="outlined"
              fullWidth
              disabled
            />
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={3}>
              <Button fullWidth onClick={() => handleButtonClick('1')}>
                1
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth onClick={() => handleButtonClick('2')}>
                2
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth onClick={() => handleButtonClick('3')}>
                3
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth onClick={() => handleButtonClick('+')}>
                +
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth onClick={() => handleButtonClick('4')}>
                4
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth onClick={() => handleButtonClick('5')}>
                5
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth onClick={() => handleButtonClick('6')}>
                6
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth onClick={() => handleButtonClick('-')}>
                -
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth onClick={() => handleButtonClick('7')}>
                7
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth onClick={() => handleButtonClick('8')}>
                8
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth onClick={() => handleButtonClick('9')}>
                9
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth onClick={() => handleButtonClick('*')}>
                ×
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth onClick={() => handleButtonClick('0')}>
                0
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth onClick={() => handleButtonClick('.')}>
                .
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth onClick={() => handleButtonClick('/')}>
                ÷
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth onClick={handleClear}>
                Clear
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth onClick={handleCalculate}>
                =
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Calculator;
