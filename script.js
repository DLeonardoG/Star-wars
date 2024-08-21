
const urlSTAR = {
    "films": "https://swapi.py4e.com/api/films/",
    "people": "https://swapi.py4e.com/api/people/",
    "planets": "https://swapi.py4e.com/api/planets/",
    "species": "https://swapi.py4e.com/api/species/",
    "starships": "https://swapi.py4e.com/api/starships/",
    "vehicles": "https://swapi.py4e.com/api/vehicles/"
};

// personajes
async function people(url) {
    try {
        const res = await fetch(urlSTAR);
        if (res.ok) {
            var stars = await res.json();
            try {
                await (function(){
                    let i = 1
                    console.log(stars)
                })()
            } catch (error) {
                console.error("Upsss " + error);
            }

        }
    } catch (error) {
        console.error("error" + error);
    }
}

// films
async function films(url) {
    try {
        const res = await fetch(urlSTAR);
        if (res.ok) {
            var stars = await res.json();
            try {
                await (function(){
                    let i = 1
                    console.log(stars)
                })()
            } catch (error) {
                console.error("Upsss " + error);
            }

        }
    } catch (error) {
        console.error("error" + error);
    }
}

// planets
async function planets(url) {
    try {
        const res = await fetch(urlSTAR);
        if (res.ok) {
            var stars = await res.json();
            try {
                await (function(){
                    let i = 1
                    console.log(stars)
                })()
            } catch (error) {
                console.error("Upsss " + error);
            }

        }
    } catch (error) {
        console.error("error" + error);
    }
}

// species
async function species(url) {
    try {
        const res = await fetch(urlSTAR);
        if (res.ok) {
            var stars = await res.json();
            try {
                await (function(){
                    let i = 1
                    console.log(stars)
                })()
            } catch (error) {
                console.error("Upsss " + error);
            }

        }
    } catch (error) {
        console.error("error" + error);
    }
}

// starships
async function starships(url) {
    try {
        const res = await fetch(urlSTAR);
        if (res.ok) {
            var stars = await res.json();
            try {
                await (function(){
                    let i = 1
                    console.log(stars)
                })()
            } catch (error) {
                console.error("Upsss " + error);
            }

        }
    } catch (error) {
        console.error("error" + error);
    }
}

// vehicles
async function vehicles(url) {
    try {
        const res = await fetch(urlSTAR);
        if (res.ok) {
            var stars = await res.json();
            try {
                await (function(){
                    let i = 1
                    console.log(stars)
                })()
            } catch (error) {
                console.error("Upsss " + error);
            }

        }
    } catch (error) {
        console.error("error" + error);
    }
}

people(urlSTAR.people)

films(urlSTAR.films)

planets(urlSTAR.planets)

species(urlSTAR.species)

starships(urlSTAR.starships)

vehicles(urlSTAR.vehicles)
