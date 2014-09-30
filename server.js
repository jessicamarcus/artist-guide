var application_root = __dirname,
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');
    //errorHandler = require('express-error-handler');

var app = express(),
    port = 4700;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/json' }));
app.use(bodyParser.json({ type: 'text/plain' }));
app.use(methodOverride());
app.use(express.static(path.join(application_root, '')));
//app.use(errorHandler({ dumpExceptions: true, showStack: true }));

app.route('/api')
    .get(function (req, resp) {
        resp.send('api is up and running')
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
    webLink: String,
    published: Boolean,
    displayAltName: Boolean
});

var ArtistModel = mongoose.model('Artist', Artist);

app.listen(port);
console.log('Express server listening on port ' + port);