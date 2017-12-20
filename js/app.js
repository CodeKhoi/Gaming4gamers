$(document).ready(function() {
	$('#searchPanel').hide();
	$('#searchContent').hide();
	rankingLists.ranking2017();	

$('#submit').on('click', function(event) {
    event.preventDefault(); //stop refresh of page
    $('#carousel-example-generic').hide();
    $('#carousel').hide();
    $('#gameStats').hide();
    $('#tableStats').hide();
    $('#contentHeader').empty();
    $('#contentHeader').html("<h1>Search Results</h1>");
	$('#searchContent').empty(); //clear div of old content.
	$('#searchPanel').show();
	$('#searchContent').show();
	searchOptions = $('#userInput').val().trim();
	console.log(searchOptions);
	$.ajax({
	    url: 'http://localhost:3000/search',
	    data: {search: searchOptions},
	}).done(function(data) {
	    var searchResult = $('<div>');
	    for (var i in data) {
          			
                    var searchReturn = $('<p>');
                    //genre, aggregated rating, preview, name
                    searchReturn.html('Title: ' + data[i].name + '<br/>' +
                                      'Genre: ' + data[i].genres + '<br/>' +
                    				  'Rating: ' + data[i].aggregated_rating.toFixed(2) + '<br/>' +
                    				  'Summary: ' + data[i].summary + '<br/>' +
                    				  'More info: ' + data[i].url + '<br/>' + '<hr>');


                    searchResult.append(searchReturn);
          	}
        $('#searchContent').append(searchResult);
	    console.log(data);
	});

});
});

var gameData = {};
var searchOptions = "";

//following object deaks with the ranking charts
var rankingLists = {

	ranking2017: function() {
		$.ajax({
		    url: 'http://localhost:3000/'
		    // data: {search: searchOptions},
		}).done(function(data) {
		    // console.log('data', data);
		    console.log(data);
		    
		    for (var i in data) {

		    	//variables for rank list
      			var searchResult = $('<tr>');
                var searchReturn = $('<td>');
                var searchReturn2 = $('<td>');
                var searchReturn3 = $('<td>');
                var searchReturn4 = $('<td>');
                var releaseDate = new Date(data[i].first_release_date);
                var month = ' ' +(releaseDate.getMonth() + 1);
                var day =  ' ' + releaseDate.getDate();
                var year = releaseDate.getFullYear();

                //variables for carousel
                var videoDiv = $('<div>');
                var videoLink = $('<iframe>');
                var videoExt = "";
                var videoSummary = "";

                //adds 0 to front of date for formating purposes
                if (day < 10) {
                	day = 0 + day;
                }

                if (month < 10) {
                	month = 0 + month;
                }
                var newDateFormat = [year, month, day].join('-');


                //populates table
                searchReturn.html(data[i].aggregated_rating.toFixed(2));
                searchReturn4.html(data[i].total_rating.toFixed(2));
                searchReturn2.html(data[i].name);
                searchReturn3.html(newDateFormat);
                 // + '<br/>' + 'Rating: ' + data[i].total_rating + '<br/>');
                				  // '<img src=' + data.i.images.downsized_still.url);
                
                searchResult.append(searchReturn2);
                searchResult.append(searchReturn);
                searchResult.append(searchReturn4);
                searchResult.append(searchReturn3);
                
                $('#ranking').append(searchResult);
                console.log("next to videos");


                //=====populates carousel

                //checks to see if there is a video
                if ('videos' in data[i]) {
                	console.log(data[i]);
                	videoExt = data[i].videos[0].video_id;

	                if (i == 0) {
	                	videoDiv.attr('class', 'item active');
	                }
	                else {
	                	videoDiv.attr('class', 'item');
	                }
	                videoLink.attr('width', '720px');
	                videoLink.attr('height', '400px');
	                videoLink.attr('src', 'https://www.youtube.com/embed/'+ videoExt);
                    videoSummary = "<h2>" + data[i].name + "</h2>" + "</br>"
                                + "Summary: " + data[i].summary; 

	                videoDiv.append(videoLink);
                    videoDiv.append(videoSummary);
                    console.log(data[i].summary);

	                $('#carousel').prepend(videoDiv);

		          	}
		          }
	        
		    console.log(data);
		});
	}
};

//below function handles Enter keystroke






//this is a comment

// $(document).ready(function() {

// 	$('#searchContent').hide();

// 	$('#submitUserData').on('click', function(event){
// 		$('#searchContent').empty(); //clear div of old content.
// 	    event.preventDefault(); //stop refresh of page
// 	    search = $('#userInput').val().trim();
// 	    // var searchReturn = '<p>' + search + '</p>';
// 	    $('#searchContent').slideDown(500);
// 	    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&limit=1" +"&api_key=dc6zaTOxFJmzC";//The API Key.
//      	$.ajax({url: queryURL, method: 'GET'})
//           .done(function(response) {
//           	for (var i = 0; i < response.data.length; i++) {
//           			var searchResult = $('<div>');
//                     var searchReturn = $('<p>');
//                     searchReturn.html('Title: ' + response.data[i].title + '<br/>' +
//                     				  'Rating: ' + response.data[i].rating + '<br/>' +
//                     				  '<img src=' + response.data[i].images.downsized_still.url);
//                     searchResult.append(searchReturn);
//           	}
//           	$('#searchContent').append(searchResult);
//           });
//     });
// }); 