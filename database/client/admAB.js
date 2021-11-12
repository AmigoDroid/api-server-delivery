const clienteStore = require('../config/clientes_stores');
const cliente_user = require('../config/clientes_users');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const useradmin = 'admin';
const passadmin = 'senha';
const secretAdmin = 'admin-58242660'

module.exports={
    async listar (req,res){
            const listaClientes = await clienteStore.findAll();
            return res.json({status:true,body:listaClientes}).status(200);
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
      
    },
    async loginAdmin(req,res){
        const body = req.body;
        const usuario = body.user;
        const senha = body.pass;
        
        if(usuario==useradmin && senha==passadmin){
            const tokenAdmin = jwt.sign({userId:'admin'},secretAdmin,{expiresIn:300});
            return res.json({status:true,tokenAdmin:tokenAdmin});
        }else{
            return res.json({status:false});
        }
    },
    async deleteLoja(req,res){
        const dados = req.body;
        const id = dados.id;
        const db = await clienteStore.findByPk(id);
        db.destroy();
        return res.json({status:true});
    },
    async deletarPessoa(req,res){
        const dados = req.body;
        const id = dados.id;
        const db = await cliente_user.findByPk(id);
        db.destroy();
        return res.json({status:true});
    },
    async atualizarLoja(req, res){
        const dados = req.body;
        const{nome,descrision,telefone,itens,username,password} = dados;
        const id = dados.id;
        
        const sv = await clienteStore.findByPk(id);
        sv.nome=nome;
        sv.descrision=descrision;
        sv.telefone=telefone;
        sv.itens=itens;
        sv.username=username;
        sv.password=password;
        sv.save();
        return res.json({status:true});
    },
    async lojaDados(req,res){
        const dados = req.body;
        let db = await clienteStore.findByPk(dados.id);
        res.json({status:true,body:db});
    },
    async dados(req,res){
      const db =  await clienteStore.findByPk(req.params.id);
       return res.json(db);
    }
}