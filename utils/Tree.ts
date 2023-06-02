type IType = 'dir' | 'file';

export class IFile {
  public parent: string;

  constructor(public name: string) {
    this.parent = '';
  }

  public set setparent(parentname: string) {
    this.parent = parentname;
  }
}

class Dir {
  public _dir: () => string[];
  public parent: string;

  constructor(
    public name: string,
    public contents: Map<string, Dir | IFile> = new Map()
  ) {
    this.parent = '';
    this._dir = () => Array.from(this.contents.keys());
  }

  private set setparent(parentname: string) {
    this.parent = parentname;
  }

  add(node: string, type: IType) {
    const dir = new Dir(node);
    dir.setparent = this.parent.concat('/' + this.name);

    const file = new IFile(node);
    file.setparent = this.parent.concat('/' + this.name);

    if (type === 'dir') {
      this.contents.set(node, dir);
    } else {
      this.contents.set(node, file);
    }

    return this;
  }

  selecetDir(node: string) {
    const value = this.contents.get(node);

    if (value instanceof Dir) {
      return value;
    } else if (value instanceof IFile) {
      throw new Error('please select a directory not a file');
    } else {
      throw new Error('directory does not exist');
    }
  }

  remove(node: IFile | Dir) {
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
      } else {
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

export function lstats(dir: Dir, path: string) {
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

export default Dir;
