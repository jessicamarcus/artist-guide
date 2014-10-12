/* 9.27.2014 - jessica marcus */

//preload background images
var imgArray = [
        "img/slide/Pink_NBNY.jpg",
        "img/slide/TedJacobs_NBNY.jpg",
        "img/slide/NickWolfe_NBNY.jpg",
        "img/slide/RyanMuir_NBNY.jpg",
        "img/slide/KonstantinSergeyev_NBNY.jpg"
    ];

function preload(imgArray) {
    $(imgArray).each(function () {
        $("<img />")[0].src = this;
    });
}
preload(imgArray);

$("#illNav").load("templates/navbar.html");

//get last five tumblr posts + embed on feed page
if ($('#tumblrfeed').length > 0) {
    $.getJSON('http://illuminusboston.tumblr.com/api/read/json?num=15&callback=?', function (data) {
        var source = $('#tumblr-template').html() || '',
            template = Handlebars.compile(source);

        $.each(data['posts'], function (i, posts) {
            var jsonPost = data['posts'][i],
                htmlPost = template(jsonPost);
            $('#tumblrfeed').append(htmlPost);
        });
    });
}

// grab a random background image for each page (except for home page)
if ($('#landing').length
    <= 0) {
    var randBg = imgArray[Math.floor(Math.random() * imgArray.length)];

    $('body').css({'background-image': 'url(' + randBg + ')'});
}