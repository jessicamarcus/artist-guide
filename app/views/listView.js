define(['jquery', 'backbone', 'handlebars', 'text!app/views/templates/listTemplate.html'], function ($, Backbone, Handlebars, ListTemplate) {
    return Backbone.View.extend({
        el: '#artistList',
        tagName: 'li',
        template: Handlebars.compile(ListTemplate),

        initialize: function () {
            this.listenTo(this.collection, 'reset', this.renderList);
        },
        renderList: function () {
            this.collection.each(function (artist) {
                this.$el.append(this.template(artist.toJSON()));
            }, this);
        },
        events: {
            'click a': 'clicked'
        },
        clicked: function (e) {
            e.preventDefault();
            var id = $(e.currentTarget).attr('id'),
                item = this.collection.get(id),
                name = item.get('firstName');
            console.log(name);
        }

    })
});