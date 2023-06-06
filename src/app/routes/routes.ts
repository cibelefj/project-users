import { Router } from 'express';
import userRouter from '../controllers/user.controller';
import fileRouter from '../controllers/files.controller';

const routers = Router();

// Define as rotas para usuários e arquivos
routers.use('/users', userRouter);
routers.use('/file', fileRouter);

export default routers;
