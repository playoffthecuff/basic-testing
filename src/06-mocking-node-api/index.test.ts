// Uncomment the code below and write your tests
import { join } from 'path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const c = jest.fn();
    const t = 0;

    doStuffByTimeout(c, t);

    expect(setTimeout).toHaveBeenCalledWith(c, t);
  });

  test('should call callback only after timeout', () => {
    const c = jest.fn();
    const t = 0;

    doStuffByTimeout(c, t);

    expect(c).not.toHaveBeenCalled();

    jest.advanceTimersByTime(t);

    expect(c).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => jest.clearAllTimers());

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const c = jest.fn();
    const t = 0;

    doStuffByInterval(c, t);

    expect(setInterval).toHaveBeenCalledWith(c, t);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const c = jest.fn();
    const t = 1;
    const q = 2;

    doStuffByInterval(c, t);
    jest.advanceTimersByTime(t * q);
    expect(c).toHaveBeenCalledTimes(q);
  });
});

jest.mock('path', () => ({ join: jest.fn(() => '') }));
jest.mock('fs', () => ({ existsSync: jest.fn(() => true) }));
jest.mock('fs/promises', () => ({ readFile: jest.fn() }));

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const p = 'test';
    await readFileAsynchronously(p);
    expect(join).toHaveBeenCalledWith(__dirname, p);
  });

  test('should return null if file does not exist', async () => {
    await expect(readFileAsynchronously('')).resolves.toBe(null);
  });

  test('should return file content if file exists', async () => {
    const s = 'test';
    const c = Buffer.from(s);
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as unknown as jest.Mock).mockResolvedValue(c);
    await expect(readFileAsynchronously('')).resolves.toBe(s);
  });
});
