
// form validation
$(document).ready(function () {
    $('#mc_embed_signup').bootstrapValidator({
        submitButtons: 'input[type="submit"]',
//        excluded: [':disabled'],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
            FNAME: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            },
            LNAME: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            },
        fields: {
            EMAIL: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    emailAddress: {
                        message: 'Valid email address required'
                    }
                }
            }
        }
    });
});

$('#mc_embed_signup').on('success.form.bv', function (e) {
    e.preventDefault();  // Prevent submission unless required fields are completed
});