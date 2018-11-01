var topCardList;
var bottomCardList;
var address;
var indexTop;
var indexBottom;

$(document).ready(function() {
	alert("in page");
	topCardList = ["Olive Garden", "Vallartas", "Olive Garden"];
	bottomCardList = ["Chipotle","In-N-Out","Vallartas"]
	address = []
	address["Chipotle"]="Costa Verde Center,San Diego, CA 92109"
	address["In-N-Out"]="2910 Damon Ave, San Diego, CA 92109"
	address["Vallartas"]="4277 Genesee Ave, San Diego, CA 92117"
	address["Olive Garden"]="3215 Sports Arena Blvd, San Diego, CA 92110"
	indexTop = 0;
	indexBottom = 0;

	$('#bottomCard').find('.cardTitle').text(topCardList[indexTop]);
	$('#topCard').find('.cardTitle').text(bottomCardList[indexBottom]);
	$('#topAddress').text(address[topCardList[indexTop]]);
	$('#bottomAddress').text(address[bottomCardList[indexBottom]]);
})

$("#topButton").click(toggleClass);
$("#bottomButton").click(toggleClass);


function toggleClass(event) {
	//alert("in method");
	indexTop++;
	indexBottom++;
	if(indexTop >= 3){
		//alert("in winner");
		showWinner();
	}

	$('#bottomCard').find('.cardTitle').text(topCardList[indexTop]);
	$('#topCard').find('.cardTitle').text(bottomCardList[indexBottom]);
	$('#topAddress').text(address[topCardList[indexTop]]);
	$('#bottomAddress').text(address[bottomCardList[indexBottom]]);
}

function showWinner() {
	//alert("in show winner");
	$('.page-content').prepend("<h2>Winner</h2>");
	$('#bottomHalf').html('<div></div>');
}