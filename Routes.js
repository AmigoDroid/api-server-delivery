const express = require('express');
const rota = express.Router();
const admin = require('./database/client/admAB');
const user = require('./database/client/clientDB');
const jwt = require('jsonwebtoken');


const secret = 'chave-58242660'
const secretAdmin = 'admin-58242660'


//ROTAS
function verificarJWT(req,res, next){
   // const token = req.headers['x-acess-token'];
   const token = req.params.token;
   console.log("token: "+token);
    jwt.verify(token,secret,(err,decoded)=>{
        if(err){
            res.json({status:false}).status(401);
        }else{
        next();
        };
      
    })
}
function verificarADM(req,res, next){
    // const token = req.headers['x-acess-token'];
    const body = req.body;
    //const dados = JSON.parse(body);
     jwt.verify(body.tokenAdmin,secretAdmin,(err,decoded)=>{
         if(err){
             res.json({status:false}).status(401);
         }else{
         next();
         };
       
     })
 }



//ADMIN
rota.get('/cagada',admin.listaUser);
rota.post('/login/admin',admin.loginAdmin);
rota.post('/lista/stores',verificarADM,admin.listar);
rota.post('/lista/users',verificarADM,user.listar);
rota.post('/apagar/loja',verificarADM,admin.deleteLoja);
rota.post('/apagar/pessoa',verificarADM,admin.deletarPessoa);
rota.post('/cadastrar/loja',verificarADM,user.cadastrarLoja);
rota.post('/editar/loja',admin.atualizarLoja);
rota.get('/dadosloja/:id',admin.dados);

//Logista
rota.post('/login/loja',user.loginLoja);

//sockete
rota.get('/sockete/:id',user.idLoja);


//USUARIO
rota.post('/loginUser',user.login);
rota.post('/cadastrar/usuario',user.cadastro);
rota.get('/home/cliente/:token',verificarJWT,user.home);
rota.get('/splash/delivery',admin.listar);

module.exports=rota;