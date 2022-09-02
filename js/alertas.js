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

  const alertEliminarConfirm = (param,fn) => {
    Swal.fire({
      title: '¿Desea eliminar el producto?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Volver`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fn()
        Swal.fire(`Se elimino el ${param} en forma correcta`, '', 'success')
      } else if (result.isDenied) {
        Swal.fire(`No se elimino el ${param}`, '', 'info')
      }
  })
  }


  const alertLoginInvalido = (tipo) => {
    switch (tipo) {
      case 1:
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: `El Usario no se encuentra registrado`,
          showConfirmButton: false,
          timer: 2000,
          toast: true
        })          
        break;
      case 2:
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: `La contraseña es invalida`,
          showConfirmButton: false,
          timer: 2000,
          toast: true
        })   
        break  
      default:
        break;
    }
  }


  const registroInvalido = () => {
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: `El Uusario ya se cuentra registrado`,
      showConfirmButton: false,
      timer: 2000,
      toast: true
    })
  }