"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const path_1 = require("path");
function getRoutes() {
    return __awaiter(this, void 0, void 0, function* () {
        const arr = (0, path_1.resolve)(__dirname).split('\\');
        const pagesDir = (0, path_1.join)(...arr.slice(0, arr.length - 1), 'pages');
        const serverDir = (0, path_1.join)(...arr.slice(0, arr.length - 1), 'server');
        const files = yield (0, promises_1.readdir)(pagesDir);
        for (const file of yield (0, promises_1.readdir)(serverDir)) {
            yield (0, promises_1.unlink)((0, path_1.join)(serverDir, file));
        }
        return Promise.all(files.map((filename) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const pagesDir = (0, path_1.basename)(filename, '.js');
            const route = yield (_a = `../pages/${filename}`, Promise.resolve().then(() => __importStar(require(_a))));
            const modules = [
                "const express = require('express');",
                'const router = express.Router();',
            ];
            const router = `module.exports = function handler(){router.get("/", ${route.default}); return router;}`;
            yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                for (const module of modules) {
                    yield (0, promises_1.appendFile)((0, path_1.join)((0, path_1.dirname)(__dirname), 'server', `${pagesDir}.js`), module);
                }
                resolve('sucess');
            }));
            yield (0, promises_1.appendFile)((0, path_1.join)((0, path_1.dirname)(__dirname), 'server', `${pagesDir}.js`), router);
            return pagesDir;
        })));
    });
}
exports.default = getRoutes;
