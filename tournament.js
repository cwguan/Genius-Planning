var topCardList;
var bottomCardList;
var address;
var indexTop;
var indexBottom;
var imagePath;
var imageNames;
var winnerShown;
$(document).ready(function() {
	winnerShown = false;
	topCardList = ["Olive Garden", "Vallartas", "Vallartas"];
	bottomCardList = ["Chipotle","In-N-Out","Olive Garden"]
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
	indexBottom = 0;

	$('#topCard').find('.cardTitle').text(topCardList[indexBottom]);
	$('#bottomCard').find('.cardTitle').text(bottomCardList[indexTop]);

	$('#topAddress').text(address[topCardList[indexTop]]);
	$('#bottomAddress').text(address[bottomCardList[indexBottom]]);

	$('#topCard').find('.mdl-card__title').css("background","url('"+imagePath+imageNames[topCardList[indexTop]]+"') center");
	$('#bottomCard').find('.mdl-card__title').css("background","url('"+imagePath+imageNames[bottomCardList[indexBottom]]+"') center");
	//$('#topCard.mdl-card__title').css("background-size",50+"px " + 70 + "%");
	//$('#topCard.mdl-card__title').css("background-repeat","no-repeat");
})

$("#topButton").click(toggleClass);
$("#bottomButton").click(toggleClass);


function toggleClass(event) {
	//alert("in method");
	if(indexTop >= 2 && !winnerShown){
		//alert("in winner");
		winnerShown = true;
		showWinner();
		//$("#topButton").prop("disabled",true);
		$("#topButton").attr('disabled','disabled');
		$("#topButton").children().attr("disabled","disabled");
		$("#topButton").off("click");
		return;
	}
	else{
		indexTop++;
		indexBottom++;

		$('#topCard').find('.cardTitle').text(topCardList[indexBottom]);
		$('#bottomCard').find('.cardTitle').text(bottomCardList[indexTop]);

		$('#topAddress').text(address[topCardList[indexTop]]);
		$('#bottomAddress').text(address[bottomCardList[indexBottom]]);

		//alert(bottomCardList[indexBottom]);
		$('#topCard').find('.mdl-card__title').css("background","url('"+imagePath+imageNames[topCardList[indexTop]]+"') center");
		$('#bottomCard').find('.mdl-card__title').css("background","url('"+imagePath+imageNames[bottomCardList[indexBottom]]+"') center");
	}
	
}

function showWinner() {
	//alert("in show winner");
	$('.page-content').prepend("<h2>Winner</h2>");
	$('#topCard').find('.mdl-card__title').css("background","url('"+imagePath+imageNames[topCardList[indexTop]]+"') center");
	$('#bottomHalf').html('<div></div>');
}