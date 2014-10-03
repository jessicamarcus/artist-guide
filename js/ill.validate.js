
// form validation
$(document).ready(function () {
    $('#volunteerForm').bootstrapValidator({
        submitButtons: 'button[type="submit"]',
//        excluded: [':disabled'],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            firstname: {
                selector: '[placeholder="First Name"]',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            },
            lastname: {
                selector: '[placeholder="Last Name"]',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            },
            q4_email4: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    emailAddress: {
                        message: 'Valid email address required'
                    }
                }
            },
            phoneNumber: {
                selector: '[placeholder="617-555-1212"]',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    phone: {
                        country: 'US',
                        message: 'Valid telephone number required'
                    }
                }
            },
            q7_areasOf: {
                selector: '[class="areas"]',
                validators: {
                    choice: {
                        min: 1,
                        max: 10,
                        message: 'Please choose at least one option'
                    }
                }
            },
            q8_whatIs: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            }
        }
    });
});

$('#volunteerModal').on('shown.bs.modal', function () {
    $('#volunteerForm').find('[placeholder="First Name"]').focus();  // Initial focus on the username field
});
$('volunteerModal').on('success.form.bv', function (e) {
    e.preventDefault();  // Prevent submission unless required fields are completed
});