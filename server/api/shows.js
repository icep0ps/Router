const express = require('express');const router = express.Router();module.exports = function handler(){return function handler(req, res) {
  res.json({ msg: 'this is shows route' });
}}