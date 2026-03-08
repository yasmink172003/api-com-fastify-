const bcrypt = require("bcrypt")
const db = require("../db")

module.exports = async function (fastify) {

  // LISTAR USUÁRIOS
  fastify.get("/users", {
    onRequest: [fastify.authenticate]
  }, async () => {

    const [rows] = await db.query(
      "SELECT id,nome,email FROM users"
    )

    return rows
  })


  // CRIAR USUÁRIO
  fastify.post("/users", async (request, reply) => {

    const { nome, email, senha } = request.body

    if (!nome || !email || !senha) {
      return reply.code(400).send({
        erro: "Preencha todos os campos"
      })
    }

    const senhaHash = await bcrypt.hash(senha, 10)

    await db.query(
      "INSERT INTO users (nome,email,senha) VALUES (?,?,?)",
      [nome, email, senhaHash]
    )

    return { mensagem: "Usuário criado" }

  })


  // ATUALIZAR
  fastify.put("/users/:id", {
    onRequest: [fastify.authenticate]
  }, async (request) => {

    const { id } = request.params
    const { nome } = request.body

    await db.query(
      "UPDATE users SET nome=? WHERE id=?",
      [nome, id]
    )

    return { mensagem: "Usuário atualizado" }
  })


  // DELETAR
  fastify.delete("/users/:id", {
    onRequest: [fastify.authenticate]
  }, async (request) => {

    const { id } = request.params

    await db.query(
      "DELETE FROM users WHERE id=?",
      [id]
    )

    return { mensagem: "Usuário removido" }

  })

}// Importa a biblioteca bcrypt
// bcrypt é usada para criptografar senhas antes de salvar no banco
const bcrypt = require("bcrypt")

// Importa o arquivo de conexão com o banco de dados
// Esse arquivo normalmente contém a configuração do MySQL
const db = require("../db")

// Exporta uma função assíncrona que recebe o fastify como parâmetro
// Isso permite registrar essas rotas dentro do servidor principal
module.exports = async function (fastify) {

  // =====================================
  // LISTAR USUÁRIOS (GET)
  // =====================================
  // Essa rota retorna todos os usuários cadastrados
  fastify.get("/users", {

    // onRequest executa antes da rota
    // fastify.authenticate verifica se o usuário possui um token JWT válido
    // ou seja, só usuários logados podem acessar essa rota
    onRequest: [fastify.authenticate]

  }, async () => {

    // Executa uma consulta SQL no banco
    // Seleciona apenas id, nome e email da tabela users
    // A senha não é retornada por segurança
    const [rows] = await db.query(
      "SELECT id,nome,email FROM users"
    )

    // Retorna todos os usuários encontrados
    return rows
  })


  // =====================================
  // CRIAR USUÁRIO (POST)
  // =====================================
  // Essa rota serve para cadastrar um novo usuário
  fastify.post("/users", async (request, reply) => {

    // Pegando os dados enviados no corpo da requisição
    // Exemplo de body:
    // {
    //   "nome": "Yasmin",
    //   "email": "yasmin@email.com",
    //   "senha": "123456"
    // }
    const { nome, email, senha } = request.body

    // Verifica se algum campo não foi preenchido
    // Se faltar algum campo, retorna erro 400
    if (!nome || !email || !senha) {
      return reply.code(400).send({
        erro: "Preencha todos os campos"
      })
    }

    // Criptografa a senha antes de salvar no banco
    // 10 é o nível de segurança (salt rounds)
    const senhaHash = await bcrypt.hash(senha, 10)

    // Insere o usuário no banco de dados
    // ? são placeholders para evitar SQL Injection
    await db.query(
      "INSERT INTO users (nome,email,senha) VALUES (?,?,?)",
      [nome, email, senhaHash]
    )

    // Retorna mensagem de sucesso
    return { mensagem: "Usuário criado" }

  })


  // =====================================
  // ATUALIZAR USUÁRIO (PUT)
  // =====================================
  // Essa rota atualiza informações do usuário
  fastify.put("/users/:id", {

    // Rota protegida por autenticação JWT
    onRequest: [fastify.authenticate]

  }, async (request) => {

    // Pegando o ID da URL
    // Exemplo:
    // /users/5
    const { id } = request.params

    // Pegando o novo nome enviado no body
    const { nome } = request.body

    // Executa o UPDATE no banco
    // Atualiza o nome do usuário com o id informado
    await db.query(
      "UPDATE users SET nome=? WHERE id=?",
      [nome, id]
    )

    // Retorna mensagem de confirmação
    return { mensagem: "Usuário atualizado" }
  })


  // =====================================
  // DELETAR USUÁRIO (DELETE)
  // =====================================
  // Remove um usuário do banco de dados
  fastify.delete("/users/:id", {

    // Também exige autenticação JWT
    onRequest: [fastify.authenticate]

  }, async (request) => {

    // Pegando o ID da URL
    const { id } = request.params

    // Executa a query DELETE no banco
    // Remove o usuário com o id informado
    await db.query(
      "DELETE FROM users WHERE id=?",
      [id]
    )

    // Retorna mensagem de sucesso
    return { mensagem: "Usuário removido" }

  })

}