// api/api-shims.d.ts

// Informa ao TypeScript que qualquer importação terminada em .js é válida.
declare module '*.js';

// Informa ao TypeScript como lidar com importações de HTML com o sufixo ?raw.
declare module '*?raw' {
  const content: string;
  export default content;
}
