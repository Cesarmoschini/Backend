import express from 'express';
import { PORT } from '..';
const app = express();

app.get('/', (req, res) => {
  console.log('Resolving / endpoint');
  res.json({
    pid: process.pid,
    msg: `Corriendo desde el puerto ${PORT}`,
  });
});

app.get('/api/randoms', (req, res) => {
  console.log('Resolving / endpoint');
  res.json({
    pid: process.pid,
    msg: `Corriendo desde el puerto ${PORT}`,
  });
});


app.get('/slow', function (req, res) {
  let sum = 0;
  for (let i = 0; i < 6e9; i++) {
    sum += i;
  }

  res.json({
    pid: process.pid,
    sum,
  });
});

app.get('/muerte', (req, res) => {
  res.json({ msg: 'OK' });
  process.exit(0);
});

export default app;