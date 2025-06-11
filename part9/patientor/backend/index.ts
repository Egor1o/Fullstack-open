import express from 'express';

const app = express();

app.get('/api/ping', (_req,res) => {
    return void res.send('pong');
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log('Connected');
});