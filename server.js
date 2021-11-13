const express = require('express');
const body = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
//VARIAVES
const porta = process.env.PORT||8080;
const rotas = require('./Routes');



//CONFIGURAR SERVER
app.use(morgan('dev'));
app.use(body.urlencoded({extended:false}));
app.use(express.json());
//app.use(cors());
app.use(rotas);



//soket.io
app.get('/',(req,res)=>{
    res.send('get');
})

io.on('connection',socket =>{
//socket conection 
console.log("Conectado: ID= "+socket.id);
})




//STARTAR SERVER
server.listen(porta,()=>{
    console.log('');
    console.log("host: "+'localhost:'+porta);
    console.log('');
});
