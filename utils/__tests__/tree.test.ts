import { join, resolve } from 'path';
import Dir, { lstats, IFile } from '../Tree';
import { readdir } from 'fs/promises';

describe('add function adds dirs and files to parent dir ', () => {
  let dir: Dir;

  beforeEach(() => {
    dir = new Dir('pages');
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
  let dir: Dir;

  beforeEach(() => {
    dir = new Dir('root');
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
  const dir = new Dir('page');
  dir.add('api', 'dir');
  dir.selecetDir('api').add('blogs', 'dir').add('users', 'dir').add('profile', 'dir');

  test('matches pages dir', async () => {
    const dirsegmanets = resolve(__dirname).split('\\');
    const pagesdir = join(
      ...dirsegmanets.slice(0, dirsegmanets.length - 2),
      'pages',
      'api'
    );

    const nodedir = await readdir(pagesdir);

    expect(dir.readdirs()).toEqual(expect.arrayContaining(nodedir));
  });
});

describe('lstat function work', () => {
  test('returns a directory', () => {
    const dir = new Dir('page');
    dir.add('api', 'dir');
    dir
      .selecetDir('api')
      .add('blogs', 'dir')
      .add('users', 'dir')
      .add('profile', 'dir')
      .add('index.js', 'file');

    expect(lstats(dir, 'api/blogs')).toBeInstanceOf(Dir);
  });

  test('returns a file', () => {
    const dir = new Dir('page');
    dir.add('api', 'dir');
    dir
      .selecetDir('api')
      .add('blogs', 'dir')
      .add('users', 'dir')
      .add('profile', 'dir')
      .add('index.js', 'file');

    expect(lstats(dir, 'api/index.js')).toBeInstanceOf(IFile);
  });

  test('not to be a directory', () => {
    const dir = new Dir('page');
    dir.add('api', 'dir');
    const api = dir
      .selecetDir('api')
      .add('blogs', 'dir')
      .add('users', 'dir')
      .add('profile', 'dir')
      .add('index.js', 'file');

    api.selecetDir('blogs').add('index.js', 'file');

    expect(lstats(dir, 'api/blogs/index.js')).not.toBeInstanceOf(Dir);
  });
});
