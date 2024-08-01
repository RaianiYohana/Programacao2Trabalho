const sequelize = require("sequelize"); //importa o ORM sequelize que permite a interação com o banco de dados
const banco = require("./banco") //importa o módulo banco, que contém a configuração e conexão com o banco de dados 
const vendedor = require("./vendedor") //importa o modelo vendedor

var pneus = banco.conexao.define( //cria um modelo pneus e suas respectivas colunas
    "pneus",
    {
        id:{
            type:sequelize.INTEGER.UNSIGNED,  // é a chave primária e é auto incrementada
            primaryKey: true,
            autoIncrement:true
        },
        nome:{
            type:sequelize.STRING, // cria uma string nome que não pode ser nula
            allowNull:false
        },
        aro:{
            type:sequelize.INTEGER.UNSIGNED, // cria um inteiro Aro que não pode ser nulo
            allowNull:false
        },
        marca:{
            type:sequelize.STRING, // cria uma string marca que não pode ser nula 
            allowNull:false
        }
    },
    { timestamps: false }  // Significa que não pode ser adicionado nada no banco automaticamente
)

module.exports = {pneus}  //exporta o modelo pneus para que possa ser usada em outras partes do projeto