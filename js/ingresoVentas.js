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
 


/************* SE CARGAN POR FETCH LOS PRODUCTOS ACTIVOS EN EL SISTEMA ******************/ 

//Metodo GET para FETCH de productos, para luego comparar contenido
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
    option.innerHTML = productos[i].tipo
    option.setAttribute('value',i)
  }
}

/************* SELECT CLIENTES POR FETCH******************/ 

//Metodo GET para FETCH de clientes, para luego comparar contenido
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
    option.setAttribute('value',i)
  }
}

/************* SELECT TIPO PAGO ******************/ 

const cargaTipoPago = () => {
  for (const i in clientes) {
    const option = document.createElement('option');
    opTipoPago.appendChild(option)
    option.innerHTML = clientes[i].tipoPago
    option.setAttribute('value',i)
  }
}


/************* PRECIO DEL PRODUCTO SEGUN LA SELECCION ******************/ 

idVtaProd.addEventListener('change', () => {
  const seleccion = idVtaProd.options[idVtaProd.selectedIndex].text;
  
  productos.find(element => {
      if (element.tipo == seleccion) precioUnitario.value = element.precio
  });

})


/************* TIPO DE PAGO SEGUN LA SELECCION DE CLIENTE  ******************/ 

//SIN TERMINAR

opCliente.addEventListener('change', () => {
  const seleccion = opCliente.options[opCliente.selectedIndex].text;
  
  clientes.find((element,index) => {
    debugger
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

  const prodClone = trTemp.cloneNode(trTemp,true)
  prodClone.children[0].innerText = contador
  prodClone.children[1].innerText = producto
  prodClone.children[2].innerText = cant
  prodClone.children[3].innerText = precio * cant

  total += precio * cant

  //evento para eliminar el producto
  const nuevoProdcuto = new ProductoVenta(contador,producto,cant,precio)
  listaProducto.push(nuevoProdcuto)

  let btn = prodClone.querySelector("#btnEliminar");    

    //evento para eliminar el producto
  btn.addEventListener('click', () => {
      //sweetAlert
      const index = listaProducto.findIndex(item => item.id == contador);
      const parent = btn.parentNode.parentNode
      total  -= precio * cant
      idTotalVenta.innerHTML = total

      listaProducto.splice(index,1)
      parent.parentNode.removeChild(parent)

      alertEliminar('producto')
      })

  tVentas.appendChild(prodClone)
  idTotalVenta.innerHTML = total
  form.reset()
})

/************* FINALIZAR VENTA ******************/ 

const btnFinalizarVenta = document.querySelector('#btnFinalizarVenta');

btnFinalizarVenta.addEventListener('click', () => {

  fetch('http://localhost:5000/Ventas', {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      id:"",
      fecha: inDate.value,
      nroFactura: inNroFactura.value,
      Cliente: opCliente.value,
      tipoPago: opTipoPago.value,
      montoTotal: Number(total)
    })
  })

})


