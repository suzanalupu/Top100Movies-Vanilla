/* API */

const API_KEY = 'b702f725c6b50fd4431a004ded241168';
const urlSearch = 'https://api.themoviedb.org/3/search/movie?api_key=b702f725c6b50fd4431a004ded241168';
const urlUpcoming = 'https://api.themoviedb.org/3/movie/upcoming?api_key=b702f725c6b50fd4431a004ded241168&region=US';
const urlImage ='https://image.tmdb.org/t/p/w500'
const selectGenreCategory ='https://api.themoviedb.org/3/discover/movie?api_key=b702f725c6b50fd4431a004ded241168&with_genres='
const moviesAllGenreList='https://api.themoviedb.org/3/genre/movie/list?api_key=b702f725c6b50fd4431a004ded241168';
const urlTopRatedMovies ='https://api.themoviedb.org/3/movie/top_rated?api_key=b702f725c6b50fd4431a004ded241168';
const urlGetDetails = 'https://api.themoviedb.org/3/movie/640344?api_key=b702f725c6b50fd4431a004ded241168';


/* ----------------------------------------------CREATE SPECIFIC URL FUNCTION ---------------------------------------------*/

//  let idsArray;
//  let dynamicUrl;
// fetch(urlTopRatedMovies, {
//     method: 'GET'
// }).then((response) => {
//     if (!response.ok) {
//         throw Error("ERROR!")
//     } else 
//     return response.json()
// }).then((movieIdUrl) => {
//     dynamicUrl = movieIdUrl.results.map((url) => {
//         for(i=0; i<movieIdUrl.results.length; i++)  {
//         idsArray =movieIdUrl.results[i].id;

//         console.log("aici " + idsArray);
//    // return  `https://api.themoviedb.org/3/movie/${idsArray}?api_key=b702f725c6b50fd4431a004ded241168`; 
// }
// })
// })
/* ---------------------------------------------- HERO MOVIES---------------------------------------------*/
function getUpcomingMovies() {
    fetch(urlUpcoming, {
        method: 'GET'
    }).then((response) => {
        if (!response.ok) {
            throw Error("ERROR!")
        } else 
        return response.json() 
    }).then((upcomingMovies) => {
        // console.log(upcomingMovies.results)
         let sliceArray = upcomingMovies.results.slice(1,5);
         console.log(sliceArray)
        let movieNewArray = sliceArray.map((movie) => {
            return  `
            <section class="upcomingMovieElement">
                <img src=${urlImage + movie.poster_path}><br/>
                <section class="upcomingDetails">
                    <span class="heroReleaseDate">${movie.release_date}</span>
                    <h2 class="heroMovieTile">${movie.title}</h2>
                    
                </section>
            </section>
            `;
        }).join('')
        document.querySelector('#upcomingMovies').innerHTML = movieNewArray;
console.log(movieNewArray);

    }).catch(error => console.log(error))
}



/* ----------------------------------------------------SEARCH BOX FUNCTIONAITY ----------------------------------------------------*/

const searchButton = document.querySelector('#searchButton');
const searchInput = document.querySelector('#searchText');

function createMovieContainer() {
const  top100MoviesContainer = document.createElement('div');
top100MoviesContainer.setAttribute('class', 'top100MoviesContainer')
top100MoviesContainer.setAttribute('id', 'top100MoviesContainer');

const  movieElement = document.createElement('div');
movieElement.setAttribute('class', 'movieElement')
movieElement.setAttribute('id', 'topRatedSingleMovi');

const singleMovieElement = `<section class="movieCover movieElementImg">
                <img class="movieCoverImage" src=${urlImage + topRatedMovie.poster_path}>
                </section>
                <section class="movieDetails movieElementDetails">
                <h2 class="movieTitle">${topRatedMovie.title}<span class="movieYearRelease"> (${topRatedMovie.release_date.slice(0,4)})</span></h2>
                </section>`;

}

searchButton.onclick = function(event) {
    event.preventDefault();
    const value = searchInput.value;
    const newUrl = urlSearch + '&query=' + value;


    fetch(newUrl)
    .then((response) => response.json())
    .then((data) => {
        //data.results[];
        console.log('Data: ', data);
    })
    .catch((err) => {
        console.log('Error: ' + err)
    });
    console.log('Value: ' + searchInput);
}

/* --------------------------------------------------- TOP VARIANTA 2----------------------------------------------------*/

function getTopRatedMovies(path) {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=b702f725c6b50fd4431a004ded241168&page=${path}`;
    fetch(url, {
    method: 'GET' 
}).then((response) => {
    if (!response.ok) {
                throw Error("ERROR!")
           } else 
            return response.json() 
        }).then((topRatedMovies) => {
            console.log(topRatedMovies.results);
            const top100Movies = topRatedMovies.results.map((topRatedMovie) => {
                return `
                <section class="movieCover movieElementImg">
                    <img class="movieCoverImage" src=${urlImage + topRatedMovie.poster_path}>
                </section>
                <section class="movieDetails movieElementDetails">
                    <h2 class="movieTitle">${topRatedMovie.title}<span class="movieYearRelease"> (${topRatedMovie.release_date.slice(0,4)})</span></h2>
                    <p class="movieRating"><span class="star">&#9733;</span>${topRatedMovie.vote_average}<span class="ten">/10</span></p>
                    <p class="movieDescription">${topRatedMovie.overview}</p>
                    <hr>
                    <p class="movieTime">Runtime: ${topRatedMovie.rutime} min &nbsp;</p>
                    <p class="movieDirector">Director: x name</p>
                    <p class="movieStars">Stars: x name</p>
                </section>
            `;
            })
            document.querySelector('#topRatedSingleMovie').innerHTML = top100Movies;
            console.log(top100Movies);
  

        }).catch(error => console.log("ERROR"))
    }

// getTopRatedMovies(2);
// getTopRatedMovies(3);
// getTopRatedMovies(4);
// getTopRatedMovies(5);


/* ---------------------------------------------------  PRELUARE GENURI ----------------------------------------------------*/
function genreSpan(genres) {
   return   genres.map((genre) => {
        return `
            <span class="labelGenre genre">${genre.name} 
            </span>`;
         })
}

function genresContainer(genres) {
    var searchGenresSelector = document.querySelector('#searchByGenre');
    const genresTemplate = `
    <h2> Search by genre </h2>
    <hr>
    ${genreSpan(genres)}
    `
    searchGenresSelector.innerHTML =genresTemplate;
    return searchGenresSelector;    
}
/*-------------------------------------------------- dom selector ------------------------------*/
const moviesSection = document.querySelector('#topRatedSingleMovie');
const imgElement = document.querySelector('img');

/*----------------------------------------------------------on load-------------------------------------------------------------------------*/
window.onload = function() {
  this.getUpcomingMovies();
  this.getTopRatedMovies(1);
  
/* fetch for genres */
fetch(moviesAllGenreList, {
    method:'GET'        
})
.then((response) =>  {
    if(!response.ok) {
        throw Error('ERROR')
    } else 
    return response.json()
})
.then(data => {
    console.log(data)
    const genres = data.genres;
    const genreBlock = genresContainer(genres);
    console.log(genres);
}).catch((error) => {
    console.log('error', error);
    });


/* create a function with a new array to store the ids of movies in order to create url for details page*/
    function getIds(ids) {
        for (let i= 0; i<ids.length; i++) {
          console.log(ids[i].id);
      }
      return  ids.map((id) => {
          return id;
      })
  }
    /* get all ids from top rated */
    fetch(urlTopRatedMovies, {
        method: 'GET'
    })
    .then(response => {
        if(!response.ok) {
            throw Error('Error')
        } else
        return response.json()
    })
    .then(data => {
        const ids=data.results;
        const movieIdsList = getIds(ids);
        console.log(movieIdsList);
        
    }).catch((error) => {
        console.log('error', error);
    });

/* function to open the detail page */
function openPage() {
    window.open('details.html');
}

    //EVENT DELEGATION --> when you click on your target something will happen
    //what happen if you click on a image? -NOTHINGGGG 
    document.onclick = function(event) {
        const target = event.target;
        //when u click your target-your img then
        if(target.tagName.toLowerCase() === 'img'){
        openPage();                
        }
  
    }

}

