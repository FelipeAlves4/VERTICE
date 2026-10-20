# VÉRTICE — Men's Essentials

Um e-commerce conceitual de moda masculina premium criado para demonstrar design editorial, experiência de compra e desenvolvimento front-end.

> **Projeto demonstrativo:** os produtos, os preços e os pedidos são fictícios. Não há pagamentos reais, integração de entrega ou estoque de verdade.

## Tecnologias

- Next.js (App Router), React e TypeScript
- CSS customizado e Lucide Icons
- Carrinho persistente via `localStorage`
- Campanha editorial original gerada por IA e salva localmente em WebP de 1024 × 1536 px, otimizada responsivamente com Next.js
- Sete fotografias de produtos geradas por IA, em WebP local de 1024×1536 px
- Hoodie Studio ainda com fotografia ilustrativa do Unsplash

## Rodar localmente

Requer Node.js 20.9+.

```bash
npm install
npm run dev
```

Acesse http://localhost:3000. `npm run build` faz o build de produção e `npm run typecheck` verifica TypeScript.

## Experiências da V0.4

- Homepage editorial responsiva, com narrativa da marca e coleções
- Catálogo com categorias e ordenação
- Busca por nome, categoria e descrição
- Seleção de tamanho, favoritos e sacola persistente
- Simulação de finalização sem pagamentos reais
- Cadastro de newsletter demonstrativo (sem capturar/transmitir e-mails)

- Lookbook editorial com mosaico responsivo e narrativa de marca
- Páginas estáticas de produto em `/produto/[slug]`, com galeria, tamanho e recomendações
- Sacola compartilhada entre páginas via `localStorage`

- Imagens autorais geradas por IA em WebP na hero, lookbook e campanha, com mesma direção de arte
- Página de produto com galeria navegável e ampliação acessível
- Layout mobile reforçado para mostrar a fotografia antes da narrativa textual
- Transições respeitando `prefers-reduced-motion` e nova revisão de UX
- SEO: Open Graph, robots.txt e sitemap.xml

## Próximos passos

V0.2.1: refinar a fotografia e testar acessibilidade em dispositivos reais.
V0.3: autenticação, backend, banco de dados e painel administrativo.

## Imagens e direitos de uso

Na V0.3.2, as imagens principais são fotografias **conceituais geradas por IA**, sem logotipos de terceiros. Dois arquivos WebP (`public/editorial/sand.webp` e `public/editorial/noir.webp`) de 1024 × 1536 px substituem as fotografias Unsplash que estavam desalinhadas com a estética da marca. As roupas exibidas são ilustrações e não necessariamente correspondem aos produtos fictícios cadastrados. As imagens do **catálogo** continuam ilustrativas, provenientes do Unsplash, e devem ser auditadas individualmente antes de reutilização comercial.

Fotografias ilustrativas externas são carregadas de `images.unsplash.com` e pertencem a seus respectivos autores. Verifique a licença e eventuais direitos de imagem de pessoas, logotipos ou marcas antes de reutilizar comercialmente. [Licença Unsplash](https://unsplash.com/license). O Pinterest será utilizado apenas para referências criativas, não como fonte de imagens sem autorização.

## Estrutura

- `app/page.tsx`: experiência principal e estados interativos
- `app/globals.css`: sistema visual responsivo
- `lib/products.ts`: catálogo fictício tipado

## V0.3.2 — Correção de identidade visual

A V0.3.1 continha um lookbook com camiseta estampada de outra marca e um retrato P&B sem relação com o restante. A correção recupera a direção original: tons de areia/preto, peças sem marcas, arquitetura brutalista e luz quente. As duas novas imagens são versionadas no repositório, evitando dependência de fotografias externas na campanha principal.

### Checklist de revisão

- Abrir a home no desktop e conferir ausência de logos alheios na campanha.
- Verificar hero, imagem principal do lookbook, segunda imagem do lookbook e campanha.
- Conferir enquadramento de rosto e roupa no celular e desktop.
- Testar a sacola e a página de produtos. O catálogo continua com imagens externas ilustrativas.

## V0.4 — Catálogo e fluxo demonstrativo

Sete produtos receberam imagens autorais em `public/products`, com direção de arte consistente, sem marcas de terceiros. A exceção é o Hoodie Studio, que permanece com imagem do Unsplash enquanto não temos uma fotografia equivalente própria.

As páginas individuais exibem fichas conceituais de produto e ampliam a mesma fotografia, com aviso explícito para não fingir ângulos inexistentes.

O checkout em `/checkout` é puramente demonstrativo: lê a sacola do navegador, simula frete e conclui uma jornada **sem coletar dados pessoais, sem pagamento e sem pedido real**.

O estudo de caso está em `/projeto` e descreve decisões técnicas e visuais sem métricas inventadas.
