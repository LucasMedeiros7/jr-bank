import { convertToBRLFormat } from './convertToBRLFormat';

describe('Convert to BRL Format', () => {
  it('should format a integer to BRL format when the number passed is 1', () => {
    const integer = 1;
    expect(convertToBRLFormat(integer)).toBe('R$ 0,01');
  });

  it('should format a integer to BRL format when the number passed is 100', () => {
    const integer = 1000;
    expect(convertToBRLFormat(integer)).toEqual('R$ 10,00');
  });

  it('should format a integer to BRL format when the number passed is 1000', () => {
    const integer = 1000;
    expect(convertToBRLFormat(integer)).toBe('R$ 10,00');
  });

  it('should format a integer to BRL format when the number passed is 25000', () => {
    const integer = 25000;
    expect(convertToBRLFormat(integer)).toBe('R$ 250,00');
  });

  it('should format a integer to BRL format when the number passed is 3300000', () => {
    const integer = 3300000;
    expect(convertToBRLFormat(integer)).toBe('R$ 33.000,00');
  });

  it('should format a integer to BRL format when the number passed is 3300000', () => {
    const integer = 3300000;
    expect(convertToBRLFormat(integer)).toBe('R$ 33.000,00');
  });

  it('should format a integer to BRL format when the number passed is 3312300', () => {
    const integer = 3312300;
    expect(convertToBRLFormat(integer)).toBe('R$ 33.123,00');
  });
});
