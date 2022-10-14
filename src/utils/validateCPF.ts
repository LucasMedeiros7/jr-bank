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

export function validateCPF(strCPF: string): string {
  let sum = 0;
  let rest: number;

  let cpf = clearCharactersFromCPF(strCPF);

  if (invalidsCPFs.includes(cpf)) {
    return 'Invalid cpf';
  }

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;
  }

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(cpf.substring(9, 10))) return 'Invalid cpf';

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;
  }

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(cpf.substring(10, 11))) return 'Invalid cpf';

  return addCharactersToCPF(cpf);
}

function clearCharactersFromCPF(cpf: string): string {
  cpf = cpf.replace(/[^\d]+/g, '');
  return cpf;
}

function addCharactersToCPF(cpf: string): string {
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
