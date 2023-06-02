import Dir from '../Tree';
import { resolve, join } from 'path';
import { generateFilename } from '../getRoutes';
import generateFilenameMock from '../mocks/generateFilenameMock';

describe('mock generateFilename should return correct dir paths', () => {
  let dir = new Dir('pages');

  beforeEach(() => {
    dir = new Dir('pages');
  });

  test('returns 1 path', () => {
    dir.add('meta', 'dir');
    expect(generateFilenameMock(dir)).toEqual(expect.arrayContaining(['meta']));
  });

  test('returns 3 path', () => {
    dir.add('meta', 'dir');
    dir.add('versions', 'dir');
    dir.add('api', 'dir');

    const meta = dir.selecetDir('meta').add('keys', 'dir');
    meta.selecetDir('keys').add('index.ts', 'file');
    dir.selecetDir('api').add('index.ts', 'file');

    expect(generateFilenameMock(dir)).toEqual(
      expect.arrayContaining(['meta/keys/index.ts', 'versions', 'api/index.ts'])
    );
  });

  test('returns 4 paths', () => {
    dir.add('meta', 'dir');
    dir.add('versions', 'dir');
    dir.add('api', 'dir');

    const meta = dir.selecetDir('meta').add('keys', 'dir');
    meta.selecetDir('keys').add('index.ts', 'file');
    meta.add('index.js', 'file');
    dir.selecetDir('api').add('index.ts', 'file');

    expect(generateFilenameMock(dir)).toEqual(
      expect.arrayContaining([
        'meta/keys/index.ts',
        'meta/index.js',
        'versions',
        'api/index.ts',
      ])
    );
  });

  test('returns 4 paths', () => {
    dir.add('meta', 'dir');
    const meta = dir.selecetDir('meta').add('keys', 'dir').add('index.ts', 'file');
    const keys = meta.selecetDir('keys').add('newkeys', 'dir').add('index.js', 'file');

    expect(generateFilenameMock(dir)).toEqual(
      expect.arrayContaining(['meta/keys/index.js', 'meta/index.ts', 'meta/keys/newkeys'])
    );
  });
});

test('returns paths', async () => {
  const dirSegmanets = resolve(__dirname).split('\\');
  const pagesDir = join(...dirSegmanets.slice(0, dirSegmanets.length - 2), 'pages');

  expect(await generateFilename(pagesDir)).toEqual(
    expect.arrayContaining(['api/blogs/index.ts', 'api/users/index.ts'])
  );
});

test('fails', async () => {
  const dirSegmanets = resolve(__dirname).split('\\');
  const pagesDir = join(...dirSegmanets.slice(0, dirSegmanets.length - 2), 'pages');

  expect(await generateFilename(pagesDir)).not.toEqual(
    expect.arrayContaining(['api/blogs/index.ts', 'users/index.ts'])
  );
});
