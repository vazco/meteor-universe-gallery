'use strict';

Package.describe({
    name: 'vazco:universe-gallery',
    summary: 'Gallery for Universe',
    version: '0.0.1'
});

Package.on_use(function (api) {
    api.versionsFrom('1.0.1');

    api.use([
        'check',
        'templating',
        'underscore',
        'vazco:universe-core',
        'vazco:universe-core-plugin',
        'aldeed:collection2',
        'aldeed:simple-schema',
        'aldeed:autoform@4.2.2',
        'cfs:standard-packages',
        'cfs:autoform@2.1.1',
        'vazco:tools-common',
        'mrt:fancybox'
    ], ['client', 'server']);



    //api.add_files(['plugin.js']);

    api.add_files([
        'UniGallery.js',
        'lib/collections.js'
    ]);

    api.add_files([
        'client/add.html',
        'client/add.js',
        'client/edit.html',
        'client/edit.js',
        'client/view.html',
        'client/view.js',
        'client/stylesheets/gallery.css'
    //    'client/views/profile.html',
    //    'client/views/profile.js',
    //    'client/stylesheet/profile.css',
    //    'client/views/report.html',
    //    'client/views/report.js',
    //    'client/views/settings.html',
    //    'client/views/settings.js',
    //    'client/views/friends.html',
    //    'client/views/friends.js'
    ], 'client');
    //
    //api.add_files([
    //    'server/publications.js',
    //    'server/methods.js'
    //], 'server');

    api.export('UniGallery');
});