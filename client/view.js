'use strict';

Template.universeGalleryView.helpers({
    getPhotos: function () {
        var gallery_id = this.gallery_id;

        return UniGallery.getGalleryFiles(gallery_id);
    },
    getThumbWidth: function () {
        return UniGallery.thumbWidth;
    },
    getThumbHeight: function () {
        return UniGallery.thumbHeight;
    }
});
