'use strict';

/* global UniGallery: true */

UniGallery = new UniPlugin('UniGallery');


UniGallery.getGalleryFiles = function (gallery_id){
    var gallery = UniGallery.Galleries.findOne(gallery_id);
    if(!gallery){
        return false;
    }

    //var files_private = [];
    //UniGallery.GalleryFilesTmp.find({_id: {$in: gallery.files}}).forEach(function (doc){
    //    files_private.push(doc.fileId);
    //});

    return UniGallery.GalleryFilesCfs.find({_id: {$in: gallery.files}});
};

UniGallery.removeFileFromGallery = function (gallery_id, file_cfs_id) {
    if(!gallery_id){
        var gallery = UniGallery.Galleries.findOne({files: file_cfs_id});
        if(gallery) {
            gallery_id = gallery._id;
        }else {
            return false;
        }
    }

    UniGallery.Galleries.update(gallery_id, {
        $pull: {files: file_cfs_id}
    });

    return true;
};