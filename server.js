var application_root = __dirname,
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    formidable = require('formidable');
    //errorHandler = require('express-error-handler');



var app = express(),
    port = 4700;

function accessControlOptions (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    next();
}

app.use(accessControlOptions);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/json' }));
app.use(bodyParser.json({ type: 'text/plain' }));
app.use(methodOverride());
app.use(express.static(path.join(application_root, '')));
//app.use(errorHandler({ dumpExceptions: true, showStack: true }));

app.route('/api/upload')
    .post(function (req, resp) {
        var form = new formidable.IncomingForm(),
            path = '';
        form.uploadDir = 'artists/img';
        form.keepExtensions = true;
//        form.on('progress', function (bytesReceived, bytesExpected) {
//            var percent = Math.floor(bytesReceived / bytesExpected * 100);
//            console.log(percent);
//        });
        form.on('file', function (name, file) {
            path = file.path;
        });
        form.on('end', function () {
            resp.end(path);
        });
        form.parse(req);
    });

app.route('/api/artists')
    //get all artists
    .get(function (req, resp) {
        return ArtistModel.find(function (err, artists) {
            if (!err) {
                return resp.send(artists)
            } else {
                return console.log(err)
            }
        })
    })
    //add new artist
    .post(function (req, resp) {
        var artist = new ArtistModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            projectName: req.body.projectName,
            projectDesc: req.body.projectDesc,
            artistBio: req.body.artistBio,
            photoUrl: req.body.photoUrl,
            webLink: req.body.webLink,
            published: req.body.published,
            displayAltName: req.body.displayAltName
        });
        return artist.save(function (err) {
            if (!err) {
                console.log('created');
                return resp.send(artist);
            } else {
                console.log(err);
            }
        });
    });

app.route('/api/artists/:id')
    //get artist by id
    .get(function (req, resp) {
        return ArtistModel.findById(req.params.id, function (err, artist) {
            if (!err) {
                return resp.send(artist);
            } else {
                return console.log(err);
            }
        })
    })
    // update artist
    .put(function (req, resp) {
        console.log('Updating artist ' + req.params.id);
        return ArtistModel.findById(req.params.id, function (err, artist) {
            artist.firstName = req.body.firstName;
            artist.lastName = req.body.lastName;
            artist.projectName = req.body.projectName;
            artist.projectDesc = req.body.projectDesc;
            artist.artistBio = req.body.artistBio;
            artist.photoUrl = req.body.photoUrl;
            artist.webLink = req.body.webLink;
            artist.published = req.body.published;
            artist.displayAltName = req.body.displayAltName;

            return artist.save(function (err) {
                if (!err) {
                    console.log('artist updated');
                    return resp.send(artist);
                } else {
                    console.log(err);
                }
            })
        })
    })
    .delete(function (req, resp) {
        console.log('deleting artist with id: ' + req.params.id);
        return ArtistModel.findById(req.params.id, function (err, artist) {
            return artist.remove(function (err) {
                if (!err) {
                    console.log('artist removed');
                    return resp.send('');
                } else {
                    console.log(err);
                }
            })
    });
});

mongoose.connect('mongodb://localhost/mongodb/data');
var Artist = new mongoose.Schema({
    firstName: String,
    lastName: String,
    projectName: String,
    projectDesc: String,
    artistBio: String,
    photoUrl: String,
    webLink: String,
    published: Boolean,
    displayAltName: Boolean
});

var ArtistModel = mongoose.model('Artist', Artist);

app.listen(port);
console.log('Express server listening on port ' + port);