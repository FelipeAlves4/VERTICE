# VÉRTICE — Men's Essentials

Um e-commerce conceitual de moda masculina premium criado para demonstrar design editorial, experiência de compra e desenvolvimento front-end.

> **Projeto demonstrativo:** os produtos, os preços e os pedidos são fictícios. Não há pagamentos reais, integração de entrega ou estoque de verdade.

## Tecnologias

- Next.js (App Router), React e TypeScript
- CSS customizado e Lucide Icons
- Carrinho persistente via `localStorage`
- Fotografia editorial original gerada por IA e otimizada para o projeto, em `public/editorial/`
- Fotografias ilustrativas de catálogo do Unsplash

## Rodar localmente

Requer Node.js 20.9+.

```bash
npm install
npm run dev
```

Acesse http://localhost:3000. `npm run build` faz o build de produção e `npm run typecheck` verifica TypeScript.

## Experiências da V0.3

- Homepage editorial responsiva, com narrativa da marca e coleções
- Catálogo com categorias e ordenação
- Busca por nome, categoria e descrição
- Seleção de tamanho, favoritos e sacola persistente
- Simulação de finalização sem pagamentos reais
- Cadastro de newsletter demonstrativo (sem capturar/transmitir e-mails)

- Lookbook editorial com mosaico responsivo e narrativa de marca
- Páginas estáticas de produto em `/produto/[slug]`, com galeria, tamanho e recomendações
- Sacola compartilhada entre páginas via `localStorage`

- Novas imagens editoriais originais na hero, lookbook e campanha
- Página de produto com galeria navegável e ampliação acessível
- Layout mobile reforçado para mostrar a fotografia antes da narrativa textual
- Transições respeitando `prefers-reduced-motion` e nova revisão de UX
- SEO: Open Graph, robots.txt e sitemap.xml

## Próximos passos

V0.2.1: refinar a fotografia e testar acessibilidade em dispositivos reais.
V0.3: autenticação, backend, banco de dados e painel administrativo.

## Imagens e direitos de uso

Fotografias ilustrativas externas são carregadas de `images.unsplash.com` e pertencem a seus respectivos autores. Verifique a licença e eventuais direitos de imagem de pessoas, logotipos ou marcas antes de reutilizar comercialmente. [Licença Unsplash](https://unsplash.com/license). O Pinterest será utilizado apenas para referências criativas, não como fonte de imagens sem autorização.

## Estrutura

- `app/page.tsx`: experiência principal e estados interativos
- `app/globals.css`: sistema visual responsivo
- `lib/products.ts`: catálogo fictício tipado