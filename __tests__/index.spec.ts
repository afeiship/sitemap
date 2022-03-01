import fn from '../src';

describe('api.basic', () => {
  test('normail single value case', () => {
    const urls = ['https://www.js.work/1.html', 'https://www.js.work/2.html'];

    fn(urls, { limit: 30000, cwd: process.cwd() });
  });
});
