type IType = 'file' | 'dir';

class IFile {
  constructor(public name: string, public next: null) {}
}

class Dir {
  HEAD: Dir | IFile | null;

  constructor(public name: string, public next: Dir | IFile | null = null, type: IType) {
    this.HEAD = type === 'dir' ? null : new IFile(name, null);
  }

  prepend(name: string) {
    // add node to the start of the tree

    const node = new Dir(name, this.HEAD, 'dir');
    this.HEAD = node;

    return this.HEAD;
  }

  append(name: string, type: IType) {
    // adds node to the end of the tree
    let node: Dir | IFile;

    if (type === 'dir') {
      node = new Dir(name, null, 'dir');
    } else {
      node = new IFile(name, null);
    }

    let tmp = this.HEAD;
    if (tmp) {
      console.log(tmp);
      while (tmp?.next) {
        tmp = tmp.next;
      }
      tmp!.next = node;
    } else {
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
