const express = require('express');
const rota = express.Router();
const admin = require('./database/client/admAB');
const user = require('./database/client/clientDB');
const jwt = require('jsonwebtoken');


const secret = 'chave-58242660'


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

//ADMIN
rota.get('/',verificarJWT,admin.listaUser);
rota.get('/lista/admin',verificarJWT,admin.listar);
rota.get('/lista/users',user.listar);

//USUARIO
rota.post('/loginUser',user.login);
rota.post('/cadastrar/usuario',user.cadastro);
rota.get('/home/cliente/:token',verificarJWT,user.home);

module.exports=rota;