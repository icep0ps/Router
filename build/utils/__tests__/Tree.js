"use strict";
class TNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}
class Tree {
    constructor() {
        this.HEAD = null;
    }
    prepend(value) {
        // add node to the start of the tree
        const node = new TNode(value, this.HEAD);
        this.HEAD = node;
    }
    append(value) {
        // adds node to the start of the tree
        let tmp = this.HEAD;
        while (tmp) {
            if (!tmp.next) {
                const node = new TNode(value, null);
                tmp.next = node;
                break;
            }
            tmp = tmp.next;
        }
    }
}
const tree = new Tree();
console.log(tree);
