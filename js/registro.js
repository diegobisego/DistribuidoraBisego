const formregistro = document.querySelector('#btnRegistrar');
formregistro.addEventListener('submit', (e) => {
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

/************************** FETCH REGISTRO ***************************** */
const btnRegistrar = document.querySelector('#btnRegistrar');


btnRegistrar.addEventListener('click', () => {
debugger  
  const regUser = document.querySelector('#regUser').value;
  const regPass = document.querySelector('#regPass').value;

  usuarioLower = regUser.toLowerCase()

  const existe = usuariosRegistrados.some(user => user.nombreUsuario == usuarioLower)

  const validacionUsuario = usuarioLower.split('');

  // valida que no contenga espacios o este vacio
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
    //en alertas.js
    invalido(3)
  } else {
    setTimeout(() => {
      postRegistro(regUser,regPass)
    }, 1500);
    alertCarga(1, 'usuario')
  }
})


const postRegistro = (user,pass) => {
  const idRegistro = Number(usuariosRegistrados.length + 1)
  fetch('http://localhost:5000/Usuarios', {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      id: idRegistro,
      nombreUsuario: user,
      password: pass
    })
  })
}

