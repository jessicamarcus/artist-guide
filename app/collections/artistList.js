define(['backbone', 'm.artist', 'v.artist'], function (Backbone, Artist, ArtistView) {
    return Backbone.Collection.extend({
        model: Artist,
        url: '/api/artists',
        comparator: 'firstName',
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
        createNew: function () {
            var formData = {};
            $("#artistDetails").find("input").each(function (i, el) {
                if ($(el).val() != '') {
                    formData[el.id] = $(el).val();
                }
            });
            this.create(formData);
        }
    });
});