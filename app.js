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
        'v.list': 'app/views/listView',
        'v.listitem': 'app/views/listItemView',
        'v.artist': 'app/views/artistView'
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
requirejs(['jquery', 'c.list', 'v.list', 'v.artist'], function ($, Artists, ListView, ArtistView) {
    var ArtistAdmin = new Artists();
    ArtistAdmin.fetch({
        reset: true,
        success: function () {
            new ListView({collection: ArtistAdmin});
        }});
});