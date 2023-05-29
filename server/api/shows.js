const express = require('express');const router = express.Router();module.exports = function handler(){router.get("/", function handler(req, res) {
  res.json({ msg: 'this is shows route' });
}); return router;}