import Dir, { lstats } from '../Tree';

let dir = new Dir('pages');

dir.add('meta', 'dir');
dir.add('versions', 'dir');
dir.add('api', 'dir');

const meta = dir.selecetDir('meta').add('keys', 'dir').add('index.ts', 'file');
meta.add('index.js', 'file');
dir.selecetDir('api').add('index.ts', 'file');

function generateFilenameMock(rootdir: Dir, dirs: string[] = []): string[] {
  if (rootdir) {
    const files = rootdir._dir();

    for (var name of files) {
      let path: string = rootdir.parent;

      path = path.concat('/' + rootdir.name + '/' + name);
      let file = lstats(rootdir, name);

      if (file instanceof Dir && file._dir().length !== 0) {
        dirs.push(...generateFilenameMock(file));
      } else {
        // remove pages/root dir from path
        const replaced = path.split('/');
        const dir = replaced.slice(2, replaced.length).join('/');
        dirs.push(dir);
      }
    }

    return dirs;
  } else {
    throw new Error('please provide a valid directory');
  }
}

export default generateFilenameMock;
