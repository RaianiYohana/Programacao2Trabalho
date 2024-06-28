const banco = require("./banco")
const express = require('express')
const vendedor = require("./vendedor")
const pneus = require("./pneus")

const app = express()
app.use(express.json())


banco.conexao.sync( function(){
  console.log("Banco de dados conectado.");
})
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

const vendedor = [
{id:1, nome: "Celso Rescarolli", cnpj:"01.222.770/0002-00"}
]

const PORTA = 3000 
app.listen( PORTA, function(){
  console.log("Servidor iniciados na porta" +PORTA)  
})

app.get("/vendedor/", async function (req,res){
  const resultado = await vendedor.vendedor.findAll()
res.send(resultado);
})

//2- 
app.get("/vendedor/:id", async function(req, res){
 const vendedorSelecionado = await vendedor.vendedor.findByPk(req.params.id,
{ include: {model: pneus.pneus}}
 )
if( vendedorSelecionado == null){
  res.statusCode(404).send({})
}else {
  res.send(vendedorSelecionado);
}
})


app.post("/vendedor/", async function( req, res){
  const resultado = await vendedor.vendedor.create({
    nome:req.body.nome 
  })
  res.send(resultado)
});

app.put("/pessoa/:id", async function(req, res){
  const resultado = await vendedor.vendedor.update({
    nome:req.body.nome
  }, {
    where:{id: req.params.id}
  }
  )
  if(resultado == 0){
    res.status(404),send({})
  } else{
    res.send(await vendedor.vendedor.findByPk(req.params.id))
  }
})

app.delete("/vendedor/:id", async function(req, res){
  const resultado = await vendedor.vendedor.destroy({
    where:{
      id:req.params.id
    }
  })
  if(resultado == 0){
    res.status(404).send({})
  } else{
    res.status(204).send({})
  }
})

//questão 3 de subconjunto (Vendedor para pneu)
app.post("/vendedor/nome/:nome", async function(req,res){
  const vendedorSelecionado = await vendedor.vendedor.findALL 
{
  include: { model:pneus.pneus}
  where: { nome:req.params.nome}

} if ( vendedorSelecionado == null){
  res.status(404).send({})
} else {
  res.send(vendedorSelecionado)
}
})





// Código da parte dos pneus

//questao 1

const pneus = [
    {id:1, aro: 13, preco: 280, marca: "Michelin"}, //* criar uma lista de pneus   
    {id:2, aro: 14, preco: 330, marca: "Michelin"}, //* criar uma lista de pneus 
    {id:3, aro: 15, preco: 180, marca: "Michelin"}, //* criar uma lista de pneus
]

app.get("/pneus/", async function (req,res){    /**mostra os pneus */
    const resultado = await pneus.pneus.findAll()
    res.send( resultado )
})

app.get("/pneus/:id", async function(req,res){  /* 2? */
    const pneuEncontrado = await pneus.pneus.findByPk(req.params.id,
      {include: {model: vendedor.vendedor}}
    )
    if(pneuEncontrado  == null ){
      res.status(404).send({})
    }else{
      res.send( pneuEncontrado )
    }
})

app.post("/pneus/", async function( req, res ){  
    const novoPneu = await pneus.pneus.create({
      id: pneus.length + 1,
      vendedorId: req.body.vendedorId

    })
    res.send(novoPneu)
  })

app.put("/pneus/", async function(req,res){
  const resultado = await pneus.pneus.update({
    nome:req.body.nome,
    vendedorId:req.body.vendedorId
  })
  if(resultado == 0){
    res.status(404).send({})

  }else{
    res.send(await pneus.pneus.findByPk(req.params.id))
  }
})

app.delete("/pneus/" , async function (req,res){
  const resultado = await pneus.pneus.destroy({
    where:{
      id:req.params.id
    }
  })
  if(resultado==0){
    res.status(404).send({})
  }else{
    res.status(204).send({})
  }
})

/*questao 3 */

