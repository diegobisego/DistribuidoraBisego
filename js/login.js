//evito el reinicio de la pagina
const form = document.querySelector('#form');
form.addEventListener('submit', (e) =>{
  e.preventDefault()
})  


  /************************** FETCH GET ***************************** */
let usuarios = []

//Metodo GET para FETCH de usuarios, para luego comparar contenido
fetch('http://localhost:5000/usuarios')
  .then((res) => res.json())
  .then((data) => {
    usuarios.push(...data)
});



  /************************** BOTON INGRESAR ***************************** */

const btnIngresar = document.querySelector('#btnIngresar');

btnIngresar.addEventListener('click', () => {
  
    let usuario = document.querySelector('#usuario').value
    const password = document.querySelector('#password').value  

    usuario = usuario.toLowerCase();
    
    const existe = usuarios.some( user => (user.nombreUsuario.toLowerCase() == usuario && user.password == password))
    const existeUser = usuarios.some( user => user.nombreUsuario.toLowerCase() == usuario)

    if (existe) {
      usuario = usuario.charAt(0).toUpperCase() + usuario.slice(1);
      localStorage.setItem('user',usuario)
      window.location.href = "../wcLogin.html"
      return
    } else if (!existeUser){
      //en alertas.js
      invalido(1)
      form.reset() 
    } else {
      invalido(2)
      form.reset()
    }       
  
})



  /************************** SOLO LETRAS ***************************** */
function soloLetras(e) {
  var key = e.keyCode || e.which,
    tecla = String.fromCharCode(key).toLowerCase(),
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz",
    especiales = [8, 37, 39, 46],
    tecla_especial = false;

  for (var i in especiales) {
    if (key == especiales[i]) {
      tecla_especial = true;
      break;
    }
  }

  if (letras.indexOf(tecla) == -1 && !tecla_especial) {
    return false;
  }
}

// const putLogin = (user) => {
//     fetch('http://localhost:5000/userLogin/1', {
//         method: 'PUT',
//         headers: {
//           'content-type': 'application/json; charset=UTF-8',
//         },
//           body: JSON.stringify({
//           user: user,
//           })
//         })
// }

