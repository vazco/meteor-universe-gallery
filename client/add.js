'use strict';

Template.universeGalleryAdd.created = function () {
    var template = this;
    template.gallery_id = new ReactiveVar();
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
    'click .js-remove-photo': function (e, template) {
        var $el = $(e.target);
        var gallery_id = template.gallery_id.get();
        var file_id = $el.attr('data-id') ? $el.attr('data-id') : $el.parent().attr('data-id');

        UniGallery.removeFileFromGallery(gallery_id, file_id);
    }
});

AutoForm.addHooks(['UniGalleryGalleries'], {
    onSuccess: function (formType, result, template) {
        var parent_template = UniUtils.getParentTemplateInstance('universeGalleryAdd', template);
        var gallery_id = parent_template.gallery_id.get();
        var input_id = template.data.input_id;
        var $input_gallery_id = $('input#'+input_id);
        var file_id = result;

        if(!gallery_id){
            UniGallery.Galleries.insert({
                files: [file_id]
            }, function (error, result) {
                gallery_id = result;
                parent_template.gallery_id.set(gallery_id);
                $input_gallery_id.val(gallery_id).change();
            });
        }else{
            UniGallery.Galleries.update(gallery_id, {
                $push: {files: file_id}
            });
        }
    }
});
