// Importa Fastify
const fastify = require("fastify")({ logger: true })

// Carrega variáveis do .env
require("dotenv").config()

// Registra JWT
fastify.register(require("@fastify/jwt"), {
  secret: process.env.JWT_SECRET
})

// Registra CORS
fastify.register(require("@fastify/cors"), {
  origin: "*"
})

// Middleware de autenticação
fastify.decorate("authenticate", async function (request, reply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.code(401).send({ erro: "Token inválido ou não enviado" })
  }
})

// Importa rotas
fastify.register(require("./routes/auth"))
fastify.register(require("./routes/users"))
fastify.register(require("./routes/produtos"))

// Rota teste
fastify.get("/", async () => {
  return { mensagem: "API rodando 🚀" }
})

// Inicia servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
    console.log("Servidor rodando em http://localhost:3000")
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()