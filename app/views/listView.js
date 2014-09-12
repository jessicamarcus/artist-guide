define(['jquery', 'backbone', 'handlebars', 'text!app/views/templates/listTemplate.html'], function ($, Backbone, Handlebars, ListTemplate) {
    return Backbone.View.extend({
        el: '#artistList',
        tagName: 'li',
        template: Handlebars.compile(ListTemplate),

        initialize: function () {
            this.listenTo(this.collection, 'sync', this.renderList);
//            this.listenTo(this.collection, 'add', this.renderList);
        },
        renderList: function () {
            this.collection.each(function (artist) {
                //this.$el.clear();
                this.$el.append(this.template(artist.toJSON()));
            }, this);
        },
        events: {
            'click a': 'clicked'
        },
        clicked: function (e) {
            e.preventDefault();
            var id = $(e.currentTarget).attr('id');
            var item = this.collection.get(id);
            console.log(id);
        }

    })
});