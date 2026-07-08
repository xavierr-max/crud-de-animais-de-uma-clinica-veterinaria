import express from 'express';
import router from './modules/animal/routes/animal.route.js';

const app = express();

app.use(express.json());

app.use(router);

const port = 3000;

app.get('/', (req, res) => {
    res.send('API de cadastro de animais');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
