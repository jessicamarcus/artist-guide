define(['backbone', 'm.artist'], function (Backbone, Artist) {
    return Backbone.Collection.extend({
        model: Artist,
        url: '/api/artists',
        comparator: 'firstName'
//        comparator: function (collection) {
//            return(collection.get(this.sortByKey));
//        },
//        sortByKey: function () {
//            return 'firstName';
//        },

        //todo: list display/sort methods
//        published: function () {
//            return this.where({published: true});
//        },

    });
});