import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'real',
  standalone: true,
})
export class RealPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return 'R$ 0,00';
    }

    // Converter para número
    const numericValue =
      typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;

    // Validar se é um número
    if (isNaN(numericValue)) {
      return 'R$ 0,00';
    }

    // Formatar para o padrão brasileiro
    return this.formatarReal(numericValue);
  }

  private formatarReal(valor: number): string {
    // Arredondar para 2 casas decimais
    const valorArredondado = Math.round(valor * 100) / 100;

    // Separar parte inteira e decimal
    const partes = valorArredondado.toFixed(2).split('.');
    const parteInteira = partes[0];
    const parteDecimal = partes[1] || '00';

    // Adicionar separadores de milhar
    const parteInteiraFormatada = parteInteira.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      '.'
    );

    return `R$ ${parteInteiraFormatada},${parteDecimal}`;
  }
}
