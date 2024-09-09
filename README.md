# API Micro Chat

Development                                                                           
![](https://img.shields.io/badge/build-passing-brightgreen) 

This project is using **TypeScript**, **NodeJS**, **Sequelize**, **Express**, **Socket.io** and database **Postegres**.

## First steps

### Requirements for local development

-   [NodeJS](https://nodejs.org/en/) `LTS Version`
-   [Sequelize Cli](https://sequelize.org/docs/v7/cli/)
-   [Postgres](https://www.postgresql.org/)
-   [Express](https://expressjs.com/)
-   [Socket.io](https://socket.io/pt-br/)
-   [Typescript](https://www.typescriptlang.org/)

### Initial setup

```sh
#Copy the .env file and populate with your data (or use the one in docker compose for local development)
cp .env.example .env
docker compose up -d
```

-   You can debug the application on vscode for more information check the `launch.json` file for HTTP or HTTPS

### Useful commands

| What it does ?                                                                           | Command                                                                             |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Deploys all the stack into the development stage                                         | `npm run dev`                                                                |
| Run the docker container in detached form                                         | `docker compose up`                                                                |
| After the docker compose up you have to interact with the api to run the migration with this command                                          | `sudo docker exec -it app bash`                                                               |
| In the interactive terminal run the migration with the following command                                          | `npm run db:migrate`                                                               |

## Project folders

The entire project is inside `src` folder. You can follow this treeview as a guide:

```
.
├── src
│   ├── controller                # Gateway for the enpoints where the error is treated
│   │   ├── messageController.ts  # Endpoints related to the message interaction for the user
│   │   └── userController.ts     # Endpoints related to the message interaction for the messages
│   │
│   ├── dtos                      # Data Transfer Objects
│   │   └── createUser.dto.ts     # Structure for the user creation
│   │   └── login.dto.ts          # Structure of the body from login
│   │   └── receiveMessage.dto.ts # Structure of the message received in the socket.io
│   │   └── updateUser.dto.ts     # Structure of the body for the update of the user
│   │
│   ├── enum                      # Folder of enums
│   │   └── UserScopes.ts         # Scopes to restrict what will be delivered when conected with User table in database.
│   │
│   ├── libs                      # Shared code and helpers
│   │   └── Databse.ts            # Connetion Pool for the database
│   │   └── helpers.ts            # Token verification and hash passwords
│   │
│   ├── middlewares               # Middlewares
│   │   └── userValidations.ts    # Specially for the create user
│   │
│   ├── migrations                # Creates automaticly the database and tables
│   │
│   ├── models                    # ODM/ORM Models
│   │
│   ├── routes                    # Routes for the endpoints
│   │   └── message.routes.ts     # Router for the messages endpoints
│   │   └── users.routes.ts       # Router for the users endpoints
│   │
│   ├── scripts                   # Seeders and migration structure
│   │
│   ├── services                  # Gateway for the interaction of the endpoint with the database and rules of business
│   │   ├── messageController.ts  # Endpoints related to the interaction for the user
│   │   └── userController.ts     # Endpoints related to the interaction for the messages
│   │
│   ├── app                       # Express connection
│   │
│   ├── index                     # Conects the api and socket.io
│
├── .gitignore
├── .nvmrc
├── package-lock.json
├── package.json
├── README.md                     # Instruction and information about the project
├── tsconfig.json                 # TypeScript configuration
└── tsconfig.paths.json           # TypeScript paths
```

### TODO

-   Improve the connection that is doing too many requests with the socket.io


