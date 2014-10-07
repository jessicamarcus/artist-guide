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
                if (currentModel.attributes.photoUrl) {
                    $('#photoUploadPreview').attr('src', 'http://104.131.91.130:4700/' + currentModel.attributes.photoUrl); //modify url for offsite access
                } else {
                    $('#photoUploadPreview').appendTo('<span>No photo</span>');
                }
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
        },
        saveArtist: function () {
            var self = this;

            if (document.getElementById('photoUpload').files.length) {
                ImgUtils.uploadImg(document.getElementById('photoUpload').files, callback);
            } else {
                callback()
            }
            function callback(url) {
                self.storeArtist(url)
            }
        },
        storeArtist: function (url) {
            //make sure we don't accidentally create entries that aren't accessible to the admin user!
            if (!$('#firstName').val() || !$('#lastName').val() || !$('#projectName').val()) {
                if (this.controller.currentArtist) {
                    this.controller.actions.editArtist(url);
                } else {
                    this.controller.actions.createNew(url);
                }
            }
        },
        previewImg: ImgUtils.previewImg
    });
    return artistView;
});