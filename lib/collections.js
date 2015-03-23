'use strict';

UniGallery.Galleries = new Mongo.Collection('Galleries');
UniGallery.Galleries.attachSchema(
    new SimpleSchema({
        files: {
            type: [String],
            defaultValue: []
        },
        files_tmp: {
            type: [String],
            defaultValue: []
        },
        objects: {
            type: [new SimpleSchema({
                _id: {
                    type: String
                },
                collection_name: {
                    type: String
                }
            })],
            optional: true
        },
        createdAt: {
            type: Date,
            optional: true
        }
    })
);

UniGallery.Galleries.allow({
    insert: function () {
        return false;
    },
    update: function () {
        return false;
    },
    remove: function () {
        return false;
    }
});


UniGallery.GalleryFilesTmp = new Mongo.Collection('GalleryFilesTmp');
UniGallery.GalleryFilesTmp.attachSchema(
    new SimpleSchema({
        fileId: {
            type: String
        }
    })
);

// Collection for saving temporary fileId
UniGallery.GalleryFilesTmp.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return false;
    },
    remove: function () {
        return false;
    }
});


var _createThumb = function(fileObj, readStream, writeStream) {
    gm(readStream, fileObj.name()).resize('200', '200').stream().pipe(writeStream);
};

UniGallery.GalleryFilesCfs = new FS.Collection('GalleryFilesCfs', {
    stores: [
        new FS.Store.FileSystem('GalleryFilesCfs'),
        new FS.Store.FileSystem('GalleryFilesCfsThumbs', { transformWrite: _createThumb })
    ]
});

UniGallery.GalleryFilesCfs.allow({
    insert: function () {
        return false;
    },
    update: function () {
        return false;
    },
    remove: function () {
        return false;
    },
    download: function () {
        return false;
    },
    fetch: null
});
