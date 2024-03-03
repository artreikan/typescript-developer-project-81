/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { expect, describe, it } from 'vitest';
import HexletCode from '../hexlet-code';

describe('hexlet-code', () => {
  it('pass empty params into formFor static method -> return default form template', () => {
    const template = {};
    const params = {};
    const callback = () => {};

    const expectedString = '<form action="#" method="post"></form>';

    const result = HexletCode.formFor(template, params, callback);

    expect(result).toBe(expectedString);
  });

  it('pass url into formFor static method params -> return form with custom action', () => {
    const template = {};
    const params = { url: '/users' };
    const callback = () => {};

    const expectedString = '<form action="/users" method="post"></form>';

    const result = HexletCode.formFor(template, params, callback);

    expect(result).toBe(expectedString);
  });
});
