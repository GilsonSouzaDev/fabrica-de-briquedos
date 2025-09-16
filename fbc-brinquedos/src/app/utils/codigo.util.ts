import { Brinquedo } from '../interfaces/brinquedo';

/**
 * Calcula o próximo código disponível para um brinquedo.
 * - Começa em 1001 se a lista estiver vazia
 * - Reaproveita lacunas existentes
 * - Caso não haja lacunas, usa max(códigos) + 1
 */
export function getNextCodigo(brinquedos: Brinquedo[]): number {
  if (!brinquedos || brinquedos.length === 0) {
    return 1001;
  }

  // pega todos os códigos já usados em ordem crescente
  const codigos = brinquedos.map((b) => b.codigo).sort((a, b) => a - b);

  // percorre procurando a primeira lacuna
  for (let i = 0; i < codigos.length; i++) {
    const esperado = 1001 + i;
    if (codigos[i] !== esperado) {
      return esperado;
    }
  }

  // se não encontrou lacuna, continua sequência
  return codigos[codigos.length - 1] + 1;
}
