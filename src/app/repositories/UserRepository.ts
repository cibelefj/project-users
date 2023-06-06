import User from "../entities/User";
import { Repository } from "typeorm";
import { AppDataSource } from "../../database/data-source";

// Obtém o repositório de usuários
const userRepository: Repository<User> = AppDataSource.getRepository(User);

// Função para obter todos os usuários
const getUsers = async (): Promise<User[]> => {
  try {
    const queryBuilder = userRepository.createQueryBuilder('user');
    queryBuilder.select(['user.email', 'user.name']);
    const users = await queryBuilder.getMany();

    return users;
  } catch (error) {
    console.error('Erro ao buscar os usuários:', error);
    throw new Error('Erro ao buscar os usuários.');
  }
};

// Função para criar um novo usuário
const postUser = async (user: User): Promise<User> => {
  try {
    const newUser = await userRepository.save(user);
    return newUser;
  } catch (error) {
    console.error('Erro ao criar o usuário:', error);
    throw new Error('Erro ao criar o usuário.');
  }
};

// Função para atualizar um usuário existente
const updateUser = async (userId: number, updatedUser: User): Promise<User | null> => {
  try {
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return null;
    }

    // Atualiza os dados do usuário
    user.name = updatedUser.name;
    user.login = updatedUser.login;
    user.email = updatedUser.email;
    user.password = updatedUser.password;

    await userRepository.save(user);

    console.log(`Usuário com ID ${userId} atualizado com sucesso.`);
    return user;
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error);
    throw new Error('Erro ao atualizar o usuário.');
  }
};

// Função para excluir um usuário
const deleteUser = async (userId: number): Promise<User | null> => {
  try {
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return null;
    }

    console.log(`Usuário com ID ${userId} excluído com sucesso.`);
    await userRepository.remove(user);

    return user;
  } catch (error) {
    console.error('Erro ao excluir o usuário:', error);
    throw new Error('Erro ao excluir o usuário.');
  }
};

export default { getUsers, postUser, updateUser, deleteUser };
