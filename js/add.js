class Auto {
  constructor(marca, modelo, año, km, precio) {
    this.marca = marca;
    this.modelo = modelo;
    this.año = año;
    this.km = km;
    this.precio = precio;
  }
}
let auto = null;
// Agregar auto
let btn = document.getElementById("btn-agregar");
btn.addEventListener('click', addCar);
const listadoAutos = JSON.parse(localStorage.getItem('autos')); // Recupero la informacion del localStorage
console.log(listadoAutos)

function addCar() {
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const año = document.getElementById("anio").value;
  const km = document.getElementById("km").value;
  const precio = document.getElementById("precio").value;

  const nuevoAuto = new Auto(marca, modelo, año, km, precio);
  //uso unshift para posicionar primero autos mas nuevos para el registro
  listadoAutos.unshift(nuevoAuto);

  localStorage.setItem('autos', JSON.stringify(listadoAutos)) // guardo en el LocalStorage el resultado

  let contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = `<h3 class="my-3">Auto Agregado Exitosamente!!!</h3>
                          <div class="col-12">
                            <button class="btn btn-secondary" id="irHome">Ir Home</button>
                          </div>`
                          //irHome 
  let btnHome = document.getElementById("irHome");
  btnHome.addEventListener("click", function() {
    window.location.href = "../index.html";
  });
}


//GET storage
function getStorage(clave) {
  return JSON.parse(localStorage.getItem(clave)); // Recupero la informacion del localStorage, sino existe devuelve 1
}

const resetStorage = (clave) => {
  localStorage.removeItem(clave); // reseteo en el LocalStorage
}

function main(){
  auto = getStorage("autoEdit");
  if(auto != null){
    console.log("Auto agregado", auto);
    document.getElementById("marca").value = auto.marca;
    document.getElementById("modelo").value = auto.modelo;
    document.getElementById("anio").value = auto.año;
    document.getElementById("km").value = auto.km;
    document.getElementById("precio").value = auto.precio;
    let container = document.getElementById("buttonSave");
    container.innerHTML = `<a href="../index.html" class="btn btn-secondary" id="btn-regresar">Regresar</a>
                  <button class="btn btn-primary" id="btn-actualizar" type="button">Actualizar</button>`
    let btnRegresar = document.getElementById("btn-regresar");
    btnRegresar.addEventListener('click', deleteCarStorage);
                  
    let btnEdit = document.getElementById("btn-actualizar");
    btnEdit.addEventListener('click', editCar);
  }
}

function deleteCarStorage(){
  resetStorage('autoEdit');
  window.location.href = '../index.html';
}

function editCar() {
  console.log("Editar")
  const index = listadoAutos.findIndex(a => {
    return Object.keys(auto).every(key => a[key] === auto[key]);
  });

  if(index != -1) {
    listadoAutos[index].marca = document.getElementById("marca").value;
    listadoAutos[index].modelo = document.getElementById("modelo").value;
    listadoAutos[index].año = document.getElementById("anio").value;
    listadoAutos[index].km = document.getElementById("km").value;
    listadoAutos[index].precio = document.getElementById("precio").value;
    resetStorage('autoEdit');
    localStorage.setItem('autos', JSON.stringify(listadoAutos)) // guardo en el LocalStorage el resultado
    window.location.href = '../index.html';
  }

}

main()

