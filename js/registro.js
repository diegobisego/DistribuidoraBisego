const formregistro = document.querySelector('#btnRegistrar');
formregistro.addEventListener('submit', (e) =>{
  e.preventDefault()
})  

/************************** FETCH GET ***************************** */
let usuariosRegistrados = [];

//Metodo GET para FETCH de productos, para luego comparar contenido
fetch('http://localhost:5000/usuarios')
  .then((res) => res.json())
  .then((data) => {
    usuariosRegistrados.push(...data);
});

console.log(usuariosRegistrados)

/************************** FETCH REGISTRO ***************************** */
const btnRegistrar = document.querySelector('#btnRegistrar');


btnRegistrar.addEventListener('click', () => {

    const regUser = document.querySelector('#regUser').value;
    const regPass = document.querySelector('#regPass').value;

    const existe = usuariosRegistrados.some( user => user.nombreUsuario == regUser)
    
    usuarioLower = regUser.toLowerCase()

    const validacionUsuario = usuarioLower.split('');

    for (const i of validacionUsuario) {
      if (i == '' || i == ' ') {
        invalido(4)
        return
      }
    }

    if (usuarioLower.length < 4 || regPass.length < 4) {
      invalido(5)
      return
    }
  
    
    if (existe) {
      //en aletras.js
      invalido(3)
    } else {
      const idRegistro = Number(usuariosRegistrados.length + 1)
      debugger
      fetch('http://localhost:5000/Usuarios', {
         method: 'POST',
         headers: {
           'content-type': 'application/json; charset=UTF-8',
         },
           body: JSON.stringify({
           id:idRegistro,
           nombreUsuario: regUser,
           password: regPass
           })
         }).then(
          alertCarga(1,'usuario'))
          setTimeout(() => {
            console.log('prueba')
         },2000)      

    }

})


