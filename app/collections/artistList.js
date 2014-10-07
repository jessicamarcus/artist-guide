define(['backbone', 'm.artist'], function (Backbone, Artist) {
    return Backbone.Collection.extend({
        model: Artist,
        url: 'http://104.131.91.130:4700/api/artists',
        comparator: 'firstName'
    });
});