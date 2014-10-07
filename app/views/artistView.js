define(['jquery', 'backbone', 'imgutils'], function ($, Backbone, ImgUtils) {
    var artistView = Backbone.View.extend({
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
            if (document.querySelector('input[type=file]').files[0]) {
                document.querySelector('input[type=file]').files.length = 0;
                $('#photoUploadPreview').removeAttr('src');
            }
        },
        deleteArtist: function () {
            this.controller.actions.deleteArtist();
            this.clearForm();
        },
        saveArtist: function () {
            var self = this;
            if (document.getElementById('photoUpload').files.length) {
                ImgUtils.uploadImg(document.getElementById('photoUpload').files, callback);
                function callback(url) {
                    self.storeArtist(url)
                }
            }
        },
        storeArtist: function (url) {
            if (this.controller.currentArtist) {
                console.log('editArtist: ' + url);
                this.controller.actions.editArtist(url);
            } else {
                console.log('createNew: ' + url);
                this.controller.actions.createNew(url);
            }
        },
        previewImg: ImgUtils.previewImg
    })
    return artistView;
});