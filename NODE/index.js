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


const PORTA = 3000 
app.listen( PORTA, function(){
  console.log("Servidor iniciados na porta" +PORTA)  
})

//1 - mostra o vendedor
app.get("/vendedor/", async function (req,res){
  const resultado = await vendedor.vendedor.findAll()
res.send(resultado);
})

app.post("/vendedor/", async function( req, res){
  const resultado = await vendedor.vendedor.create({
    nome:req.body.nome,
    cnpj:req.body.cnpj

  })
  res.send(resultado)
});

app.put("/pessoa/:id", async function(req, res){
  const resultado = await vendedor.vendedor.update({
    nome:req.body.nome,
    cnpj:req.body.cnpj
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

//2- vendedor
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

//4 - vendedor
app.post("/vendedor/", async function (req,res){
  const resultado = await vendedor.vendedor.create(
    {
      nome: req.body.nome,
      cnpj: req.body.cnpj,
      pneuId: req.body.pneuId
    })
res.send(resultado)
  })


//5
app.put("/vendedor/", async function(req,res){
  const resultado = await vendedor.vendedor.update({
    nome:req.body.nome,
    pneusId:req.body.pneusId
  })
  if(resultado == 0){
    res.status(404).send({})
  }else{
    res.send(await vendedor.vendedor.findByPk(req.params.id))
  }
})

//6
app.delete("/vendedor/:id",async function(req,res){
  const resultado = await vendedor.vendedor.destroy({
      where:{
          id:req.params.id
      }
  })
  if( resultado == 0 ){
      res.status(404).send({})
  }else{
      res.status(204).send({})
  }
})

// Código da parte dos pneus

//questao 1 Ler todos os registros da entidade A e B (1 ponto).

app.get("/pneus/", async function (req,res){    /**mostra os pneus */
    const resultado = await pneus.pneus.findAll()
    res.send( resultado )
})

/**Questao 2  */
app.get("/pneus/:id", async function(req,res){  
    const pneuEncontrado = await pneus.pneus.findByPk(req.params.id,
      {include: {model: vendedor.vendedor}}
    )
    if(pneuEncontrado  == null ){
      res.status(404).send({})
    }else{
      res.send( pneuEncontrado )
    }
})

/*questao 3 Ler subconjunto de registros, buscando por um atributo da entidade A e B (3 pontos). E ́
necess ́ario ao ler A, buscar todos os registros de B vinculados com ele e vice-versa.*/
app.get("/pneu/nome/:nome" , async function (req, res){
  const pneusEscolhido = await pneus.pneus.findAll(
    {
      include: { model: vendedor.vendedor},
      where: { nome:req.params.nome}
    }
  )
  if (pneusEscolhido == null){
    res.status(404).send({})
  }else{
    res.send(pneusEscolhido)
  }
})


/**4-Criar um registro da entidade A e B (2 pontos). E necess ́ario criar o v ́ınculo entre a entidade A e B. */
app.post("/pneus/", async function( req, res ){  
    const novoPneu = await pneus.pneus.create({
      nome: req.body.nome,
      aro: req.body.aro,
      marca: req.body.marca,
      vendedorId: req.body.vendedorId

    })
    res.send(novoPneu)
  })

/**5-Atualizar um registro da entidade A e B (2 pontos). E necess ́ario criar o v ́ınculo entre a entidade A e B*/
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

/**6-Excluir um registro da entidade A e B (1 ponto). */
app.delete("/pneus/:id",async function(req,res){
  const resultado = await pneus.pneus.destroy({
      where:{
          id:req.params.id
      }
  })
  if( resultado == 0 ){
      res.status(404).send({})
  }else{
      res.status(204).send({})
  }
})