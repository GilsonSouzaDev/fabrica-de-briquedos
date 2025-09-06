// api/ssr.ts

/// <reference path="./api-shims.d.ts" />

import { VercelRequest, VercelResponse } from '@vercel/node';
import { renderApplication } from '@angular/platform-server';

// Importa a função de bootstrap do servidor e o HTML base
import bootstrap from '../dist/fbc-brinquedos/server/main.server.js';
import html from '../dist/fbc-brinquedos/browser/index.html?raw';

// A função handler que a Vercel executa
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const renderedApp = await renderApplication(bootstrap, {
      document: html,
      url: req.url ?? '/',
    });

    res.status(200).send(renderedApp);
  } catch (error) {
    console.error('Erro durante a renderização SSR:', error);
    res.status(500).send('Ocorreu um erro no servidor.');
  }
}
