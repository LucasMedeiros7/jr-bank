export function convertToBRLFormat(integer: number) {
  let integertoDecimal = integer / 100;
  const formatted = integertoDecimal.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
  return 'R$' + formatted.replace('R$', '').trim();
}
