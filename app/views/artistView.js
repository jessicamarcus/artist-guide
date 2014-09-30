define(['jquery', 'backbone'], function ($, Backbone) {
    return Backbone.View.extend({
        el: '#artistDetails',

        render: function () {
            if (this.model) {
                var currentModel = this.model;
                $("#artistDetails").find('.form-field').each(function (i, el) {
                    var currentId = $(el).attr('id'),
                        currentVal = currentModel.get(currentId);
                        $(el).val(currentVal);
                    });
            }
        },
        events: {
            'click #delete': 'deleteArtist',
            'click #cancel': 'clearForm',
            'click #save': 'saveArtist'
        },
        clearForm: function () {
            $('#artistDetails').find('.form-field').each(function (i, el) {
                $(el).val('');
            })
        },
        createNewArtist: function () { //todo: saveArtist will supplant this function
            this.controller.actions.createNew();
            this.clearForm();
        },
        deleteArtist: function () {
            this.controller.actions.deleteArtist();
            this.clearForm();
        },
        saveArtist: function () {
        this.controller.actions.editArtist();
        },
        publish: function () {
            $(event.target).toggleClass('published');
            this.model.isPublished();
        },
        setAlt: function () {
            this.model.altNameDisplay();
        }
    })
});