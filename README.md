# Descripción del Sistema CRUD de Autos

Este proyecto es un **sistema CRUD básico** que permite a los usuarios gestionar (agregar, editar, eliminar y visualizar) una lista de autos. El sistema utiliza LocalStorage del navegador para almacenar de forma persistente los datos de los autos, y emplea un archivo JSON como base inicial en caso de que no existan datos previos en el almacenamiento local.

## Funcionalidades principales::

- **Agregar Auto:** Permite al usuario agregar un nuevo auto a la lista, especificando atributos como marca, modelo, año, kilometraje y precio. Los datos se guardan en el LocalStorage para que sean persistentes incluso después de cerrar el navegador.

- **Ver Autos:** La lista de autos se presenta en una tabla generada dinámicamente. Si no hay autos almacenados en el LocalStorage, el sistema cargará una lista de autos desde un archivo JSON predeterminado.

- **Editar Auto:** Los usuarios pueden seleccionar un auto de la lista y modificar sus atributos. Después de editar, los cambios se guardan automáticamente en el LocalStorage.

- **Eliminar Auto:** Los autos pueden ser eliminados de la lista, actualizando los datos en LocalStorage. Para confirmar la eliminación, se utiliza una alerta personalizada con `SweetAlert2`.

## Tecnologías Utilizadas:

1. **HTML**
2. **CSS**
3. **JavaScript**
4. **Bootstrap** (para el diseño responsive)
5. **SweetAlert2**  (para las alertas, instalable mediante CDN o NPM)

## Instalación y uso

1. Clona el repositorio:  
   `git clone https://github.com/Chana367/Car-System.git`
2. Abre el archivo `index.html` en tu navegador.