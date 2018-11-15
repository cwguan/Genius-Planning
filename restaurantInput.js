// Lists of restaurant objects to keep track of what restaurants have been
// selected & which restaurants that have been selected and a chip
// needs to be created and displayed for
var selectedRestaurants = [];
var restaurantsToDisplay = [];
var defaultRestaurant1Deleted = false;
var defaultRestaurant2Deleted = false;

// Check to see if user is leaving page in any OTHER way than clicking the
// FINISH button as all inputted restuarants will disappear
var leavePageFromFinishButton = false;
window.addEventListener('beforeunload', function(e) {
    if (!leavePageFromFinishButton) {
      e.preventDefault();
      e.returnValue = 'Are you want to leave the page? You will lose all progress.';
    }
});

$(document).ready(function() {
  // Register a helper function to shorten restaurant names to prevent
  // overflow in chips when inputting restaurants
  Handlebars.registerHelper('modifyname', function(a, opts) {
      if(a.length > 10) {
          var modifiedName = a.slice(0, 10);
          modifiedName += "...";
          return modifiedName;
      }
      else {
          return opts.fn(this);
      }
  });
  if(selectedRestaurants.length < 2) {
      $("#defaultRestaurant1").fadeIn();
      $("#defaultRestaurant2").fadeIn();
      $("#suggestionMessage").fadeIn();
  }
  updateChipContainer();
});


// Creates a chip for any restaurant that still needs to be displayed
function updateChipContainer() {
  // compile the template
  var source   = $("#chip-template").html();
  var template = Handlebars.compile(source);

  var parentDiv = $("#chipContainer");

  for (var i = 0; i < restaurantsToDisplay.length; i++) {
    // Prevent duplicates from being added to selectedRestaurants and chip being created
    if(!selectedRestaurants.includes(restaurantsToDisplay[i])) {
        selectedRestaurants.push(restaurantsToDisplay[i]);
        var curRestaurant = restaurantsToDisplay[i];
        var curHtml = template(curRestaurant);

        //Adding the first and second restaurant replace the "default restaurant" chips.
        //Default chips DO NOT reappear after they are replaced or deleted
        if(!defaultRestaurant1Deleted && selectedRestaurants.length == 1) {
            defaultRestaurant1Deleted = true;
            defaultRestaurant1 = document.getElementById("defaultRestaurant1");
            defaultRestaurant1.style.display = "none"
            defaultRestaurant1.insertAdjacentHTML("beforebegin", curHtml)
        }
        else if(!defaultRestaurant2Deleted && selectedRestaurants.length == 2) {
            defaultRestaurant2Deleted = true;
            defaultRestaurant2 = document.getElementById("defaultRestaurant2");
            defaultRestaurant2.style.display = "none"
            defaultRestaurant2.insertAdjacentHTML("beforebegin", curHtml)
        }
        else {
            document.getElementById("suggestionMessage").style.display = "none"
            parentDiv.append(curHtml);
        }
    }
  }
  console.log("Updated selectedRestaurants in updateChipContainer: ", selectedRestaurants);
  restaurantsToDisplay = [];

  //Display finish button if more than two restaurants have been selected
  if(selectedRestaurants.length >= 2) {
      document.getElementById("finish-button").style.display = "inline-block";
  }
}


// Finds the corresponding restaurant object with all relevant info in the
// database based on the name
function findRestaurantInDB(restaurantName, addressValue) {
  for (var i = 0; i < restaurantData.length; i++) {
    if (restaurantData[i].name === restaurantName && restaurantData[i].address === addressValue) {
      console.log(`Found restaurant: ${restaurantName} === ${addressValue}`);
      checkNAFields(restaurantData[i]);
      return restaurantData[i];
    }
  }

  return {
      'name': 'Name Not Found',
      'address': 'Address Not Found',
      'phone': 'Phone Number Not Found',
      'price':'Price Not Found',
      'rating': 0.0,
      'image_url': './img/image-not-found.png'
  }
}

function checkNAFields(restaurant) {
    if(!restaurant.phone) restaurant.phone = "NA";
    if(!restaurant.price) restaurant.price = "NA";
    if(!restaurant.rating) restaurant.rating = "NA";
    if(!restaurant.image_url) restaurant.image_url = './img/image-not-found.png';
}


function deleteChip(chipId) {
  //Removing restaurant from selectedRestaurants list
  for (var i = 0; i < selectedRestaurants.length; i++) {
    var currSelectedRestaurantId = selectedRestaurants[i].name + "===" + selectedRestaurants[i].address;
    if (currSelectedRestaurantId === chipId) {
      selectedRestaurants.splice(i, 1);
    }
  }
  console.log("Updated selectedRestaurants in deleteChip: ", selectedRestaurants);

  //Removing restaurant chip from chipContainer
  var chipContainer = $("#chipContainer");
  chipContainer.children('span').each(function(i) {
      if( this.id === chipId ) {
          this.remove();
          return false;
      }
  });

  //Hide finish button if less than two restaurants are selected now
  if(selectedRestaurants.length < 2) {
      document.getElementById("finish-button").style.display = "none";
  }
}

function deleteDefaultChip(number) {
    if(number == 1) {
        defaultRestaurant1Deleted = true;
        document.getElementById("defaultRestaurant1").style.display = "none";
    }
    else if(number == 2) {
        defaultRestaurant2Deleted = true;
        document.getElementById("defaultRestaurant2").style.display = "none";
    }
}


/* Put selectedRestaurants into session storage for access in tournament
  Navigation to the next page is handled in html code
  */
function finish() {
  if (selectedRestaurants.length < 2 ) {
    alert('Please add at least 2 restuarants!');
  } else {
    sessionStorage.setItem('selectedRestaurants', JSON.stringify(selectedRestaurants));
    // Flag for valid navagation away from the restaurantInput page
    leavePageFromFinishButton = true;
    document.location.href = './shareLink.html';
  }
}


/* Takes in two arguments, the text field element and our database of resturants (possible values)*/
function autocomplete(inp, db) {
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;

      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);

      // Search through each element in our database
      for (i = 0; i < db.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (db[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + db[i].name.substr(0, val.length) + "</strong>";
          b.innerHTML += db[i].name.substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value=\"" + db[i].name + "\">";
          b.innerHTML += "<p id='restaurant-address' style='float: right; color: gray;'>" + db[i].address + "</p>";

          /*execute a function when someone clicks on the item value (DIV element)*/
          b.addEventListener("click", function(e) {
            var restaurantName = this.getElementsByTagName("input")[0].value;
            var addressValue = this.getElementsByTagName("p")[0].innerHTML;
            restaurantsToDisplay.push(findRestaurantInDB(restaurantName, addressValue));
            updateChipContainer();

            /*close the list of autocompleted values, (or any other open lists of autocompleted values:*/
            closeAllLists();

            //Clear the input text field after they select a restaurant
            inp.value = "";
          });

          a.appendChild(b);
        }
      }
  });

  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed, increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);

      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed, decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);

      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });

} // End of autocomplete()

// Adds autocomplete & resturant selection to our search box
autocomplete(document.getElementById("restaurantInput"), restaurantData);
