define(['jquery', 'backbone', 'handlebars', 'text!app/views/templates/listTemplate.html'], function ($, Backbone, Handlebars, ListTemplate) {
    return Backbone.View.extend({
        tagName: 'li',
        template: Handlebars.compile(ListTemplate),

        events: {
            'click .togglePub': 'publish'
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        publish: function () {
            $(event.target).toggleClass('published');
            this.model.isPublished();
        }
    });
});