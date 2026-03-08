// Importa a biblioteca bcrypt
// bcrypt é usada para comparar a senha digitada com a senha criptografada do banco
const bcrypt = require("bcrypt")

// Importa a conexão com o banco de dados
// Esse arquivo normalmente contém a configuração do MySQL
const db = require("../db")

// Exporta uma função assíncrona que recebe o fastify
// Isso permite registrar essa rota dentro do servidor principal
module.exports = async function (fastify) {

  // =====================
  // LOGIN
  // =====================
  // Essa rota serve para autenticar o usuário no sistema
  // Método POST porque envia dados (email e senha)
  fastify.post("/login", async (request, reply) => {

    // Pegando os dados enviados no corpo da requisição
    // Exemplo de body:
    // {
    //   "email": "usuario@email.com",
    //   "senha": "123456"
    // }
    const { email, senha } = request.body

    // =====================
    // BUSCAR USUÁRIO NO BANCO
    // =====================
    // Executa uma query SQL para buscar o usuário pelo email
    // O ? é um placeholder de segurança contra SQL Injection
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    )

    // Se não encontrar nenhum usuário com esse email
    if (rows.length === 0) {

      // Retorna erro 401 (não autorizado)
      return reply.code(401).send({ erro: "Usuário não encontrado" })
    }

    // Pega o primeiro usuário encontrado
    const user = rows[0]

    // =====================
    // VERIFICAR SENHA
    // =====================
    // bcrypt.compare compara:
    // senha digitada x senha criptografada no banco
    const senhaValida = await bcrypt.compare(senha, user.senha)

    // Se a senha estiver incorreta
    if (!senhaValida) {

      // Retorna erro de autenticação
      return reply.code(401).send({ erro: "Senha inválida" })
    }

    // =====================
    // CRIAR TOKEN JWT
    // =====================
    // Se email e senha estiverem corretos
    // o sistema gera um token JWT

    const token = fastify.jwt.sign({

      // Dados que vão dentro do token
      id: user.id,
      email: user.email

    })

    // =====================
    // RESPOSTA DA API
    // =====================
    // Retorna mensagem de sucesso + token
    return {
      mensagem: "Login realizado",
      token
    }

  })

}