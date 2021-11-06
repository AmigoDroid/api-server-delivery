const express = require('express');
const rota = express.Router();
const admin = require('./database/client/admAB');


//ROTAS
rota.get('/teste:id',(req,res)=>{
    let id =req.params.id;
    console.log(id);
    res.send('tudo certo id:'+id);
});
rota.get('/lista/:tokenAdmin',admin.listar);

module.exports=rota;