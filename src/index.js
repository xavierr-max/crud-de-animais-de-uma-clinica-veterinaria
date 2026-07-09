import express from 'express';
import router from './modules/animal/routes/animal.route.js';

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get(['/', '/healthcheck', '/healcheck'], (req, res) => {
    const healthCheck = {
        status: 'online',
        mensagem: 'API de cadastro de animais operante',
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(process.uptime())} segundos`
    };

    res.status(200).json(healthCheck);
});

app.use(router);

if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
}

export default app;
