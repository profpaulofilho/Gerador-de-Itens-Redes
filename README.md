# Gerador de Itens v3 — Guia para leigos

Este projeto funciona de 2 jeitos:

1. **Modo Local**
   - Não precisa de API.
   - Você abre o site e já consegue gerar itens por regras e templates.

2. **Modo Gemini**
   - Usa sua chave do Gemini.
   - Gera itens com mais variedade.
   - Precisa publicar no Render para funcionar online com backend.

## Parte 1 — Testar no seu computador

1. Baixe o ZIP e descompacte.
2. Abra a pasta do projeto.
3. Clique duas vezes em `index.html`.
4. O sistema abrirá no navegador.
5. Deixe o campo **Modo** como **Local**.
6. Preencha os dados e clique em **Gerar item**.

## Parte 2 — Publicar no Render

### Passo 1 — Criar conta no GitHub
1. Acesse o GitHub.
2. Crie sua conta.
3. Faça login.

### Passo 2 — Criar o repositório
1. Clique em **New repository**.
2. Dê um nome, por exemplo: `gerador-itens-redes`.
3. Deixe como **Public**.
4. Clique em **Create repository**.

### Passo 3 — Subir os arquivos
1. Entre no repositório criado.
2. Clique em **uploading an existing file**.
3. Arraste todos os arquivos da pasta do projeto.
4. Clique em **Commit changes**.

### Passo 4 — Criar conta no Render
1. Acesse o Render.
2. Faça login com GitHub.

### Passo 5 — Criar o serviço
1. Clique em **New +**.
2. Escolha **Web Service**.
3. Selecione o repositório que você criou.

### Passo 6 — Configurar o serviço
Use estes valores:

- **Name**: `gerador-itens-redes`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

Depois clique em **Create Web Service**.

### Passo 7 — Configurar a chave do Gemini
1. No painel do Render, abra seu serviço.
2. Vá em **Environment**.
3. Crie a variável:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: sua chave
4. Salve.
5. Faça um novo deploy se o Render solicitar.

### Passo 8 — Usar online
1. Abra o endereço gerado pelo Render.
2. Troque o modo para **Gemini**.
3. Gere seu item.

## Arquivos principais
- `index.html`: interface do sistema
- `styles.css`: aparência visual
- `course-data.js`: banco das UCs, habilidades e conhecimentos
- `app.js`: lógica do formulário, histórico e exportações
- `server/server.js`: backend que conversa com o Gemini
- `package.json`: dependências do Node
- `render.yaml`: configuração básica para o Render

## Importante
- Se a chave do Gemini não estiver configurada, o modo **Gemini** não funciona.
- O modo **Local** continua funcionando mesmo sem internet.
- Os itens do histórico ficam salvos no navegador do computador.
