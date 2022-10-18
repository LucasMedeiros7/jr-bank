import { Cryptography } from './Cryptography';

describe('Cryptography passwords', () => {
  it('should return true when password is cryptograph', async () => {
    const inputPassword = '12345';
    const hashedPassword = await Cryptography.hash(inputPassword);

    expect(hashedPassword).not.toBe('12345');
    expect(await Cryptography.compare(inputPassword, hashedPassword)).toBe(
      true
    );
  });

  it('should return true when password is cryptograph', async () => {
    const inputPassword = '12345';
    const hashedPassword = await Cryptography.hash(inputPassword);

    expect(await Cryptography.compare('wrongPassword', hashedPassword)).toBe(
      false
    );
  });
});
