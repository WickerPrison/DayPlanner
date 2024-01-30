// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // get references to elements and get the hour of the current time
  var hourTemplate = $("#hour-template");
  var currentTime = dayjs().hour();

  // display the current date at the top of the page
  $("#currentDay").text(dayjs().format('MM/DD/YYYY'));

  // This loop creates the time blocks
  for(var i = 0; i < 9; i++){
    // copy the html of the template and set its time
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

    // give the time block an id that reflects the time it represents
    hour.attr("id", "hour-" + hourTime);

    // set the time displayed on the time block
    $(hour).children("div").text(hourTime + meridiem);

    // change block color based on if it is past, present, or future
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

    // if local storage has an entry for this block populate the text area with the text in local storage
    var localStorageObject = JSON.parse(localStorage.getItem("schedule"));
    if(localStorageObject[hour.attr("id")] != null){
      hour.children("textarea").val(localStorageObject[hour.attr("id")]);
    }

    // append block to the container that holds the time blocks
    $("#hour-container").append(hour);

    // add event listener to button that calls the save schedule function
    var saveButton = hour.children("button.saveBtn");
    saveButton.on('click', saveSchedule);
  }


  function saveSchedule(event){
    // end function early if there is nothing to save
    var textArea = $(event.currentTarget).parent().children("textarea");    
    if(textArea.val() == " ") return;
    
    // get reference to time block
    var hour = $(event.currentTarget).parent();

    // get local storage object or create one if none exist
    var localStorageObject = JSON.parse(localStorage.getItem("schedule"));
    if(localStorageObject == null){
      localStorageObject = {};
    }

    // save text to local storage using time block id as key
    localStorageObject[hour.attr("id")] = textArea.val();
    localStorage.setItem("schedule", JSON.stringify(localStorageObject));
  }
});