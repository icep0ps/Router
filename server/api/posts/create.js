const express = require('express');const router = express.Router();module.exports = function handler(){return function handler(req, res) {
    res.send('im create route');
}}