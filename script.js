const contenedorElemento = document.querySelector("#contenedor-elementos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const consultasBarra = document.getElementById("barra-consultas");
const subConsultasBarra = document.getElementById("barra-sub-consultas");
const navSubConsultas = document.getElementById("nav-sub-consultas");

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
        const res = await fetch(url);
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
          const consultasPeliculas = [];
          prod = generarObjeto("title","Titulo", opciones_all)
          consultasPeliculas.push(prod)
          prod = generarObjeto("release_date","Fecha", opciones_all)
          consultasPeliculas.push(prod)
          prod = generarObjeto("director","Director", opciones_all)
          consultasPeliculas.push(prod)
          prod = generarObjeto("producer","producer", opciones_all)
          consultasPeliculas.push(prod)
          hacerConsultasBarra(consultasPeliculas);
          agregarEventoConsultas(consultasPeliculas);
          break;
        case "personajes":
          show_all_characters();
          const consultasPersonajes = [];
          prod = generarObjeto("eye_color","Color de ojos", opciones_all)
          consultasPersonajes.push(prod)
          prod = generarObjeto("skin_color","Color de piel", opciones_all)
          consultasPersonajes.push(prod)
          prod = generarObjeto("hair_color","Color de pelo",opciones_all)
          consultasPersonajes.push(prod)
          prod = generarObjeto("gender","Genero",opciones_all)
          consultasPersonajes.push(prod)
          hacerConsultasBarra(consultasPersonajes);
          agregarEventoConsultas(consultasPersonajes);
          break;
        case "naves":
          show_all_starships();
          const consultasNaves = [];
          prod = generarObjeto("name","Nombre de la nave", opciones_all)
          consultasNaves.push(prod)
          prod = generarObjeto("passengers","Pasajeros", opciones_all)
          consultasNaves.push(prod)
          prod = generarObjeto("MGLT","MGLT", opciones_all)
          consultasNaves.push(prod)
          prod = generarObjeto("manufacturer","Manufacturer", opciones_all)
          consultasNaves.push(prod)
          hacerConsultasBarra(consultasNaves);
          agregarEventoConsultas(consultasNaves);
          break;
        case "especies":
          show_all_species();
          const consultasEspecies = [];
          prod = generarObjeto("classification","Clasificacion", opciones_all)
          consultasEspecies.push(prod)
          prod = generarObjeto("skin_colors","Skin color", opciones_all)
          consultasEspecies.push(prod)
          prod = generarObjeto("language","Language", opciones_all)
          consultasEspecies.push(prod)
          prod = generarObjeto("average_lifespan","Promedio de vida", opciones_all)
          consultasEspecies.push(prod)
          hacerConsultasBarra(consultasEspecies);
          agregarEventoConsultas(consultasEspecies);
          break;
        case "vehiculos":
          show_all_vehicles();
          const consultasVehiculos = [];
          prod = generarObjeto("name","Nombre", opciones_all)
          consultasVehiculos.push(prod)
          prod = generarObjeto("cost_in_credits","costo en créditos", opciones_all)
          consultasVehiculos.push(prod)
          prod = generarObjeto("passengers","Pasajeros", opciones_all)
          consultasVehiculos.push(prod)
          prod = generarObjeto("cargo_capacity","capacidad de carga", opciones_all)
          consultasVehiculos.push(prod)
          hacerConsultasBarra(consultasVehiculos);
          agregarEventoConsultas(consultasVehiculos);
          break;
        case "planetas":
          show_all_planets();
          const consultasPlanetas = [];
          prod = generarObjeto("population","Poblacion", opciones_all)
          consultasPlanetas.push(prod)
          prod = generarObjeto("diameter","Diametro", opciones_all)
          consultasPlanetas.push(prod)
          prod = generarObjeto("climate","Clima", opciones_all)
          consultasPlanetas.push(prod)
          prod = generarObjeto("terrain","Terreno", opciones_all)
          consultasPlanetas.push(prod)
          hacerConsultasBarra(consultasPlanetas);
          agregarEventoConsultas(consultasPlanetas);
          break;
        default:
          console.log("Error en la categori­a seleccionada");
      }
    });
  });
};
function hacerConsultasBarra(array) {
  consultasBarra.innerHTML = ``;
  subConsultasBarra.classList.add("disabled");
  array.forEach((elemento) => {
    consultasBarra.innerHTML += `
        <li>
            <button id="${elemento.id}" class="boton-menu-consulta boton-categoria-consulta"><span>${elemento.nombre}</span></button>
        </li>`;
  });
};
function agregarEventoConsultas(info) {
const botonesCategoriasConsulta = document.querySelectorAll(
  ".boton-categoria-consulta");
botonesCategoriasConsulta.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesCategoriasConsulta.forEach((boton) =>
      boton.classList.remove("active-consulta")
    );
    e.currentTarget.classList.add("active-consulta");
    subConsultasBarra.classList.add("disabled");
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
}

//***************************************************
// *  funciones de las consultas para ser activadas
//***************************************************

const opciones_all = async function() {
    let data_all
    const id_barra_principal_active = document.querySelector(".active");
    console.log(id_barra_principal_active.id) // el selector activo nos identifica con que valores debemos trabajar para la informacio
    if(id_barra_principal_active.id == "peliculas"){
        data_all = await call_data(7, 0); // modo de obtencion de datos para peliculas
    }else if(id_barra_principal_active.id == "personajes"){
        data_all = await call_data(9, 1); // modo de obtencion de datos
    }else if(id_barra_principal_active.id == "naves"){
        data_all = await call_data(4,4); // modo de obtencion de datos
    }else if(id_barra_principal_active.id == "especies"){
        data_all = await call_data(37, 3); // modo de obtencion de datos
    }else if(id_barra_principal_active.id == "vehiculos"){
        data_all = await call_data(4,point=5); // modo de obtencion de datos
    }else if(id_barra_principal_active.id == "planetas"){
        data_all = await call_data(61,point=2); // modo de obtencion de datos
    }
    let opciones = [];
    contenedorElemento.innerHTML = "";
    console.log(data_all);
    console.log(opciones);

    const id_consultas_active = document.querySelector(".active-consulta");

    console.log(id_consultas_active)
    const identificador = id_consultas_active.id
    console.log(identificador)

    function mostrar_data(identificador){
        function extraer_datos(array) {
                array.forEach(element => { // verificacion para que no se repitan
                if (!opciones.includes(element[identificador] ) && element[identificador]  !== 'n/a') {
                    opciones.push(element[identificador] );
                }
            });
            console.log(opciones);

            opciones = ordenarArray(opciones);

        }
        extraer_datos(data_all);
        console.log(opciones);
        contenedorElemento.innerHTML = ""; 
        opciones.forEach(pelicula  => {
        const div = document.createElement("div");
                div.classList.add("elemento");
                div.innerHTML = ` <p style="text-align: center;">${pelicula}</p>
                `;
                contenedorElemento.append(div);
        })
    }
    mostrar_data(identificador)
}
 // ordenamiento de datos automaticamente si es alfabeticamente o numericamente
 // si es numeros en string los pasa a numeros y asi se puede hacer la verificacion correctamente
 // tambien lo hace de forma separada en dado caso que haya numeros y letras en un solo array

function ordenarArray(arr) {
    // Verifica si el array contiene solo números o solo cadenas
    const soloNumeros = arr.every(item => !isNaN(item));
    const soloCadenas = arr.every(item => isNaN(item));

    if (soloNumeros) {
        // Convierte cadenas numéricas a números y las ordena de menor a mayor
        return arr
            .map(item => Number(item))    // Convierte las cadenas a números
            .sort((a, b) => a - b)        // Ordena los números de menor a mayor
            .map(item => String(item));   // Convierte los números de vuelta a cadenas
    } else if (soloCadenas) {
        // Ordena cadenas alfabéticamente
        return arr.sort((a, b) => a.localeCompare(b));
    } else {
        // Si hay mezcla de números y cadenas, separa y ordena por separado
        let numeros = arr
            .filter(item => !isNaN(item)) // Filtra y convierte a números
            .map(item => Number(item))
            .sort((a, b) => a - b)        // Ordena de menor a mayor
            .map(item => String(item));   // Convierte de nuevo a cadenas

        let cadenas = arr
            .filter(item => isNaN(item))  // Filtra las cadenas
            .sort((a, b) => a.localeCompare(b)); // Ordena alfabéticamente

        // Combina los arrays ordenados de números y cadenas
        return [...numeros, ...cadenas];
    }
}

//*PERSONAJES**************************************************
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
    function generarObjeto(item, name, fun){ 
        const consultasPersonajes = { id: item, nombre: name, funcion: fun };
        return consultasPersonajes;
    };
    console.log("Consulta de peliculas");
    const consultasPeliculas = [];
    prod = generarObjeto("title","Titulo", opciones_all)
    consultasPeliculas.push(prod)
    prod = generarObjeto("release_date","Fecha", opciones_all)
    consultasPeliculas.push(prod)
    prod = generarObjeto("director","Director", opciones_all)
    consultasPeliculas.push(prod)
    prod = generarObjeto("producer","producer", opciones_all)
    consultasPeliculas.push(prod)
    hacerConsultasBarra(consultasPeliculas);
    agregarEventoConsultas(consultasPeliculas);
};

const colorOjos = function () {
    contenedorElemento.innerHTML = "";
}
botonesCategoriasFuncion()

async function opciones() {
  let personajes = await call_data(9, 1);

  let opciones = [];
  contenedorElemento.innerHTML = "";
  console.log(personajes);

  function extraer_datos(array) {
      array.forEach(element => {
          if (!opciones.includes(element.eye_color) && element.eye_color !== 'n/a') {
              opciones.push(element.eye_color);
          }
      });
  }
  extraer_datos(personajes);
  console.log(opciones);
  subConsultasBarra.classList.remove("disabled");
    subConsultasBarra.innerHTML = ``;
    opciones.forEach((elemento) => {
      subConsultasBarra.innerHTML += `
          <li>
              <button id="barraSubConsulta" class="boton-menu-sub-consulta boton-categoria-sub-consulta"><span>${elemento}</span></button>
          </li>`;
    });

  const botonSubConsulta = document.querySelectorAll('.boton-menu-sub-consulta');
  botonSubConsulta.forEach(boton => {
      boton.addEventListener('click', (e) => {
        botonSubConsulta.forEach((boton) =>
          boton.classList.remove("active-sub-consulta")
        );
        e.currentTarget.classList.add("active-sub-consulta");
        console.log("Entreeeeeee")
        console.log(mostrarPersonajesFiltrados(personajes))
        mostrarPersonajesFiltrados(personajes);
        // AQUI SE HACE LAS SUB CONSULTAS 
      });
  });
}
function mostrarPersonajesFiltrados(personajes) {
  contenedorElemento.innerHTML = ""; 
  personajes.forEach(personaje => {
    const div = document.createElement("div");
              div.classList.add("elemento");
              div.innerHTML = ` <p>${personaje.name} - ${personaje.eye_color}</p>
              `;
              contenedorElemento.append(div);
      // contenedorElemento.innerHTML += `<p>${personaje.name} - ${personaje.eye_color}</p>`;
  });
}
