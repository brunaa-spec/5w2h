# 🚀 Como Publicar o Sistema 5W2H no GitHub

## 📋 Pré-requisitos

Antes de começar, você precisa:
- ✅ Conta no GitHub (criar em https://github.com)
- ✅ Git instalado no computador
- ✅ Acesso ao terminal/prompt de comando

---

## 🔧 Verificar se Git está instalado

Abra o terminal (Git Bash ou CMD) e execute:

```bash
git --version
```

Se retornar algo como `git version 2.x.x`, está instalado. Caso contrário, baixe em: https://git-scm.com/

---

## 📝 Passo a Passo Completo

### 1️⃣ Configurar Git (Primeira Vez)

Abra o terminal na pasta do projeto e configure seu nome e email:

```bash
cd "C:\Users\bruna.01841\Desenvolvimento"

git config --global user.name "Seu Nome"
git config --global user.email "seu.email@texcotton.com.br"
```

### 2️⃣ Criar Repositório no GitHub

1. Acesse https://github.com
2. Faça login na sua conta
3. Clique no botão **"+"** (canto superior direito) → **"New repository"**
4. Preencha:
   - **Repository name**: `sistema-5w2h-texcotton`
   - **Description**: `Sistema de Apontamento 5W2H - Texcotton SGQ v3.1`
   - **Visibility**:
     - ✅ **Private** (recomendado - apenas você vê)
     - ⚠️ Public (qualquer pessoa pode ver)
   - **NÃO** marque "Initialize with README" (já temos)
5. Clique em **"Create repository"**

### 3️⃣ Adicionar Arquivos ao Git

No terminal, execute os comandos abaixo **um por vez**:

```bash
# Navegue até a pasta do projeto
cd "C:\Users\bruna.01841\Desenvolvimento"

# Verifique o status
git status

# Adicione todos os arquivos importantes
git add 5w2h-interface.html
git add INDEX.html
git add README.md
git add DOCUMENTACAO-TECNICA.md
git add CHANGELOG.md
git add PROJETO-FINALIZADO.md
git add SISTEMA-5W2H-RESUMO.md
git add .gitignore

# Verifique o que será commitado
git status
```

### 4️⃣ Fazer o Primeiro Commit

```bash
git commit -m "feat: Sistema 5W2H v3.1 completo

- Sistema de IDs únicos implementado
- Filtros duplos (Status + Quem)
- Documentação completa em Markdown
- Gráficos dinâmicos e relatórios PDF
- Exportação Excel com IDs

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### 5️⃣ Conectar ao GitHub

Copie a URL do seu repositório GitHub (algo como: `https://github.com/seu-usuario/sistema-5w2h-texcotton.git`)

```bash
# Adicione o repositório remoto
git remote add origin https://github.com/SEU-USUARIO/sistema-5w2h-texcotton.git

# Verifique se foi adicionado
git remote -v
```

### 6️⃣ Enviar para o GitHub

```bash
# Renomeie a branch para 'main' (padrão do GitHub)
git branch -M main

# Envie os arquivos para o GitHub
git push -u origin main
```

**Importante**: Na primeira vez, o Git pedirá suas credenciais do GitHub.

---

## 🔐 Autenticação no GitHub

### Opção 1: Personal Access Token (Recomendado)

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token"** → **"Generate new token (classic)"**
3. Preencha:
   - **Note**: `Sistema 5W2H - Texcotton`
   - **Expiration**: `90 days` ou conforme necessário
   - **Scopes**: Marque **`repo`** (acesso completo aos repositórios)
4. Clique em **"Generate token"**
5. **COPIE O TOKEN** (você só verá uma vez!)
6. Quando o Git pedir senha, **cole o token** (não a senha da conta)

### Opção 2: GitHub CLI

```bash
# Instale GitHub CLI (se ainda não tiver)
# Baixe em: https://cli.github.com/

# Faça login
gh auth login

# Siga as instruções interativas
```

---

## ✅ Verificar se Funcionou

Após o `git push`, acesse seu repositório no navegador:

```
https://github.com/SEU-USUARIO/sistema-5w2h-texcotton
```

Você deve ver todos os arquivos listados! 🎉

---

## 📤 Atualizações Futuras

Quando fizer alterações no sistema, use:

```bash
# Navegue até a pasta
cd "C:\Users\bruna.01841\Desenvolvimento"

# Veja o que mudou
git status

# Adicione as mudanças
git add .

# Faça o commit
git commit -m "Descrição da mudança"

# Envie para o GitHub
git push
```

---

## 🌳 Estrutura de Branches (Opcional)

Para projetos maiores, você pode usar branches:

```bash
# Criar branch para desenvolvimento
git checkout -b develop

# Fazer alterações...
git add .
git commit -m "Novas funcionalidades"
git push -u origin develop

# Depois, fazer merge na main
git checkout main
git merge develop
git push
```

---

## 📋 Comandos Úteis

### Ver histórico de commits
```bash
git log --oneline
```

### Ver diferenças antes de commitar
```bash
git diff
```

### Desfazer alterações (antes do commit)
```bash
git checkout -- arquivo.html
```

### Ver branches
```bash
git branch -a
```

### Baixar atualizações do GitHub
```bash
git pull
```

---

## 🔗 URL do Repositório

Após criar o repositório, a URL será:

```
https://github.com/SEU-USUARIO/sistema-5w2h-texcotton
```

**Substitua `SEU-USUARIO`** pelo seu nome de usuário do GitHub.

---

## 📊 Arquivos que Serão Enviados

Os seguintes arquivos serão commitados:

✅ **Sistema Principal**
- `5w2h-interface.html` (Sistema completo v3.1)
- `INDEX.html` (Página de visualização)

✅ **Documentação**
- `README.md` (Guia de uso)
- `DOCUMENTACAO-TECNICA.md` (Especificações)
- `CHANGELOG.md` (Histórico de versões)
- `PROJETO-FINALIZADO.md` (Resumo de entrega)
- `SISTEMA-5W2H-RESUMO.md` (Resumo executivo)

✅ **Configuração**
- `.gitignore` (Arquivos a ignorar)

❌ **Arquivos Ignorados** (não serão enviados)
- `5w2h-interface.backup.html`
- `5w2h-SIMPLES.html`
- `VISUALIZAR-SISTEMA.html`
- `LEIA-ME.html`

---

## 🎓 Boas Práticas de Commit

### Formato de mensagem

```
tipo: breve descrição

- Detalhe 1
- Detalhe 2
- Detalhe 3

Co-Authored-By: Nome <email>
```

### Tipos comuns
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Alteração em documentação
- `style:` Formatação, CSS
- `refactor:` Refatoração de código
- `test:` Adição de testes
- `chore:` Tarefas de manutenção

### Exemplos
```bash
git commit -m "fix: corrigir detecção de atrasos"
git commit -m "docs: atualizar README com novos filtros"
git commit -m "feat: adicionar exportação em JSON"
```

---

## 🆘 Solução de Problemas

### Erro: "Permission denied"
**Solução**: Verifique suas credenciais ou use Personal Access Token

### Erro: "Repository not found"
**Solução**: Verifique se a URL do repositório está correta

### Erro: "Updates were rejected"
**Solução**: Execute `git pull` primeiro, depois `git push`

### Erro: "Not a git repository"
**Solução**: Execute `git init` na pasta correta

---

## 📞 Suporte

- **Documentação Git**: https://git-scm.com/doc
- **Guias GitHub**: https://docs.github.com
- **Contato**: gestao@texcotton.com.br

---

## ✅ Checklist Rápido

- [ ] Git instalado e configurado
- [ ] Conta GitHub criada
- [ ] Repositório criado no GitHub
- [ ] `git init` executado
- [ ] Arquivos adicionados com `git add`
- [ ] Primeiro commit feito
- [ ] Remote origin configurado
- [ ] `git push` executado com sucesso
- [ ] Arquivos visíveis no GitHub

---

**Desenvolvido para Texcotton SGQ**
**Sistema 5W2H v3.1**
**Data**: 17/02/2026
