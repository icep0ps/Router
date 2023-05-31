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
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const getRoutes_1 = require("../getRoutes");
test('returns paths', () => __awaiter(void 0, void 0, void 0, function* () {
    const dirSegmanets = (0, path_1.resolve)(__dirname).split('\\');
    const pagesDir = (0, path_1.join)(...dirSegmanets.slice(0, dirSegmanets.length - 2), 'pages');
    expect(yield (0, getRoutes_1.generateFilename)(pagesDir)).toEqual(expect.arrayContaining(['api/blogs/index.ts', 'api/users/index.ts']));
}));
test('fails', () => __awaiter(void 0, void 0, void 0, function* () {
    const dirSegmanets = (0, path_1.resolve)(__dirname).split('\\');
    const pagesDir = (0, path_1.join)(...dirSegmanets.slice(0, dirSegmanets.length - 2), 'pages');
    expect(yield (0, getRoutes_1.generateFilename)(pagesDir)).not.toEqual(expect.arrayContaining(['api/blogs/index.ts', 'users/index.ts']));
}));
