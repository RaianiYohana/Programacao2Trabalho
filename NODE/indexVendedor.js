const express = require('express')

const app = express()
app.use(express.json())

const vendedor = [
{id:1, nome: "Celso Rescarolli", cnpj:"01.222.770/0002-00"}
]

const PORTA = 3000 
app.listen( PORTA, function(){
  console.log("Servidor iniciados na porta" +PORTA)  
})

app.get("/vendedor/", function (req,res){
  res.send( vendedor )
})

app.get("/vendedor/:id", function(req, res){
  var vendedorEncontrado = vendedor.find( function( vendedorAtual ){
    return vendedorAtual.id == parseInt(req.params.id)
  })
  if( !vendedorEncontrado ){
    res.status( 404 ).send({})
  } else {
    res.send( vendedorEncontrado)
  }
})


