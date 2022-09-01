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

    debugger
    const regUser = document.querySelector('#regUser').value;
    const regPass = document.querySelector('#regPass').value;

    for (const key in usuariosRegistrados) {
        if (usuariosRegistrados[key].nombreUsuario == regUser) {
            registroInvalido()
            break
        } else {
            fetch('http://localhost:5000/Usuarios', {
                method: 'POST',
                headers: {
                  'content-type': 'application/json; charset=UTF-8',
                },
                  body: JSON.stringify({
                  nombreUsuario: regUser,
                  password: regPass
                  })
                }).then(
                    alertCarga(1,'usuario')
                )
        }
    }



})