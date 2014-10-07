define(['jquery', 'backbone', 'handlebars', 'v.list', 'v.artist','v.listitem', 'c.list'], function ($, Backbone, Handlebars, ListView, ArtistView, ListItemView, Artists) {
    var adminController = {
        artistList: new Artists(),
        currentView: new ArtistView(),
        currentArtist: {},
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
                adminController.currentArtist = artist;

                if (adminController.currentArtist) artistView.listenTo(adminController.currentArtist, 'change', artistView.render);
            },
            createNew: function (url) {
                var formData = {};
                $('#artistDetails').find('.form-field').each(function (i, el) {
                    if ($(el).val() != '') {
                        formData[el.id] = $(el).val();
                    }
                });
                if (!_.isEmpty(formData)) {
                    formData.photoUrl = url;
                    console.log('createNew' + formData);
                    adminController.artistList.create(formData);
                }
            },
            editArtist: function (url) {
                var formData = {};
                $('#artistDetails').find('.form-field').each(function (i, el) {
                    formData[el.id] = $(el).val();
                });
                formData.photoUrl = url;
                adminController.currentArtist.save(formData);
            },
            deleteArtist: function () {
                if (adminController.currentView.model) {
                    adminController.currentView.model.destroy();
                }
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