//Metodo GET para FETCH de saldos, para luego comparar contenido

let saldos = [];

fetch("http://localhost:5000/saldos")
  .then((res) => res.json())
  .then((data) => {
    saldos.push(...data);
    cargarCtasCtes();
  });

  
