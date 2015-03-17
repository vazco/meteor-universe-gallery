'use strict';

Template.universeGalleryAdd.helpers({
    getPhotos: function () {

        return GalleryFiles.find();
    }
});