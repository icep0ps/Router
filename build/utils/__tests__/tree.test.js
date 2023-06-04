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
const path_1 = require("path");
const Tree_1 = __importStar(require("../Tree"));
const promises_1 = require("fs/promises");
describe('add function adds dirs and files to parent dir ', () => {
    let dir;
    beforeEach(() => {
        dir = new Tree_1.default('pages');
    });
    test('adds api dir', () => {
        const test_dir = dir.add('api', 'dir');
        expect(test_dir._dir()).toContain('api');
    });
    test('adds api dir and index file', () => {
        const test_dir = dir.add('api', 'dir').add('index.js', 'file');
        expect(test_dir._dir()).toEqual(expect.arrayContaining(['api', 'index.js']));
    });
    test('adds index file and users file', () => {
        const test_dir = dir.add('users.js', 'file').add('index.js', 'file');
        expect(test_dir._dir()).toEqual(expect.arrayContaining(['users.js', 'index.js']));
    });
});
describe('readdir function returns dirs', () => {
    let dir;
    beforeEach(() => {
        dir = new Tree_1.default('root');
    });
    test('directories to be 2 empty arrays', () => {
        // function will read the 2 directories below
        dir.add('pages', 'dir').add('blogs', 'dir');
        expect(dir.readdirs()).toEqual(['', '']);
    });
    test('api directory to have blogs and users', () => {
        // function will read the directory below
        dir.add('api', 'dir');
        dir.selecetDir('api').add('blogs', 'dir').add('users', 'dir');
        expect(dir.readdirs()).toEqual(['blogs', 'users']);
    });
    test('api dir to have users and blogs but for meta to be empty', () => {
        // function will read the directory below
        dir.add('api', 'dir').add('meta', 'dir');
        dir.selecetDir('api').add('blogs', 'dir').add('users', 'dir');
        dir.selecetDir('meta').add('index.js', 'file');
        expect(dir.readdirs()).toEqual(['blogs', 'users', 'index.js']);
    });
});
describe('matches nodes readdir function', () => {
    const dir = new Tree_1.default('page');
    dir.add('api', 'dir');
    dir.selecetDir('api').add('blogs', 'dir').add('users', 'dir').add('profile', 'dir');
    test('matches pages dir', () => __awaiter(void 0, void 0, void 0, function* () {
        const dirsegmanets = (0, path_1.resolve)(__dirname).split('\\');
        const pagesdir = (0, path_1.join)(...dirsegmanets.slice(0, dirsegmanets.length - 2), 'pages', 'api');
        const nodedir = yield (0, promises_1.readdir)(pagesdir);
        expect(dir.readdirs()).toEqual(expect.arrayContaining(nodedir));
    }));
});
describe('lstat function work', () => {
    test('returns a directory', () => {
        const dir = new Tree_1.default('page');
        dir.add('api', 'dir');
        dir
            .selecetDir('api')
            .add('blogs', 'dir')
            .add('users', 'dir')
            .add('profile', 'dir')
            .add('index.js', 'file');
        expect((0, Tree_1.lstats)(dir, 'api/blogs')).toBeInstanceOf(Tree_1.default);
    });
    test('returns a file', () => {
        const dir = new Tree_1.default('page');
        dir.add('api', 'dir');
        dir
            .selecetDir('api')
            .add('blogs', 'dir')
            .add('users', 'dir')
            .add('profile', 'dir')
            .add('index.js', 'file');
        expect((0, Tree_1.lstats)(dir, 'api/index.js')).toBeInstanceOf(Tree_1.IFile);
    });
    test('not to be a directory', () => {
        const dir = new Tree_1.default('page');
        dir.add('api', 'dir');
        const api = dir
            .selecetDir('api')
            .add('blogs', 'dir')
            .add('users', 'dir')
            .add('profile', 'dir')
            .add('index.js', 'file');
        api.selecetDir('blogs').add('index.js', 'file');
        expect((0, Tree_1.lstats)(dir, 'api/blogs/index.js')).not.toBeInstanceOf(Tree_1.default);
    });
});
