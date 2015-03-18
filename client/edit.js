'use strict';

Template.universeGalleryEdit.helpers({
    getPhotos: function () {
        var gallery_id = this.gallery_id;

        return UniGallery.getGalleryFiles(gallery_id);
    }
});


Template.universeGalleryEdit.events({
    'change input.cfsaf-hidden': function (e, template) {
        var $form = $(template.find('form'));
        $form.submit();
    },
    'change input.js-universeGalleryId': function (e, template) {
        var $el = $(e.target);
        var gallery_id = $el.val();
        template.gallery_id.set(gallery_id);
    },
    'click .js-remove-photo': function (e, template) {
        var $el = $(e.target);
        var $input = $(template.find('.js-universeGalleryId'));
        var gallery_id = $input.val();
        var file_id = $el.attr('data-id') ? $el.attr('data-id') : $el.parent().attr('data-id');

        UniGallery.removeFileFromGallery(gallery_id, file_id);
    }
});


AutoForm.addHooks(['UniGalleryEditGalleries'], {
    onSuccess: function (formType, result, template) {
        var $input_file = $(template.find('input[type=file]'));
        var $input_gallery_id = $input_file.parents('.js-universeGalleryEdit').find('input.js-universeGalleryId');
        var gallery_id = $input_gallery_id.val();
        var file_cfs_id = result;

        UniGallery.Galleries.update(gallery_id, {
            $push: {files: file_cfs_id}
        });
    }
});
