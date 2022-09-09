const form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

/************* FECHA ACTUAL ******************/

window.onload = function () {
  let fecha = new Date(); //Fecha actual
  let mes = fecha.getMonth() + 1; //obteniendo mes
  let dia = fecha.getDate(); //obteniendo dia
  let ano = fecha.getFullYear(); //obteniendo año
  if (dia < 10) dia = "0" + dia; //agrega cero si el menor de 10
  if (mes < 10) mes = "0" + mes; //agrega cero si el menor de 10
  document.getElementById("inDatePago").value = ano + "-" + mes + "-" + dia;
};

/************* CARGA CLIENTES ******************/

let clientes = [];

//Metodo GET para FETCH de clientes
fetch("http://localhost:5000/clientes")
  .then((res) => res.json())
  .then((data) => {
    clientes.push(...data);
    cargaClientes();
  });

/************* CARGA CLIENTES ******************/

//clientes

const opCliente = document.querySelector("#opCliente");


const cargaClientes = () => {
  for (const i in clientes) {
    const option = document.createElement("option");
    opCliente.appendChild(option);
    option.innerHTML = clientes[i].nombre;
    option.setAttribute("value", clientes[i].nombre);
  }
};



/************* TIPO DE PAGO ******************/
const opTipoPago = document.querySelector("#opTipoPago");

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

  if (index == 0) {
    prodClone.children[0].setAttribute('checked', 'true')
  }


  tipoPago.appendChild(prodClone)
})

/************************** ARRAYS BANCOS ***************************** */

let bancos = ['Santander','BBVA','HSBC','BNA','Credicoop','Frances','Bancor']
const opBanco = document.querySelector('#opBanco')

for (const i of bancos) {
  const option = document.createElement("option");
  opBanco.appendChild(option);
  option.innerHTML = i;
  option.setAttribute("value", i);
}



/************************** DESPLIEGA OPCIONES DE CHEQUE ***************************** */

const datosParaCheques = document.querySelector('#datosParaCheques');

tipoPago.addEventListener('change', (event) => {
  if (event.target.id == 2) {
    datosParaCheques.style.display = 'flex'
} else {
  datosParaCheques.style.display = 'none'
}})