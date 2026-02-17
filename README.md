# 📋 Sistema de Apontamento 5W2H - Texcotton SGQ

Sistema completo de gestão de ações baseado na metodologia 5W2H, desenvolvido para o Sistema de Gestão da Qualidade da Texcotton.

## 📌 Sumário

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Como Usar](#como-usar)
- [Estrutura do 5W2H](#estrutura-do-5w2h)
- [Recursos Avançados](#recursos-avançados)
- [Exportação e Relatórios](#exportação-e-relatórios)
- [Configurações](#configurações)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Armazenamento de Dados](#armazenamento-de-dados)
- [Suporte e Manutenção](#suporte-e-manutenção)

---

## 🎯 Visão Geral

O **Sistema 5W2H** é uma ferramenta web moderna e intuitiva para gerenciamento de planos de ação seguindo a metodologia 5W2H (What, Why, Where, When, Who, How, How Much).

### Principais Características:

- ✅ Interface responsiva e moderna
- ✅ Gestão completa de ações (CRUD)
- ✅ **Sistema de IDs únicos e sequenciais** (5W2H-001, 5W2H-002, etc.)
- ✅ Sistema de status automático
- ✅ Notificações de prazos
- ✅ Histórico de alterações
- ✅ Exportação Excel e PDF com IDs
- ✅ Armazenamento local (navegador)
- ✅ Filtros duplos (Status + Quem)

---

## 🚀 Funcionalidades

### 1. **Gestão de Ações**

#### Sistema de IDs Únicos
- **Geração automática** de ID sequencial (formato: 5W2H-001, 5W2H-002, etc.)
- **IDs permanentes**: Nunca são reutilizados, mesmo após exclusão
- **Exibição destacada**: IDs aparecem em azul na tabela
- **Presentes em**: Tabela, PDF e Excel
- **Retrocompatibilidade**: Ações antigas recebem IDs automaticamente

#### Criar Nova Ação
- Formulário completo com todos os campos 5W2H
- **ID gerado automaticamente** ao salvar
- Validação de campos obrigatórios
- Seleção de células pré-definidas (01-08) ou local customizado
- Datas de início e fim
- Atribuição de responsável

#### Editar Ação
- Modificação de qualquer campo
- Manutenção do histórico de alterações
- Validação em tempo real

#### Excluir Ação
- Confirmação antes de excluir
- Remoção permanente dos dados

### 2. **Sistema de Status**

O sistema possui 4 status principais:

| Status | Cor | Descrição |
|--------|-----|-----------|
| **Não Iniciado** | Cinza | Ação ainda não começou |
| **Em Andamento** | Amarelo | Ação em execução |
| **Em Atraso** | Vermelho | Data fim ultrapassada |
| **Finalizado** | Verde | Ação concluída |

#### Detecção Automática de Atraso
- Verificação automática a cada hora
- Status muda para "Em Atraso" quando data fim é ultrapassada
- Registro automático no histórico

### 3. **Notificações e Alertas**

#### Notificação 1 Dia Antes
- Email automático para gestão
- Alerta visual no sistema
- Notificação do navegador (se permitida)

#### Sinalizador de Datas
- **Vermelho**: Data vencida (em atraso)
- **Amarelo**: Até 7 dias para vencer
- **Verde**: Mais de 7 dias disponíveis

### 4. **Solicitação de Nova Data**

Quando uma ação está em atraso:
- Botão "🔄 Nova Data" aparece
- Formulário para definir nova data limite
- Campo obrigatório de justificativa
- Registro completo no histórico
- Status volta para "Em Andamento"

### 5. **Histórico de Alterações**

Cada ação registra:
- Data e hora de cada alteração
- Alterações de datas (antiga → nova)
- Justificativas de atrasos
- Mudanças automáticas de status

### 6. **Dashboard Estatístico**

Cards com contadores em tempo real:
- Total de ações em atraso
- Total em andamento
- Total não iniciadas
- Total finalizadas

---

## 📝 Como Usar

### Passo 1: Abrir o Sistema
```
Abra o arquivo: 5w2h-interface.html
No navegador (Chrome, Edge, Firefox, etc.)
```

### Passo 2: Criar uma Ação
1. Clique no botão **"➕ Nova Ação"**
2. Preencha todos os campos:
   - **Ação**: Nome curto da ação
   - **O Quê?**: Descrição detalhada
   - **Por Quê?**: Justificativa
   - **Onde?**: Selecione a célula ou escolha "Outros"
   - **Data Início**: Quando começa
   - **Data Fim**: Prazo limite
   - **Quem?**: Responsável
   - **Como?**: Método de execução
   - **Quanto?**: Custo (opcional)
   - **Status**: Estado atual
3. Clique em **"Salvar"**

### Passo 3: Gerenciar Ações
- **Editar**: Clique em "✏️ Editar"
- **Excluir**: Clique em "🗑️ Excluir"
- **Nova Data**: (Se em atraso) Clique em "🔄 Nova Data"
- **Ver Histórico**: (Se houver) Clique em "📜 Histórico"

### Passo 4: Filtrar e Exportar
- Use o filtro de status para visualizar grupos específicos
- Exporte para Excel com "📥 Exportar Excel"
- Gere PDF profissional com "📄 Gerar PDF"

---

## 🔍 Estrutura do 5W2H

### O Quê? (What)
**Descrição detalhada da ação**
- O que será feito?
- Qual é o objetivo?

### Por Quê? (Why)
**Justificativa da ação**
- Por que é necessário?
- Qual o problema que resolve?

### Onde? (Where)
**Local de execução**
- Célula 01 a 08 (pré-definidas)
- Outros locais (customizável)

### Quando? (When)
**Cronograma**
- **Data Início**: Quando começa
- **Data Fim**: Prazo limite

### Quem? (Who)
**Responsável**
- Supervisora
- Coordenador
- Gerente
- CQ1
- CQ2
- Instrutora
- Revisora

### Como? (How)
**Método de execução**
- Como será realizado?
- Quais os passos?

### Quanto? (How Much)
**Custo estimado** (opcional)
- Valor em R$
- Recursos necessários

---

## 🎨 Recursos Avançados

### 1. Seleção de Células

O campo "Onde?" possui seleção inteligente:
- **Células pré-definidas**: 01 a 08
- **Opção "Outros"**: Campo customizável aparece automaticamente
- **Validação**: Obrigatório preencher quando "Outros" selecionado

### 2. Modal com Rolagem

- Altura máxima de 90% da tela
- Scroll interno no corpo do modal
- Funciona em qualquer resolução
- Não precisa redimensionar a tela

### 3. Atualização Automática

O sistema verifica automaticamente (a cada 1 hora):
- Ações que ultrapassaram o prazo
- Ações próximas do vencimento (1 dia)
- Atualiza status e dispara notificações

### 4. Persistência de Dados

- Dados salvos automaticamente no navegador
- Não necessita conexão com servidor
- Dados persistem mesmo após fechar o navegador
- Backup recomendado via exportação Excel

---

## 📊 Exportação e Relatórios

### Exportar para Excel (CSV)

**Formato**: CSV com codificação UTF-8
**Colunas**:
- **ID** (novo!)
- Ação
- O Quê?
- Por Quê?
- Onde?
- Data Início
- Data Fim
- Quem?
- Como?
- Quanto?
- Status

**Como usar**:
1. Clique em "📥 Exportar Excel"
2. Arquivo baixado automaticamente
3. Abra no Excel, LibreOffice ou Google Sheets

### Gerar Relatório PDF

**Formato**: PDF estilo LaTeX (profissional)

**Estrutura do Relatório**:
1. **Cabeçalho**
   - Título do relatório
   - Data de geração
   - Empresa

2. **Informações do Documento**
   - Código RQ-355.00
   - Total de ações
   - Período

3. **Resumo Executivo**
   - Cards estatísticos coloridos
   - Contadores por status

4. **Detalhamento das Ações**
   - Cada ação em card separado
   - **ID único exibido** no cabeçalho do card
   - Numeração sequencial
   - Todos os campos 5W2H
   - Status e datas destacadas
   - Indicação de histórico

5. **Rodapé**
   - Informações de confidencialidade

**Como usar**:
1. Clique em "📄 Gerar PDF"
2. Nova janela abre com visualização
3. Diálogo de impressão abre automaticamente
4. Escolha "Salvar como PDF" ou imprimir

---

## ⚙️ Configurações

### Email da Gestão

Configure o email que receberá notificações:

1. Clique em "⚙️ Configurações"
2. Digite o email da gestão
3. Clique em "Salvar Configurações"

**Observação**: Para envio real de emails, é necessário configurar servidor SMTP ou API de email (Gmail, SendGrid, etc.). Atualmente, notificações aparecem:
- Console do navegador (F12)
- Alertas visuais no sistema
- Notificações do navegador (se permitido)

### Permissões do Navegador

Para melhor experiência, permita:
- **Notificações**: Para alertas de prazos
- **Pop-ups**: Para relatórios PDF

---

## 💻 Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica
- **CSS3**: Estilização moderna
  - Grid Layout
  - Flexbox
  - Gradientes
  - Animações
- **JavaScript (Vanilla)**: Lógica da aplicação
  - ES6+
  - LocalStorage API
  - Date API
  - Print API

### Bibliotecas
**Nenhuma dependência externa!**
- Sistema 100% standalone
- Não requer instalação
- Funciona offline após carregamento inicial

---

## 💾 Armazenamento de Dados

### LocalStorage

Os dados são salvos no navegador usando `localStorage`:

**Chave**: `5w2h_actions`
**Formato**: JSON Array

**Estrutura de cada ação**:
```javascript
{
  id: "5W2H-001",  // Novo! ID único e permanente
  actionName: "Nome da ação",
  what: "O que será feito",
  why: "Justificativa",
  where: "Célula 01 ou local customizado",
  whenStart: "2024-01-15",
  whenEnd: "2024-01-30",
  who: "Coordenador",
  how: "Método de execução",
  howMuch: "R$ 500,00",
  status: "Em Andamento",
  history: [
    {
      date: "2024-01-20T10:30:00.000Z",
      message: "Status alterado...",
      oldDate: "2024-01-30",
      newDate: "2024-02-15",
      justification: "Motivo do atraso..."
    }
  ]
}
```

### Backup e Restauração

**Backup Manual**:
1. Exportar dados para Excel
2. Salvar arquivo em local seguro

**Limpeza de Dados**:
- Dados persistem no navegador
- Para limpar:
  - Chrome: F12 → Application → LocalStorage → Deletar
  - Firefox: F12 → Storage → LocalStorage → Deletar

---

## 🛠️ Suporte e Manutenção

### Compatibilidade de Navegadores

| Navegador | Versão Mínima | Status |
|-----------|---------------|--------|
| Chrome | 90+ | ✅ Totalmente compatível |
| Edge | 90+ | ✅ Totalmente compatível |
| Firefox | 88+ | ✅ Totalmente compatível |
| Safari | 14+ | ✅ Totalmente compatível |
| Opera | 76+ | ✅ Totalmente compatível |

### Requisitos do Sistema

- **Sistema Operacional**: Windows, macOS, Linux
- **Navegador**: Moderno com suporte a ES6+
- **Internet**: Não necessária após carregamento
- **Espaço**: Mínimo (dados no navegador)

### Resolução de Problemas

#### Problema: Dados não salvam
**Solução**:
- Verifique se cookies/localStorage estão habilitados
- Não use modo anônimo/privado
- Limpe cache do navegador

#### Problema: Modal não rola
**Solução**:
- Atualize a página (F5)
- Versão mais recente já corrigiu este problema

#### Problema: PDF não gera
**Solução**:
- Verifique se pop-ups estão permitidos
- Tente outro navegador
- Verifique bloqueador de pop-up

#### Problema: Notificações não aparecem
**Solução**:
- Permita notificações nas configurações do navegador
- Verifique "Não perturbe" do sistema operacional

---

## 📄 Licença e Uso

**Desenvolvido para**: Texcotton SGQ
**Documento**: RQ-355.00 - Plano de Ação 5W2H
**Uso**: Interno - Confidencial

---

## 🔄 Histórico de Versões

### v3.1.0 - 17/02/2026 ⭐ ATUAL
- ✨ **Sistema de IDs únicos** implementado (5W2H-001, 5W2H-002, etc.)
- ✨ IDs exibidos na tabela com destaque em azul
- ✨ IDs incluídos no relatório PDF
- ✨ IDs incluídos na exportação Excel/CSV
- ✨ Retrocompatibilidade: ações antigas recebem IDs automaticamente
- ✨ Filtro duplo: Status + Quem/Responsável
- 🐛 Correções de bugs e melhorias de performance

### v3.0.0 - 17/02/2026
- ✅ Adicionado campo "Ação"
- ✅ Implementado seleção de células (01-08)
- ✅ Corrigido scroll do modal
- ✅ Adicionado geração de relatório PDF
- ✅ Melhorias gerais de UX

### v2.0.0 - 17/02/2026
- ✅ Sistema de notificações automáticas
- ✅ Solicitação de nova data para atrasos
- ✅ Histórico de alterações
- ✅ Dashboard com estatísticas
- ✅ Exportação para Excel

### v1.0.0 - 17/02/2026
- ✅ Versão inicial
- ✅ CRUD de ações 5W2H
- ✅ Sistema de status
- ✅ Armazenamento local

---

## 📞 Contato

Para suporte ou dúvidas sobre o sistema:
- **Email**: gestao@texcotton.com.br
- **Departamento**: SGQ - Sistema de Gestão da Qualidade

---

## 🎓 Metodologia 5W2H

A metodologia **5W2H** é uma ferramenta de gestão usada para criar planos de ação de forma estruturada:

- **5W** (Five Whys): What, Why, Where, When, Who
- **2H** (Two Hows): How, How Much

**Benefícios**:
- ✅ Clareza nas ações
- ✅ Responsabilidades definidas
- ✅ Prazos estabelecidos
- ✅ Recursos mapeados
- ✅ Acompanhamento facilitado

---

**Desenvolvido com ❤️ para Texcotton SGQ**
*Sistema de Gestão da Qualidade*
