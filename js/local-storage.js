//FUNCIONES DE LOCAL STORAGE
export function getStorage(clave) {
  return JSON.parse(localStorage.getItem(clave)); // Recupero la informacion del localStorage, sino existe devuelve 1
}
export function saveStorage(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor)) // guardo en el LocalStorage el resultado
};

export const resetStorage = (clave) => {
  localStorage.removeItem(clave); // reseteo en el LocalStorage
}