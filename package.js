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
        'less',
        'underscore',
        'vazco:universe-core',
        'vazco:universe-core-plugin',
        'aldeed:collection2',
        'aldeed:simple-schema',
        'matb33:collection-hooks',
        'aldeed:autoform@4.2.2',
        'cfs:standard-packages',
        'cfs:autoform@2.1.1',
        'cfs:graphicsmagick',
        'vazco:tools-common'
    ], ['client', 'server']);


    api.add_files([
        'UniGallery.js',
        'lib/collections.js',
        'lib/hooks.js'
    ]);

    api.add_files([
        'client/add.html',
        'client/add.js',
        'client/edit.html',
        'client/edit.js',
        'client/view.html',
        'client/view.js',
        'vendors/lightbox.css',
        'vendors/lightbox.min.js',
        'client/stylesheets/gallery.less'
    ], 'client');

    api.export('UniGallery');
});