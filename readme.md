# Universe Gallery

Content Management System for Universe Framework


> This package is part of Universe, a framework based on [Meteor platform](http://meteor.com)
maintained by [Vazco](http://www.vazco.eu).

> It works standalone, but you can get max out of it when using the whole system.



### 1. Create input hidden with unique id. Gallery id will be set in value of this input after adding file.
```
<input type="hidden" name="gallery_id" id="uniqueGalleryId" />
```

OR

```
{{> afFieldInput type="hidden" name="gallery_id" id="uniqueGalleryId"}}
```


### 2. Put this unique Id of input to parameter "input_id". This template needs to place outside any autoform block.

```
{{> universeGalleryAdd input_id="uniqueGalleryId"}}
```

### 3. If you would like to add own button to opening modal, you have to set "hide_button" param to "true" and create own button.

```
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal_uniqueGalleryId">
    Add gallery
</button>
{{> universeGalleryAdd input_id="uniqueGalleryId" hide_button="true"}}
```

### 4. To edit gallery you need include template "universeGalleryEdit" with "gallery_id" param.

```
{{> universeGalleryEdit gallery_id=gallery_id}}
```

### 5. To show gallery you need include template "universeGalleryView" with "gallery_id" param.

```
{{> universeGalleryView gallery_id=gallery_id}}
```

### 6. You need create publications like this:

```
Meteor.publish(null, function () {
    return [
        UniGallery.Galleries.find(),
        UniGallery.GalleryFilesCfs.find()
    ];
});
```

### 7. You need create access like this:

```
UniGallery.Galleries.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    }
});

UniGallery.GalleryFilesCfs.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    },
    download: function () {
        return true;
    }
});
```