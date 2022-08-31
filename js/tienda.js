//busca el array en localStorage y carga el template

let productos = JSON.parse(localStorage.getItem('productos'));

//realizo el creado del template
const divProduct = document.querySelector('#div-product');
const temp = document.querySelector('#temp-product');
const ftListEcco = temp.content.querySelector('#ftListEcco');
const spPrecio = temp.content.querySelector('#spanPrecio')


productos.forEach(elem => {
    let prodClone = ftListEcco.cloneNode(ftListEcco,true)
    prodClone.children[1].innerText = elem.tipo
    prodClone.children[2].children[0].innerText = elem.precio

    divProduct.appendChild(prodClone)
    
    //botones e input
    let btnSumar = prodClone.querySelector('#btnSumarProducto');
    let btnRestar = prodClone.querySelector('#btnRestarProducto');
    let inputCantidad = prodClone.querySelector('#imputProduct');
    let btnComprar = prodClone.querySelector('#div-btn-comprar');

    /********************** BOTONES SUMA Y RESTA ***********************/
    
    let contador = 0;
    btnRestar.disabled = true;
    

    btnSumar.addEventListener('click', () => {
        contador = Number(inputCantidad.value) + 1
        inputCantidad.value = contador
        inputCantidad.value == 0 ? btnRestar.disabled = true : btnRestar.disabled = false;
    })

    btnRestar.addEventListener('click', () => {
        if (inputCantidad.value == "") {
            btnRestar.disabled = true
            return
        }
        contador = Number(inputCantidad.value) - 1
        inputCantidad.value = contador 
        inputCantidad.value == 0 ? btnRestar.disabled = true : btnRestar.disabled = false;
        console.log(inputCantidad.value)       
    })   
});




   /**********************BOTON CARRITO ***********************/

const btnCarrito = document.querySelector('#btnCarrito');
const divModal = document.querySelector('#divModal')

btnCarrito.addEventListener('click',() => {
    
  })