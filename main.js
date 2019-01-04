
// GET SEARCH QUERY
var searchForm = document.getElementById('searchForm');
var inputValue = document.getElementById('searchText');
searchForm.addEventListener('submit', function(e){
	var searchText = inputValue.value;
	getMovies(searchText);
	e.preventDefault();
});

// FETCH JSON WITH SEARCH QUERY VALUE
function getMovies(searchText){
	var movieUrl = 'https://www.omdbapi.com/?s='+searchText+'&apikey=560f6744';
	var xhr = new XMLHttpRequest();
	xhr.open('GET', movieUrl, true);
	xhr.onload = function(){
		if(this.status == 200){
			var movieData  = this.responseText;
			var getData = JSON.parse(movieData);
			var result = document.getElementById('movies');
			var output = document.createElement('div');
			output.className = 'row';
			getData.Search.forEach(function(movie, index){
				output.innerHTML += `
				<div class="col-md-3 mb-7">
				<div class="well text-center">
				<img src="${movie.Poster}">
				<h5 class="mt-3">${movie.Title}</h5>
				<a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
				</div>
				</div>
				`;
				result.append(output);
			});
		}
	}
	xhr.send();
}

// SET MOVIE ID IN SESSION STORAGE
function movieSelected(id){
	sessionStorage.setItem('movieId', id);
	window.location = 'movie.html';
	return false;
}
