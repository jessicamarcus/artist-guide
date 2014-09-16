define(['jquery', 'backbone', 'handlebars', 'm.artist', 'c.list', 'text!app/views/templates/artistTemplate.html'], function ($, Backbone, Handlebars, Artist, ArtistList, ArtistTemplate) {
    return Backbone.View.extend({
        el: '#artistDetails',

        initialize: function () {
//            this.listenTo(this.model, 'change', this.publish);
//            this.listenTo(this.model, 'destroy', this.remove);
        },
        events: {
            'click #placeholder': 'deleteArtist',
            'click #delete': 'populateForm',
            'click #cancel': 'clearForm',
            'click #save': 'createNewArtist'
        },
        populateForm: function () {
            var testModel = this.collection.get('540f120b79e976d013fbeb90');

            $('#artistDetails').find('input').each(function (i, el) {
                var currentId = $(el).attr('id'),
                    currentVal = testModel.get(currentId);
                if (currentVal) {
                    $(el).val(currentVal);
                }
            });
        },
        clearForm: function () {
            $('#artistDetails').find('input').each(function (i, el) {
                $(el).val('');
            })
        },
        createNewArtist: function () { //todo: saveArtist will supplant this function
            this.collection.createNew();
            this.clearForm();
        },
        deleteArtist: function () {
            this.model.destroy();
        },
//        saveArtist: function () {
//            this.model.save(); //todo: function saves changes OR adds new model object, replaces createNewArtist
//        },
        publish: function () {
            $(event.target).toggleClass('published');
            this.model.isPublished();
        },
        setAlt: function () {
            this.model.altNameDisplay();
        }
    })
});