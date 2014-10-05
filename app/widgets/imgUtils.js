define(['jquery'], function ($) {

    return {
        uploadImg: function (files) {
            var data = new FormData();

            $.each(files, function (key, value) {
                data.append(key, value);
            });

            $.ajax({
                url: '/api/upload',
                type: 'POST',
                processData: false,
                contentType: false,
                data: data,
                success: function (data) {
                    //take img path, convert into url
                    var r = new RegExp('\\\\', 'g'),
                        imageUrl = data.replace(r, '/');
                    console.log(imageUrl);
                },
                error: function () {
                    console.log('uploadImg ajax error')
                }
            })
        },
        previewImg: function () {
        var preview = document.querySelector('img'),
            file = document.querySelector('input[type=file]').files[0],
            reader = new FileReader();

        reader.onloadend = function () {
            preview.src = reader.result;
        };

        if (file) reader.readAsDataURL(file);
        else preview.src = '';
        }
    }
});