function initialize()
{
    <!-- Fill the best film -->
    fill_the_best_film();

}

async function fill_the_best_film()
{
    let films =  await get_articles("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");

    var x = document.getElementById("title_the_best_film");
    x.textContent  = films.results[0]["title"];

    var x = document.getElementById("picture_best_film");
    x.onerror=function() { x.src = "indisponible.jpg"; }
    x.setAttribute("src", films.results[0]["image_url"]);
    x.setAttribute("onclick", "open_modal(" + films.results[0]["id"] + ")");
}


const get_articles = async (url) => {
      // Try 
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

