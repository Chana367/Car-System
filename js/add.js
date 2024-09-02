class Auto {
  constructor(marca, modelo, año, km, precio) {
    this.marca = marca;
    this.modelo = modelo;
    this.año = año;
    this.km = km;
    this.precio = precio;
  }
}

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

