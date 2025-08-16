# Projeto de Scraping Amazon

## 1. Descrição do Projeto

Este projeto permite buscar produtos na Amazon através de uma palavra-chave. Ele consiste em:

- **Backend**: API em Bun + Express que faz scraping da Amazon usando `axios` e `jsdom`.
- **Frontend**: Página web simples com Vite, HTML, CSS e JavaScript puro, consumindo a API e exibindo os resultados.

---

## 2. Backend

### 2.1. Pré-requisitos

- [Bun](https://bun.sh)
- Node.js (opcional, caso queira usar pacotes npm compatíveis)

### 2.2. Instalação

1. Clone o repositório:

```bash
git clone <seu-repositorio>
cd backend
```

2. Instale as dependências:

```bash
bun install
bun add express axios jsdom
```

### 2.3. Execução

```bash
bun run index.js
```

O backend estará rodando em `http://localhost:3000`.

### 2.4. Endpoint

- **GET /api/scrape?keyword=PALAVRA_CHAVE**
  Retorna os produtos encontrados em JSON, incluindo:

  - `title` — título do produto
  - `rating` — avaliação (estrelas de 1 a 5)
  - `reviews` — número de avaliações
  - `image` — URL da imagem do produto

---

## 3. Frontend

### 3.1. Pré-requisitos

- [Node.js](https://nodejs.org/)
- NPM ou Yarn

### 3.2. Instalação

1. Navegue até a pasta frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

### 3.3. Execução

```bash
npm run dev
```

O frontend estará rodando no endereço mostrado no terminal (geralmente `http://localhost:5173`).

### 3.4. Funcionalidades

- Campo de entrada para digitar a palavra-chave.
- Botão "Buscar" para iniciar o scraping.
- Exibição formatada dos produtos encontrados:

  - Imagem
  - Título
  - Avaliação e número de reviews

---

## 4. Observações

- Pode ser necessário adicionar [CORS](https://www.npmjs.com/package/cors) no backend se houver problemas de requisição do frontend:

```bash
bun add cors
```

```javascript
import cors from 'cors';
app.use(cors());
```

- A Amazon pode bloquear requisições automatizadas em produção. Para uso real, considere proxies ou APIs oficiais.

- Todos os arquivos possuem comentários explicando a lógica de implementação.

---
