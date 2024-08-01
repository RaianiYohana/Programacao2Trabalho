const sequelize  = require("sequelize"); //Importa ORM sequelize que permite a interação com o banco de dados
require("dotenv").config()  // Este comando carregará automaticamente as variáveis de ambiente definidas em seu arquivo .env e as anexará ao objeto process

const conexao = new sequelize( // cria uma nova instância no sequelize e configura uma conexão no banco de dados
    process.env.DB_NAME, // nome do banco de dados
    process.env.DB_USER, //nome do user no banco de dados
process.env.DB_PASSWORD, // senha no banco de dados
{
    dialect:"mysql",  // insere o tipo de banco de dados, que nesse caso é o MySql
    host:process.env.DB_HOST // Endereço do servidor no banco de dados
}
)

module.exports = { conexao } // exporta a conexão para que possa ser usada em outras partes do projeto

