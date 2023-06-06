import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateUserTable1685493416087 } from "./migrations/1685493416087-CreateUserTable";
import User from "../app/entities/User";

// Criação da instância e configurações
export const AppDataSource = new DataSource({
  type: "sqlite", 
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [CreateUserTable1685493416087], 
  subscribers: [],
});
