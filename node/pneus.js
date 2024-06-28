const sequelize = require("sequelize");
const banco = require("./banco")
const vendedor = require("./vendedor")

var pneus = banco.conexao.define(
    "pneus",
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
        aro:{
            type:sequelize.INTEGER.UNSIGNED,
            allowNull:false
        },
        marca:{
            type:sequelize.STRING,
            allowNull:false
        }
    },
    { timestamps: false }
)

module.exports = {pneus}