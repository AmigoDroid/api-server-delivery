const clienteStore = require('../config/clientes_stores');
const cliente_user = require('../config/clientes_users');
const db = require('../config/db');
const admin = 'admin'

module.exports={
    async listar (req,res){
        const tokenAdmin = req.params.tokenAdmin;
        console.log("Token: "+tokenAdmin);
        if(tokenAdmin===admin){
            const listaClientes = await clienteStore.findAll();
            return res.json(listaClientes).status(200);
        }else{
            return res.send('erro');
        }
    },
    async cadastrar(req,res){
        const body = req.body;
        const tokenAdmin = req.params.tokenAdmin;
        console.log("Token: "+tokenAdmin);
            const cadastre = await clienteStore.create(body);
            
            return res.json(body).status(200);
    },
    async listaUser(req,res){
        const db = await cliente_user.findAll().then((f)=>{
            return  res.json(f).status(200);
        })
      
    }
}