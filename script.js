const contenedorElemento = document.querySelector("#contenedor-elementos")
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const consultasBarra = document.getElementById("barra-consultas");

const urlSTAR = {
    "films": "https://swapi.py4e.com/api/films/",
    "people": "https://swapi.py4e.com/api/people/",
    "planets": "https://swapi.py4e.com/api/planets/",
    "species": "https://swapi.py4e.com/api/species/",
    "starships": "https://swapi.py4e.com/api/starships/",
    "vehicles": "https://swapi.py4e.com/api/vehicles/"
};
//*********************************************************************
async function get_data(url) {
    try {
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
async function busqueda_personajes() {
    console.log("Inicio de la búsqueda de personajes");
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
    personajes.forEach( (element) => {
        const div = document.createElement("div");
        div.classList.add("elemento");
        div.innerHTML = `
                    <h2>${element.name}</h2>
                    <h3>Altura</h3>
                    <p class="Altura">${element.height}</p>
                    <h3>Masa</h3>
                    <p class="Masa">${element.mass}</p>
                    <h3>Color de pelo</h3>
                    <p class="Color_de_pelo">${element.hair_color}</p>
                    <h3>Color de piel</h3>
                    <p class="Color_de_piel">${element.skin_color}</p>
                    <h3>Color de ojos</h3>
                    <p class="Color_de_ojos">${element.eye_color}</p>
                    <h3>Año de nacimiento</h3>
                    <p class="Año_de_nacimiento">${element.birth_year}</p>
                    <h3>Genero</h3>
                    <p class="Genero">${element.gender}</p>
        `;
        contenedorElemento.append(div);
    })
}
busqueda_personajes()
hacerConsultasBarra("peliculas");
agregarEventoConsultas()
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        if (e.currentTarget.id != "peliculas") {
            hacerConsultasBarra(e.currentTarget.id);
            agregarEventoConsultas()
            // AQUI SE MUESTRA LA CONSULTA DE TODOS LOS ELEMENTOS DE ESTE ITEM EN ESPECIFICO MAMAHUEVO
        } else {
                hacerConsultasBarra(e.currentTarget.id);
                agregarEventoConsultas()
                // AQUI TODOS LOS DE PELICULAS DE ESTE ITEM EN ESPECIFICO MMH
            }
        });
    });
    function agregarEventoConsultas () {
        const botonesCategoriasConsulta = document.querySelectorAll(".boton-categoria-consulta");
        botonesCategoriasConsulta.forEach(boton => {
            boton.addEventListener("click", (e) => {
                botonesCategoriasConsulta.forEach(boton => boton.classList.remove("active-consulta"));
                e.currentTarget.classList.add("active-consulta");
                console.log( e.currentTarget)

                // DE AQUI PARA ABAJO SE HACEN LAS CONSULTAS POR EL SUB ELEMENTO DE LA SUBLISTA
                const prueba = document.createElement("div");
                prueba.classList.add("elemento");
                prueba.innerHTML = ""
                prueba.innerHTML =  `
                <h2>${e.currentTarget.id}</h2>`
                console.log(prueba)
                contenedorElemento.prepend(prueba)
            });
    });
    }
// ESTA FUNCION HACE LAS SUBCONSULTAS DE LA PAGINA DE LA 1 A LA 4 PARA PODER REALIZAR LAS ADECUADAS, HAY QUE PERSONALIZARLA YA SEA CON UN ARRAY Y SE LE HACE FOREACH O ALGO ASI PARA PODER REALIZARLA AUTOMATICA
function hacerConsultasBarra (parametro){
    consultasBarra.innerHTML = ``
    for (let i = 1; i < 5; i++) {
        consultasBarra.innerHTML += `
        <li>
            <button id="${parametro + i}" class="boton-menu-consulta boton-categoria-consulta"><span>${parametro + " " + i}</span></button>
        </li>`
    }
}