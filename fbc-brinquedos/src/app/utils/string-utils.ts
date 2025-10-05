// src/app/core/utils/string-utils.ts

export class StringUtils {
  /**
   * Normaliza um texto removendo acentos e convertendo para minúsculas.
   * Essencial para fazer comparações de texto consistentes.
   * @param text O texto a ser normalizado.
   * @returns O texto normalizado.
   */
  private static normalize(text: string): string {
    if (!text) {
      return '';
    }
    return text
      .toLowerCase()
      .normalize('NFD') // Separa os acentos das letras
      .replace(/[\u0300-\u036f]/g, ''); // Remove os acentos
  }

  /**
   * Filtra uma lista de objetos com base em um termo de busca e uma propriedade específica.
   * A comparação ignora acentos e diferenças de maiúsculas/minúsculas.
   *
   * @template T O tipo dos objetos na lista.
   * @param items A lista de objetos a ser filtrada.
   * @param searchTerm O termo de busca.
   * @param property A chave do objeto onde a busca deve ser realizada.
   * @returns Uma nova lista contendo apenas os itens que correspondem ao termo de busca.
   */
  public static filterByTerm<T>(
    items: T[],
    searchTerm: string,
    property: keyof T
  ): T[] {
    const normalizedSearchTerm = StringUtils.normalize(searchTerm);

    if (!normalizedSearchTerm) {
      return items; // Se a busca for vazia, retorna todos os itens
    }

    return items.filter((item) => {
      const propertyValue = item[property];
      // Garante que o valor da propriedade seja uma string antes de normalizar
      if (typeof propertyValue === 'string') {
        const normalizedItemValue = StringUtils.normalize(propertyValue);
        return normalizedItemValue.includes(normalizedSearchTerm);
      }
      return false;
    });
  }
}
