//evito el reinicio de la pagina
const form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

/************************** FETCH GET ***************************** */
let usuarios = [];

//Metodo GET para FETCH de usuarios
fetch("http://localhost:5000/usuarios")
  .then((res) => res.json())
  .then((data) => {
    usuarios.push(...data);
  });

/************************** BOTON INGRESAR ***************************** */

const btnIngresar = document.querySelector("#btnIngresar");

btnIngresar.addEventListener("click", () => {
  let usuario = document.querySelector("#usuario").value;
  const password = document.querySelector("#password").value;

  usuario = usuario.toLowerCase();

  const existe = usuarios.some(
    (user) =>
      user.nombreUsuario.toLowerCase() == usuario && user.password == password
  );
  const existeUser = usuarios.some(
    (user) => user.nombreUsuario.toLowerCase() == usuario
  );

  if (existe) {
    //verifica si exite el usuario en la base y setea en localStorage la letra del nombre, luego redirecciona a bienvenida
    usuario = usuario.charAt(0).toUpperCase() + usuario.slice(1);
    localStorage.setItem("user", usuario);
    window.location.href = "../wcLogin.html";
    return;
  } else if (!existeUser) {
    //en alertas.js
    invalido(1);
    form.reset();
  } else {
    invalido(2);
    form.reset();
  }
});
