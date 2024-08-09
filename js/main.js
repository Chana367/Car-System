let menu = true;
const listadoAutos = [
  {
    marca: "Toyota",
    modelo: "Corolla",
    año: 2019,
    km: 15000
  },
  {
    marca: "Ford",
    modelo: "Mustang",
    año: 2021,
    km: 5000
  },
  {
    marca: "Chevrolet",
    modelo: "Camaro",
    año: 2018,
    km: 30000
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


function addCar() {
  const marca = prompt("Ingresa la marca del auto (PASO 1 de 4)");
  const modelo = prompt("Ingresa el modelo del auto (PASO 2 de 4)");
  const año = parseInt(prompt("Ingresa el año del auto (PASO 3 de 4)"))
  const km = parseInt(prompt("Ingresa la cantidad de km del auto (PASO 4 de 4)"))
  const obj = {
    marca: marca,
    modelo: modelo,
    año: año,
    km: km
  }
  //uso unshift para posicionar primero autos mas nuevos para el registro
  listadoAutos.unshift(obj);
  alert("Auto agregado exitosamente!!!")
  const newAdd = confirm("¿Deseas agregar otro auto?");
  if(newAdd){
    addCar();
  }else{
    loadMenu();
  }
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

function main() {
  alert("Bienvenido al Sistema de Carga de Autos")
  loadMenu();
}


main();