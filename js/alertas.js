const alertCarga = (tipo, param) => {
  switch (tipo) {
    case 1:
      Swal.fire({
        position: "top",
        icon: "success",
        title: `${param} fue cargado con Exito!`,
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });      
      break;
    case 2:
      Swal.fire({
        position: "center",
        icon: "error",
        title: `El ${param} ya existe`,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });
      break
      case 3:
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Registro de ${param} cargado con exito!`,
          showConfirmButton: false,
          timer: 1500
        })
      break
      default:  
      break;
  }
};

const alertEliminar = (param) => {
  Swal.fire({
    position: "bottom-end",
    icon: "success",
    title: `El ${param} fue Eliminado`,
    showConfirmButton: false,
    timer: 1000,
    toast: true,
  });
};

const alertEliminarConfirm = (param, fn) => {
  Swal.fire({
    title: "¿Desea eliminar el producto?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    denyButtonText: `Volver`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      fn();
      Swal.fire(`Se elimino el ${param} en forma correcta`, "", "success");
    } else if (result.isDenied) {
      Swal.fire(`No se elimino el ${param}`, "", "info");
    }
  });
};

//validaciones de ingresos usuarios invalidos
const invalido = (tipo) => {
  debugger;
  switch (tipo) {
    case 1:
      Swal.fire({
        position: "top",
        icon: "error",
        title: `El Usario no se encuentra registrado`,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });
      break;
    case 2:
      Swal.fire({
        position: "top",
        icon: "error",
        title: `La contraseña es invalida`,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });
      break;
    case 3:
      Swal.fire({
        position: "top",
        icon: "error",
        title: `El Usuario ya se ecuentra registrado`,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
      });
      break;
    case 4:
      Swal.fire({
        position: "top",
        icon: "error",
        title: `El usuario no puede estar vacio ni contener espacios`,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
      });
      break;
    case 5:
      Swal.fire({
        position: "top",
        icon: "error",
        title: `El usuario o contraseña debe contener 4 letras como minimo`,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
      });
      break;
    case 6:
      Swal.fire({
        position: "top",
        icon: "error",
        title: `Se deben completar todos los campos`,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
      });
      break;
    default:
      break;
  }
};
