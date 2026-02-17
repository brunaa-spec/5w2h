# Documentação Técnica - Sistema 5W2H
##  Versão 3.1

---

## 📚 Índice

1. [Arquitetura do Sistema](#arquitetura-do-sistema)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Estrutura de Dados](#estrutura-de-dados)
4. [Funções Principais](#funções-principais)
5. [Sistema de IDs](#sistema-de-ids)
6. [Sistema de Persistência](#sistema-de-persistência)
7. [Detecção de Atrasos](#detecção-de-atrasos)
8. [Sistema de Notificações](#sistema-de-notificações)
9. [Geração de Gráficos](#geração-de-gráficos)
10. [Exportação de Dados](#exportação-de-dados)
11. [Fluxo de Trabalho](#fluxo-de-trabalho)

---

## 🏗️ Arquitetura do Sistema

### Visão Geral

O sistema é uma **aplicação web monolítica standalone** (Single Page Application) que roda inteiramente no navegador do cliente, sem necessidade de backend ou servidor.

```
┌─────────────────────────────────────────┐
│         5w2h-interface.html             │
│  ┌───────────────────────────────────┐  │
│  │        HTML Structure             │  │
│  │  - Modal Forms                    │  │
│  │  - Tables                         │  │
│  │  - Dashboard Cards                │  │
│  │  - Charts Containers              │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │         CSS Styles                │  │
│  │  - Responsive Layout              │  │
│  │  - Animations                     │  │
│  │  - Color Schemes                  │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │      JavaScript Logic             │  │
│  │  - CRUD Operations                │  │
│  │  - ID Generation                  │  │
│  │  - Data Validation                │  │
│  │  - localStorage Interface         │  │
│  │  - Chart Rendering                │  │
│  │  - PDF Generation                 │  │
│  │  - Excel Export                   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
                    ↓
            localStorage API
                    ↓
         ┌─────────────────┐
         │  Browser Storage │
         │   (5w2h_actions) │
         └─────────────────┘
```

### Componentes Principais

1. **Interface de Usuário (UI)**
   - Modal de formulário
   - Tabela de ações
   - Dashboard de estatísticas
   - Gráficos visuais

2. **Camada de Lógica**
   - Gerenciamento de estado (actions array)
   - Validações
   - Filtros
   - Algoritmos de detecção

3. **Camada de Persistência**
   - localStorage API
   - Serialização JSON

---

## 💻 Tecnologias Utilizadas

### Frontend

#### HTML5
- **Versão**: HTML5
- **Recursos usados**:
  - Elementos semânticos (`<table>`, `<form>`, `<select>`)
  - Atributos de validação (`required`, `type="date"`)
  - Canvas para gráficos

#### CSS3
- **Layout**: Grid e Flexbox
- **Recursos**:
  - Gradientes lineares
  - Animações e transições
  - Media queries para responsividade
  - Variáveis CSS (implícitas via cores diretas)

#### JavaScript (ES6+)
- **Versão**: ECMAScript 2015+
- **Recursos utilizados**:
  - Arrow functions
  - Template literals
  - Destructuring
  - Array methods (map, filter, forEach, reduce)
  - Spread operator
  - Const e Let
  - String.padStart()

### APIs do Navegador

1. **localStorage**
   - Armazenamento de dados
   - Limite: ~5-10MB

2. **Date API**
   - Manipulação de datas
   - Comparações temporais

3. **Canvas API**
   - Renderização de gráfico pizza

4. **Print API**
   - Geração de relatório PDF

5. **Notification API**
   - Alertas de prazo (opcional)

---

## 🗂️ Estrutura de Dados

### Objeto Action

```javascript
{
  // ID único e permanente (Versão 3.1+)
  id: "5W2H-001",

  // Campos principais 5W2H
  actionName: String,     // Nome da ação
  what: String,           // O quê?
  why: String,            // Por quê?
  where: String,          // Onde? (Célula ou customizado)
  whenStart: String,      // Data início (YYYY-MM-DD)
  whenEnd: String,        // Data fim (YYYY-MM-DD)
  who: String,            // Quem? (Responsável)
  how: String,            // Como?
  howMuch: String,        // Quanto? (opcional)
  status: String,         // Status atual

  // Histórico de alterações
  history: [
    {
      date: String,           // ISO timestamp
      message: String,        // Descrição da alteração
      oldDate: String,        // Data antiga (se aplicável)
      newDate: String,        // Nova data (se aplicável)
      justification: String   // Justificativa (se aplicável)
    }
  ]
}
```

### Array Global

```javascript
let actions = [];  // Array global que armazena todas as ações
```

### Status Possíveis

```javascript
const STATUS = {
  NAO_INICIADO: 'Não Iniciado',
  EM_ANDAMENTO: 'Em Andamento',
  EM_ATRASO: 'Em Atraso',
  FINALIZADO: 'Finalizado'
};
```

### Responsáveis (Quem)

```javascript
const RESPONSAVEIS = [
  'Supervisora',
  'Coordenador',
  'Gerente',
  'CQ1',
  'CQ2',
  'Instrutora',
  'Revisora'
];
```

### Células (Onde)

```javascript
const CELULAS = [
  'Célula 01', 'Célula 02', 'Célula 03', 'Célula 04',
  'Célula 05', 'Célula 06', 'Célula 07', 'Célula 08',
  'Outros'  // Campo customizável
];
```

---

## ⚙️ Funções Principais

### Inicialização

#### `window.onload`
```javascript
window.onload = function() {
  loadData();
  checkAndUpdateOverdueActions();
  checkUpcomingDeadlines();
  renderTable();
  updateStats();

  // Verificar a cada hora
  setInterval(() => {
    checkAndUpdateOverdueActions();
    checkUpcomingDeadlines();
    renderTable();
    updateStats();
  }, 3600000);
};
```

**Responsabilidade**: Inicializa o sistema ao carregar a página.

### Persistência de Dados

#### `loadData()`
```javascript
function loadData() {
  const saved = localStorage.getItem('5w2h_actions');
  if (saved) {
    actions = JSON.parse(saved);

    // Retrocompatibilidade: adicionar IDs a ações antigas
    let needsSave = false;
    actions.forEach((action, index) => {
      if (!action.id) {
        action.id = `5W2H-${String(index + 1).padStart(3, '0')}`;
        needsSave = true;
      }
    });

    if (needsSave) {
      saveData();
    }
  }
}
```

**Responsabilidade**:
- Carrega dados do localStorage
- Adiciona IDs a ações antigas (retrocompatibilidade)
- Inicializa array vazio se não houver dados

#### `saveData()`
```javascript
function saveData() {
  localStorage.setItem('5w2h_actions', JSON.stringify(actions));
}
```

**Responsabilidade**: Salva o array de ações no localStorage.

### CRUD Operations

#### `openModal(index = null)`
```javascript
function openModal(index = null) {
  const modal = document.getElementById('actionModal');
  const modalTitle = document.getElementById('modalTitle');
  const form = document.getElementById('actionForm');

  form.reset();
  document.getElementById('editIndex').value = '';

  if (index !== null) {
    // Modo edição: preencher campos
    modalTitle.textContent = 'Editar Ação 5W2H';
    // ... popular campos
  } else {
    // Modo criação
    modalTitle.textContent = 'Nova Ação 5W2H';
  }

  modal.style.display = 'block';
}
```

**Responsabilidade**:
- Abre modal em modo criação ou edição
- Popula campos se for edição
- Reseta formulário se for nova ação

#### `saveAction()`
```javascript
function saveAction() {
  // Validar formulário
  const form = document.getElementById('actionForm');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Construir objeto action
  const action = {
    actionName: document.getElementById('actionName').value,
    what: document.getElementById('what').value,
    // ... outros campos
  };

  const editIndex = document.getElementById('editIndex').value;

  if (editIndex !== '') {
    // Edição: manter ID existente
    action.id = actions[editIndex].id;
    actions[editIndex] = action;
  } else {
    // Nova ação: gerar novo ID
    const maxId = actions.length > 0
      ? Math.max(...actions.map(a => parseInt(a.id.split('-')[1]) || 0))
      : 0;
    action.id = `5W2H-${String(maxId + 1).padStart(3, '0')}`;
    actions.push(action);
  }

  saveData();
  renderTable();
  updateStats();
  closeModal();
}
```

**Responsabilidade**:
- Valida formulário
- Cria ou atualiza ação
- Gera ID para novas ações
- Mantém ID em edições
- Persiste alterações

#### `deleteAction(index)`
```javascript
function deleteAction(index) {
  if (confirm('Tem certeza que deseja excluir esta ação?')) {
    actions.splice(index, 1);
    saveData();
    renderTable();
    updateStats();
  }
}
```

**Responsabilidade**:
- Confirma exclusão
- Remove ação do array
- Atualiza interface

### Renderização

#### `renderTable()`
```javascript
function renderTable() {
  const tbody = document.getElementById('tableBody');
  const emptyState = document.getElementById('emptyState');
  const filterStatus = document.getElementById('filterStatus').value;
  const filterWho = document.getElementById('filterWho').value;

  tbody.innerHTML = '';

  // Aplicar filtros
  let filteredActions = actions;
  if (filterStatus) {
    filteredActions = filteredActions.filter(action =>
      getStatus(action) === filterStatus
    );
  }
  if (filterWho) {
    filteredActions = filteredActions.filter(action =>
      action.who === filterWho
    );
  }

  // Renderizar linhas
  filteredActions.forEach((action, index) => {
    const actualIndex = actions.indexOf(action);
    const status = getStatus(action);
    const dateEndClass = getDateClass(action.whenEnd);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong style="color: #667eea;">${action.id || 'N/A'}</strong></td>
      <td><strong>${action.actionName || 'Sem nome'}</strong></td>
      <td>${action.what}</td>
      <!-- ... outras células -->
    `;
    tbody.appendChild(row);
  });

  // Atualizar gráficos
  renderCharts();
}
```

**Responsabilidade**:
- Renderiza tabela com filtros aplicados
- Exibe ID destacado
- Aplica classes de cor conforme status
- Atualiza gráficos

---

## 🆔 Sistema de IDs

### Geração de IDs

#### Algoritmo
```javascript
// Encontrar maior ID existente
const maxId = actions.length > 0
  ? Math.max(...actions.map(a => {
      const idNum = a.id ? parseInt(a.id.split('-')[1]) : 0;
      return idNum || 0;
    }))
  : 0;

// Gerar próximo ID
const newId = `5W2H-${String(maxId + 1).padStart(3, '0')}`;
```

#### Formato
- **Padrão**: `5W2H-###`
- **Exemplos**: `5W2H-001`, `5W2H-002`, `5W2H-123`
- **Comprimento**: Fixo de 9 caracteres
- **Padding**: Zeros à esquerda até 3 dígitos

#### Características
- **Único**: Cada ação tem um ID exclusivo
- **Sequencial**: IDs crescem em ordem
- **Permanente**: ID nunca muda após criação
- **Não reutilizável**: IDs de ações excluídas não são reaproveitados

### Retrocompatibilidade

Ações criadas antes da versão 3.1 não tinham IDs. O sistema detecta e corrige automaticamente:

```javascript
actions.forEach((action, index) => {
  if (!action.id) {
    action.id = `5W2H-${String(index + 1).padStart(3, '0')}`;
    needsSave = true;
  }
});
```

---

## 💾 Sistema de Persistência

### localStorage

**API**: Web Storage API
**Chave**: `5w2h_actions`
**Formato**: JSON string

#### Serialização
```javascript
localStorage.setItem('5w2h_actions', JSON.stringify(actions));
```

#### Desserialização
```javascript
const saved = localStorage.getItem('5w2h_actions');
if (saved) {
  actions = JSON.parse(saved);
}
```

### Capacidade

- **Limite típico**: 5-10 MB
- **Estimativa**: ~5.000-10.000 ações (dependendo do conteúdo)

### Persistência

- Dados permanecem após:
  - Fechar navegador
  - Reiniciar computador
  - Atualizar página

- Dados são perdidos ao:
  - Limpar histórico/cache do navegador
  - Usar modo anônimo/privado
  - Desinstalar navegador

---

## ⏰ Detecção de Atrasos

### Algoritmo

```javascript
function checkAndUpdateOverdueActions() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let updated = false;

  actions.forEach(action => {
    if (action.status !== 'Finalizado') {
      const dueDate = new Date(action.whenEnd + 'T00:00:00');

      // Verificar se está em atraso
      if (dueDate < today && action.status !== 'Em Atraso') {
        action.status = 'Em Atraso';
        updated = true;

        // Registrar no histórico
        if (!action.history) {
          action.history = [];
        }
        action.history.push({
          date: new Date().toISOString(),
          message: `Status automaticamente alterado para "Em Atraso" (Data limite: ${formatDate(action.whenEnd)})`
        });
      }
    }
  });

  if (updated) {
    saveData();
    renderTable();
    updateStats();
  }
}
```

### Execução

- **Primeira vez**: Ao carregar a página (`window.onload`)
- **Periódica**: A cada 1 hora via `setInterval`
- **Duração do intervalo**: 3.600.000 ms (1 hora)

### Lógica

1. Pegar data atual (sem horas)
2. Para cada ação:
   - Se não está "Finalizado"
   - Se data fim < data atual
   - E status atual != "Em Atraso"
   - Então: Mudar status para "Em Atraso"
3. Registrar alteração no histórico
4. Salvar e atualizar interface

---

## 🔔 Sistema de Notificações

### Notificação 1 Dia Antes

```javascript
function checkUpcomingDeadlines() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  actions.forEach(action => {
    if (action.status !== 'Finalizado' && action.status !== 'Em Atraso') {
      const dueDate = new Date(action.whenEnd + 'T00:00:00');

      if (dueDate.getTime() === tomorrow.getTime()) {
        sendNotification(action);
      }
    }
  });
}
```

### Envio de Email (Simulado)

```javascript
function sendNotification(action) {
  const emailGestao = 'gestao@texcotton.com.br';
  const subject = `⚠️ Ação 5W2H com prazo se encerrando amanhã`;
  const body = `
    Prezado(a),

    A ação "${action.what}" com prazo para ${formatDate(action.whenEnd)}
    vence amanhã!

    Responsável: ${action.who}
    Status: ${action.status}
  `;

  console.log('📧 EMAIL ENVIADO PARA:', emailGestao);
  console.log('Assunto:', subject);
  console.log('Corpo:', body);

  // Notificação visual
  showVisualNotification(`Prazo de "${action.what}" vence amanhã!`);
}
```

**Nota**: O envio real de email requer backend com servidor SMTP ou API de email.

---

## 📊 Geração de Gráficos

### Gráfico de Barras (Status)

```javascript
function renderStatusChart() {
  const chartData = [
    { label: 'Em Atraso', value: getStatusCount('Em Atraso'), class: 'em-atraso' },
    { label: 'Em Andamento', value: getStatusCount('Em Andamento'), class: 'em-andamento' },
    { label: 'Não Iniciado', value: getStatusCount('Não Iniciado'), class: 'nao-iniciado' },
    { label: 'Finalizado', value: getStatusCount('Finalizado'), class: 'finalizado' }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value), 1);

  chartData.forEach(item => {
    const percentage = (item.value / maxValue) * 100;
    // Renderizar barra
  });
}
```

### Gráfico Pizza (Canvas)

```javascript
function renderPieChart() {
  const canvas = document.getElementById('pieChart');
  const ctx = canvas.getContext('2d');

  const data = [
    { label: 'Em Atraso', value: getStatusCount('Em Atraso'), color: '#e74c3c' },
    // ... outros
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -Math.PI / 2;  // Começar no topo

  data.forEach(item => {
    const sliceAngle = (item.value / total) * 2 * Math.PI;

    // Desenhar fatia
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.lineTo(centerX, centerY);
    ctx.fillStyle = item.color;
    ctx.fill();

    currentAngle += sliceAngle;
  });
}
```

---

## 📤 Exportação de Dados

### Excel/CSV

```javascript
function exportToExcel() {
  let csv = '\uFEFF';  // BOM para UTF-8
  csv += 'ID,Ação,O Quê?,Por Quê?,Onde?,Data Início,Data Fim,Quem?,Como?,Quanto?,Status\n';

  actions.forEach(action => {
    const status = getStatus(action);
    csv += `"${action.id || 'N/A'}","${action.actionName || ''}",` +
           `"${action.what}","${action.why}","${action.where}",` +
           `"${formatDate(action.whenStart)}","${formatDate(action.whenEnd)}",` +
           `"${action.who}","${action.how}","${action.howMuch || ''}","${status}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `5W2H_${new Date().toISOString().split('T')[0]}.csv`);
  link.click();
}
```

### PDF

```javascript
function generatePDFReport() {
  const printWindow = window.open('', '_blank');
  const reportHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Relatório 5W2H</title>
      <style>
        /* Estilos LaTeX */
      </style>
    </head>
    <body>
      <!-- Conteúdo do relatório -->
      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(reportHTML);
  printWindow.document.close();
}
```

---

## 🔄 Fluxo de Trabalho

### Criar Nova Ação

```
Usuário clica "Nova Ação"
    ↓
openModal() é chamado
    ↓
Modal exibe formulário vazio
    ↓
Usuário preenche campos
    ↓
Usuário clica "Salvar"
    ↓
saveAction() é chamado
    ↓
Formulário é validado
    ↓
Novo ID é gerado (5W2H-###)
    ↓
Objeto action é criado
    ↓
Action é adicionado ao array
    ↓
saveData() persiste em localStorage
    ↓
renderTable() atualiza tabela
    ↓
updateStats() atualiza dashboard
    ↓
Modal fecha
```

### Editar Ação

```
Usuário clica "Editar" na linha
    ↓
openModal(index) é chamado com índice
    ↓
Campos são preenchidos com dados existentes
    ↓
Usuário modifica campos
    ↓
Usuário clica "Salvar"
    ↓
saveAction() é chamado
    ↓
ID existente é mantido
    ↓
Action[index] é substituído
    ↓
Dados são salvos
    ↓
Interface atualizada
```

### Detecção Automática de Atraso

```
setInterval executado (a cada 1h)
    ↓
checkAndUpdateOverdueActions() chamado
    ↓
Para cada ação:
    - Comparar data fim com data atual
    - Se vencida e não finalizada:
        ↓
        Mudar status para "Em Atraso"
        ↓
        Adicionar entry no histórico
        ↓
        saveData()
        ↓
        renderTable()
```

---

## 🛠️ Manutenção e Extensões

### Adicionar Novo Campo

1. Adicionar campo no HTML do modal
2. Adicionar propriedade no objeto action em `saveAction()`
3. Adicionar coluna na tabela (renderTable())
4. Atualizar exportação Excel e PDF
5. Atualizar README.md

### Adicionar Novo Status

1. Adicionar `<option>` no select de status
2. Adicionar classe CSS para cor do badge
3. Atualizar função `getStatus()` se necessário
4. Atualizar gráficos

### Adicionar Nova Validação

1. Adicionar atributos HTML (`required`, `pattern`, etc.)
2. Adicionar validação JavaScript em `saveAction()`
3. Exibir mensagens de erro ao usuário

---

## 📋 Convenções de Código

### Nomenclatura

- **Funções**: camelCase (`saveAction`, `renderTable`)
- **Variáveis**: camelCase (`actions`, `filterStatus`)
- **Constantes**: UPPER_CASE (se houver)
- **IDs HTML**: camelCase (`actionModal`, `filterStatus`)

### Comentários

```javascript
// Comentário de linha única

/**
 * Comentário de bloco para funções
 * @param {number} index - Índice da ação
 */
```

---

**Última Atualização**: Fevereiro de 2026
**Versão do Sistema**: 3.1
**Autor**: Equipe SGQ - Texcotton
