define(['jquery', 'backbone', 'handlebars', 'text!app/views/templates/listTemplate.html'], function ($, Backbone, Handlebars, ListTemplate) {
    return Backbone.View.extend({
        el: '#artistList',
        template: Handlebars.compile(ListTemplate),

        initialize: function () {
            this.listenToOnce(this.collection, 'sync add delete', this.renderList);
//            this.listenTo(this.collection, 'add', this.renderList);
//            this.listenTo(this.collection, 'delete', this.renderList);
        },
        renderList: function () {
            this.$el.html('');
            this.collection.each(function (artist) {
                this.$el.append(this.template(artist.toJSON()));
            }, this);
        },
        events: {
            'click a': 'clicked'
        },
        clicked: function (e) {
            e.preventDefault();
            var id = $(e.currentTarget).attr('id');
//            var item = this.collection.get(id);
            console.log(id);
        },
        publish: function () {
            this.model.isPublished();
        },
        setAlt: function () {
            this.model.altNameDisplay();
        }

    })
});