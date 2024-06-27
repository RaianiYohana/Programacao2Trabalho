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


app.post("/vendedor/", function( req, res){
  const vendedorNovo = {
    id: vendedor.length + 1,
    nome: req.body.nome,
    idade: req.body.cnpj
  };
  vendedor.push( vendedorNovo );
  res.send( vendedorNovo);
});

app.put("/pessoa/:id", function(req, res){
  const vendedorEncontrado = vendedor.find( function( vendedorAtual){
    return vendedorAtual.id == parseInt( req.params.id)
  })
  if(!vendedorEncontrado){
    res.status( 404 ).send({})
  }else {
    vendedorEncontrado.nome = req.body.nome
    vendedorEncontrado.cnpj = req.body.cnpj
    res.send( vendedorEncontrado)
  }
});

app.delete("/vendedor/:id", function(req, res){
  const vendedorEncontrado = vendedor.find(function( vendedorAtual){
    return vendedorAtual.id == parseInt(req.params.id)
  });
if( !vendedorEncontrado ){
  res.status( 404 ).send( {} );
} else{
  const indexVendedor = pessoas.indexOf( vendedorEncontrado);
  vendedor.splice(indexVendedor, 1);
  res.send({});
}
})

//questão 3 de subconjunto (Vendedor para pneu)
app.post("/vendedor/nome/:nome", async function(req,res){
  const vendedorSele = await vendedor.vendedor.findALL 
{
  include: { model:pneus.pneus}
  where: { nome:req.params.nome}
}
})





// Código da parte dos pneus

// const express = require('express')
// const app = express()
// app.use(express.json())

const pneus = [
    {id:1, aro: 13, preco: 280, marca: "Michelin"}, //* criar uma lista de pneus   
    {id:2, aro: 14, preco: 330, marca: "Michelin"}, //* criar uma lista de pneus 
    {id:3, aro: 15, preco: 180, marca: "Michelin"}, //* criar uma lista de pneus
]

// const PORTA = 3000
//   app.listen( PORTA, function(){
//       console.log("Servidor iniciados na porta "+PORTA);
// })

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

