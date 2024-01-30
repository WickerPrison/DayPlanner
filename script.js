// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  var hourContainer = $("#hour-container");
  var hourTemplate = $("#hour-template");
  var currentTime = dayjs().hour();

  for(var i = 0; i < 9; i++){
    var hour = hourTemplate.clone();
    var hourTime24 = i + 9;
    var hourTime = i + 9;
    var meridiem = "AM";
    if(hourTime > 11){
      meridiem = "PM";
      if(hourTime > 12){
        hourTime -= 12;
      }
    }
    hour.attr("id", "hour-" + hourTime);

    $(hour).children("div").text(hourTime + meridiem);


    var difference = hourTime24 - currentTime;
    if(difference > 0){
      hour.addClass("future");
    }
    else if (difference == 0){
      hour.addClass("present");
    }
    else{
      hour.addClass("past");
    }

    hourContainer.append(hour);
  }

});
