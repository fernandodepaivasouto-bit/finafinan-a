# Fina Finança

App web que lê a fatura do cartão de crédito, separa os gastos por categoria, aponta o que parece assinatura e mostra onde dá para economizar.

Tudo é processado no navegador. Nenhum dado da fatura sai do aparelho.

## O que faz

- Lê texto colado, CSV (Nubank, Inter, C6 e outros), OFX e PDF (inclusive com senha)
- Classifica em supermercado, delivery, transporte, compras, saúde, contas, lazer, viagem e tarifas
- Marca cada gasto como essencial, supérfluo ou evitável
- Detecta assinaturas conhecidas e cobranças recorrentes, com custo anual
- Gera dicas de economia com valores da sua fatura
- Funciona offline e pode ser instalado como app no celular

## Publicar no GitHub Pages

1. Crie um repositório novo no GitHub (por exemplo `fina-financa`).
2. Envie todos os arquivos desta pasta para a raiz do repositório, mantendo a pasta `icons/`:
   ```
   index.html
   manifest.webmanifest
   sw.js
   README.md
   icons/
   ```
   Pelo site: **Add file → Upload files**, arraste os arquivos e a pasta `icons`, e clique em **Commit changes**.
3. Vá em **Settings → Pages**. Em **Source**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`, e salve.
4. Em um ou dois minutos o app fica disponível em `https://SEU-USUARIO.github.io/fina-financa/`.

O app precisa ser aberto por `https://` para poder ser instalado. Abrir o `index.html` direto do computador funciona para usar, mas não instala.

## Instalar no celular

**Android (Chrome):** abra o link do app. Toque em **Instalar app** no topo da página, ou no menu ⋮ → **Instalar app** / **Adicionar à tela inicial**.

**iPhone (Safari):** abra o link no Safari, toque em **Compartilhar** (quadrado com seta) → **Adicionar à Tela de Início**.

Depois disso o Fina Finança aparece com ícone próprio e abre em tela cheia, como um app.

## Atualizar o app

Ao mudar o `index.html`, troque também a versão em `sw.js` (`fina-financa-v3` → `fina-financa-v4`). Assim os celulares que já instalaram baixam a versão nova.
