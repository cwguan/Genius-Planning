var topCardList;
var bottomCardList;
var restaurantList;
var address;
var indexTop;
var indexBottom;
var imagePath;
var imageNames;
var winnerShown;
$(document).ready(function() {
	winnerShown = false;
	topCardList = ["Olive Garden", "Vallartas", "Vallartas"];
	bottomCardList = ["Chipotle","In-N-Out","Olive Garden"];
	restaurantList = ["Olive Garden", "Vallartas","Chipotle","In-N-Out"];
	address = []
	address["Chipotle"]="Costa Verde Center,San Diego, CA 92109"
	address["In-N-Out"]="2910 Damon Ave, San Diego, CA 92109"
	address["Vallartas"]="4277 Genesee Ave, San Diego, CA 92117"
	address["Olive Garden"]="3215 Sports Arena Blvd, San Diego, CA 92110"

	imageNames = []
	imageNames["Chipotle"]="chipotle.jpg"
	imageNames["In-N-Out"]="in-n-out.png"
	imageNames["Vallartas"]="vallartas.png"
	imageNames["Olive Garden"]="olive-garden.jpg"

	imagePath = "./img/sample/"
	indexTop = 0;
	indexBottom = 1; //HERE CHANGED WILL CAUSE ISSUE WITH OLD IMPLEMENTATION

	$('#topCard').find('.cardTitle').text(restaurantList[0]);
	$('#bottomCard').find('.cardTitle').text(restaurantList[1]);

	$('#topAddress').text(address[restaurantList[0]]);
	$('#bottomAddress').text(address[restaurantList[1]]);

	$('#topCard').find('.mdl-card__title').css("background","url('"+imagePath+imageNames[restaurantList[0]]+"') center");
	$('#bottomCard').find('.mdl-card__title').css("background","url('"+imagePath+imageNames[restaurantList[1]]+"') center");
	//$('#topCard.mdl-card__title').css("background-size",50+"px " + 70 + "%");
	//$('#topCard.mdl-card__title').css("background-repeat","no-repeat");
})

$("#topButton").click(topButtonClick);
$("#bottomButton").click(bottomButtonClick);

function topButtonClick(event){
	restaurantList.push(restaurantList.shift()); //add the first element in html
	restaurantList.shift();

	if(restaurantList.length <= 1){
		winnerShown = true;
		showWinner(restaurantList[0]);
		//$("#topButton").prop("disabled",true);
		$("#topButton").attr('disabled','disabled');
		$("#topButton").children().attr("disabled","disabled");
		$("#topButton").off("click");
		return;
	}

	let top = restaurantList[0]
	let bottom = restaurantList[1]

	setCardValue(top,bottom,address[top],address[bottom],imagePath + imageNames[top],imagePath + imageNames[bottom]);
}
function bottomButtonClick(event) {

	restaurantList.shift();
	restaurantList.push(restaurantList.shift()); //add the first element in html

	if(restaurantList.length <= 1){
		winnerShown = true;
		showWinner(restaurantList[0]);
		//$("#topButton").prop("disabled",true);
		$("#topButton").attr('disabled','disabled');
		$("#topButton").children().attr("disabled","disabled");
		$("#topButton").off("click");
		return;
	}

	let top = restaurantList[0]
	let bottom = restaurantList[1]
	setCardValue(top,bottom,address[top],address[bottom],imagePath + imageNames[top],imagePath + imageNames[bottom]);
}

function setCardValue(topRestaurantName,bottomRestaurantName,topRestaurantAddress,bottomRestaurantAddress,topRestaurantImagePath,bottomRestaurantImagePath){
	$('#topCard').find('.cardTitle').text(topRestaurantName);
	$('#bottomCard').find('.cardTitle').text(bottomRestaurantName);

	$('#topAddress').text(topRestaurantAddress);
	$('#bottomAddress').text(bottomRestaurantAddress);

	//alert(bottomCardList[indexBottom]);
	$('#topCard').find('.mdl-card__title').css("background","url('"+topRestaurantImagePath+"') center");
	$('#bottomCard').find('.mdl-card__title').css("background","url('"+bottomRestaurantImagePath+"') center");
}

function showWinner(winnerName) {
	//alert("in show winner");
	$('.page-content').prepend("<h2>Winner</h2>");
	$('#topCard').find('.mdl-card__title').css("background","url('"+imagePath+imageNames[winnerName]+"') center");
	$('#bottomHalf').html('<div></div>');
}