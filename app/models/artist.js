define(['jquery', 'backbone'], function ($, Backbone) {
    return Backbone.Model.extend({
        idAttribute: '_id',
        defaults: {
            firstName: '',
            lastName: '',
            projectName: '',
            projectDesc: '',
            artistBio: '',
            webLink: '',
            //photo: '',
            published: false,
            altNameDisplayed: false
        },
        id: '_id',

        isPublished: function () {
            this.save({published: !this.get('published')});
        },
        altNameDisplay: function () {
            this.save({altNameDisplayed: !this.get('altNameDisplayed')});
        }
    });
});