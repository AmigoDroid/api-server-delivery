const cliente = require('../config/clientes_stores');
const admin = 'admin'

module.exports={
    async listar (req,res){
        const tokenAdmin = req.params.tokenAdmin;
        console.log("Token: "+tokenAdmin);
        if(tokenAdmin===admin){
            const listaClientes = await cliente.findAll();
            return res.json(listaClientes).status(200);
        }else{
            return res.send('erro');
        }
    },
    async cadastrar(req,res){
        const body = req.body;
        const tokenAdmin = req.params.tokenAdmin;;
        console.log("Token: "+tokenAdmin);
        if (tokenAdmin === admin) {
            const cadastre = await cliente.create(body);
            return res.json(body).status(200);
        }else{
            return res.send('erro');
        }
    }
}