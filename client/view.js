'use strict';


Template.universeGalleryView.helpers({
    getPhotos: function () {
        var gallery_id = this.gallery_id;

        return UniGallery.getGalleryFiles(gallery_id);
    }
});

Template.universeGalleryView.rendered = function () {
    $(this.findAll('.universeGalleryView a')).fancybox({
        'transitionIn'	:	'elastic',
        'transitionOut'	:	'elastic',
        'speedIn'		:	600,
        'speedOut'		:	200,
        'overlayShow'	:	false
    });

};