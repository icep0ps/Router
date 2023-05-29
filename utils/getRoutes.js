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
const fse = require('fs-extra');
const promises_1 = require("fs/promises");
const promises_2 = require("fs/promises");
const path_1 = require("path");
function getRoutes() {
    return __awaiter(this, void 0, void 0, function* () {
        const dirSegmanets = (0, path_1.resolve)(__dirname).split('\\');
        const pagesDir = (0, path_1.join)(...dirSegmanets.slice(0, dirSegmanets.length - 1), 'pages');
        const serverDir = (0, path_1.join)(...dirSegmanets.slice(0, dirSegmanets.length - 1), 'server');
        const files = yield generateFilename(pagesDir);
        for (const file of yield (0, promises_2.readdir)(serverDir)) {
            yield fse.remove((0, path_1.join)(serverDir, file));
        }
        return Promise.all(files.map((filename) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const pathname = filename.replace(/\.[^/.]+$/, '');
            const splitPath = pathname.split('/');
            const segments = splitPath.map((route, i) => i === splitPath.length - 1 ? route.concat('.js') : route);
            const route = yield (_a = `../pages/${filename}`, Promise.resolve().then(() => __importStar(require(_a))));
            // modules are imports that the user has at the top of the file
            // for example importing prisma client
            const modules = [];
            let router = `module.exports = function handler(){return ${route.default}}`;
            for (const module of modules) {
                router = module.concat(router);
            }
            yield fse.outputFile((0, path_1.join)((0, path_1.dirname)(__dirname), 'server', ...segments), router);
            return pathname;
        })));
    });
}
function generateFilename(upperDir, arr = []) {
    return __awaiter(this, void 0, void 0, function* () {
        let rDirt = upperDir;
        const files = yield (0, promises_2.readdir)(upperDir);
        for (var dir of files) {
            rDirt = (0, path_1.join)(upperDir, dir);
            let file = yield (0, promises_1.lstat)(rDirt);
            if (file.isDirectory()) {
                arr.push(...(yield generateFilename(rDirt)));
            }
            else {
                const replaced = (0, path_1.resolve)(rDirt).split('\\');
                const dirs = replaced
                    .slice(replaced.indexOf('pages') + 1, replaced.length)
                    .join('/');
                arr.push(dirs);
            }
        }
        return arr;
    });
}
exports.default = getRoutes;
