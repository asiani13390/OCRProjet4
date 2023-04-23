function initialize()
{
    // Position index for each carousel
    position_index_for_carousel = [0,0,0,0];

    // Quantity of photos to add in each container
    number_of_photos_by_container = [7,7,7,7]

    // Width of each photo
    photo_width = 182;

    // Categories to display
    categories = ["Action","Drama","Adventure"]

    // Fill the best film
    fill_the_best_film(); 

    // Add photos to containers
    Container_id = 0;
    Url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
    addPhotosToContainer(Container_id, Url);

    Container_id = 1;
    Url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=" + categories[0];
    document.getElementById("category1").textContent = categories[0];
    addPhotosToContainer(Container_id, Url);

    Container_id = 2;
    Url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=" + categories[1];
    document.getElementById("category2").textContent = categories[1];
    addPhotosToContainer(Container_id, Url);

    Container_id = 3;
    Url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=" + categories[2];
    document.getElementById("category3").textContent = categories[2];
    addPhotosToContainer(Container_id, Url);

    // Manage modal window

    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks on X, close the modal
    span.onclick = function() 
    {
        modal.style.display = "none";
    }
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


async function addPhotosToContainer(container_id, url)
{
    current_page = 0;
    maximum_element_for_the_container = number_of_photos_by_container[container_id];

    let container = document.getElementById("container" + container_id);
    
    number_of_photos_by_container[container_id] = 0;

    while (number_of_photos_by_container[container_id] < maximum_element_for_the_container)
    {
        current_page +=1;
        url_api = url +"&page=" + current_page;

        let data_from_api =  await get_articles(url_api);
        
        i=0;
        
        while (i < data_from_api.results.length && number_of_photos_by_container[container_id] < maximum_element_for_the_container)
        {
            let image = document.createElement("img");
            image.onerror=function() { image.src = "indisponible.jpg"; }
            image.src = data_from_api.results[i]["image_url"];
            image.setAttribute("class","photos"); 
            image.setAttribute("title", data_from_api.results[i]["title"]); 
            image.setAttribute("onclick", "open_modal(" + data_from_api.results[i]["id"] + ")");

            container.appendChild(image);
            
            i+=1;
            number_of_photos_by_container[container_id] +=1;   
        }   
    }
}

function right_shift(container_id)
{
    position = position_index_for_carousel[container_id];

    if (Math.abs(position) < number_of_photos_by_container[container_id]-1)
    {
        position--;
    }

    container = document.getElementById("container"+container_id);

    container.style.transform="translate(" + photo_width*position + "px)";

    position_index_for_carousel[container_id] = position;
}

function left_shift(container_id)
{
    position = position_index_for_carousel[container_id];

    if (position < 0 )
    {
        position++;
    }

    container = document.getElementById("container" + container_id);    

    container.style.transform="translate(" + photo_width*position + "px)";

    position_index_for_carousel[container_id] = position;
}

function open_modal(article_id) {
    get_data_of_modal(article_id);
    let modal = document.getElementsByClassName("modal")[0];
    modal.style.display = "block";
}

async function get_data_of_modal(article_id)
{
  url_api = "http://localhost:8000/api/v1/titles/" + article_id;
  let data_from_api =  await get_articles(url_api);

  let modal_image_url = document.getElementById("modal_image_url");
  modal_image_url.onerror=function() { modal_image_url.src = "indisponible.jpg"; }
  modal_image_url.setAttribute("src", data_from_api.image_url);

  let modal_title = document.getElementById("modal_title");
  modal_title.textContent = data_from_api.title;

  let modal_genres = document.getElementById("modal_genres");
  modal_genres.textContent = data_from_api.genres;

  let modal_published_date = document.getElementById("modal_published_date");
  modal_published_date.textContent = data_from_api.date_published;

  let modal_rated = document.getElementById("modal_rated");
  modal_rated.textContent = data_from_api.rated;
  
  let modal_imdb_score = document.getElementById("modal_imdb_score");
  modal_imdb_score.textContent = data_from_api.imdb_score;

  let modal_directors = document.getElementById("modal_directors");
  modal_directors.textContent = data_from_api.directors;
  
  let modal_actors = document.getElementById("modal_actors");
  modal_actors.textContent = data_from_api.actors;

  let modal_duration = document.getElementById("modal_duration");
  modal_duration.textContent = data_from_api.duration;

  let modal_countries = document.getElementById("modal_countries");
  modal_countries.textContent = data_from_api.countries;

  let modal_votes = document.getElementById("modal_votes");
  modal_votes.textContent = data_from_api.votes;

  let modal_long_description = document.getElementById("modal_long_description");
  modal_long_description.textContent = data_from_api.long_description;
}