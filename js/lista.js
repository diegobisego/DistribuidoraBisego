//recupero el array desde el storage
let productos = JSON.parse(localStorage.getItem('productos'));


//realizo el creado del template
const divLista = document.querySelector('#lista')
const temp = document.querySelector('#temp-productos')
const lsProduct = temp.content.querySelector('#tr-list')

productos.forEach((elem) => {
    
    let prodClone = lsProduct.cloneNode(lsProduct,true);
    prodClone.children[0].innerText = elem.id
    prodClone.children[1].innerText = elem.tipo
    prodClone.children[2].innerText = elem.tamanio
    prodClone.children[3].innerText = '$ ' + elem.precio
    prodClone.children[4].innerText = elem.stock 
    
    let btn = prodClone.querySelector("#btnEliminar");    

    //evento para eliminar el producto
    btn.addEventListener('click', () => {
        //sweetAlert
        Swal.fire({
            title: '¿Desea eliminar el producto?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Volver`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              const index = productos.findIndex(item => item.id == elem.id);
              const parent = btn.parentNode.parentNode
            
              productos.splice(index,1)
              parent.parentNode.removeChild(parent)
              localStorage.setItem('productos',JSON.stringify(productos))

              Swal.fire('¡Producto Eliminado!', '', 'success')

            } else if (result.isDenied) {
              Swal.fire('No se elimino el producto', '', 'info')
            }
        })
    })

    divLista.appendChild(prodClone)
});



