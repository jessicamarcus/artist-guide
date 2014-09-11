define(['backbone', 'm.artist', 'v.artist'], function (Backbone, Artist) {
    return Backbone.Collection.extend({
        model: Artist,
        url: '/api/artists',

        //todo: list display/sort methods
//        published: function () {
//            return this.where({published: true});
//        },
        createNew: function (e) {
            e.preventDefault();
            var formData = {};
            $("#addArtist").find("input").each(function (i, el) {
                if ($(el).val() != '') {
                    formData[el.id] = $(el).val();
                }
            });
        }
    });
});