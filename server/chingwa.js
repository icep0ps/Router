const express = require('express');const router = express.Router();module.exports = function handler(){router.get("/", function hander(req, res) {
    res.send('hello from custom :)');
}); return router;}