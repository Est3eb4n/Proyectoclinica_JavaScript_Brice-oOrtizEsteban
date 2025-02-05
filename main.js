function initDB(){
  const openDB = window.indexedDB.open('clinica', 1);

  openDB.onupgradeneeded = ( init )=> {
    let inventarioDB = init.target.result;

    inventarioDB.onerror = () => {
      console.error('Error cargando la base de datos.');
    };

    let table = inventarioDB.createObjectStore('usuarios', { keyPath: 'id', autoIncrement:true });
    table.createIndex('cc', 'cc', { unique: true });

  };

  openDB.onerror = () => console.error('Error abriendo la base de datos');

  openDB.onsuccess = () => {
    console.log('Base de datos abierta!');
  };
}

function agregarUsuario(cc, nombre, apellido, cargo, telefono, correo, clave) {
  const openDB = window.indexedDB.open('clinica', 1);
  openDB.onerror = () => console.error('Error abriendo la base de datos');

  openDB.onsuccess = () => {
    let inventarioDB = openDB.result
    const transaction = inventarioDB.transaction(["usuarios"], "readwrite");
    const usuariosStore = transaction.objectStore("usuarios");

    const nuevoUsuario = { cc, nombre, apellido, cargo, telefono, correo, clave};
    const agregarRequest = usuariosStore.add(nuevoUsuario);

    agregarRequest.onsuccess = () => {
      console.log("Producto agregado correctamente");
    };

    agregarRequest.onerror = (error) => {
      if(error.target.error.name == "ConstraintError")
        console.log("Error: El código del producto ya está registrado.");
      else
        console.log("Error desconocido.", error.target.error.name);
    };
  };
}
  
initDB()


//***********************************************************************************/
//******************************* Registro medico ***********************************/
//***********************************************************************************/


const frmProducto = document.querySelector("#formulario")
const btnGuardar = document.getElementById("prin")
btnGuardar.addEventListener("click", ()=>{
  console.log(frmProducto)
  const frmData = new FormData(frmProducto);
  console.log(frmData)
  agregarUsuario(frmData.get("cc"), frmData.get("nombre"), frmData.get("apellido"), frmData.get("correo"), frmData.get("telefono"), frmData.get("clave"), frmData.get("cargo"));
})





function crearCuenta(event){

  event.preventDefault()

 
  agregarUsuario(cc, nombre, apellido, cargo, telefono, correo, clave)

}