'use strict';

UniGallery.Galleries.after.insert(function (userId, doc) {
    _.each(doc.files_tmp, function (file_tmp) {
        _saveCfsFilesInsteadTmpFiles(doc);
    });
});

UniGallery.Galleries.after.update(function (userId, doc, fieldNames, modifier, options) {
    if(_.indexOf(fieldNames, 'files_tmp') !== -1 && modifier.$push){
        _saveCfsFilesInsteadTmpFiles(doc);
    }
});

var _saveCfsFilesInsteadTmpFiles = function (doc) {
    _.each(doc.files_tmp, function (file_tmp) {
        var file = UniGallery.GalleryFilesTmp.findOne(file_tmp);
        if(file) {
            UniGallery.Galleries.update(doc._id, {
                $push: {files: file.fileId}
            });
            UniGallery.Galleries.update(doc._id, {
                $pull: {files_tmp: file_tmp}
            });
            UniGallery.GalleryFilesTmp.remove(file_tmp);
        }
    });
};