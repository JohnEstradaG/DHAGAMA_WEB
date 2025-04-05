export default {
  version: 'v1.0.0',
  locale: 'es',
  labels: {
    accessPermission: 'Permiso de acceso',
    didYouForgetYourPassword: '¿Olvidaste tu contraseña?',
    email: 'Correo Electrónico',
    endDate: 'Fecha final',
    fullDate: 'Fecha completa',
    invalid: 'inválido',
    loadingPicture: 'Cargando imagen',
    login: 'Iniciar sesión',
    name: 'Nombre',
    myData: 'Mi datos',
    options: 'Opciones',
    password: 'Contraseña',
    phone: 'Teléfono',
    licenseNumber: 'Número de licencia',
    required: 'Obligatori@',
    role: 'Rol',
    lastName: 'Segundo apellido',
    startDate: 'Fecha inicial',
    firstName: 'Primer apellido',
    user: 'Usuario',
  },

  actions: {
    addUsers: 'Agregar usuarios',
    addUser: 'Agregar usuario',
    attend: 'Atender',
    accept: 'Aceptar',
    addComment: 'Agregar comentario',
    addComments: 'Agregar comentarios',
    associateClient: 'Asociar cliente',
    disassociateClient: 'Desasociar cliente',
    cancel: 'Cancelar',
    close: 'Cerrar',
    continue: 'Continuar',
    checkOutput: 'Comprobar salida',
    delete: 'Eliminar',
    searchPreRegistration: 'Buscar pre registro',
    searchbyRangeDate: 'Buscar rango de fechas',
    edit: 'Editar',
    searchAccess: 'Buscar acceso',
    establish: 'Establecer',
    editProfile: 'Editar perfil',
    editUser: 'Editar usuario',
    printTicket: 'Imprimir etiqueta',
    recordBadge: 'Nuevo gafete',
    recordBranch: 'Nueva sucursal',
    recordCustomer: 'Nuevo cliente',
    recordWorkplace: 'Nuevo sitio de trabajo',
    register: 'Registrar',
    reject: 'Rechazar',
    resetPass: 'Reestablecer contraseña',
    return: 'Regresar',
    release: 'Liberar',
    restore: 'Restablecer',
    restorePassword: 'Restablecer contraseña',
    save: 'Guardar',
    users: 'Usuarios',
    search: 'Buscar',
    searchUser: 'Buscar Usuario',
    selectDate: 'Seleccionar un fecha',
    updateBadge: 'Actualizar gafete',
    updateBranch: 'Actualizar sucursal',
    updateCustomer: 'Actualizar cliente',
    updateWorkplace: 'Actualizar sitio de trabajo'
  },

  messages: {
    selectedFileNotImage: 'El archivo seleccionado no es una imagen',
  },

  routes: {
    logout: {
      icon: 'logout',
      name: 'Cerrar sesión',
      route: 'logout',
      url: '',
      children: []
    },
    profile: {
      icon: 'account_circle',
      name: 'Mi perfil',
      route: 'perfil',
      url: '/dhagama/perfil/',
      children: []
    },
    
    users: {
      icon: 'people',
      name: 'Usuarios',
      route: 'usuarios',
      url: '/dhagama/usuarios/',
      children: []
    },
  
  },

  widthForm: {
    auto: 'auto',
    xs: '400px',
    sm: '700px',
    md: '900px',
    lg: '1200px'
  },
}
