  /************************** SOLO LETRAS ***************************** */

  //funcion para que solamente deje colocar letras
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


  /************************** LETRA USER ***************************** */

//Alimenta al panelAdmin para mostrar la Letra del nombre dentro del user

const letraUser = document.querySelector('#letraUser')
let usuario = localStorage.getItem('user')
letraUser.innerHTML = usuario.slice(0,1);