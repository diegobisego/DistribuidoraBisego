/************************** FETCH GET ***************************** */
let productos = [];

//Metodo GET para FETCH de productos, para luego comparar contenido
fetch('http://localhost:5000/productos')
  .then((res) => res.json())
  .then((data) => {
    productos.push(...data);
    listaProductos()
  });


/************************** CARGA DE LA LISTA ***************************** */

//realizo el creado del template
const divLista = document.querySelector('#lista')
const temp = document.querySelector('#temp-productos')
const lsProduct = temp.content.querySelector('#tr-list')


const listaProductos = () => {
  productos.forEach((elem) => {

    let prodClone = lsProduct.cloneNode(lsProduct, true);
    prodClone.children[0].innerText = elem.id
    prodClone.children[1].innerText = elem.tipo
    prodClone.children[2].innerText = elem.tamanio + ' ' + elem.um
    prodClone.children[3].innerText = '$ ' + elem.precio
    prodClone.children[4].innerText = elem.stock

    let btnEliminar = prodClone.querySelector("#btnEliminar");
    let btnEditar = prodClone.querySelector('#btnEditar');


    divLista.appendChild(prodClone)


    //evento para eliminar el producto
    btnEliminar.addEventListener('click', () => {
      //sweetAlert 
      Swal.fire({
        title: '¿Desea eliminar el producto?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Eliminar',
        denyButtonText: `Volver`,
        confirmButtonColor: '#BF2301',
        denyButtonColor: '#CBCBCB'
      }).then((result) => {
        if (result.isConfirmed) {

          //Busco id y realizo un delete de la
          id = elem.id
          setTimeout(() => {
            fetch(`http://localhost:5000/productos/${id}`,
              { method: 'DELETE' })
          }, 800);
          Swal.fire(`Se elimino el producto en forma correcta`, '', 'success')

        } else if (result.isDenied) {
          Swal.fire(`No se elimino el ${param}`, '', 'info')
        }
      })
    })

    //Boton Editar
    btnEditar.addEventListener('click', () => {
      const inEditarPrecio = document.querySelector('#inEditarPrecio')
      const inEditarStock = document.querySelector('#inEditarStock')
      const id = elem.id;

      inEditarPrecio.value = Number(elem.precio);
      inEditarStock.value = Number(elem.stock);

      const btnConfirmarEdicion = document.querySelector('#btnConfirmarEdicion');

      btnConfirmarEdicion.addEventListener('click', () => {
        fetch(`http://localhost:5000/Productos/${id}`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json; charset=UTF-8',
          },
          precio: Number(inEditarPrecio.value),
          stock: Number(inEditarStock.value)
        })
      })
    })

  })
}





