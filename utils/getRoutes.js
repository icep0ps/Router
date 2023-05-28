"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../pages/index"));
const promises_1 = require("fs/promises");
const path_1 = require("path");
function getRoutes() {
    return __awaiter(this, void 0, void 0, function* () {
        const filename = (0, path_1.basename)((0, path_1.join)(__dirname, 'pages', 'index'), '.js');
        const modules = [
            "const express = require('express');",
            'const router = express.Router();',
        ];
        const router = `module.exports = function handler(){console.log("handling!"); router.get("/", ${index_1.default}); return router;}`;
        yield new Promise((resolve, reject) => {
            modules.forEach((module) => __awaiter(this, void 0, void 0, function* () {
                yield (0, promises_1.appendFile)((0, path_1.join)((0, path_1.dirname)(__dirname), 'server', `${filename}.js`), module);
            }));
            resolve('sucess');
        });
        yield (0, promises_1.appendFile)((0, path_1.join)((0, path_1.dirname)(__dirname), 'server', `${filename}.js`), router);
        return [filename];
    });
}
exports.default = getRoutes;
