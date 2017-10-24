var topics = ["happy", "sad", "mad", "excited", "grumpy", "cry", "smile", "alone", "awake", "blah", "bored", "calm", "chilled", "cold", "confused", "curious", "guilty", "hopeful", "lazy", "moody", "nerdy", "okay"];

// API key
var apiKey = "K9UMRtFI3MtDZVcIXpmUykUj5eYOlI2k";
// API image limit
var limit = 20;

// create buttons from the array
function renderButtons() {
    $("#gifs-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("btn btn-info gif");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        $("#gifs-view").append(newButton);
    }
}

// Add gif button
$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    topics.push(gif);
    renderButtons();
    $("#gif-input").val("");
});

// Display gifs when the dynamically rendered button is clicked
function displayGifs() {
    var name = $(this).attr("data-name");
    // API url
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        name + "&api_key=" + apiKey + "&limit=" + limit;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var resultDiv = $("<div>");
            resultDiv.addClass("panel panel-default img-box");
            var p = $("<p>");
            p.text("Rating : " + results[i].rating);
            var resultImage = $("<img>");
            resultImage.attr("src", results[i].images.fixed_height_still.url);
            resultImage.attr("data-still", results[i].images.fixed_height_still.url);
            resultImage.attr("data-animate", results[i].images.fixed_height.url);
            resultImage.attr("data-state", "still");
            resultImage.addClass("play");
            resultDiv.append(p);
            resultDiv.append(resultImage);
            $("#gif-result").prepend(resultDiv);
        }
    });
}

// Play-pause gif function
function playGifs() {
    var image = $(this);
    var state = image.attr("data-state");

    if (state === "still") {
        var animate = image.attr("data-animate");
        image.attr("src", animate);
        image.attr("data-state", "animate");
    } else {
        var still = image.attr("data-still");
        image.attr("src", still);
        image.attr("data-state", "still");
    }
}

// create buttons from the array on page load
renderButtons();
// display gifs on the click of button event handler
$(document).on("click", ".gif", displayGifs);
// play pause gifs event handler
$(document).on("click", ".play", playGifs);
