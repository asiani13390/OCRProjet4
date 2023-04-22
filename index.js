function initialize()
{
    // Fill the best film
    fill_the_best_film();
}


async function fill_the_best_film()
{
    let films =  await get_articles("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");

    let title_the_best_film = document.getElementById("title_the_best_film");
    title_the_best_film.textContent  = films.results[0]["title"];

    let picture_best_film = document.getElementById("picture_best_film");
    picture_best_film.onerror = function() { picture_best_film.src = "indisponible.jpg"; }
    picture_best_film.setAttribute("src", films.results[0]["image_url"]);
    picture_best_film.setAttribute("onclick", "open_modal(" + films.results[0]["id"] + ")");
}


const get_articles = async (url) => {
        try {
            // Calls the API url, parses to JSON, returns
            let callJson = await fetch(url);
            let loadJson = await callJson.json();   
            return loadJson;
        
        // Error
        } catch(error) {
            return error;
        }
}