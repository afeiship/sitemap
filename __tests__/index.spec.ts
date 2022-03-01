import fn from '../src';
import nx from '@jswork/next';
import '@jswork/next-range';

describe('api.basic', () => {
  test('normail single value case', () => {
    const ids = nx.range(1, 10000);
    const urls = ids.map((id) => `http://www.example.com/${id}`);

    fn(urls, { limit: 3000, cwd: '.tmp' });
  });
});
