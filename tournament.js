var winnerShown;
var totalList;
var index;
var totalLength;
var restaurantLeft;
var progressNum;
var numRounds;
// Notify the user that leaving the page will reset tournament progress
window.addEventListener('beforeunload', function(e) {
	if(!winnerShown) {
		e.preventDefault();
		e.returnValue = 'Are you want to leave the page? You will lose all progress and the tournament will reset.';
	}
});


$(document).ready(function() {
	//$('#carouselExampleControls').carousel({});

	totalList =  JSON.parse(sessionStorage.getItem("selectedRestaurants"));
	progressNum = totalList.length*1.0-1;
	numRounds = 0;
	winnerShown = false;
	$('#topCard').find('.cardTitle').text(totalList[0].name);
	$('#bottomCard').find('.cardTitle').text(totalList[1].name);

	$('#topInfo').html(getInfoText(totalList[0]));
	$('#bottomInfo').html(getInfoText(totalList[1]));

	$('#topCard').find('.mdl-card__title').css("background","url('"+totalList[0].image_url+"') center");
	$('#bottomCard').find('.mdl-card__title').css("background","url('"+totalList[1].image_url+"') center");
	updateUpNextCard();
})

$("#topChooseBtn").click(topChooseBtnClick);
$("#bottomChooseBtn").click(bottomChooseBtnClick);
$("#topConfirmBtn").click(topConfirmBtnClick);
$("#bottomConfirmBtn").click(bottomConfirmBtnClick);

// The following two functions display corresponding confirm buttons & hides the other
function topChooseBtnClick() {
	$("#topConfirmBtn").css("display", "inline");
	$("#bottomConfirmBtn").css("display", "none");

	$("#topCard").addClass("chosen");
	$("#topCard").removeClass("notchosen");
	$("#bottomCard").addClass("notchosen");
	$("#bottomCard").removeClass("chosen");
}


function bottomChooseBtnClick() {
	$("#bottomConfirmBtn").css("display", "inline");
	$("#topConfirmBtn").css("display", "none");

	$("#topCard").addClass("notchosen");
	$("#topCard").removeClass("chosen");
	$("#bottomCard").addClass("chosen");
	$("#bottomCard").removeClass("notchosen");
}


function topConfirmBtnClick(event){
	totalList.push(totalList.shift()); //add the first element in html
	totalList.shift();

	// Update progress bar
	numRounds++;
	document.querySelector('#p1').MaterialProgress.setProgress((numRounds/progressNum)*100.0);

	// Hide confirm button for following round
	$("#topConfirmBtn").css("display", "none");

	if(totalList.length <= 1){
		winnerShown = true;
		showWinner(totalList[0]);
		$("#topChooseBtn").attr('disabled','disabled');
		$("#topChooseBtn").children().attr("disabled","disabled");
		$("#topChooseBtn").off("click");
		return;
	}

	let top = totalList[0]
	let bottom = totalList[1]
	setCardValue(top, bottom);
	updateUpNextCard();
	clearchosenTint();
}


function bottomConfirmBtnClick(event) {

	totalList.shift();
	totalList.push(totalList.shift()); //add the first element in html

	// Update progress bar
	numRounds++;
	document.querySelector('#p1').MaterialProgress.setProgress((numRounds/progressNum)*100.0);

	// Hide confirm button for following round
	$("#bottomConfirmBtn").css("display", "none");


	if(totalList.length <= 1){
		winnerShown = true;
		showWinner(totalList[0]);
		$("#topChooseBtn").attr('disabled','disabled');
		$("#topChooseBtn").children().attr("disabled","disabled");
		$("#topChooseBtn").off("click");
		return;
	}

	let top = totalList[0]
	let bottom = totalList[1]
	setCardValue(top, bottom);
	updateUpNextCard();
	clearchosenTint();
}


function setCardValue(topRestaurant, bottomRestaurant) {
	//Set card titles to the restaurant name
	$('#topCard').find('.cardTitle').text(topRestaurant.name);
	$('#bottomCard').find('.cardTitle').text(bottomRestaurant.name);
	//Display info like address, rating, price, and phone number
	$('#topInfo').html(getInfoText(topRestaurant));
	$('#bottomInfo').html(getInfoText(bottomRestaurant));
	//Set background image
	$('#topCard').find('.mdl-card__title').css("background","url('"+topRestaurant.image_url+"') center");
	$('#bottomCard').find('.mdl-card__title').css("background","url('"+bottomRestaurant.image_url+"') center");
}

function getInfoText(restaurant) {
	console.log("getting new info");
	return `<summary><b>${restaurant.address}</b></summary><br><p><b>Rating:</b> ${restaurant.rating}</p><p><b>Price:</b> ${restaurant.price}</p><p><b>Phone:</b> ${restaurant.phone}</p>`;
}

function showWinner(winner) {
	//alert("in show winner");
	$('.page-content').prepend("<h2>Winner</h2>");
	$('#topCard').find('.cardTitle').text(winner.name);
	$('#topInfo').html(getInfoText(winner));
	$('#topCard').find('.mdl-card__title').css("background","url('"+winner.image_url+"') center");
	$('#bottomHalf').html('<div></div>');

	updateUpNextCard();
	clearchosenTint();
}


function updateUpNextCard() {
	// If a winner has been shown, remove the card from view
	if (winnerShown) {
		$("#upNext").remove();
		return;
	}

	switch(totalList.length) {
		// Last Round case, no other restaurants to be next
		case 2:
			$("#upNext").first().html(`<h2>Last Round!</h2>`);
			break;

		// 3 restaurants left; 2 being displayed in cards & 1 left in list
		case 3:
			var restaurantName1 = totalList[2].name;
			$("#upNext").first().html(`<h2>Up Next:</h2><h4>The current round winner</h4><p>vs.</p><h4>${restaurantName1}!</h4>`);
			break;

		// Default case; 2 restaurants being displayed in cards & 2+ left in list
		default:
			if (totalList.length > 3) {
				var restaurantName1 = totalList[2].name;
				var restaurantName2 = totalList[3].name;
				$("#upNext").first().html(`<h2>Up Next:</h2><h4>${restaurantName1}</h4><p>vs.</p><h4>${restaurantName2}</h4>`);
			}
	}
}

function clearchosenTint() {
	$("#topCard").removeClass("chosen");
	$("#topCard").removeClass("notchosen");
	$("#bottomCard").removeClass("chosen");
	$("#bottomCard").removeClass("notchosen");

}
