"use strict";
class IFile {
    constructor(name, next) {
        this.name = name;
        this.next = next;
    }
}
class Dir {
    constructor(name, next = null, type) {
        this.name = name;
        this.next = next;
        this.HEAD = type === 'dir' ? null : new IFile(name, null);
    }
    prepend(name) {
        // add node to the start of the tree
        const node = new Dir(name, this.HEAD, 'dir');
        this.HEAD = node;
        return this.HEAD;
    }
    append(name, type) {
        // adds node to the end of the tree
        let node;
        if (type === 'dir') {
            node = new Dir(name, null, 'dir');
        }
        else {
            node = new IFile(name, null);
        }
        let tmp = this.HEAD;
        if (tmp) {
            console.log(tmp);
            while (tmp === null || tmp === void 0 ? void 0 : tmp.next) {
                tmp = tmp.next;
            }
            tmp.next = node;
        }
        else {
            this.HEAD = node;
        }
        return this.HEAD;
    }
}
const dir = new Dir('pages', null, 'dir');
console.log(dir);
const api = dir.prepend('api');
const blogs = api.append('blogs', 'dir');
api.append('index.js', 'file');
console.log(dir);
