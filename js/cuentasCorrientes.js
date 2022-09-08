//Metodo GET para FETCH de ventas, para luego comparar contenido

let saldos = [];

fetch("http://localhost:5000/saldos")
  .then((res) => res.json())
  .then((data) => {
    saldos.push(...data);
    cargarCuentasCorrientes()
  });

//genero lista de estado de cuentas corrientes por DOM con template

const cargarCuentasCorrientes = () => {
  const mainCuentasCorrientes = document.querySelector('#mainCuentasCorrientes');
  const templateCuentasCorrientes = document.querySelector('#templateCuentasCorrientes').content
  
  const fragmento = document.createDocumentFragment()


  saldos.forEach((el) => {
    templateCuentasCorrientes.querySelector('#idClienteLista').innerHTML = el.id
    templateCuentasCorrientes.querySelector('#nombreCliente').innerHTML = el.nombre
    templateCuentasCorrientes.querySelector('#debeCliente').innerHTML = el.debe
    templateCuentasCorrientes.querySelector('#haberCliente').innerHTML = el.haber
    templateCuentasCorrientes.querySelector('#saldoCliente').innerHTML = el.saldo

    let clone = document.importNode(templateCuentasCorrientes,true) 
    fragmento.appendChild(clone)
  })

  mainCuentasCorrientes.appendChild(fragmento)
}




