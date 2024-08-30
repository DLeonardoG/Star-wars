const contenedorElemento = document.querySelector("#contenedor-elementos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const consultasBarra = document.getElementById("barra-consultas");

console.log(botonesCategorias);

const urlSTAR = [
    "https://swapi.py4e.com/api/films/",         //0
    "https://swapi.py4e.com/api/people/",         //1
    "https://swapi.py4e.com/api/planets/",         //2
    "https://swapi.py4e.com/api/species/",         //3
    "https://swapi.py4e.com/api/starships/",         //4
    "https://swapi.py4e.com/api/vehicles/",         //5
];
//*********************************************************************
async function get_data(url) {
    try {
        console.log("OBTENCION DE DATOS GET_DATA");
        const res = await fetch(url);
        console.log(url)
        if (res.ok) {
            const stars = await res.json();
            // console.log("Datos obtenidos:", stars.results);
            return stars;
        } else {
            console.error("Error en la respuesta de la API:", res.status);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}
//---------------------------------------------------
function botonesCategoriasFuncion(){
  botonesCategorias.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      botonesCategorias.forEach((boton) => boton.classList.remove("active"));
      e.currentTarget.classList.add("active");
      let per = e.currentTarget.id;
      function generarObjeto(item, name, fun){ 
          const consultasPersonajes = { id: item, nombre: name, funcion: fun };
          return consultasPersonajes;
      };
      let prod;
      switch (per) {
        case "peliculas":
          show_all_films();
          console.log("Consulta de peliculas");
          const consultasPeliculas = ["Titulo", "Fecha", "Director", "Episodio"];
          hacerConsultasBarra(consultasPeliculas);
          agregarEventoConsultas();
          break;
        case "personajes":
          show_all_characters();
          const consultasPersonajes = [];
          prod = generarObjeto("color_de_ojos","Color de ojos", colorOjos)
          consultasPersonajes.push(prod)
          prod = generarObjeto("color_de_piel","Color de piel", colorOjos)
          consultasPersonajes.push(prod)
          prod = generarObjeto("Color_de_pelo","Color de pelo",colorOjos)
          consultasPersonajes.push(prod)
          prod = generarObjeto("genero","Genero",colorOjos)
          consultasPersonajes.push(prod)
          hacerConsultasBarra(consultasPersonajes);
          agregarEventoConsultas(consultasPersonajes);
          break;
        case "naves":
          show_all_starships();
          const consultasNaves = ["Pilotos", "Pasajeros", "MGLT", "Manufacturer"];
          prod = generarObjeto("pilotos","Pilotos", colorOjos)
          consultasNaves.push(prod)
          prod = generarObjeto("pasajeros","Pasajeros", colorOjos)
          consultasNaves.push(prod)
          prod = generarObjeto("mglt","MGLT", colorOjos)
          consultasNaves.push(prod)
          prod = generarObjeto("manufacturer","Manufacturer", colorOjos)
          consultasNaves.push(prod)
          hacerConsultasBarra(consultasNaves);
          agregarEventoConsultas(consultasNaves);
          break;
        case "especies":
          show_all_species();
          const consultasEspecies = [
            "Clasificacion",
            "Skin color",
            "Language",
            "Planeta",
          ];
          hacerConsultasBarra(consultasEspecies);
          agregarEventoConsultas();
          break;
        case "vehiculos":
          show_all_vehicles();
          const consultasVehiculos = [
            "Color de ojos",
            "Color de piel",
            "Genero",
            "Color de pelo",
          ];
          hacerConsultasBarra(consultasVehiculos);
          agregarEventoConsultas();
          break;
        case "planetas":
          show_all_planets();
          const consultasPlanetas = ["Poblacion", "Diametro", "Clima", "Terreno"];
          hacerConsultasBarra(consultasPlanetas);
          agregarEventoConsultas();
          break;
        default:
          console.log("Error en la categorÃ­a seleccionada");
      }
    });
  });
};
function hacerConsultasBarra(array) {
  consultasBarra.innerHTML = ``;
  array.forEach((elemento) => {
    consultasBarra.innerHTML += `
        <li>
            <button id="${elemento.id}" class="boton-menu-consulta boton-categoria-consulta"><span>${elemento.nombre}</span></button>
        </li>`;
  });
};
function agregarEventoConsultas(info) {
const botonesCategoriasConsulta = document.querySelectorAll(
  ".boton-categoria-consulta"
);
botonesCategoriasConsulta.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesCategoriasConsulta.forEach((boton) =>
      boton.classList.remove("active-consulta")
    );
    e.currentTarget.classList.add("active-consulta");
    console.log(info);
    // DE AQUI PARA ABAJO SE HACEN LAS CONSULTAS POR EL SUB ELEMENTO DE LA SUBLISTA
      info.forEach((ele)=> {
          if (ele.id === e.currentTarget.id){
              console.log(ele.funcion);
              ele.funcion();
          }
      })
  });
});
}
//***************************************************
// *             obeter datos funciones
//***************************************************
async function call_data(numero, point) {
    let informacion = [];
    let data = [];

    for (let i = 1; i <= numero; i++) {
        try {
            if (point === 4 || point === 5) {
                const datos = await get_data(urlSTAR[point] + "?page=" + i);
                data = datos.results;

            } else if (point === 0 || point === 1 || point ===2 || point === 3 ) {
                const datos = await get_data(urlSTAR[point] + i + "/");
                data = [datos];
            };
            data.forEach(element => {
                informacion.push(element);
            });

        } catch (error) {
            console.error("Ocurrió un error:", error);
        }
    }
    return informacion;

//*PERSONAJES**************************************************

}
async function show_all_characters() {
    let personajes
    console.log("Inicio de la búsqueda de personajes");
    console.log("Inicio de la búsqueda de personajes");
    personajes = await call_data(9, 1)
    // AQUI SE DIBUJAN LOS ELEMENTOS CON EL FOR EACH PARA MEJOR SINTAXIS Y PORQUE ESTA MAS CHIMBA MMH
    contenedorElemento.innerHTML = "";
    personajes.forEach((element) => {
        const div = document.createElement("div");
        div.classList.add("elemento");
        div.innerHTML = `
                    <h2>${element.name}</h2>
                    <p class="Altura"><strong>Altura:</strong> ${element.height}</p>
                    <p class="Masa"><strong>Masa:</strong> ${element.mass}</p>
                    <p class="Color_de_pelo"><strong>Color de pelo:</strong> ${element.hair_color}</p>
                    <p class="Color_de_piel"><strong>Color de piel:</strong> ${element.skin_color}</p>
                    <p class="Color_de_ojos"><strong>Color de ojos:</strong> ${element.eye_color}</p>
                    <p class="Año_de_nacimiento"><strong>fecha de nacimiento: </strong>${element.birth_year}</p>
                    <p class="genero"><strong>Genero: </strong>${element.gender}</p>
        `;
        contenedorElemento.append(div);
    });
    return personajes;
}

// filtro por color de ojos

async function opciones() {
    let personajes = await call_data(9, 1)

    let opciones = [];
    contenedorElemento.innerHTML = ""
    console.log(personajes)
    function extraer_datos(array) {
        array.forEach(element => {
            if (!opciones.includes(element.eye_color)) {
                opciones.push(element.eye_color);
            }
        });
    }
    extraer_datos(personajes);
    console.log(opciones)

    console.log(personajes.filter(p => p.eye_color === "blue"))

}


//*peliculas**************************************************
async function show_all_films() {
    let peliculas;
    contenedorElemento.innerHTML = ""
    peliculas = await call_data(7, 0)
    if (peliculas.length > 0) {
        peliculas.forEach((element) => {
            const div = document.createElement("div");
            div.classList.add("elemento");
            div.innerHTML = `
                <h2>${element.title}</h2>
                <p><br><strong>Episode ID:</strong> ${element.episode_id}</p>
                <p><strong>Director:</strong> ${element.director}</p>
                <p><strong>Producer:</strong> ${element.producer}</p>
                <p><strong>Release Date:</strong> ${element.release_date}</p>
                <p><strong>synopsis:<br></strong> ${element.opening_crawl}</p>
            `;
            contenedorElemento.append(div);
        });
    } else {
        console.log("No se encontraron películas.");
    }
}
//*NAVES**************************************************
async function show_all_starships() {
    let naves;
    //obtener informacion
    naves = await call_data(4,4)
    console.log(naves);
    if (naves.length > 0) {
        contenedorElemento.innerHTML = "";

        naves.forEach((element) => {
            const div = document.createElement("div");
            div.classList.add("elemento");
            div.innerHTML = `
                <h2>${element.name}</h2>
                <p><br><strong>model:</strong> ${element.model}</p>
                <p><strong>manufacturer:</strong> ${element.manufacturer}</p>
                <p><strong>cost in credits:</strong> ${element.cost_in_credits}</p>
                <p><strong>passengers:</strong> ${element.passengers}</p>
                <p><strong>starship class:</strong> ${element.starship_class}</p>
                <p><strong>max atmosphering speed:</strong> ${element.max_atmosphering_speed}</p>
                <p><strong>cargo capacity:</strong> ${element.cargo_capacity}</p>
                <p><strong>MGLT:</strong> ${element.MGLT}</p>
            `;
            contenedorElemento.append(div);
        });
    } else {
        console.log("No se encontraron películas.");
    }
}
//*ESPECIES**************************************************
async function show_all_species() {
    var especies;
    console.log("Inicio de la búsqueda de PELICULAS");
    contenedorElemento.innerHTML = "";
    especies = await call_data(37, 3)
    if (especies.length > 0) {
        especies.forEach((element) => {
            const div = document.createElement("div");
            div.classList.add("elemento");
            div.innerHTML = `
                <h2>${element.name}</h2>
                <p><br><strong>classification:</strong> ${element.classification}</p>
                <p><strong>designation:</strong> ${element.designation}</p>
                <p><strong>average height:</strong> ${element.average_height}</p>
                <p><strong>skin colors:</strong> ${element.skin_colors}</p>
                <p><strong>hair colors:</strong> ${element.hair_colors}</p>
                <p><strong>eye colors:</strong> ${element.eye_colors}</p>
                <p><strong>average lifespan:</strong> ${element.average_lifespan}</p>
                <p><strong>language:</strong> ${element.language}</p>
            `;
            contenedorElemento.append(div);
        });
    } else {
        console.log("No se encontraron películas.");
    }
}
//*VEHICULOS***************************************************
async function show_all_vehicles() {
    let vehiculos;
    console.log("Inicio de la búsqueda de PELICULAS");
    vehiculos = await call_data(4,point=5)
    console.log(vehiculos);
    if (vehiculos.length > 0) {
        contenedorElemento.innerHTML = "";

        vehiculos.forEach((element) => {
            const div = document.createElement("div");
            div.classList.add("elemento");
            div.innerHTML = `
                <h2>${element.name}</h2>
                <p><br><strong>model:</strong> ${element.model}</p>
                <p><strong>manufacturer:</strong> ${element.manufacturer}</p>
                <p><strong>cost in credits:</strong> ${element.cost_in_credits}</p>
                <p><strong>passengers:</strong> ${element.passengers}</p>
                <p><strong>vehicle_class:</strong> ${element.vehicle_class}</p>
                <p><strong>max atmosphering speed:</strong> ${element.max_atmosphering_speed}</p>
                <p><strong>cargo capacity:</strong> ${element.cargo_capacity}</p>
                <p><strong>length:</strong> ${element.length}</p>
            `;
            contenedorElemento.append(div);
        });
    } else {
        console.log("No se encontraron películas.");
    }
}
//*PLANETAS**************************************************
async function show_all_planets() {
    let planetas;
    contenedorElemento.innerHTML = "";
    planetas = await call_data(61,point=2);

    if (planetas.length > 0) {
        planetas.forEach((element) => {
            const div = document.createElement("div");
            div.classList.add("elemento");
            div.innerHTML = `
                <h2>${element.name}</h2>
                <p><br><strong>rotation period:</strong> ${element.rotation_period}</p>
                <p><strong>orbital period:</strong> ${element.orbital_period}</p>
                <p><strong>diameter:</strong> ${element.diameter}</p>
                <p><strong>climate:</strong> ${element.climate}</p>
                <p><strong>gravity:</strong> ${element.gravity}</p>
                <p><strong>terrain:</strong> ${element.terrain}</p>
                <p><strong>surface water:</strong> ${element.surface_water}</p>
                <p><strong>population:</strong> ${element.population}</p>
            `;
            contenedorElemento.append(div);
        });
    } else {
        console.log("No se encontraron películas.");
    }
}
// RECARGA INICIAL******************++++++
window.onload = function () {
    show_all_films();
    console.log("Consulta de peliculas");
    const consultasPeliculas = ["Titulo", "Fecha", "director", "episodio"];
    hacerConsultasBarra(consultasPeliculas);
    agregarEventoConsultas();
};

const colorOjos = function () {
    contenedorElemento.innerHTML = "";
}
botonesCategoriasFuncion()