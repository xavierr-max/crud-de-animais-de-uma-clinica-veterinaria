import express from 'express';
import router from './modules/animal/routes/animal.route.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORTA || 3000;

app.get('/', (req, res) => {
    const healthCheck = {
        status: 'online',
        mensagem: 'API de cadastro de animais operante',
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(process.uptime())} segundos`
    };

    res.status(200).json(healthCheck);
});

app.use(router);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

