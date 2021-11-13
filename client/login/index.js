const db = require('../../database/client/clientDB');
const form = document.getElementById('formulario');
form.addEventListener('submit',(e)=>{
e.preventDefault();

const user = document.getElementById('usuario').value;
const pass = document.getElementById('senha').value;

if(user.length<=0||user.length<=0){

}else{

    const dbLogin ={
        username:user,
        password:pass
    }
    const res = db.loginLoja(dbLogin);
}

})