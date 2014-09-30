define(['jquery', 'backbone', 'handlebars', 'c.list', 'v.listitem'], function ($, Backbone, Handlebars, ArtistList, ListItemView) {
    return Backbone.View.extend({
        el: '#artistList',
        itemBound: 'item:bound',

        render: function () {
            this.$el.empty();
            this.collection.each(function (artist) {
                this.renderArtists(artist);
            }, this);
        },
        renderArtists: function (artist) {
            var listItemView = new ListItemView({model: artist});
            this.$el.append(listItemView.render().el);
            this.trigger(this.itemBound, artist);
//            this.collection.sort();
//        },
        // todo: list sort options
//        events: {
//            'click #sortProject': 'this.collection.sortBy("projectName")',
//            'click #sortName': 'sortByName'
        }
    })
});