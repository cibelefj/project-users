import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import { AppDataSource } from './database/data-source';
import routers from './app/routes/routes';

const app = express();
app.use(cors());
app.use(express.json());

// Configuração das rotas
app.use(routers);

// Inicialização do banco de dados e do servidor
AppDataSource.initialize().then(async () => {
  console.log('Conexão com o banco de dados bem sucedida!');

  app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
  });
});
