'use strict';

window.UniGalleryFileSchema = new SimpleSchema({
    fileId: {
        type: String
    }
});

Template.universeGalleryAdd.created = function () {
    var template = this;
    template.gallery_id = new ReactiveVar('bArSR9ks9CMs5jXbZ');
};

Template.universeGalleryAdd.helpers({
    getPhotos: function () {
        var template = Template.instance();
        var gallery_id = template.gallery_id.get();

        return UniGallery.getGalleryFiles(gallery_id);
    }
});

Template.universeGalleryAdd.events({
    'change input.cfsaf-hidden': function (e, template) {
        var $form = $(template.find('form'));
        $form.submit();
    },
    'change input.js-universeGalleryId': function (e, template) {
        var $el = $(e.target);
        var gallery_id = $el.val();
        template.gallery_id.set(gallery_id);
    }
});

AutoForm.addHooks(['UniGalleryGalleries'], {
    onSuccess: function (formType, result, template) {
        var $input_file = $(template.find('input[type=file]'));
        var $input_gallery_id = $input_file.parents('.js-universeGallery').find('input.js-universeGalleryId');
        var gallery_id = $input_gallery_id.val();
        var file_priv_id = result;

        if(!gallery_id){
            UniGallery.Galleries.insert({
                files: [file_priv_id]
            }, function (error, result) {
                gallery_id = result;
                $input_gallery_id.val(gallery_id).change();
            });
        }else{
            UniGallery.Galleries.update(gallery_id, {
                $push: {files: file_priv_id}
            });
        }
    }
});
