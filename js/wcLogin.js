let usuarios = []

//Metodo GET para FETCH de usuarios, para luego comparar contenido
fetch('http://localhost:5000/userLogin')
  .then((res) => res.json())
  .then((data) => {
    usuarios.push(...data)
    userLogin(usuarios)
    setTimeout((bienvenida) => {
      window.location.href = "../panelAdmin.html"
    }, 3000);

});

const userLogin = (usuarios) => {
const user = document.querySelector('#user');
for (const key in usuarios) {
    user.innerText = ' ' + usuarios[key].user
  }
}

const bienvenida = () => {
  
  // Wrap every letter in a span
  var textWrapper = document.querySelector('.ml14 .letters');
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  
  anime.timeline({loop: false})
    .add({
      targets: '.ml14 .line',
      scaleX: [0,1],
      opacity: [0.5,1],
      easing: "easeInOutExpo",
      duration: 900
    }).add({
      targets: '.ml14 .letter',
      opacity: [0,1],
      translateX: [40,0],
      translateZ: 0,
      scaleX: [0.3, 1],
      easing: "easeOutExpo",
      duration: 800,
      offset: '-=600',
      delay: (el, i) => 150 + 25 * i
    }).add({
      targets: '.ml14',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    });
}


 /************************** GET DE USUARIO ***************************** */



