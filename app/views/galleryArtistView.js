define(['jquery', 'backbone', 'handlebars', 'v.galleryArtistDetail', 'text!app/views/templates/galleryArtistTemplate.html'], function ($, Backbone, Handlebars, GalleryArtistDetailView, GalleryArtistTemplate) {
    return Backbone.View.extend({
        tagName: 'li',
        className: 'gallery-artist',
//        className: 'anotherClass',
        template: Handlebars.compile(GalleryArtistTemplate),

        events: {
            'click': 'renderArtist'
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        renderArtist: function () {
            $('#artistDetail').addClass('artist-detail-visible');
            $('#artistDetailContainer').addClass('gallery-detail-visible');
            var galleryArtistDetailView = new GalleryArtistDetailView({model: this.model});
            galleryArtistDetailView.render();
        }
    });
});