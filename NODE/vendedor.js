const sequelize = require("sequelize");
const banco = require("./banco")
const pneus = require("./pneus")

var professor = banco.conexao.define(
    "vendedor",
    {
        id:{
            type:sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement:true
        },
        nome:{
            type:sequelize.STRING,
            allowNull:false
        },
        cnpj: {
            type:sequelize.STRING,
            allowNull: false
        }
    },
    { timestamps: false }
)

professor.hasMany( pneus.pneus )
pneus.pneus.belongsTo( vendedor )

module.exports = {vendedor}