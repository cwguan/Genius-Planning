var winnerShown;
var totalList;

// Notify the user that leaving the page will reset tournament progress
window.addEventListener('beforeunload', function(e) {
	if(!winnerShown) {
		e.preventDefault();
		e.returnValue = 'Are you want to leave the page? You will lose all progress and the tournament will reset.';
	}
});

$(document).ready(function() {

	totalList =  JSON.parse(sessionStorage.getItem("selectedRestaurants"));
	winnerShown = false;

	$('#topCard').find('.cardTitle').text(totalList[0].name);
	$('#bottomCard').find('.cardTitle').text(totalList[1].name);

	$('#topInfo').html(getInfoText(totalList[0]));
	$('#bottomInfo').html(getInfoText(totalList[1]));

	$('#topCard').find('.mdl-card__title').css("background","url('"+totalList[0].image_url+"') center");
	$('#bottomCard').find('.mdl-card__title').css("background","url('"+totalList[1].image_url+"') center");

	//$('#topCard.mdl-card__title').css("background-size",50+"px " + 70 + "%");
	//$('#topCard.mdl-card__title').css("background-repeat","no-repeat");
})

$("#topButton").click(topButtonClick);
$("#bottomButton").click(bottomButtonClick);

function topButtonClick(event){
	totalList.push(totalList.shift()); //add the first element in html
	totalList.shift();

	if(totalList.length <= 1){
		winnerShown = true;
		showWinner(totalList[0]);
		//$("#topButton").prop("disabled",true);
		$("#topButton").attr('disabled','disabled');
		$("#topButton").children().attr("disabled","disabled");
		$("#topButton").off("click");
		return;
	}

	let top = totalList[0]
	let bottom = totalList[1]

	setCardValue(top, bottom);
}
function bottomButtonClick(event) {

	totalList.shift();
	totalList.push(totalList.shift()); //add the first element in html

	if(totalList.length <= 1){
		winnerShown = true;
		showWinner(totalList[0]);
		//$("#topButton").prop("disabled",true);
		$("#topButton").attr('disabled','disabled');
		$("#topButton").children().attr("disabled","disabled");
		$("#topButton").off("click");
		return;
	}

	let top = totalList[0]
	let bottom = totalList[1]
	setCardValue(top, bottom);
}

/*
function setCardValue(topRestaurantName,bottomRestaurantName,topRestaurantAddress,bottomRestaurantAddress,topRestaurantImagePath,bottomRestaurantImagePath){
	$('#topCard').find('.cardTitle').text(topRestaurantName);
	$('#bottomCard').find('.cardTitle').text(bottomRestaurantName);

	$('#topAddress').text(topRestaurantAddress);
	$('#bottomAddress').text(bottomRestaurantAddress);

	//alert(bottomCardList[indexBottom]);
	$('#topCard').find('.mdl-card__title').css("background","url('"+topRestaurantImagePath+"') center");
	$('#bottomCard').find('.mdl-card__title').css("background","url('"+bottomRestaurantImagePath+"') center");
}
*/

function setCardValue(topRestaurant, bottomRestaurant) {
	//Set card titles to the restaurant name
	$('#topCard').find('.cardTitle').text(topRestaurant.name);
	$('#bottomCard').find('.cardTitle').text(bottomRestaurant.name);
	//Display info like address, rating, price, and phone number
	$('topInfo').html(getInfoText(topRestaurant));
	$('bottomInfo').html(getInfoText(bottomRestaurant));
	//Set background image
	$('#topCard').find('.mdl-card__title').css("background","url('"+topRestaurant.image_url+"') center");
	$('#bottomCard').find('.mdl-card__title').css("background","url('"+bottomRestaurant.image_url+"') center");
}

function getInfoText(restaurant) {
	return `<summary><b>${restaurant.address}</b></summary><br><p><b>Rating:</b> ${restaurant.rating}</p><p><b>Price:</b> ${restaurant.price}</p><b>Phone:</b> ${restaurant.phone}`
}

function showWinner(winner) {
	//alert("in show winner");
	$('.page-content').prepend("<h2>Winner</h2>");
	$('#topCard').find('.cardTitle').text(winner.name);
	$('#topInfo').html(getInfoText(winner));
	$('#topCard').find('.mdl-card__title').css("background","url('"+winner.image_url+"') center");
	$('#bottomHalf').html('<div></div>');
}
