
const contenedorElemento = document.querySelector("#contenedor-elementos")
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const consultasBarra = document.getElementById("barra-consultas");

const urlSTAR = {
    "films": "https://swapi.py4e.com/api/films/",
    "people": "https://swapi.py4e.com/api/people/",
    "planets": "https://swapi.py4e.com/api/planets/",
    "species": "https://swapi.py4e.com/api/species/",
    "starships": "https://swapi.py4e.com/api/starships/",
    "vehicles": "https://swapi.py4e.com/api/vehicles/",
    "planets" : "https://swapi.py4e.com/api/planets/"
};
//*********************************************************************
async function get_data(url) {
    try {
        console.log("OBTENCION DE DATOS GET_DATA")
        const res = await fetch(url);
        if (res.ok) {
            const stars = await res.json();
            console.log("Datos obtenidos:", stars.results);
            return stars;
        } else {
            console.error("Error en la respuesta de la API:", res.status);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}
//---------------------------------------------------
// ESTA BUSQUEDA FUNCIONA A LA PERFECCION, REALIZAR UNA POR CADA UNO DE LOS CINCO PARA MOSTRAR TODAS DESPUES DE ESO FILTRAMOS

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        let per = e.currentTarget.id;
        switch (per) {
            case "peliculas":
                show_all_films()
                console.log("Consulta de peliculas");
                const consultasPeliculas = ["titulo", "fecha", "director", "episodio"];

                hacerConsultasBarra(consultasPeliculas)
                agregarEventoConsultas()
                break;
            case "personajes":
                show_all_characters();
                const consultasPersonajes = ["Color de ojos", "Color de piel", "Genero", "Color de pelo"];

                hacerConsultasBarra(consultasPersonajes)
                agregarEventoConsultas()
                break;
            case "naves":
                show_all_starships()
                const consultasNaves = ["Pilotos", "peliculas que estuvieron", "MGLT", "manufacturer"];

                hacerConsultasBarra(consultasNaves)
                agregarEventoConsultas()

                break;
            case "especies":
                show_all_species()
                const consultasEspecies = ["clasificacion", "Skin color", "language", "planeta"];
                hacerConsultasBarra(consultasEspecies)
                agregarEventoConsultas()
                break;
            case "vehiculos":
                show_all_vehicles()

                const consultasVehiculos = ["Color de ojos", "Color de piel", "Genero", "Color de pelo"];
                hacerConsultasBarra(consultasVehiculos)
                agregarEventoConsultas()
                break;
            case "planetas":
                // AQUI SE HACE LA CONSULTA DE VEHICULOS
                console.log("Consulta de planetas");
                const consultasPlanetas = ["Color de ojos", "Color de piel", "Genero", "Color de pelo"];
                hacerConsultasBarra(consultasVehiculos)
                agregarEventoConsultas()
                break;
            default:
                console.log("Error en la categoría seleccionada");
        }
    });
});
function agregarEventoConsultas() {
    const botonesCategoriasConsulta = document.querySelectorAll(".boton-categoria-consulta");
    botonesCategoriasConsulta.forEach(boton => {
        boton.addEventListener("click", (e) => {
            botonesCategoriasConsulta.forEach(boton => boton.classList.remove("active-consulta"));
            e.currentTarget.classList.add("active-consulta");
            console.log(e.currentTarget)
            // DE AQUI PARA ABAJO SE HACEN LAS CONSULTAS POR EL SUB ELEMENTO DE LA SUBLISTA
            // const prueba = document.createElement("div");
            // prueba.classList.add("elemento");
            // prueba.innerHTML = ""
            // prueba.innerHTML =  `
            // <h2>${e.currentTarget.id}</h2>`
            // console.log(prueba)
            // contenedorElemento.prepend(prueba)
            // contenedorElemento.innerHTML = "";
            // show_all_characters()
        });
    });
}
// ESTA FUNCION HACE LAS SUBCONSULTAS DE LA PAGINA DE LA 1 A LA 4 PARA PODER REALIZAR LAS ADECUADAS, HAY QUE PERSONALIZARLA YA SEA CON UN ARRAY Y SE LE HACE FOREACH O ALGO ASI PARA PODER REALIZARLA AUTOMATICA
function hacerConsultasBarra(array) {
    consultasBarra.innerHTML = ``
    array.forEach((elemento) => {
        consultasBarra.innerHTML += `
        <li>
            <button id="${elemento}" class="boton-menu-consulta boton-categoria-consulta"><span>${elemento}</span></button>
        </li>`
    })
}
//*PERSONAJES**************************************************
async function show_all_characters() {
    console.log("Inicio de la búsqueda de personajes");
    contenedorElemento.innerHTML = "";
    try {
        let data = await get_data(urlSTAR.people);
        var personajes = data.results
        if (personajes) {
            console.log("Personajes obtenidos:", personajes);
        } else {
            console.log("No se encontraron personajes.");
        }
    } catch (error) {
        console.error("Ocurrió un error:", error);
    }
    // AQUI SE DIBUJAN LOS ELEMENTOS CON EL FOR EACH PARA MEJOR SINTAXIS Y PORQUE ESTA MAS CHIMBA MMH
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
                    <p class=""><strong>Genero: </strong>${element.gender}</p>
        `;
        contenedorElemento.append(div);
    })
}
//*peliculas**************************************************
async function show_all_films() {
    var peliculas = [];
    console.log("Inicio de la búsqueda de PELICULAS");
    contenedorElemento.innerHTML = "";
    for (let i = 1; i <= 7; i++) {
        try {
            let data = await get_data(urlSTAR.films + "/" + i + "/");
            peliculas.push(data);
        } catch (error) {
            console.error("Ocurrió un error:", error);
        }
    }
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

    var naves = [];
    console.log("Inicio de la búsqueda de PELICULAS");
    for (let i = 1; i <= 4; i++) {
        try {
            let datos = await get_data(urlSTAR.starships + "/?page=" + i);
            let data = datos.results
            for (let j = 0; j < data.length; j++) {
                let element = data[j];
                naves.push(element)
            }
        } catch (error) {
            console.error("Ocurrió un error:", error);
        }
    }
    console.log(naves)
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
    var especies = [];
    console.log("Inicio de la búsqueda de PELICULAS");
    contenedorElemento.innerHTML = "";
    for (let i = 1; i <= 37; i++) {
        try {
            let data = await get_data(urlSTAR.species + "/" + i + "/");
            especies.push(data);
        } catch (error) {
            console.error("Ocurrió un error:", error);
        }
    }
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

    var vehiculos = [];
    console.log("Inicio de la búsqueda de PELICULAS");
    for (let i = 1; i <= 4; i++) {
        try {
            let datos = await get_data(urlSTAR.vehicles + "/?page=" + i);
            let data = datos.results
            for (let j = 0; j < data.length; j++) {
                let element = data[j];
                vehiculos.push(element)
            }
        } catch (error) {
            console.error("Ocurrió un error:", error);
        }
    }
    console.log(vehiculos)
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
async function show_all_species() {
    var planetas = [];
    console.log("Inicio de la búsqueda de PELICULAS");
    contenedorElemento.innerHTML = "";
    for (let i = 1; i <= 61; i++) {
        try {
            let data = await get_data(urlSTAR.species + "/" + i + "/");
            planetas.push(data);
        } catch (error) {
            console.error("Ocurrió un error:", error);
        }
    }
    if (planetas.length > 0) {
        planetas.forEach((element) => {
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