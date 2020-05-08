/*---------------------------------------------  URLS ------------------------------------------------*/
const urlMovie = 'https://api.themoviedb.org/3/movie/686245?api_key=b702f725c6b50fd4431a004ded241168';

const urlImage ='https://image.tmdb.org/t/p/w500'

/*-----------------------------------------DOM SELECTORS----------------------------------------------------*/

const movieDetailsPageContainer = document.querySelector('#movieDetailsPageContainer');




/*---------------------------------------- FUNCTIONS ---------------------------------------------------*/
//map function for movies details 
function movieElementDetailsSection (movies) {
   return  movie.map((movie) => {
        return `
        <img src=${movie.poster_path}>
        `;
    })
}

//create movie  container for  details of every movie
function createMovieContainer(movies) {
const movieElementDetailsPage = document.createElement('div');
movieElementDetailsPage.setAttribute('class', 'movieElementContainer');

const movieElementDetailsPageTemplate = `
    <section class="section">
${movieElementDetailsSection(movies)}
    </section>
    `;

movieElementDetailsPage.innerHTML = movieElementDetailsPageTemplate;
return movieElementDetailsPage;
console.log(movieElementDetailsPage);
}

/*-----------------------------------------on load----------------------------------------------------*/
window.onload = function() {
    fetch(urlMovie, {
        method:'GET'        
    })
    .then((response) =>  {
        if(!response.ok) {
            throw Error('ERROR')
        } else 
        return response.json()
    })
    .then(movieAPIData => {
        const movies = movieAPIData.results;
        //return block of details
        const movieBlock = createMovieContainer(movies);
        console.log(movieAPIData)
       
    }).catch((error) => {
        console.log('error', error);
        });
}