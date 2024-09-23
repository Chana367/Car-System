import * as storageService from './local-storage.js';

let ruta = '../assets/data/autos.json';
let listadoAutos = [];

async function getAutos() {
  let response = [];
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    ruta = '../assets/data/autos.json';
  } else {
    ruta = 'https://chana367.github.io/Car-System/assets/data/autos.json';
  }
  try {
    let peticion = await fetch(ruta)
    response = await peticion.json()
    return response;
  }catch (err) {
    console.error('Error:', err);
  }finally{
    return response; // Esto si ocurre un error retorna vacio
  }
}

function editCar(){
  const idAuto = document.getElementById("idAuto").value;
  if(idAuto > 0 && idAuto <= listadoAutos.length){
    const auto = listadoAutos[idAuto - 1];
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: `¿Estas seguro que quieres editar el auto ${auto.marca} ${auto.modelo}?`,
      text: "Si cambias los datos no los podras recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Editar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const auto = listadoAutos[idAuto - 1];
        storageService.saveStorage('autoEdit', auto);
        window.location.href = 'html/add.html';
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        loadData();
        restaurarBtn();
      }
    });
  }
}

function deleteCar() {
  const idAuto = document.getElementById("idAuto").value;
  if(idAuto > 0 && idAuto <= listadoAutos.length){
    const auto = listadoAutos[idAuto - 1];
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: `¿Estas seguro que quieres eliminar el auto ${auto.marca} modelo ${auto.modelo}?`,
      text: "¡Esta acción es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        listadoAutos.splice(idAuto - 1, 1);
        storageService.saveStorage('autos', listadoAutos);
        loadData();
        restaurarBtn();
        swalWithBootstrapButtons.fire({
          title: "Auto Eliminado!",
          text: "Tu operación se realizo correctamente.",
          icon: "success"
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        loadData();
        restaurarBtn();
      }
    });
  }
}

function loadData(){
 let dataAutos = document.getElementById("data-autos");
 dataAutos.innerHTML = ""
 if(listadoAutos.length > 0){
   listadoAutos.forEach((auto, index)=>{
     let contenedor = document.createElement('tr')
     contenedor.innerHTML =`<td>${index + 1}</td>
     <td class="td-img"><img class="img-fluid" src='${auto.img}'></img></td>
     <td>${auto.marca}</td>
     <td>${auto.modelo}</td>
     <td>${auto.año}</td>
     <td>${auto.km}</td>
     <td>${auto.precio}</td>`
     dataAutos.appendChild(contenedor)
    })
  }
}

async function main() {
  const autos = storageService.getStorage('autos');
  if(autos == null) {
    listadoAutos = await getAutos(); // obtengo datos del json default
    storageService.saveStorage('autos', listadoAutos)
  }else {
    listadoAutos = storageService.getStorage('autos');
  }
  loadData();
  storageService.resetStorage('autoEdit'); // por si se sale de la pagina de edit sin presionar los btn
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

main();