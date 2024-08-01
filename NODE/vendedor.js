const sequelize = require("sequelize"); // importa o ORM (Mapeamento de Objetos Relacionais) Sequelize que permite a interaçaõ com o banco de dados
const banco = require("./banco") //importa o módulo banco, que contém a configuração e a conexão com o banco de dados
const pneus = require("./pneus") // importa o módulo pneu, onde contém o modelo pneu

var vendedor = banco.conexao.define(  // cria um modelo chamado vendedor e suas respectivas colunas
    "vendedor",
    {
        id:{
            type:sequelize.INTEGER.UNSIGNED,
            primaryKey: true,   // é a chave primária e é auto increment
            autoIncrement:true
        },
        nome:{
            type:sequelize.STRING,  // Uma string nome que não pode ser nula
            allowNull:false
        },
        cnpj: {
            type:sequelize.STRING, // uma string cnpj que não pode ser nula
            allowNull: false
        }
    },
    { timestamps: false } // significa que o Sequelize não pode adicionar campos automaticamente à tabela
)

vendedor.hasMany( pneus.pneus ) // significa a definição de relacionamento, onde um vendedor pode ter muitos pneus atrelados a ele
pneus.pneus.belongsTo( vendedor ) // Define que cada pneu pertence a um vendedor  (muitos para um )

module.exports = {vendedor} // exportação do modelo vendedor para que possa ser usado em outras partes do projeto