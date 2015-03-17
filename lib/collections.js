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
            fileId: {
                type: String
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
