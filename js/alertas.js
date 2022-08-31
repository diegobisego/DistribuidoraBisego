const alertCarga = (tipo,param) => {
    if (tipo == 1) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${param} fue cargado con Exito!`,
        showConfirmButton: false,
        timer: 1000
      })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `El ${param} ya existe`,
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  const alertEliminar = (param) => {
    Swal.fire({
      position: 'bottom-end',
      icon: 'success',
      title: `El ${param} fue Eliminado`,
      showConfirmButton: false,
      timer: 1000,
      toast:true
    })
  }