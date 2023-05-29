const express = require('express');const router = express.Router();module.exports = function handler(){return function hander(req, res) {
    res.send('hello from custom :)');
}}