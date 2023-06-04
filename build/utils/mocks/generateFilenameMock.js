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
Object.defineProperty(exports, "__esModule", { value: true });
const Tree_1 = __importStar(require("../Tree"));
let dir = new Tree_1.default('pages');
dir.add('meta', 'dir');
dir.add('versions', 'dir');
dir.add('api', 'dir');
const meta = dir.selecetDir('meta').add('keys', 'dir').add('index.ts', 'file');
meta.add('index.js', 'file');
dir.selecetDir('api').add('index.ts', 'file');
function generateFilenameMock(rootdir, dirs = []) {
    if (rootdir) {
        const files = rootdir._dir();
        for (var name of files) {
            let path = rootdir.parent;
            path = path.concat('/' + rootdir.name + '/' + name);
            let file = (0, Tree_1.lstats)(rootdir, name);
            if (file instanceof Tree_1.default && file._dir().length !== 0) {
                dirs.push(...generateFilenameMock(file));
            }
            else {
                // remove pages/root dir from path
                const replaced = path.split('/');
                const dir = replaced.slice(2, replaced.length).join('/');
                dirs.push(dir);
            }
        }
        return dirs;
    }
    else {
        throw new Error('please provide a valid directory');
    }
}
exports.default = generateFilenameMock;
