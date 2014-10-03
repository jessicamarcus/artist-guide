requirejs.config({
    baseUrl: '',
    paths: {
        jquery: 'lib/jquery-2.1.1',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        text: 'lib/text',
        handlebars: 'lib/handlebars-v1.3.0',
        'm.artist': 'app/models/artist',
        'c.list': 'app/collections/artistList',
        'v.gallery': 'app/views/galleryView',
        'v.galleryArtist': 'app/views/galleryArtistView',
        'v.galleryArtistDetail': 'app/views/galleryArtistDetailView'
    },
    shim: {
        underscore: { exports: '_' },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        handlebars: { exports: 'Handlebars' }
    }
});
requirejs(['c.list', 'v.gallery'], function (Collection, GalleryView) {
    var artistCollection = new Collection();
    var artistGallery = new GalleryView({collection: artistCollection});

    artistCollection.fetch({
        reset: true,
        success: function () {
            artistGallery.render.call(artistGallery);
        }
    });
});
