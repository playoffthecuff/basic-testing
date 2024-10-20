// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const p = [1, 2];
    expect(generateLinkedList(p).value).toStrictEqual(1);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const p = [2, 3];
    expect(generateLinkedList(p)).toMatchSnapshot();
  });
});
