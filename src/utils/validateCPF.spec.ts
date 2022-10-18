import { fomartCPF, validateCPF } from './validateCPF';

describe('Validate CPF', () => {
  it('should receive a valid cpf with characters and return the same cpf', () => {
    const validCPF = validateCPF('854.219.680-57');

    if (!validCPF) {
      throw new Error('Test failed');
    }

    expect(fomartCPF(validCPF)).toBe('854.219.680-57');
  });

  it('should receive a valid cpf with no characters and return the formatted cpf', () => {
    const validCPF = validateCPF('08209665090 ');

    if (!validCPF) {
      throw new Error('Test failed');
    }

    expect(fomartCPF(validCPF)).toBe('082.096.650-90');
  });

  it('should return "Invalid cpf" when the cpf passed is invalid', () => {
    expect(validateCPF('12345678911')).toBe(false);
    expect(validateCPF('123.456.789-11')).toBe(false);
  });
});
