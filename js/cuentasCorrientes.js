//Metodo GET para FETCH de ventas, para luego comparar contenido

let ventas = [];

fetch("http://localhost:5000/ventas")
  .then((res) => res.json())
  .then((data) => {
    ventas.push(...data);
    cargarCtasCtes();
  });

//template por cliente

const divList = document.querySelector("#mainCuentasCorrientes");
let montoTotalVentas = 0;

const cargarCtasCtes = () => {
  for (const key in ventas) {
    montoTotalVentas += Number(ventas[key].montoTotal)
    divList.innerHTML = `
        
        <div class="accordion accordion-flush" id="acordionLista">
        <div class="accordion-item" id="divTemp">
          <h2 class="accordion-header" id="flush-headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne"
              id="btnAcordion">
              ${ventas[key].Cliente}
            </button>
          </h2>
          <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Nro Factura</th>
                    <th scope="col">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr id="trListaProductos">
                    <th scope="row">${ventas[key].fecha}</th>
                    <td>${ventas[key].nroFactura}</td>
                    <td>${ventas[key].montoTotal}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        `
  }
};

// // const listaProductos = () => {
// //   productos.forEach((elem) => {

// //     let prodClone = lsProduct.cloneNode(lsProduct, true);
// //     prodClone.children[0].innerText = elem.id
// //     prodClone.children[1].innerText = elem.tipo
// //     prodClone.children[2].innerText = elem.tamanio + ' ' + elem.um
// //     prodClone.children[3].innerText = '$ ' + elem.precio
// //     prodClone.children[4].innerText = elem.stock
