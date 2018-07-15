/*
    Browser main code
    By Zoey Désautels
*/

// Imports
const path = require('path'), fs = require('fs'), request = require('request');
const {remote, shell, clipboard, nativeImage} = require('electron');
const {Menu, MenuItem, dialog} = remote;

// Load the boorus
const Danbooru = new (require('./boorus/Danbooru.js'));
const Gelbooru = new (require('./boorus/Gelbooru.js'));
const Derpibooru = new (require('./boorus/Derpibooru.js'));
//let selectedBooru = Gelbooru;

// Components
const SearchBar = new (require('./components/SearchBar.js'));
const ImagesArea = new (require('./components/ImagesArea.js'));
const ImageViewer = new (require('./components/ImageViewer.js'));
const NotificationBox = new (require('./components/NotificationBox.js'));
const Browser = new (require('./components/Browser.js'));
const BoorusSelect = new (require('./components/BoorusSelect.js'));