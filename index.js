const express = require('express');
const path = require('path');
const url = require('url');
const http = require('http');
const app = express();
var router = express.Router();

var port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});

const resolve = require('path').resolve

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/videos'));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('pages/home');
})

app.get('/standard', function (req, res) {
  res.render('pages/standard');
})

app.get('/scientific', function (req, res) {
  res.render('pages/scientific');
})

app.get('/compound', function (req, res) {
  res.render('pages/compound');
})
