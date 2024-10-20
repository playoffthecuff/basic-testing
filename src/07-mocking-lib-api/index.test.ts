// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: jest.fn((f) => f),
}));
jest.mock('axios');

const b = { baseURL: 'https://jsonplaceholder.typicode.com' };
const p = 'posts';
const data = '';

describe('throttledGetDataFromApi', () => {
  let a: { get: jest.Mock };
  beforeEach(() => {
    a = { get: jest.fn().mockResolvedValue({ data }) };
    (axios.create as jest.Mock).mockReturnValue(a);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async (): Promise<void> => {
    const c = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(p);
    expect(c).lastCalledWith(b);
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(p);
    expect(a.get).toHaveBeenCalledWith(p);
  });

  test('should return response data', async () => {
    await expect(throttledGetDataFromApi(p)).resolves.toBe(data);
  });
});
