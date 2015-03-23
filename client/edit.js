'use strict';

Template.universeGalleryEdit.created = function () {
    var template = this;
    template.gallery_id = new ReactiveVar(this.data.gallery_id);
};

Template.universeGalleryEdit.helpers({
    getPhotos: function () {
        var gallery_id = this.gallery_id;

        return UniGallery.getGalleryFiles(gallery_id);
    }
});


Template.universeGalleryEdit.events({
    //'change input.cfsaf-hidden': function (e, template) {
    //    var $form = $(template.find('form'));
    //    $form.submit();
    //},
    'click .js-remove-photo': function (e, template) {
        var $el = $(e.target);
        var gallery_id = template.gallery_id.get();
        var file_id = $el.attr('data-id') ? $el.attr('data-id') : $el.parent().attr('data-id');

        UniGallery.removeFileFromGallery(gallery_id, file_id);
    }
});


AutoForm.addHooks(['UniGalleryEditGalleries'], {
    onSuccess: function (formType, result, template) {
        var parent_template = UniUtils.getParentTemplateInstance('universeGalleryEdit', template);
        var gallery_id = parent_template.gallery_id.get();
        var file_tmp_id = result;
        var gallery;

        if(!gallery_id){
            return false;
        }

        gallery = UniGallery.Galleries.findOne(gallery_id, {fields: {_id: 1}});

        if(!gallery){
            UniGallery.Galleries.insert({
                _id: gallery_id,
                files_tmp: [file_tmp_id]
            });
        }else{
            UniGallery.Galleries.update(gallery_id, {
                $push: {files_tmp: file_tmp_id}
            });
        }
    }
});
