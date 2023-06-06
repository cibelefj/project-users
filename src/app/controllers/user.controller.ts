import { Request, Response, Router } from 'express';
import IUser from '../interfaces/IUsers';
import UserRepository from '../repositories/UserRepository';
import axios from 'axios';

const userRouter = Router();

// Rota para listar usuários
userRouter.get('/', async (req: Request, res: Response): Promise<Response<IUser[]>> => {
  try {
    const users = await UserRepository.getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar os usuários.' });
  }
});

// Rota para criar um novo usuário
userRouter.post('/', async (req: Request, res: Response): Promise<Response<IUser>> => {
  try {
    const user = req.body;

    // Validação da senha
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(user.password)) {
      return res.status(400).json({ error: 'A senha deve ter pelo menos 8 caracteres e incluir pelo menos 1 letra.' });
    }

    const newUser = await UserRepository.postUser(user);
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar o usuário.' });
  }
});


// Rota para atualizar um usuário existente
userRouter.put('/:id', async (req: Request, res: Response): Promise<Response<IUser>> => {
  try {
    const userId = Number(req.params.id);
    const updatedUser = req.body;
    const user = await UserRepository.updateUser(userId, updatedUser);

    if (!user) {
      return res.status(404).send('Usuário não encontrado.');
    }

    console.log(`Usuário com ID ${userId} atualizado com sucesso.`);
    return res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error);
    return res.status(500).json({ error: 'Erro ao atualizar o usuário.' });
  }
});

// Rota para excluir um usuário
userRouter.delete('/:id', async (req: Request, res: Response): Promise<Response<IUser>> => {
  try {
    const userId = Number(req.params.id);
    const user = await UserRepository.deleteUser(userId);

    if (!user) {
      return res.status(404).send('Usuário não encontrado.');
    }

    console.log(`Usuário com ID ${userId} excluído com sucesso.`);
    return res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao excluir o usuário:', error);
    return res.status(500).json({ error: 'Erro ao excluir o usuário.' });
  }
});

// Rota para consultar informações do usuário no GitHub
userRouter.get('/github/:username', async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username } = req.params;
    const response = await axios.get(`https://api.github.com/users/${username}`);

    if (response.status !== 200) {
      throw new Error('Erro ao consultar o usuário no GitHub.');
    }

    const user = response.data;
    return res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao consultar o usuário no GitHub:', error);
    return res.status(500).json({ error: 'Erro ao consultar o usuário no GitHub.' });
  }
});

export default userRouter;
