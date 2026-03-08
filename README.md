# 🚀 API de Usuários e Produtos com Fastify, JWT e MySQL

Esta é uma **API REST completa** desenvolvida com **Node.js e Fastify**, que permite gerenciar **usuários e produtos** com autenticação segura utilizando **JWT (JSON Web Token)**.

O projeto foi desenvolvido com foco em **boas práticas de backend**, incluindo:

* Autenticação com JWT
* Senhas criptografadas com bcrypt
* Conexão com banco de dados MySQL
* Estrutura de rotas organizada
* CRUD completo de usuários e produtos

---

# 📌 Tecnologias Utilizadas

* Node.js
* Fastify
* MySQL
* mysql2
* bcrypt
* JSON Web Token (JWT)
* dotenv

---

# 📂 Estrutura do Projeto

```
project
│
├── db.js
├── server.js
├── .env
│
├── routes
│   ├── users.js
│   ├── produtos.js
│   └── login.js
│
└── package.json
```

Descrição:

| Arquivo     | Função                             |
| ----------- | ---------------------------------- |
| server.js   | Inicializa o servidor Fastify      |
| db.js       | Configuração da conexão com MySQL  |
| users.js    | Rotas de gerenciamento de usuários |
| produtos.js | Rotas de gerenciamento de produtos |
| login.js    | Rota de autenticação               |

---

# ⚙️ Instalação do Projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-projeto.git
```

---

### 2️⃣ Entrar na pasta

```bash
cd seu-projeto
```

---

### 3️⃣ Instalar as dependências

```bash
npm install
```

Dependências principais:

```bash
npm install fastify
npm install mysql2
npm install bcrypt
npm install jsonwebtoken
npm install dotenv
npm install @fastify/jwt
npm install @fastify/cors
```

---

# 🗄️ Configuração do Banco de Dados

Crie um banco de dados no **MySQL**.

Exemplo:

```sql
CREATE DATABASE loja_api;
```

---

## Tabela de Usuários

```sql
CREATE TABLE users (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100),
 email VARCHAR(100) UNIQUE,
 senha VARCHAR(255)
);
```

---

## Tabela de Produtos

```sql
CREATE TABLE produtos (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100),
 preco DECIMAL(10,2)
);
```

---

# 🔐 Configuração do arquivo .env

Crie um arquivo chamado:

```
.env
```

Dentro dele coloque:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=loja_api

JWT_SECRET=segredo_super_seguro
```

Esse arquivo guarda **informações sensíveis do sistema**.

---

# ▶️ Executando o Projeto

Para iniciar o servidor:

```bash
node server.js
```

Servidor rodará em:

```
http://localhost:3000
```

---

# 📡 Rotas da API

## 👤 Usuários

### Criar usuário

POST /users

Body:

```json
{
 "nome": "Maria",
 "email": "maria@email.com",
 "senha": "123456"
}
```

---

### Listar usuários (rota protegida)

GET /users

Header obrigatório:

```
Authorization: Bearer TOKEN
```

---

### Atualizar usuário

PUT /users/:id

Body:

```json
{
 "nome": "Novo Nome"
}
```

---

### Deletar usuário

DELETE /users/:id

---

# 🔑 Login

POST /login

Body:

```json
{
 "email": "maria@email.com",
 "senha": "123456"
}
```

Resposta:

```json
{
 "mensagem": "Login realizado",
 "token": "SEU_TOKEN_JWT"
}
```

Esse token deve ser usado nas rotas protegidas.

---

# 📦 Produtos

### Listar produtos

GET /produtos

---

### Criar produto (rota protegida)

POST /produtos

```json
{
 "nome": "Tênis Nike",
 "preco": 299.90
}
```

---

### Atualizar produto

PUT /produtos/:id

---

### Deletar produto

DELETE /produtos/:id

---

# 🔐 Autenticação

As rotas protegidas utilizam **JWT**.

Exemplo de header:

```
Authorization: Bearer SEU_TOKEN
```

Fluxo:

```
Criar usuário
      ↓
Fazer login
      ↓
Receber token
      ↓
Usar token nas rotas protegidas
```

---

# 🧪 Testando a API

Você pode testar utilizando:

* Postman
* Insomnia
* Thunder Client (VSCode)

---

# 📈 Possíveis Melhorias

Algumas melhorias que podem ser implementadas:

* Validação de dados com Zod
* Documentação com Swagger
* ORM Prisma
* Paginação de resultados
* Deploy em servidor

---

# 👩‍💻 Autor

Projeto desenvolvido para fins de estudo de **Node.js e APIs REST**.
Yasmin Karolayne
