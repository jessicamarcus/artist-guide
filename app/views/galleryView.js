define(['jquery', 'backbone', 'handlebars', 'c.list', 'v.galleryArtist'], function ($, Backbone, Handlebars, ArtistList, GalleryArtistView) {
    return Backbone.View.extend({
        el: '#artistGrid',

        render: function () {
            this.collection.each(function (artist) {
                this.renderArtists(artist);
            }, this);
        },
        renderArtists: function (artist) {
            var galleryArtistView = new GalleryArtistView({model: artist});
            this.$el.append(galleryArtistView.render().el);
        }
    })
});