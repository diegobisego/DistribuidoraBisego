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
    const usuario = document.querySelector('#usuario').value
    const password = document.querySelector('#password').value
    debugger
    const existe = usuarios.some( user => (user.nombreUsuario == usuario && user.password == password))

    if (existe) {
      localStorage.setItem('user',usuario)
      window.location.href = "../wcLogin.html"
      return
    } else {
      alertLoginInvalido()
      form.reset() 
    }       
  
})

const putLogin = (user) => {
    fetch('http://localhost:5000/userLogin/1', {
        method: 'PUT',
        headers: {
          'content-type': 'application/json; charset=UTF-8',
        },
          body: JSON.stringify({
          user: user,
          })
        })
}

