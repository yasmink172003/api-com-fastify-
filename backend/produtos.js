// Importa o arquivo de conexão com o banco de dados
// Esse arquivo provavelmente tem a configuração do MySQL
const db = require("../db")

// Exporta uma função assíncrona que recebe o fastify
// Isso permite registrar essas rotas dentro do servidor principal
module.exports = async function (fastify) {

  // ================================
  // LISTAR PRODUTOS (GET)
  // ================================
  // Essa rota serve para buscar todos os produtos do banco
  fastify.get("/produtos", async () => {

    // Executa uma consulta SQL no banco de dados
    // SELECT * significa "buscar todas as colunas"
    // FROM produtos significa "da tabela produtos"
    const [rows] = await db.query(
      "SELECT * FROM produtos"
    )

    // Retorna os dados encontrados
    // rows será um array com todos os produtos
    return rows
  })


  // ================================
  // CRIAR PRODUTO (POST)
  // ================================
  // Essa rota cria um novo produto no banco
  fastify.post("/produtos", {

    // onRequest executa antes da rota
    // fastify.authenticate verifica o JWT
    // ou seja, só usuários logados podem criar produtos
    onRequest: [fastify.authenticate]

  }, async (request) => {

    // Pegando os dados enviados no corpo da requisição
    // exemplo JSON enviado:
    // {
    //   "nome": "Tenis Nike",
    //   "preco": 299
    // }
    const { nome, preco } = request.body

    // Executa um INSERT no banco
    // ? são placeholders de segurança para evitar SQL Injection
    await db.query(
      "INSERT INTO produtos (nome,preco) VALUES (?,?)",
      [nome, preco]
    )

    // Retorna uma mensagem de sucesso
    return { mensagem: "Produto criado" }

  })


  // ================================
  // ATUALIZAR PRODUTO (PUT)
  // ================================
  // Atualiza um produto existente
  fastify.put("/produtos/:id", {

    // Rota protegida com autenticação
    onRequest: [fastify.authenticate]

  }, async (request) => {

    // Pegando o ID que vem na URL
    // exemplo:
    // /produtos/5
    const { id } = request.params

    // Pegando os dados enviados no body
    const { nome, preco } = request.body

    // Executa um UPDATE no banco
    // Atualiza nome e preco onde o id for igual ao enviado
    await db.query(
      "UPDATE produtos SET nome=?, preco=? WHERE id=?",
      [nome, preco, id]
    )

    // Retorna mensagem de sucesso
    return { mensagem: "Produto atualizado" }

  })


  // ================================
  // DELETAR PRODUTO (DELETE)
  // ================================
  // Remove um produto do banco
  fastify.delete("/produtos/:id", {

    // Também exige autenticação
    onRequest: [fastify.authenticate]

  }, async (request) => {

    // Pegando o id que vem na URL
    const { id } = request.params

    // Executa o DELETE no banco
    // Remove o produto que tiver o id informado
    await db.query(
      "DELETE FROM produtos WHERE id=?",
      [id]
    )

    // Retorna mensagem de confirmação
    return { mensagem: "Produto removido" }

  })

}