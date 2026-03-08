// Importa a biblioteca mysql2 na versão que suporta Promises
// Isso permite usar async/await para fazer consultas no banco
const mysql = require("mysql2/promise")

// Carrega as variáveis de ambiente do arquivo .env
// Isso serve para esconder dados sensíveis como senha do banco
require("dotenv").config()

// Cria um "pool de conexões" com o banco de dados
// Pool significa um conjunto de conexões reutilizáveis
// Isso melhora muito a performance da aplicação
const db = mysql.createPool({

  // Endereço do servidor do banco de dados
  // Exemplo: localhost ou IP do servidor
  host: process.env.DB_HOST,

  // Usuário do banco de dados
  user: process.env.DB_USER,

  // Senha do banco de dados
  password: process.env.DB_PASSWORD,

  // Nome do banco de dados que será utilizado
  database: process.env.DB_NAME,

  // Se todas conexões estiverem ocupadas,
  // o sistema espera até liberar uma conexão
  waitForConnections: true,

  // Número máximo de conexões simultâneas
  // nesse caso até 10 conexões ao mesmo tempo
  connectionLimit: 10,

  // Limite de requisições que podem ficar na fila
  // 0 significa fila ilimitada
  queueLimit: 0

})

// Exporta a conexão com o banco
// Assim outros arquivos podem importar e usar
module.exports = db