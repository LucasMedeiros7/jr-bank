const invalidsCPFs = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999'
];

function validateCPF(strCPF: string): string | false {
  const cpf = clearCharactersFromCPF(strCPF);

  if (invalidsCPFs.includes(cpf) || !validateDigits(cpf)) {
    return false;
  }

  return cpf;
}

function clearCharactersFromCPF(cpf: string): string {
  cpf = cpf.replace(/[^\d]+/g, '');
  return cpf;
}

function validateDigits(cpf: string): boolean {
  let sum = 0;
  let rest: number;

  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * (11 - i - 1);
    rest = (sum * 10) % 11;
  }

  if (rest === 10 || rest === 11) {
    rest = 0;
  }

  if (rest != parseInt(cpf[9])) {
    return false;
  }

  sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * (12 - i - 1);
    rest = (sum * 10) % 11;
  }

  if (rest === 10 || rest === 11) {
    rest = 0;
  }

  if (rest != parseInt(cpf[cpf.length - 1])) {
    return false;
  }

  return true;
}

function fomartCPF(cpf: string): string {
  let cpfFormatted = '';

  for (let i = 0; i < cpf.length; i++) {
    switch (true) {
      case i === 2 || i === 5:
        cpfFormatted += cpf[i] + '.';
        break;
      case i === 8:
        cpfFormatted += cpf[i] + '-';
        break;
      default:
        cpfFormatted += cpf[i];
    }
  }

  return cpfFormatted;
}

export { validateCPF, fomartCPF };
