$(document).ready(function() {

  // Generate a random number between min and max (inclusive) --used for random gradients
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function gradientGenerator() {

    // Random two color radient generator...probably could be done with less code
    var gradientAngle = getRandomInt(0, 90);
    var randomR = getRandomInt(0, 255);
    var randomG = getRandomInt(0, 255);
    var randomB = getRandomInt(0, 255);
    var randR = getRandomInt(0, 255);
    var randG = getRandomInt(0, 255);
    var randB = getRandomInt(0, 255);

    $("body").css("background", "linear-gradient(" + gradientAngle + "deg, rgba(" + randomR + "," + randomG + "," + randomB + ",.6), rgba(" + randR + "," + randG + "," + randB + ",.6)), url('https://static.pexels.com/photos/26750/pexels-photo-26750.jpg') center center no-repeat");

    $(".random-color").text("Randomly generated gradient: linear-gradient(" + gradientAngle + "deg, rgba(" + randomR + ", " + randomG + ", " + randomB + ", .6), rgba(" + randR + ", " + randG + ", " + randB + ", .6))");
  }

  // Get random quote and change quote fields and tweet data
  function getRandomQuote() {
    $.getJSON("http://quotes.stormconsultancy.co.uk/random.json", function(json) {

      // Check if the quote text is 120 characters or less to accomodate for twitter 140 characters limit
      if (json.quote.length <= 120) {
        $(".quote").text(json.quote);
        $(".quote-author").text("- " + json.author);
        tweetUpdate();
      } else {
        getRandomQuote();
      }
    });
  }

  // Declare twitter variables
  var tweetText = "";
  var tweetAuthor = "";

  function tweetUpdate() {

    // Update tweet content
    tweetText = $(".quote").text();
    tweetAuthor = $(".quote-author").text();
    $(".twitter-share-button").attr("href", 'https://twitter.com/intent/tweet?=hashtags=quotes&text="' + tweetText + '" ' + tweetAuthor);
  }

  // Get random quote and gradient when document loads
  getRandomQuote();
  gradientGenerator();

  // New Quote button click function
  $(".new-quote").on("click", function() {
    getRandomQuote();
    tweetUpdate();
    gradientGenerator();
  });

});