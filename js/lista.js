/************************** FETCH GET ***************************** */
let productos = [];

//Metodo GET para FETCH de productos, para luego comparar contenido
fetch('http://localhost:5000/productos')
  .then((res) => res.json())
  .then((data) => {
    productos.push(...data);
    listaProductos() 
});

//realizo el creado del template
const divLista = document.querySelector('#lista')
const temp = document.querySelector('#temp-productos')
const lsProduct = temp.content.querySelector('#tr-list')


const listaProductos = () => {
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
        alertEliminarConfirm('producto',eliminarProducto)
    })

    divLista.appendChild(prodClone)
  });
}


const eliminarProducto = () => {
  const index = productos.findIndex(item => item.id == elem.id);
  const parent = btn.parentNode.parentNode
            
  productos.splice(index,1)
  parent.parentNode.removeChild(parent)
  localStorage.setItem('productos',JSON.stringify(productos))
}