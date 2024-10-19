// Uncomment the code below and write your tests
import { simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 0, b: 0, action: '+' })).toBe(0);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 0, b: 0, action: '-' })).toBe(0);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 0, b: 0, action: '*' })).toBe(0);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 0, b: 1, action: '/' })).toBe(0);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 0, b: 0, action: '^' })).toBe(1);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 0, b: 0, action: '' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '', b: undefined, action: '+' })).toBe(null);
  });
});
