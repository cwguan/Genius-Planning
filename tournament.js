var winnerShown;
var totalList;

$(document).ready(function() {

	totalList =  JSON.parse(sessionStorage.getItem("selectedRestaurants"));
	winnerShown = false;

	$('#topCard').find('.cardTitle').text(totalList[0].name);
	$('#bottomCard').find('.cardTitle').text(totalList[1].name);

	$('#topAddress').text(totalList[0].address);
	$('#bottomAddress').text(totalList[1].address);

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

	setCardValue(top.name,bottom.name,top.address,bottom.address,top.image_url,bottom.image_url);
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
	setCardValue(top.name,bottom.name,top.address,bottom.address,top.image_url,bottom.image_url);
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

function showWinner(winner) {
	//alert("in show winner");
	$('.page-content').prepend("<h2>Winner</h2>");
	$('#topCard').find('.cardTitle').text(winner.name);
	$('#topAddress').text(winner.address);
	$('#topCard').find('.mdl-card__title').css("background","url('"+winner.image_url+"') center");
	$('#bottomHalf').html('<div></div>');
}