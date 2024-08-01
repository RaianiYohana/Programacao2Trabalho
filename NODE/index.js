const banco = require("./banco") // importa o módulo banco que lida com a conexão e operação do banco de dados
const express = require('express') // importa o express que é um framework web para Node.js, que simplifica a criação de servidores web
const vendedor = require("./vendedor") // importa o módulo vendedor onde contêm definições específicas do modelo e funções relacionadas
const pneus = require("./pneus") // importa o módulo pneus, onde contêm definições específicas do modelo e funções relacionadas
const { where } = require("sequelize") // importa o método "where" do sequelize para consultas específicas

const app = express() //  faz a criação de uma instância da aplicação Express
app.use(express.json()) // Configura o middleware para processar requisições com corpo JSON


banco.conexao.sync( function(){  // faz a sincronização com o banco de dados
  console.log("Banco de dados conectado."); // mensagem para confirmar a conexão
})

//Aqui é definido cabeçalhos para permitir requisições de qualquer origem, onde possui métodos e cabeçalhos específicos 
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// Aqui mostra a definição da porta do servidor e inicia o servidor. Contudo, tem uma mensagem de confirmação.
const PORTA = 3000 
app.listen( PORTA, function(){
  console.log("Servidor iniciados na porta" +PORTA)  
})

//1 -

// Cria um novo vendedor com base nos dados fornecidos no corpo da requisição e envia a resposta
 app.post("/vendedor/", async function( req, res){
  const resultado = await vendedor.vendedor.create({ //criar
    nome:req.body.nome,
    cnpj:req.body.cnpj
  })
  res.send(resultado)
});

// Busca todos os vendedores e envia a resposta posteriormente
app.get("/vendedor/", async function (req,res){  
  const resultado = await vendedor.vendedor.findAll() //encontrar tudo
res.send(resultado);
})

// Atualiza os dados de um vendedor com base no ID e os dados do corpo da requisição. Envia o vendedor atualizado depois da atualização
app.put("/pessoa/:id", async function(req, res){
  const resultado = await vendedor.vendedor.update({ //atualizar
    nome:req.body.nome,
    cnpj:req.body.cnpj
  }, {
    where:{id: req.params.id}
  }
  )
  if(resultado == 0){
    res.status(404),send({})
  } else{
    res.send(await vendedor.vendedor.findByPk(req.params.id)) // encontrar por primary key
  }
})

// Faz a exclusão de um vendedor com base no id. Se for excluido envia um status 204, senão um de 404 casos não for encontrado
app.delete("/vendedor/:id", async function(req, res){
  const resultado = await vendedor.vendedor.destroy({ //destruir
    where:{
      id:req.params.id
    }
  })
  if(resultado == 0){
    res.status(404).send({})
  } else{
    res.status(204).send({})  // ok e não tem resposta
  }
})

//2- vendedor
// Pega um vendedor pelo seu id e inclui seus pneus relacionados a ele
app.get("/vendedor/:id", async function(req, res){
 const vendedorSelecionado = await vendedor.vendedor.findByPk(req.params.id,  //find by pk: encontrar pela primary key
{ include: {model: pneus.pneus}} // mostra em conjunto quando eu pegar o vendedor pelo id 
 )
if( vendedorSelecionado == null){
  res.status(404).send({})
}else {
  res.send(vendedorSelecionado);
}
})

//questão 3 de subconjunto (Vendedor para pneu)
//Busca vendedor pelo nome e inclui seus pneus relacionados 
app.get("/vendedor/nome/:nome", async function(req,res){
  const vendedorSelecionado = await vendedor.vendedor.findAll(
    {
      include: { model:pneus.pneus},
      where: { nome:req.params.nome}
    }
  ) 
if ( vendedorSelecionado == null){
  res.status(404).send({})
} else {
  res.send(vendedorSelecionado)
}
})

//4 - vendedor
// cria um novo vendedor com base nos dados fornecidos e inclui o Id do pneu.
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
//Atualiza um vendedor pelo seu id 
app.put("/vendedor/:id", async function(req,res){
  console.log(req.params.id)
  const resultado = await vendedor.vendedor.update({
    nome:req.body.nome,
    cnpj:req.body.cnpj,
    pneusId:req.body.pneusId
  },{
    where:{id:req.params.id}
  })
  if(resultado == 0){
    res.status(404).send({})

  }else{
    res.send(await vendedor.vendedor.findByPk(req.params.id))
  }
})

//6
// deleta o vendedor pelo seu id 
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

//Busca todos os pneus inseridos
app.get("/pneus/", async function (req,res){    /**mostra os pneus */
    const resultado = await pneus.pneus.findAll()
    res.send( resultado )
})

/**Questao 2  */

// Busca todos os pneus inseridos pelo id e inclui o nome dos pneus relacionados.
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
// Busca todos os pneus pelo nome e os vendedores que estão relacionados a ele
app.get("/pneu/nome/:nome" , async function (req, res){
  const pneusEscolhido = await pneus.pneus.findAll(
    {
      include: { model:vendedor.vendedor},
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
// cria um novo registro do pneu  
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
// Atualiza um novo pneu que já existe pelo id do mesmo
app.put("/pneus/:id", async function(req,res){
  const resultado = await pneus.pneus.update({
    nome:req.body.nome,
    aro:req.body.aro,
    marca:req.body.marca,
    vendedorId:req.body.vendedorId
  },{
    where:{id:req.params.id}
  })
  if(resultado == 0){
    res.status(404).send({})

  }else{
    res.send(await pneus.pneus.findByPk(req.params.id))
  }
})

/**6-Excluir um registro da entidade A e B (1 ponto). */
//Exclui um pneu pelo id
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