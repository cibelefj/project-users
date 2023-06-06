# Projeto construído com TypeORM

Este projeto é um exemplo de uma aplicação Node.js usando TypeORM como ORM para interagir com o banco de dados.

Passos para executar o projeto:

1. Execute o comando `npm install` para instalar as dependências do projeto.
2. Configure as configurações do banco de dados dentro do arquivo `data-source.ts`.
3. Execute o comando `npm run start:dev` para iniciar o servidor de desenvolvimento.
4. Certifique-se de ter o Node.js instalado na máquina utilizada.

Comandos disponíveis:
`npm run start:dev`: Inicia o servidor de desenvolvimento usando ts-node-dev para compilar e executar o código Typescript em tempo real.
`npm run start:prod`: Compila o código Typescript usando tsc e inicia o servidor com o código JavaScript resultante.
`npm run typeorm`: Executa o comando TypeORM para realizar operações relacionadas ao banco de dados.
`npm run typeorm -- -d src/database/data-source.ts migration:run`: Comando para rodar migrações.