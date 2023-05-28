const express = require('express');const router = express.Router();module.exports = function handler(){console.log("handling!"); router.get("/", function hander(req, res) {
    console.log('im here');
    res.send('hello from custom');
}); return router;}