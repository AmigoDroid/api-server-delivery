const express = require('express');
const rota = express.Router();
const admin = require('./database/client/admAB');
const user = require('./database/client/clientDB');
const jwt = require('jsonwebtoken');

const secret = 'chave-58242660'


//ROTAS
function verificarJWT(req,res, next){
    const token = req.headers['x-acess-token'];
    jwt.verify(token,secret,(err,decoded)=>{
        if(err){
            res.json({status:false}).status(401);
        }else{
        next()
        };
      
    })
}

//ADMIN
rota.get('/',verificarJWT,admin.listaUser);
rota.get('/lista',verificarJWT,admin.listar);

//USUARIO
rota.post('/loginUser',user.login);
rota.post('/cadastrar/usuario',user.cadastro);


module.exports=rota;