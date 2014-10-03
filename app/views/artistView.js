define(['jquery', 'backbone'], function ($, Backbone) {
    return Backbone.View.extend({
        el: '#artistDetails',
        render: function () {
            var self = this;
            if (this.model) {
                var currentModel = this.model;

                $("#artistDetails").find('.form-field').each(function (i, el) {
                    var currentId = $(el).attr('id'),
                        currentVal = currentModel.get(currentId);
                        $(el).val(currentVal);
                    });
                currentModel.attributes.published ?
                    $('#isPublished').removeClass('unpublished').addClass('published') :
                    $('#isPublished').removeClass('published').addClass('unpublished');
                currentModel.listenTo(currentModel, 'change', self.render)
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
            });
            $('#isPublished').removeClass('published').addClass('unpublished');
            this.controller.currentArtist = '';
        },
        deleteArtist: function () {
            this.controller.actions.deleteArtist();
            this.clearForm();
        },
        saveArtist: function () {
            if (this.controller.currentArtist) {
                this.controller.actions.editArtist();

            } else {
                this.controller.actions.createNew();
            }
            this.clearForm();
        }
//        publish: function () {
//            $(event.target).toggleClass('published');
//            this.model.isPublished();
//        },
//        setAlt: function () {
//            this.model.altNameDisplay();
//        }
    })
});