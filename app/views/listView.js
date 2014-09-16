define(['jquery', 'backbone', 'handlebars', 'c.list', 'v.listitem'], function ($, Backbone, Handlebars, ArtistList, ListItem) {
    return Backbone.View.extend({
        el: '#artistList',

        initialize: function () {
//            this.listenToOnce(this.collection, 'sync add delete', this.render);
//            this.listenTo(this.collection, 'reset', this.render);
//            this.listenTo(this.collection, 'delete', this.renderList);

            this.render();
        },
        render: function () {
            this.collection.each(function (artist) {
                this.renderArtists(artist);
            }, this);
        },
        renderArtists: function (artist) {
            var listItemView = new ListItem({model: artist});
            this.$el.append(listItemView.render().el);
//            this.collection.sort();
        },
        events: {
            'click #sortProject': 'this.collection.sortBy("projectName")',
            'click #sortName': 'sortByName'
        }
//        clicked: function (e) {
//            e.preventDefault();
//            var id = $(e.currentTarget).attr('id');
////            var item = this.collection.get(id);
//            //console.log(id);
//        },
//        publish: function () {
//            $(event.target).toggleClass('published');
//            this.model.isPublished();
//        },
//        setAlt: function () {
//            this.model.altNameDisplay();
//        }

    })
});