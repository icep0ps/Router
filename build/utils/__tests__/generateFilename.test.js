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
const Tree_1 = __importDefault(require("../Tree"));
const path_1 = require("path");
const getRoutes_1 = require("../getRoutes");
const generateFilenameMock_1 = __importDefault(require("../mocks/generateFilenameMock"));
describe('mock generateFilename should return correct dir paths', () => {
    let dir = new Tree_1.default('pages');
    beforeEach(() => {
        dir = new Tree_1.default('pages');
    });
    test('returns 1 path', () => {
        dir.add('meta', 'dir');
        expect((0, generateFilenameMock_1.default)(dir)).toEqual(expect.arrayContaining(['meta']));
    });
    test('returns 3 path', () => {
        dir.add('meta', 'dir');
        dir.add('versions', 'dir');
        dir.add('api', 'dir');
        const meta = dir.selecetDir('meta').add('keys', 'dir');
        meta.selecetDir('keys').add('index.ts', 'file');
        dir.selecetDir('api').add('index.ts', 'file');
        expect((0, generateFilenameMock_1.default)(dir)).toEqual(expect.arrayContaining(['meta/keys/index.ts', 'versions', 'api/index.ts']));
    });
    test('returns 4 paths', () => {
        dir.add('meta', 'dir');
        dir.add('versions', 'dir');
        dir.add('api', 'dir');
        const meta = dir.selecetDir('meta').add('keys', 'dir');
        meta.selecetDir('keys').add('index.ts', 'file');
        meta.add('index.js', 'file');
        dir.selecetDir('api').add('index.ts', 'file');
        expect((0, generateFilenameMock_1.default)(dir)).toEqual(expect.arrayContaining([
            'meta/keys/index.ts',
            'meta/index.js',
            'versions',
            'api/index.ts',
        ]));
    });
    test('returns 4 paths', () => {
        dir.add('meta', 'dir');
        const meta = dir.selecetDir('meta').add('keys', 'dir').add('index.ts', 'file');
        meta.selecetDir('keys').add('newkeys', 'dir').add('index.js', 'file');
        expect((0, generateFilenameMock_1.default)(dir)).toEqual(expect.arrayContaining(['meta/keys/index.js', 'meta/index.ts', 'meta/keys/newkeys']));
    });
});
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
