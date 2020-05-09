/*---------------------------------------------  URLS ------------------------------------------------*/
const urlMovieDetails = 'https://api.themoviedb.org/3/movie/19404?api_key=b702f725c6b50fd4431a004ded241168';
const urlMovieCast = 'https://api.themoviedb.org/3/movie/19404/credits?api_key=b702f725c6b50fd4431a004ded241168';
const urlMovieVideo = 'https://api.themoviedb.org/3/movie/19404/videos?api_key=b702f725c6b50fd4431a004ded241168';
const urlImage ='https://image.tmdb.org/t/p/w500';



function movieDetailsContainer(data) {
    const movieElementContainer = document.querySelector('#movieElementContainer');
    const movieHeroDetailsTemplate = ` 
    <div class="heroMovieDetails">
    <section class="heroMovieDetails1">
    <img class="heroMovieDetailsImage" src=${urlImage + data.poster_path}>
    </section>
    <div class="heroMovieDetails2">
    <h1 class="movieTitleDetails">${data.title}<span class="movieYearRelease">(${data.release_date.slice(0,4)})</span></h1>
    <div class="smallDetails">
        <p class="movieRating"><span class="star">&#9733;</span>${data.vote_average}<span class="ten">/10</span> &nbsp;
        &bull;&nbsp;
        <span>Runtime: ${data.runtime} min</span>&nbsp;&bull;&nbsp;
        <span>Genre(s):${data.genres.map((genre) => {
            return `${genre.name}`
        })}</span>
        </p>
    </div>
    
    <section class="overviewDetails">
    <h2> Overview </h2>
    <p class="movieDetailsOverview">${data.overview}</p>
    </section>
    <section class="director">
    <h3 class="JobTitle"> Director: <span class="directorName">Director Name</span></h3>
    </section>
    </div>
    </div>
    `;
    movieElementContainer.innerHTML = movieHeroDetailsTemplate;
    return movieElementContainer;
}

/*-----------------------------------------on load----------------------------------------------------*/
window.onload = function() {

        fetch(urlMovieDetails, {
            method: 'GET'
        }).then((response) => {
            if (!response.ok) {
                throw Error("ERROR!")
            } else 
            return response.json()            
        })
        .then((data) => {
            const details = movieDetailsContainer(data);
        })
        .catch(error => console.log(error))

}
