"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hander(req, res) {
    console.log('im here');
    res.send('hello from custom');
}
exports.default = hander;
