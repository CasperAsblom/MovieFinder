angular.module('KRRclass', [ 'chart.js']).controller('MainCtrl', ['$scope','$http', mainCtrl]);


function mainCtrl($scope, $http){


	$scope.startMyAwesomeApp = function(){

		var decade = document.getElementById("decade");
		var chosenDecade = decade.options[decade.selectedIndex].text;
	
		var genre = document.getElementById("genre");
		var chosenGenre = genre.options[genre.selectedIndex].text;
	
		var length = document.getElementById("length");
		var chosenLength = length.options[length.selectedIndex].text;
	
		var country = document.getElementById("country");
		var chosenCountry = country.options[country.selectedIndex].text;

		if (chosenDecade == "Choose decade here" || chosenGenre == "Choose genre here" || chosenLength == "Choose runtime here" || chosenCountry == "Choose country here"){
			alert('Please provide all values!')
		} else {
			var mySparqlQuery = encodeURI('PREFIX mo: <http://www.movieontology.org/2009/10/01/movieontology.owl#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX fp: <http://example.com/FinalProject/> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> SELECT ?title ?plot ?genre ?releaseYear ?runtime ?countryLabel ?metascore ?imdbRating ?imdbID WHERE { ?movie rdf:type mo:Movie ; rdf:type fp:' + chosenDecade + 'Movie ; rdf:type fp:' + chosenLength + 'Movie ; fp:hasGenre ?genre ; mo:hasTitle ?title ; fp:hasPlot ?plot ; fp:hasGenre ?genre ; mo:hasRuntime ?runtime ; fp:hasReleaseYear ?releaseYear ; mo:hasReleasingCountry ?country ; fp:hasIMDbID ?imdbID ; mo:hasIMDbRating ?imdbRating ; fp:hasMetascore ?metascore . ?country rdfs:label ?countryLabel . FILTER(CONTAINS(STR(?genre), "' + chosenGenre + '")) FILTER(CONTAINS(STR(?country), "' + chosenCountry + '")) } ').replace(/#/g, '%23');

		}
		

		$http( {
			method: "GET",
			url : "http://localhost:7200/repositories/Project?infer=true&query=" + mySparqlQuery,
			headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'}
		} )
		.success(function(response, status ) {

			var stringed = JSON.stringify(response)
			var results = JSON.parse(stringed)


			if (results.results.bindings.length == 0) {
				document.getElementById('myTable').innerHTML = '<div class="container"><h1 class="col">0 Results</h1></div>';
			}
			else {

			var table = '<table id=tableTable class="sortable col"><th>Title</th><th class="sorttable_nosort">Plot</th><th class="sorttable_nosort">Genre</th><th>Year</th><th>Runtime</th><th class="sorttable_nosort">Country</th><th>Metascore</th><th>IMDb Score</th><th class="sorttable_nosort">IMDb Page</th>';
			results.results.bindings.forEach(function (result){
				table += '<tr class="item"><td>' + result.title.value + '</td><td>' + result.plot.value
					+ '</td><td>' + result.genre.value + '</td><td>' + result.releaseYear.value 
					+ '</td><td>' + result.runtime.value + '</td><td>' + result.countryLabel.value 
					+ '</td><td>' + result.metascore.value + '</td><td>' + result.imdbRating.value
					+ '</td><td>' + '<a href="http://imdb.com/title/' + result.imdbID.value + '" target="_blank"><img src="https://i7.uihere.com/icons/723/894/461/imdb-movie-social-icon-12c312be5f2507eebf9ed784934db196.png"></a>' + '</td></tr>';
			})
			table += '</table>';
			document.getElementById('myTable').innerHTML = table;
			sorttable.makeSortable(document.getElementById('tableTable'));
		}
		})
		.error(function(error ){
			console.log('Error running the input query!'+error);
		});

	};

}

