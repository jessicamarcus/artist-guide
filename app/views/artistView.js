define(['jquery', 'backbone', 'imgutils'], function ($, Backbone, ImgUtils) {
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
            'click #save': 'saveArtist',
            'change #photoUpload': 'previewImg'
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
            if (document.getElementById('photoUpload').files.length) {
                ImgUtils.uploadImg(document.getElementById('photoUpload').files);
            }
            if (this.controller.currentArtist) {
                this.controller.actions.editArtist();

            } else {
                this.controller.actions.createNew();
            }
            this.clearForm();
        },
        previewImg: ImgUtils.previewImg
//        publish: function () {
//            $(event.target).toggleClass('published');
//            this.model.isPublished();
//        },
//        setAlt: function () {
//            this.model.altNameDisplay();
//        }
    })
});