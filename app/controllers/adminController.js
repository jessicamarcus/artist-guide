define(['jquery', 'backbone', 'handlebars', 'v.list', 'v.artist','v.listitem', 'c.list'], function ($, Backbone, Handlebars, ListView, ArtistView, ListItemView, Artists) {
    var adminController = {
        artistList: new Artists(),
        currentView: new ArtistView(),
        actions: {
            showList: function () { // display entries in sidebar
                var artistListView = new ListView({collection: adminController.artistList});

                artistListView.listenTo(adminController.artistList, 'change add sync destroy', artistListView.render);
                $('#add-new').click(function () {
                    adminController.currentView.clearForm();
                });

                // listen for itemDataBound event to apply click handler to each entry in sidebar
                artistListView.on(artistListView.itemBound, function (artist) {
                    var link = this.$el.find('#artist' + artist.id);
                    link.click(function () {
                        adminController.actions.showDetail(artist); // click to display artist info in artistView
                        console.log(artist.id); //DEBUG - print selected model's id to console
                    });
                });
                adminController.artistList.fetch({reset: true});
            },
            showDetail: function (artist) {
                var artistView = adminController.currentView;
                artistView.model = artist;
                artistView.collection = adminController.artistList;
                artistView.controller = adminController;
                artistView.render();
            },
            createNew: function () {
                var formData = {};
                $('#artistDetails').find('.form-field').each(function (i, el) {
                    if ($(el).val() != '') {
                        formData[el.id] = $(el).val();
                    }
                });
                adminController.artistList.create(formData);
            },
            deleteArtist: function () {
                adminController.currentView.model.destroy();
            }
        },
        views: {
            artistView: ArtistView,
            listView: ListView,
            listItemView: ListItemView
        }
    };
    return adminController;
});