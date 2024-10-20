// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';
import * as lodash from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(0).getBalance()).toBe(0);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(0).withdraw(1)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => getBankAccount(0).transfer(1, getBankAccount(0))).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const a = getBankAccount(0);
    expect(() => a.transfer(0, a)).toThrow();
  });

  test('should deposit money', () => {
    expect(getBankAccount(0).deposit(1).getBalance()).toBe(1);
  });

  test('should withdraw money', () => {
    expect(getBankAccount(1).withdraw(1).getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    expect(() =>
      getBankAccount(1).transfer(1, getBankAccount(0)),
    ).not.toThrow();
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (lodash.random as jest.Mock).mockReturnValueOnce(0).mockReturnValueOnce(1);
    await expect(getBankAccount(0).fetchBalance()).resolves.toBe(0);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (lodash.random as jest.Mock).mockReturnValueOnce(1).mockReturnValueOnce(1);
    const a = getBankAccount(0);
    await a.synchronizeBalance();
    expect(a.getBalance()).toBe(1);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (lodash.random as jest.Mock).mockReturnValueOnce(0).mockReturnValueOnce(0);
    await expect(getBankAccount(0).synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
