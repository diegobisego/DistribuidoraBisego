const form = document.querySelector('#form');
form.addEventListener('submit', (e) =>{
  e.preventDefault()
});

const formVentas = document.querySelector('#formVentas');
formVentas.addEventListener('submit', (e) =>{
  e.preventDefault()
});

/************* ARRAYS ******************/ 

let productos = [];
let clientes = [];


/************* CONSTANTES ******************/ 

//template para lista de venta
const tVentas = document.querySelector('#tVentas'); //primero
const tempDetalleVenta = document.querySelector('#tempDetalleVenta');//segundo
const trTemp = tempDetalleVenta.content.querySelector('#trTemp');


//productos
const idVtaProd = document.querySelector('#idVtaProd')
const btnagregarListaVenta = document.querySelector('#btnagregarListaVenta');
const precioUnitario = document.querySelector('#inPrecUni')
const cantidad = document.querySelector('#inCantidadVenta')

//clientes
const opCliente = document.querySelector('#opCliente')

//tipo pago
const opTipoPago = document.querySelector('#opTipoPago')
 

/************* FECHA ACTUAL ******************/ 

window.onload = function(){
  var fecha = new Date(); //Fecha actual
  var mes = fecha.getMonth()+1; //obteniendo mes
  var dia = fecha.getDate(); //obteniendo dia
  var ano = fecha.getFullYear(); //obteniendo año
  if(dia<10)
    dia='0'+dia; //agrega cero si el menor de 10
  if(mes<10)
    mes='0'+mes //agrega cero si el menor de 10
  document.getElementById('inDate').value=ano+"-"+mes+"-"+dia;
}

/************* SE CARGAN POR FETCH LOS PRODUCTOS ACTIVOS EN EL SISTEMA ******************/ 

//Metodo GET para FETCH de productos
fetch('http://localhost:5000/productos')
  .then((res) => res.json())
  .then((data) => {
    productos.push(...data);
    cargaProductos() 
});



const cargaProductos = () => {
  for (const i in productos) {
    const option = document.createElement('option');
    idVtaProd.appendChild(option)
    option.innerHTML = productos[i].tipo + ' ' + productos[i].tamanio + ' ' +  productos[i].um
    option.setAttribute('value',i)
  }
}

/************* PRECIO DEL PRODUCTO SEGUN LA SELECCION ******************/ 

idVtaProd.addEventListener('change', () => {
  const seleccion = idVtaProd.options[idVtaProd.selectedIndex].text;
  
  productos.find(element => {
      let producto = element.tipo + ' ' + element.tamanio + ' ' + element.um 
      if (producto == seleccion) precioUnitario.value = element.precio
  });

})

/************* SELECT CLIENTES POR FETCH******************/ 

//Metodo GET para FETCH de clientes
fetch('http://localhost:5000/clientes')
  .then((res) => res.json())
  .then((data) => {
    clientes.push(...data);
    cargaClientes() 
    cargaTipoPago()
});

const cargaClientes = () => {
  for (const i in clientes) {
    const option = document.createElement('option');
    opCliente.appendChild(option)
    option.innerHTML = clientes[i].nombre
    option.setAttribute('value',clientes[i].nombre)
  }
}

/************* SELECT TIPO PAGO ******************/ 

const cargaTipoPago = () => {
  for (const i in clientes) {
    const option = document.createElement('option');
    opTipoPago.appendChild(option)
    option.innerHTML = clientes[i].tipoPago
    option.setAttribute('value',clientes[i].tipoPago)
  }
}





/************* TIPO DE PAGO SEGUN LA SELECCION DE CLIENTE  ******************/ 

//SIN TERMINAR

opCliente.addEventListener('change', () => {
  const seleccion = opCliente.options[opCliente.selectedIndex].text;
  
  clientes.find((element,index) => {
    
      if (element.nombre == seleccion) {
        
        // opTipoPago.options[opTipoPago.selectedIndex ].find()
      }
  });

})

/************* SE AGREGA VENTA A LA LISTA ******************/ 

let listaProducto = [];
let contador = 0;
let total = 0;


btnagregarListaVenta.addEventListener('click', () => {
  const producto = idVtaProd.options[idVtaProd.selectedIndex].text;
  const cant = Number(cantidad.value);
  const precio = Number(precioUnitario.value);
  contador++

  if (producto == '' || cant == '' || precio == '') {
    invalido(6)
    return;
  }

  const prodClone = trTemp.cloneNode(trTemp,true)
  prodClone.children[0].innerText = contador
  prodClone.children[1].innerText = producto
  prodClone.children[2].innerText = cant
  prodClone.children[3].innerText = precio * cant

  total += precio * cant


  const nuevoProdcuto = new ProductoVenta(contador,producto,cant,precio)
  listaProducto.push(nuevoProdcuto)

  let btn = prodClone.querySelector("#btnEliminar");    

  //evento para eliminar el producto
  btn.addEventListener('click', () => {
      const index = listaProducto.findIndex(item => item.id == contador);
      const parent = btn.parentNode.parentNode
      total  -= precio * cant
      idTotalVenta.innerHTML = total

      listaProducto.splice(index,1)
      parent.parentNode.removeChild(parent)

      //en alertas.js
      alertEliminar('producto')
      })

     

  tVentas.appendChild(prodClone)
  idTotalVenta.innerHTML = total
  form.reset()
})

/************* FINALIZAR VENTA ******************/ 

const ventas = []

//Metodo GET para FETCH de ventas
fetch('http://localhost:5000/ventas')
  .then((res) => res.json())
  .then((data) => {
    ventas.push(...data);
});


 //finaliza la compra
 const btnFinalizarVenta = document.querySelector('#btnFinalizarVenta');

 btnFinalizarVenta.addEventListener('click', () =>  {
   debugger
   const tieneHijos = document.querySelector('#tVentas').childElementCount

   if (inDate.value == '' || opCliente.value == 'Seleccione un cliente' || opTipoPago.value == 'Seleccione un tipo' || tieneHijos == 1) {
     invalido(6)
     return;
   }
   setTimeout(() => {      
     fetch('http://localhost:5000/Ventas', {
       method: 'POST',
       headers: {
         'content-type': 'application/json; charset=UTF-8',
       },
       body: JSON.stringify({
         id:ventas.length + 1,
         fecha: inDate.value,
         nroFactura: inNroFactura.value,
         Cliente: opCliente.value,
         tipoPago: opTipoPago.value,
         montoTotal: Number(total)
       })
     })  
   }, 1500)
   alertCarga(3, 'venta')
 })