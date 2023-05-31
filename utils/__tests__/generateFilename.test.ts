import { resolve, join } from 'path';
import { generateFilename } from '../getRoutes';

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
