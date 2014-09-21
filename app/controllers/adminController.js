define(['jquery', 'backbone', 'handlebars', 'v.list', 'v.artist','v.listitem', 'c.list'], function ($, Backbone, Handlebars, ListView, ArtistView, ListItemView, Artists) {
    var controller = {
        actions: {
            showList: function () { // display entries in sidebar
                var artistList = new Artists(),
                    artistListView = new ListView({collection: artistList});

                artistListView.listenTo(artistList, 'change add sync', artistListView.render);

                // listen for itemDataBound event to apply click handler to each entry in sidebar
                artistListView.on(artistListView.itemBound, function (artist) {
                    var link = this.$el.find('#artist' + artist.id);
                    link.click(function () {
                        controller.actions.showDetail(artist); // click to display artist info in artistView
                    });
                });
                artistList.fetch({reset: true});
            },
            showDetail: function (artist) {
                var artistView = new ArtistView({model: artist});
                artistView.render();
            }
        },
        views: {
            artistView: ArtistView,
            listView: ListView,
            listItemView: ListItemView
        }
    };
    return controller;
});