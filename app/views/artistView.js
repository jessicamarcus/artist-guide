define(['jquery', 'backbone', 'handlebars', 'm.artist', 'c.list', 'text!app/views/templates/artistTemplate.html'], function ($, Backbone, Handlebars, Artist, ArtistList, ArtistTemplate) {
    return Backbone.View.extend({
        el: '#addArtist',
//        template: Handlebars.compile(ArtistTemplate),

        initialize: function () {
//            this.listenTo(this.model, 'change', this.renderArtist);
//            this.listenTo(this.model, 'destroy', this.remove);
        },
        events: {
//            'click #published': 'publishArtist',
//            'click #altName': 'setAlt',
//            'click #save': 'saveArtist',
//            'click #delete': 'deleteArtist',
            'click #add': 'createNewArtist'
        },
        createNewArtist: function () { //todo: saveArtist will supplant this function
            this.collection.createNew();
        },
        deleteArtist: function () {
            this.model.destroy();
            this.remove();
        },
//        saveArtist: function () {
//            this.model.save(); //todo: function saves changes OR adds new model object, replaces createNewArtist
//        },
        publish: function () {
            this.model.isPublished();
        },
        setAlt: function () {
            this.model.altNameDisplay();
        }

    })
});