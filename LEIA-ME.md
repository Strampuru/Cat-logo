# Catálogo STRAMPURU — site estático

O site publicado é a pasta `strampuru-site-estatico/` (o `index.html` e as pastas
`assets/`, `lifestyle/`, etc.). O workflow `.github/workflows/pages.yml` publica-a
no GitHub Pages sempre que algo nessa pasta muda no ramo `main`:
https://strampuru.github.io/Cat-logo/

Também funciona aberto diretamente no computador.

## Estrutura

- `strampuru-site-estatico/` → o site pronto (gerado, não editar à mão)
- `codigo-fonte/` → código original exportado da Lovable (React + TanStack). **As alterações fazem-se aqui.**
  - `codigo-fonte/src/lib/catalogo.ts` → modelos, cores, tamanhos e preços
  - `codigo-fonte/src/routes/` → páginas (início, catálogo, categoria, modelo, contactos)
  - `codigo-fonte/src/components/` → cabeçalho, menu, cartões, pesquisa
- `codigo-fonte/conversor/` → transforma o código-fonte no `index.html` estático

## Como regenerar o site depois de uma alteração

O conversor precisa de: esbuild, react, react-dom, tailwindcss v4, clsx,
tailwind-merge e class-variance-authority (numa pasta node_modules indicada em TOOLS).

```sh
TOOLS=/caminho/para/node_modules node codigo-fonte/conversor/build.mjs \
  codigo-fonte/src codigo-fonte/public /tmp/site-novo
# depois copiar o conteúdo de /tmp/site-novo para a pasta strampuru-site-estatico/
```

A navegação usa endereços com `#` (ex.: `index.html#/modelo/lisboa`), por isso
não é preciso servidor nem página 404 especial.

## Imagens alojadas na Lovable

Muitas fotos dos modelos estão nos servidores da Lovable, não neste repositório.
O endereço de onde são carregadas está em `window.IMAGENS_ORIGEM`
(em `codigo-fonte/conversor/index.html` e no `index.html` gerado).
