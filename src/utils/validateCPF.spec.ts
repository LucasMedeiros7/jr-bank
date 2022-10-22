import { fomartCPF, validateCPF } from './validateCPF';

describe('Validate CPF', () => {
  it('should return true when valid cpf is passed with characters', () => {
    expect(validateCPF('854.219.680-57')).toBe(true);
  });

  it('should return true when valid cpf is passed without characters', () => {
    expect(validateCPF('08209665090')).toBe(true);
  });

  it('should return false when the cpf passed is invalid', () => {
    expect(validateCPF('12345678911')).toBe(false);
    expect(validateCPF('123.456.789-11')).toBe(false);
  });

  it('should format the cpf', () => {
    expect(fomartCPF('08209665090')).toBe('082.096.650-90');
    expect(fomartCPF('082.096.650-90')).toBe('082.096.650-90');
  });
});
