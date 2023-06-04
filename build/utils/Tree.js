"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lstats = exports.IFile = void 0;
class IFile {
    constructor(name) {
        this.name = name;
        this.parent = '';
    }
    set setparent(parentname) {
        this.parent = parentname;
    }
}
exports.IFile = IFile;
class Dir {
    constructor(name, contents = new Map()) {
        this.name = name;
        this.contents = contents;
        this.parent = '';
        this._dir = () => Array.from(this.contents.keys());
    }
    set setparent(parentname) {
        this.parent = parentname;
    }
    add(node, type) {
        const dir = new Dir(node);
        dir.setparent = this.parent.concat('/' + this.name);
        const file = new IFile(node);
        file.setparent = this.parent.concat('/' + this.name);
        if (type === 'dir') {
            this.contents.set(node, dir);
        }
        else {
            this.contents.set(node, file);
        }
        return this;
    }
    selecetDir(node) {
        const value = this.contents.get(node);
        if (value instanceof Dir) {
            return value;
        }
        else if (value instanceof IFile) {
            throw new Error('please select a directory not a file');
        }
        else {
            throw new Error('directory does not exist');
        }
    }
    remove(node) {
        this.contents.delete(node.name);
    }
    readdirs() {
        const paths = this._dir();
        const path = paths.map((dir) => {
            const value = this.contents.get(dir);
            if (value) {
                if (value instanceof Dir) {
                    return value._dir();
                }
            }
            else {
                throw new Error('Path does not exist'.concat(dir));
            }
        });
        return path
            .map((array) => {
            if (array) {
                return array.filter((path) => path !== undefined);
            }
            return [];
        })
            .join(',')
            .split(',');
    }
}
function lstats(dir, path) {
    const paths = path.split('/').filter((item) => item !== '');
    let file = dir.contents.get(paths[0]);
    if (file) {
        while (file instanceof Dir && paths[1]) {
            paths.shift();
            file = file.contents.get(paths[0]);
        }
        return file;
    }
    console.log('this is file:', file, path, dir);
    return file;
}
exports.lstats = lstats;
exports.default = Dir;
