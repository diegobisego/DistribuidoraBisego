const form = document.querySelector('#form');
form.addEventListener('submit', (e) => {
  e.preventDefault()
})


/************************** ARRAYS CIUDADES ***************************** */

// ciudades
let ciudades = ['Villa Maria', 'Villa Nueva', 'Cordoba Capital'];
const idCiudad = document.querySelector('#selCiudadCliente')


for (const i of ciudades) {
  debugger
  const option = document.createElement('option');
  idCiudad.appendChild(option)
  option.innerHTML = i
  option.setAttribute('value', i)
}

/************************** FETCH GET ***************************** */

let clientes = [];
let contadorId;

//Metodo GET para FETCH de clientes, para luego comparar contenido
fetch('http://localhost:5000/clientes')
  .then((res) => res.json())
  .then((data) => {
    clientes.push(...data);
  });

/************************** ARRAYS FORMA DE PAGO ***************************** */

//Carga el select tipo de pago
let tipoPagoArr = ['Contado Efectivo', 'Transferencia', 'Cheque'];

//template forma de pago
const tipoPago = document.querySelector('#tipoPago')
const tempTipoPAgo = document.querySelector('#tempTipoPAgo')
const divTipoPago = tempTipoPAgo.content.querySelector('#divTipoPago')

tipoPagoArr.forEach((elem, index) => {
  let prodClone = divTipoPago.cloneNode(divTipoPago, true);
  prodClone.children[0].setAttribute('for', index)
  prodClone.children[0].setAttribute('id', index)
  prodClone.children[1].setAttribute('for', index)
  prodClone.children[0].setAttribute('id', index)
  prodClone.children[0].setAttribute('name', 'RadioTipoPago')
  prodClone.children[1].setAttribute('name', 'labelTipoPago')
  prodClone.children[1].innerText = elem;
  // prodClone.children[0].text = elem;
  if (index == 0) {
    prodClone.children[0].setAttribute('checked', 'true')
  }


  tipoPago.appendChild(prodClone)
})


/************************** FETCH CLIENTES ***************************** */
debugger
const inNombreCliente = document.querySelector('#inNombreCliente');
const inDniCuitCliente = document.querySelector('#inDniCuitCliente');
const inTelefonoCliente = document.querySelector('#inTelefonoCliente');
const inDomicilioCliente = document.querySelector('#inCiudadCliente');
const selCiudadCliente = document.querySelector('#selCiudadCliente');
const inEmailCliente = document.querySelector('#inEmailCliente');
const btnCargaClientes = document.querySelector('#btnCargaClientes');
const RadioTipoPago = document.getElementsByName('RadioTipoPago')
const labelChecked = document.getElementsByName('labelTipoPago')




btnCargaClientes.addEventListener('click', () => {
  
  let selecTipoPago;

  for (var i = 0; i < RadioTipoPago.length; i++) {
    if (RadioTipoPago[i].checked) {
      selecTipoPago = labelChecked[i].innerHTML
      break;
    }
  }

  //verifico que no cargue 2 veces el mismo cliente  
  for (const key in clientes) {
    if (clientes[key].dniCuit == inDniCuitCliente.value) {
      alertCarga(2, 'cliente')
      return
    }
  }

  
  console.log(selDomicilioCliente.value)
  console.log(selDomicilioCliente.selected)

  contadorId = clientes.length + 1
  postClientes(contadorId, inNombreCliente.value, inDniCuitCliente.value, inTelefonoCliente.value, inDomicilioCliente.value, selCiudadCliente.value, inEmailCliente.value, selecTipoPago)
})


const postClientes = (contadorId, inNombreCliente, inDniCuitCliente, inTelefonoCliente, inDomicilioCliente, selCiudadCliente, inEmailCliente, selecTipoPago) => {
  
  setTimeout(() => {
    fetch('http://localhost:5000/clientes', {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        id: contadorId,
        nombre: inNombreCliente,
        dniCuit: inDniCuitCliente,
        telefono: inTelefonoCliente,
        domicilio: inDomicilioCliente,
        Ciudad: selCiudadCliente,
        email: inEmailCliente,
        tipoPago: selecTipoPago,
      })
    })
  }, 800);
  alertCarga(1, "Cliente");
}