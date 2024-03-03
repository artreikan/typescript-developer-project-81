/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import fs from 'node:fs/promises';
import path from 'node:path';
import { expect, describe, it } from 'vitest';
import HexletCode from '../hexlet-code';

async function readFixtureFile(filename: string) {
  const filePath = path.join(__dirname, '..', '__fixtures__', filename);
  const content = await fs.readFile(filePath, 'utf8');

  return content;
}

describe('hexlet-code', () => {
  it('pass empty params into formFor static method -> return default form template', async () => {
    const template = {};
    const params = {};
    const callback = () => {};

    const expectedHtml = await readFixtureFile('form1.html');

    const form = HexletCode.formFor(template, params, callback);

    expect(form).toBe(expectedHtml);
  });

  it('pass url into formFor static method params -> return form with custom action', async () => {
    const template = {};
    const params = { url: '/users' };
    const callback = () => {};

    const expectedHtml = await readFixtureFile('form2.html');

    const form = HexletCode.formFor(template, params, callback);

    expect(form).toBe(expectedHtml);
  });

  it('pass template into formFor static method params -> return form with custom template', async () => {
    const template = { name: 'rob', job: 'hexlet', gender: 'm' };

    const expectedHtml = await readFixtureFile('form3.html');

    const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
      f.input('name');
      f.input('gender');
      f.input('job', { as: 'textarea' });
    });

    expect(form).toBe(expectedHtml);
  });

  it('try to create input for non-existent field -> throw error', () => {
    const template = { name: 'rob', job: 'hexlet', gender: 'm' };
    const callback = (f: HexletCode) => {
      f.input('age');
    };

    expect(() => HexletCode.formFor(template, { method: 'post' }, callback)).toThrowError('Field \'age\' does not exist in the template.');
  });
});
