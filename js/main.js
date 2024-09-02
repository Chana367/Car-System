let menu = true;
let listadoAutos = [
  {
    marca: "Toyota",
    modelo: "Corolla",
    año: 2019,
    km: 15000,
    precio: 7000000
  },
  {
    marca: "Ford",
    modelo: "Mustang",
    año: 2021,
    km: 5000,
    precio: 120000000
  },
  {
    marca: "Chevrolet",
    modelo: "Camaro",
    año: 2018,
    km: 30000,
    precio: 80000000
  }
];

function loadMenu() {
  do{
    let opcion = parseInt(prompt(`Elige una opción (expresalo en numeros):
                                      1- Agregar auto
                                      2- Modificar Auto
                                      3- Eliminar Auto
                                      4- Mostrar Autos
                                      5- Cerrar Sistema`))
    menu = false; // cierro el ciclo
    switch (opcion) {
      case 1:
        addCar();
        break;
      case 2:
        editCar();
        break;
      case 3:
        // esta funcion es para eliminar el ultimo auto del array
        deleteCar();
        break
      case 4:
        viewCars();
        break
      case 5:
          console.log("Cerrar Sistema");
          break
      default:
        menu = true; //ejecuta nuevamente el menu
        console.error("La opción ingresada no es valida")
        break
    }

  }while(menu);
}

function editCar(){
  const indexAuto = parseInt(prompt("Ingresa el nro del auto a modificar: "))
  if(indexAuto > 0 && indexAuto <= listadoAutos.length){
    const canEdit = confirm("¿Seguro que quieres editar los datos del auto: " + listadoAutos[indexAuto - 1].marca
      + " " + listadoAutos[indexAuto - 1].modelo + "?")  
    if(canEdit){
      //solo dejo modificar los km
      const km = parseInt(prompt("Ingresa la cantidad de km del auto"))
      listadoAutos[indexAuto].km = km
      alert("Auto modificado exitosamente!!!")
    }
  }else{
    console.warn("No tenemos registrado un auto con ese id")
  }
  loadMenu();
}

function deleteCar() {
  // de momento elimino ultimo del registro
  const canDelete = confirm("¿Seguro el auto mas antiguo de nuestro registro: " + listadoAutos[listadoAutos.length - 1].marca
      + " " + listadoAutos[listadoAutos.length - 1].modelo + "?")
  if(canDelete){
    listadoAutos.pop()
    alert("Auto eliminado exitosamente!!!")
  }
  loadMenu()
}

function viewCars() {
  const encabezado = "Listado de autos cargados: \n"
  let msj = []
  for(let i = 0; i < listadoAutos.length; i++){
    msj.push(i + 1 + "- " + listadoAutos[i].marca + " " +  listadoAutos[i].modelo + " " +  listadoAutos[i].año 
    + " " +  listadoAutos[i].km)
  }
  const msjFinal = msj.join("\n")
  alert(encabezado + msjFinal)

  loadMenu();
}

function loadData(){
 let dataAutos = document.getElementById("data-autos");
 if(listadoAutos.length > 0){
   listadoAutos.forEach((auto)=>{
     let contenedor = document.createElement('tr')
     contenedor.innerHTML =`<td>${auto.marca}</td>
     <td>${auto.modelo}</td>
     <td>${auto.año}</td>
     <td>${auto.km}</td>
     <td>${auto.precio}</td>
     <td>
     <a href="edit.html" class="btn btn-warning btn-sm me-2">Editar</a>
     
     <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal"
     data-bs-target="#eliminaModal" data-bs-id="1">Eliminar</button>
     </td>`
     dataAutos.appendChild(contenedor)
    })
    saveStorage("autos", listadoAutos)
  }
}

function main() {
  const autos = getStorage('autos');
  if(autos == null) {
    saveStorage('autos', listadoAutos)
  }else {
    listadoAutos = getStorage('autos');
  }
  loadData();
}

//FUNCIONES DE LOCAL STORAGE
function getStorage(clave) {
  return JSON.parse(localStorage.getItem(clave)); // Recupero la informacion del localStorage, sino existe devuelve 1
}
function saveStorage(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor)) // guardo en el LocalStorage el resultado
};

const resetStorage = (clave) => {
  localStorage.removeItem(clave); // reseteo en el LocalStorage
}

main();