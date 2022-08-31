const form = document.querySelector('#form');
form.addEventListener('submit', (e) =>{
  e.preventDefault()
})  


  /************************** ARRAYS CIUDADES ***************************** */

// ciudades
let ciudades = ['Villa Maria','Villa Nueva','Cordoba Capital'];
const idCiudad = document.querySelector('#inCiudadCliente')


for (const i of ciudades) {
  const option = document.createElement('option');
  idCiudad.appendChild(option)
  option.innerHTML = i
  option.setAttribute('value',ciudades.indexOf(i))
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
let tipoPagoArr = ['Contado Efectivo','Transferencia','Cheque'];

//template forma de pago
const tipoPago = document.querySelector('#tipoPago')
const tempTipoPAgo = document.querySelector('#tempTipoPAgo')
const divTipoPago = tempTipoPAgo.content.querySelector('#divTipoPago')

tipoPagoArr.forEach((elem,index) => {
    let prodClone = divTipoPago.cloneNode(divTipoPago,true);
    prodClone.children[0].setAttribute('for',index)
    prodClone.children[0].setAttribute('id',index)
    prodClone.children[1].setAttribute('for',index)
    prodClone.children[0].setAttribute('id',index)
    prodClone.children[0].setAttribute('name','RadioTipoPago')
    prodClone.children[1].setAttribute('name','labelTipoPago')
    prodClone.children[1].innerText = elem;
    // prodClone.children[0].text = elem;
    if (index == 0) {
        prodClone.children[0].setAttribute('checked','true')
    }    


    tipoPago.appendChild(prodClone)
})


  /************************** FETCH CLIENTES ***************************** */

const inNombreCliente = document.querySelector('#inNombreCliente');
const inDniCuitCliente = document.querySelector('#inDniCuitCliente');
const inTelefonoCliente = document.querySelector('#inTelefonoCliente');
const inDomicilioCliente = document.querySelector('#inCiudadCliente');
const inEmailCliente = document.querySelector('#inEmailCliente');
const btnCargaClientes = document.querySelector('#btnCargaClientes');
const RadioTipoPago = document.getElementsByName('RadioTipoPago')
const labelChecked = document.getElementsByName('labelTipoPago')




btnCargaClientes.addEventListener('click', () => {
  
  let selecTipoPago;
  console.log(console.log(inCiudadCliente.option[0].text))

  for (var i = 0; i <  RadioTipoPago.length; i++) {
    if (RadioTipoPago[i].checked) {
    selecTipoPago = labelChecked[i].innerHTML
     break;
    }
  }

  if (clientes == "") {
    contadorId = 1;
    postClientes(contadorId,inNombreCliente,inDniCuitCliente,inTelefonoCliente,inDomicilioCliente,idCiudadCliente,inEmailCliente,selecTipoPago)
    return 
  }

    //verifico que no cargue 2 veces el mismo producto  
  for (const key in clientes) {
    if (clientes[key].dniCuit == inDniCuitCliente.value) {
      alertCarga(2,'cliente')
      return 
      }           
    }
  
  contadorId = clientes.id + 1
  postClientes(contadorId,inNombreCliente,inDniCuitCliente,inTelefonoCliente,inDomicilioCliente,idCiudadCliente,inEmailCliente,selecTipoPago)
  form.reset()
})


const postClientes = (contadorId,inNombreCliente,inDniCuitCliente,inTelefonoCliente,inDomicilioCliente,idCiudadCliente,inEmailCliente,selecTipoPago) => {
  fetch('http://localhost:5000/clientes', {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      id: contadorId,
      nombre: inNombreCliente.value,
      dniCuit: inDniCuitCliente.value,
      telefono: inTelefonoCliente.value,
      domicilio: inDomicilioCliente.value,
      Ciudad: idCiudadCliente.value,
      email: inEmailCliente.value,
      tipoPago: selecTipoPago,  
    })
  })
    .then((resp) => resp.json())
    .then((data) => {
      alertCarga(1,"Cliente");
      })
}