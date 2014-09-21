define(['jquery', 'backbone', 'handlebars', 'text!app/views/templates/listTemplate.html'], function ($, Backbone, Handlebars, ListTemplate) {
    return Backbone.View.extend({
        tagName: 'li',
        template: Handlebars.compile(ListTemplate),

        events: {
            'click a': 'select',
            'click .togglePub': 'publish',
            'click .artistSelect': 'select'
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        publish: function () {
            $(event.target).toggleClass('published');
            this.model.isPublished();
        },
        select: function (e) {
            e.preventDefault();
            var id = $(e.currentTarget).attr('id');
            console.log(this.collection);
//            var item = this.collection.get(id);
//            console.log(item.attributes.projectName);
        }
    });
});