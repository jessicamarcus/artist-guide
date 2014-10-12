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

// form validation
//$(document).ready(function () {
//    $('#volunteerForm').bootstrapValidator({
//        submitButtons: 'button[type="submit"]',
////        excluded: [':disabled'],
//        feedbackIcons: {
//            valid: 'glyphicon glyphicon-ok',
//            invalid: 'glyphicon glyphicon-remove',
//            validating: 'glyphicon glyphicon-refresh'
//        },
//        fields: {
//            firstname: {
//                selector: '[placeholder="First Name"]',
//                validators: {
//                    notEmpty: {
//                        message: 'Required'
//                    }
//                }
//            },
//            lastname: {
//                selector: '[placeholder="Last Name"]',
//                validators: {
//                    notEmpty: {
//                        message: 'Required'
//                    }
//                }
//            },
//            q4_email4: {
//                validators: {
//                    notEmpty: {
//                        message: 'Required'
//                    },
//                    emailAddress: {
//                        message: 'Valid email address required'
//                    }
//                }
//            },
//            phoneNumber: {
//                selector: '[placeholder="617-555-1212"]',
//                validators: {
//                    notEmpty: {
//                        message: 'Required'
//                    },
//                    phone: {
//                        country: 'US',
//                        message: 'Valid telephone number required'
//                    }
//                }
//            },
//            q7_areasOf: {
//                selector: '[class="areas"]',
//                validators: {
//                    choice: {
//                        min: 1,
//                        max: 10,
//                        message: 'Please choose at least one option'
//                    }
//                }
//            },
//            q8_whatIs: {
//                validators: {
//                    notEmpty: {
//                        message: 'Required'
//                    }
//                }
//            }
//        }
//    });
//});
//
//$('#volunteerModal').on('shown.bs.modal', function () {
//    $('#volunteerForm').find('[placeholder="First Name"]').focus();  // Initial focus on the username field
//});
//$('volunteerModal').on('success.form.bv', function (e) {
//    e.preventDefault();  // Prevent submission unless required fields are completed
//});