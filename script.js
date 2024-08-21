
const urlSTAR = "https://swapi.py4e.com/api/people/";


async function theHouses(urlSTAR) {
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

theHouses(urlSTAR)
