'use strict';

//(Meteor.isClient ? window : global).Images = new FS.Collection("files", {
//    stores: [new FS.Store.GridFS("filesStore")]
//});

//Images.allow({
//    download: function () {
//        return true;
//    },
//    fetch: null
//});

//if(Meteor.isServer){
//    Meteor.publish(null, function () {
//        return Images.find();
//    });
//}


UniGallery.addCollection('Galleries', {
    onInit: function (collection) {
        collection.Schema = new SimpleSchema({
            files: {
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
        });

        collection.attachSchema(collection.Schema);

        //collection.helpers({
        //    //@todo get user helper
        //});

        collection.allow({
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
        
        if (_.isFunction(UniGallery.onInitCallback)) {
            UniGallery.onInitCallback.call(this, collection);
        }
    }
});


UniGallery.getGalleryFiles = function (gallery_id){
    var gallery = UniGallery.Galleries.findOne(gallery_id);
    if(!gallery){
        return false;
    }

    var files_private = [];
    GalleryFiles.find({_id: {$in: gallery.files}}).forEach(function (doc){
        files_private.push(doc.fileId);
    });

    return GalleryFilesCfs.find({_id: {$in: files_private}});
};

UniGallery.removeFileFromGallery = function (gallery_id, file_cfs_id) {
    var file = GalleryFiles.findOne({fileId: file_cfs_id});
    var file_id, gallery_id, gallery;

    if(!file) {
        return false;
    }
    file_id = file._id;

    gallery = UniGallery.Galleries.findOne({files: file_id});
    if(gallery) {
        UniGallery.Galleries.update(gallery._id, {
            $pull: {files: file_id}
        });
    }

    GalleryFiles.remove(file_id);
    return true;
};