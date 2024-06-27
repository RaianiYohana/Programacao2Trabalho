const express = require('express')
const app = express()
app.use(express.json())

const pneus = [
    {id:1, aro: 13, preco: 280, marca: "Michelin"}, //* criar uma lista de pneus   
    {id:2, aro: 14, preco: 330, marca: "Michelin"}, //* criar uma lista de pneus 
    {id:3, aro: 15, preco: 180, marca: "Michelin"}, //* criar uma lista de pneus
]

const PORTA = 3000
  app.listen( PORTA, function(){
      console.log("Servidor iniciados na porta "+PORTA);
})



/**qualquer coisa */
app.get("/pneus/", function (req,res){  /**mostra os pneus */
    res.send( pneus )
})

app.get("/pneus/:id", function(req,res){
    var pneuEncontrado = pneus.find( function( pneuAtual ){
      return pneuAtual.id == parseInt(req.params.id )
    } )
    if( !pneuEncontrado ){
      res.status(404).send({})
    }else{
      res.send( pneuEncontrado )
    }
})
/** 
app.post("/pneus/", function( req, res ){  
    const novoPneu = {
      id: pneus.length + 1,
      aro: req.body.aro,
      preco: req.body.preco,
      marca: req.body.marca
    };
    pneus.push( novoPneu );
    res.send( novoPneu );
  });



*/