//preview img upon its selection - uses FileReader API
function previewImg() {
    var preview = document.querySelector('img'),
        file = document.querySelector('input[type=file]').files[0],
        reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    };

    if (file) reader.readAsDataURL(file);
    else preview.src = '';
}

function uploadImg() {
    if (document.getElementById('photoUpload').files.length) {
        var files = document.getElementById('photoUpload').files,
        data = new FormData();

        $.each(files, function(key, value) {
            data.append(key, value);
        });

        $.ajax({
            url: '/api/upload',
            type: 'POST',
            processData: false,
            contentType: false,
            data: data,
            success: function (data, status) {
                //take img path, convert into url
                var r = new RegExp('\\\\', 'g'),
                    imageUrl = data.replace(r, '/');
                console.log('status: ' + status);
                console.log(imageUrl);
            },
            error: function () { console.log('client: error') }
        })
    }
}