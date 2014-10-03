define(['jquery', 'backbone', 'handlebars', 'text!app/views/templates/galleryArtistDetailTemplate.html'], function ($, Backbone, Handlebars, GalleryArtistDetailTemplate) {
    return Backbone.View.extend({
        el: '#artistDetail',
        template: Handlebars.compile(GalleryArtistDetailTemplate),

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});