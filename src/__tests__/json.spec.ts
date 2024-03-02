import { expect, test } from 'vitest';
import fs from 'node:fs';

test('check json equality', async () => {
  const json = await fs.promises.readFile(`${__dirname}/../__fixtures__/test1.json`, 'utf-8');
  expect(JSON.parse(json)).toEqual({ foo: 'bar', bar: 'baz', test: {} });
});
