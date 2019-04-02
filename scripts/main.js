
//https://www.rijksmuseum.nl/api/nl/collection?key=UwNxL7iH&format=json&type=schilderij&q=nachtwacht
var url = "http://version1.api.memegenerator.net//Generators_Search";
var apiKey = '6d973a6f-2362-44c4-988e-e4a0b639be54'; 

function getAPI() {

	// construct request
	var request = url + "?apiKey=" +apiKey 
	
	// get data
	fetch(request)	
	
	// parse response to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// do something with response
	.then(function(response) {
		resultApi(response);
	})
	// catch error
	.catch(function (error) {
		console.log('Request failed', error);
	});
}



function resultApi(response){


	//for(var i=0; i< response.length; i++){

	var memeBox = document.getElementById('results');
	var imageUrl = response.result[0].imageUrl;

	Message = '<div class="meme">';
	Message +=   '<img src="'+imageUrl+'">';
	Message += '</div>';

	memeBox.innerHTML = Message;

	memeBox.className = 'hidden'; 
}



function showMeme(){
	var button = document.getElementById('button')
	var memeBox = document.getElementById('results');
	var weatherButton = document.getElementById('weer')
	var back = document.getElementById('back');
	var h1 = document.getElementById('h1');


	h1.className = "h1";



	memeBox.className = "memeBox";
	button.className= "hidden";
	weatherButton.className = 'hidden';
	back.className = 'back';






}



getAPI();


function getAPIdatas() {
	
	var url = "https://api.openweathermap.org/data/2.5/forecast";
	var apiKey ="b0c8dafa512a0134e90df6ece3c2b7a2";
	var city = "the%20Hague";

	// construct request
	var request = url + "?" + "appid=" + apiKey + "&" + "q=" + city;
	
	// get weather forecast
	fetch(request)

	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		console.log(response);
		// render weatherCondition
		onAPISucces(response);
	})
	
	// catch error
	.catch(function (error) {
		// onAPIError();
		console.error('Request failed', error);
	});
}

/**
 * Render weather listing
 */
function onAPISucces(response) {

	var weatherList = response.list;
	var weatherBox = document.getElementById('weather');

	for(var i=0; i< weatherList.length; i++){
		//console.log(weatherList[i].main.temp - 273.15);

		var dateTime = new Date(weatherList[i].dt_txt);
		var date = formDate(dateTime);
		var time = formTime(dateTime);
		var temp = Math.floor(weatherList[i].main.temp - 273.15);
		var iconUrl = 'http://openweathermap.org/img/w/'+weatherList[i].weather[0].icon+'.png';

		forecastMessage =  '<div class="forecastMoment">';
		forecastMessage +=   '<div class="date"> '+date+' </div>';
		forecastMessage +=	 '<div class="time"> '+ time +' </div>';
		forecastMessage +=	 '<div class="temp"> '+temp+'&#176;C </div>';
		forecastMessage +=	 '<div class="icon"> <img src="'+iconUrl+'"> </div>';
		forecastMessage += '</div>';

		weatherBox.innerHTML += forecastMessage;
		weatherBox.className = 'hidden';
	}

	
}

function showRegen() {
		var weatherBox = document.getElementById('weather');
		var weatherButton = document.getElementById('weer');
		var back = document.getElementById('back');

		weatherBox.className = 'weather';
		weatherButton.className = 'hidden';
		button.className= 'hidden';
		back.className = 'back';

	
	}



function back() {
	var weatherBox = document.getElementById('weather');
	var button = document.getElementById('button')
	var memeBox = document.getElementById('results');
	var weatherButton = document.getElementById('weer')
	var back = document.getElementById('back');


	weatherBox.className = 'hidden';
	memeBox.className = 'hidden';
	back.className= 'hidden';
	weatherButton.className = 'weer';
	button.className= 'button';




}


/**
 * Error
 */
function updateUIError() {
	var weatherBox = document.getElementById('weather');
	weatherBox.className = 'hidden'; 
}

/**
 * Format date
 */
function formDate(date) {
	var day = date.getDate();
	var month = date.getMonth() + 1;
	return day +'/'+ month;
}

/**
 * Format time
 */
function formTime(date) {
	var hours = date.getHours();
	if(hours<10){
		hours = '0'+hours;
	}
	var minutes = date.getMinutes();
	if(minutes < 10){
		minutes = '0'+ minutes;
	}
	return hours +':'+ minutes;
}

// init data stream
getAPIdatas();


