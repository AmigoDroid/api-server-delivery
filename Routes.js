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
    const token = req.params.token;
    console.log("token: "+token);
     jwt.verify(token,secretAdmin,(err,decoded)=>{
         if(err){
             res.json({status:false}).status(401);
         }else{
         next();
         };
       
     })
 }

//ADMIN
//rota.get('/',verificarJWT,admin.listaUser);
rota.post('login/admin',admin.loginAdmin);
rota.get('/lista/admin',verificarADM,admin.listar);
rota.get('/lista/users',verificarADM,user.listar);

//USUARIO
rota.post('/loginUser',user.login);
rota.post('/cadastrar/usuario',user.cadastro);
rota.get('/home/cliente/:token',verificarJWT,user.home);

module.exports=rota;