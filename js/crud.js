import {getStorage, resetStorage, saveStorage} from './local-storage.js';

class Auto {
  constructor(marca, modelo, año, km, precio, img) {
    this.marca = marca;
    this.modelo = modelo;
    this.año = año;
    this.km = km;
    this.precio = precio;
    this.img = img;
  }
}
let auto = null;
// Agregar auto
let btn = document.getElementById("btn-agregar");
btn.addEventListener('click', addCar);
const listadoAutos = getStorage('autos'); // Recupero la informacion del localStorage

let btnImg = document.getElementById("btn-img");
btnImg.addEventListener('click', openImg);
let urlImg = null;

async function openImg() {
  urlImg = null;
  const { value: file } = await Swal.fire({
    title: "Seleciona la imagén",
    input: "file",
    inputAttributes: {
      "accept": "image/*",
      "aria-label": "Seleciona la imagén"
    }
  });
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      Swal.fire({
        title: "Imágen cargada exitosamente",
        imageUrl: e.target.result
      });
      urlImg = e.target.result;
      document.getElementById("btn-agregar").disabled = false;
    };
    reader.readAsDataURL(file);
  }
}


function addCar() {
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const año = document.getElementById("anio").value;
  const km = document.getElementById("km").value;
  const precio = document.getElementById("precio").value;
  const img = urlImg
  const nuevoAuto = new Auto(marca, modelo, año, km, precio, img);
  //uso unshift para posicionar primero autos mas nuevos para el registro
  listadoAutos.unshift(nuevoAuto);

  saveStorage('autos', listadoAutos) // guardo en el LocalStorage el resultado

  alertSuccess("agregado")

}

function main(){
  auto = getStorage("autoEdit");
  const btnAgregar = document.getElementById("btn-agregar");
  if(urlImg == null){
    btnAgregar.disabled = true;
  }
  if(auto != null){
    console.log("Auto agregado", auto);
    document.getElementById("marca").value = auto.marca;
    document.getElementById("modelo").value = auto.modelo;
    document.getElementById("anio").value = auto.año;
    document.getElementById("km").value = auto.km;
    document.getElementById("precio").value = auto.precio;
    urlImg = auto.img;
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
    listadoAutos[index].img = urlImg;
    resetStorage('autoEdit');
    saveStorage('autos', listadoAutos) // guardo en el LocalStorage el resultado
    alertSuccess("editado")
  }

}

function alertSuccess(accion){
  Swal.fire({
    position: "center",
    icon: "success",
    title: `¡Auto ${accion} exitosamente!`,
    showConfirmButton: true,
    confirmButtonText: `OK`,
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then((result) => {
      if (result.isConfirmed) {
          window.location.href = "../index.html";
      }
  });
}

main()

