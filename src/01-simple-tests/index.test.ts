// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Add })).toBe(0);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Subtract })).toBe(0);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Multiply })).toBe(0);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 0, b: 1, action: Action.Divide })).toBe(0);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Exponentiate })).toBe(1);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 0, b: 0, action: '' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '', b: undefined, action: Action.Add })).toBe(null);
  });
});
