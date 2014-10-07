define(['jquery'], function ($) {
    return {
        uploadImg: function (files, response) {
            var data = new FormData();

            $.each(files, function (key, value) {
                data.append(key, value);
            });

            $.ajax({
                url: 'http://illuminus.jessicamarcus.com:4700/api/upload',
                type: 'POST',
                processData: false,
                contentType: false,
                data: data,
                success: function (data) {
                    //take img path, convert into url
                    var r = new RegExp('\\\\', 'g'),
                        imageUrl = data.replace(r, '/');
                    response(imageUrl);
                },
                error: function () {
                    console.log('uploadImg ajax error')
                }
            });

        },
        previewImg: function () {
            var preview = document.getElementById('photoUploadPreview'),
                file = document.querySelector('input[type=file]').files[0],
                reader = new FileReader();

            reader.onloadend = function () {
                $(preview).attr('src', reader.result);
            };

            if (file) reader.readAsDataURL(file);
            else preview.src = '';
        }
    }
});