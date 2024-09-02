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

function editCar(){
  const idAuto = document.getElementById("idAuto").value;
  if(idAuto > 0 && idAuto <= listadoAutos.length){
    const auto = listadoAutos[idAuto - 1];
    saveStorage('autoEdit', auto);
    window.location.href = 'html/add.html';
  }
}

function deleteCar() {
  const idAuto = document.getElementById("idAuto").value;
  if(idAuto > 0 && idAuto <= listadoAutos.length){
    listadoAutos.splice(idAuto - 1, 1);
    saveStorage('autos', listadoAutos);
    loadData();
    restaurarBtn();
  }
}

function loadData(){
 let dataAutos = document.getElementById("data-autos");
 dataAutos.innerHTML = ""
 if(listadoAutos.length > 0){
   listadoAutos.forEach((auto, index)=>{
     let contenedor = document.createElement('tr')
     contenedor.innerHTML =`<td>${index + 1}</td>
     <td>${auto.marca}</td>
     <td>${auto.modelo}</td>
     <td>${auto.año}</td>
     <td>${auto.km}</td>
     <td>${auto.precio}</td>`
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
  resetStorage('autoEdit'); // por si se sale de la pagina de edit sin presionar los btn
}

let btnDelete = document.getElementById("btn-delete");
btnDelete.addEventListener('click', abrirInputDelete);

let btnEdit= document.getElementById("btn-edit");
btnEdit.addEventListener('click', abrirInputEdit);

function abrirInputDelete(){
  let btnContainer = document.getElementById("btn-container");
  btnContainer.innerHTML = `<div class="col-md-4">
                      <label for="idAuto" class="form-label">Indica el nro de auto a eliminar</label>
                      <input type="text" class="form-control" id="idAuto" name="idAuto" required autofocus placeholder="Nro Auto">
                    </div>
                    <br>
                    <button class="btn btn-secondary" id="btn-Cancelar">Cancelar</button>
                    <button class="btn btn-danger" id="eliminarAuto">Eliminar</button>
                    `
  let btnCancelar = document.getElementById("btn-Cancelar");
  btnCancelar.addEventListener('click', restaurarBtn);
  let eliminarAuto = document.getElementById("eliminarAuto");
  eliminarAuto.addEventListener('click', deleteCar);
}


function abrirInputEdit(){
  let btnContainer = document.getElementById("btn-container");
  btnContainer.innerHTML = `<div class="col-md-4">
                      <label for="idAuto" class="form-label">Indica el nro de auto a editar</label>
                      <input type="text" class="form-control" id="idAuto" name="idAuto" required autofocus placeholder="Nro Auto">
                    </div>
                    <br>
                    <button class="btn btn-secondary" id="btn-Cancelar">Cancelar</button>
                    <button class="btn btn-primary" id="editarAuto">Editar</button>
                    `
  let btnCancelar = document.getElementById("btn-Cancelar");
  btnCancelar.addEventListener('click', restaurarBtn);
  let editarAuto = document.getElementById("editarAuto");
  editarAuto.addEventListener('click', editCar);
}

function restaurarBtn(){
  let btnContainer = document.getElementById("btn-container");
  btnContainer.innerHTML = `<a href="html/add.html" class="btn btn-success">Agregar</a>
                            <a class="btn btn-warning" id="btn-edit">Editar</a>
                            <button type="button" class="btn btn-danger" id="btn-delete">Eliminar</button>`
  let btnDelete = document.getElementById("btn-delete");
  btnDelete.addEventListener('click', abrirInputDelete);                             
  let btnEdit = document.getElementById("btn-edit");
  btnEdit.addEventListener('click', abrirInputEdit);                          
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