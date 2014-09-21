requirejs.config({
    baseUrl: '',
    paths: {
        jquery: 'lib/jquery-2.1.1',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        text: 'lib/text',
        handlebars: 'lib/handlebars-v1.3.0',
        'm.artist': 'app/models/artist',
        'c.list': 'app/collections/artistList',
        'v.list': 'app/views/listView',
        'v.listitem': 'app/views/listItemView',
        'v.artist': 'app/views/artistView',
        'ctl.admin': 'app/controllers/adminController'
    },
    shim: {
        underscore: { exports: '_' },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        handlebars: { exports: 'Handlebars' }
    }
});
requirejs(['ctl.admin'], function (AdminController) {
    AdminController.actions.showList();
    AdminController.actions.showDetail();

});