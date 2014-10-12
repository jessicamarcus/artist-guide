// Google Maps Scripts
// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 17,
        center: new google.maps.LatLng(42.341236, -71.066167),
        disableDefaultUI: true,
        scrollwheel: false,
        draggable: true,

        styles: [
            {
                "stylers": [
                    {
                        "hue": "#ff1a00"
                    },
                    {
                        "invert_lightness": true
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 33
                    },
                    {
                        "gamma": 0.5
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#2d333c"
                    },
                    {
                        "lightness": 10
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            }
        ]
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
}