$(document).ready(function () {


    $("#submit").on("click", function () {

        // Preventing the button from trying to submit the form
        event.preventDefault();

        // query (string)
        // location: ?q=xyz
        //searches article body, headline and byline
        var searchTerm = $("#search-term").val().trim()

        //begin_date (string)
        //syntax: ..&begin_date=YYYYMMDD
        //starting date
        var startDate = $("#start-date").val().trim()

        //end_date (string)
        //syntatx: ..&end_date=YYYYMDD
        //ending date
        var endDate = $("#end-date").val().trim()

        var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931"
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" + searchTerm + "&page=0&begin_date=" + startDate + "&end_date=" + endDate;

        runAjax(queryURL);
    });

    function runAjax(urlarr) {

        $.ajax({
            url: urlarr,
            method: "GET"
        }).then(function (response) {

            // Printing the entire object to console.
            console.log(response);
            console.log(response.response.docs[0].headline.main);
            console.log(response.response.docs[0].byline.original);
            console.log(response.response.docs[0].pub_date);
            console.log(response.response.docs[0].web_url);

            // Will display the amount of articles user selects in dropdown.
            var articleNumber = $("#article-number").val()

            for (var i = 0; i < articleNumber; i++) {

            
                var data = JSON.stringify(response.response.docs[i]);
                var title = $("<h5>").text(response.response.docs[i].headline.main);
                var author = $("<h6>").text(response.response.docs[i].byline.original);
                var pubDate = $("<p>").text(response.response.docs[i].pub_date);
                var webpage = $("<p>").text(response.response.docs[i].web_url);
                var webURL = $("<a>").attr("href", response.response.docs[i].web_url).append(webpage);

                $("#articleDiv").append(title, author, pubDate, webURL);
                console.log(data);
            };
        });
    };
});