# Histórico de Versões - Sistema 5W2H

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [3.1.0] - 2026-02-17 ⭐ VERSÃO ATUAL

### ✨ Adicionado
- **Sistema de IDs únicos e sequenciais** (formato: 5W2H-001, 5W2H-002, etc.)
  - Geração automática de IDs para novas ações
  - IDs permanentes que nunca mudam
  - IDs nunca são reutilizados mesmo após exclusões
- **Exibição de IDs em todos os lugares**:
  - Coluna ID na tabela (destacada em azul)
  - IDs no cabeçalho dos cards do relatório PDF
  - IDs como primeira coluna na exportação Excel/CSV
- **Retrocompatibilidade completa**:
  - Ações antigas sem ID recebem IDs automaticamente ao carregar
  - Sistema detecta e corrige dados de versões anteriores
- **Filtro duplo**: Agora é possível filtrar por Status E Responsável simultaneamente
  - Novo dropdown "Filtrar por Quem"
  - Filtros funcionam em conjunto (AND logic)
  - Exemplo: "Em Andamento" + "Coordenador"

### 🔧 Melhorado
- Performance otimizada na geração de IDs
- Algoritmo de busca do maior ID existente
- Validação de dados mais robusta
- Código mais limpo e documentado

### 🐛 Corrigido
- Correção de erro de sintaxe JavaScript na linha 2003
- Modal agora funciona perfeitamente em todas as versões
- Botão "Nova Ação" 100% funcional

### 📚 Documentação
- README.md atualizado com informações sobre IDs
- DOCUMENTACAO-TECNICA.md criada com especificações completas
- CHANGELOG.md criado para rastreamento de versões
- Exemplos e screenshots adicionados

---

## [3.0.0] - 2026-02-17

### ✨ Adicionado
- **Campo "Ação"** como primeiro campo do formulário
  - Campo obrigatório para nome resumido da ação
  - Facilita identificação rápida na tabela
- **Seleção de Células** no campo "Onde?"
  - Dropdown com opções Célula 01 a 08
  - Opção "Outros" com campo de texto customizável
  - Validação automática
  - Toggle inteligente mostra/esconde campo customizado
- **Relatório PDF Profissional**
  - Formatação estilo LaTeX acadêmico
  - Cabeçalho com informações da empresa
  - Resumo executivo com estatísticas
  - Cards detalhados de cada ação
  - Rodapé com informações de confidencialidade
  - Abertura automática do diálogo de impressão
- **Gráficos Interativos**:
  - Gráfico de barras: Quantidade de ações por status
  - Gráfico de pizza: Distribuição percentual por status
  - Gráfico de barras: Ações por célula/local
  - Atualização automática em tempo real

### 🔧 Melhorado
- **Modal com scroll funcional**
  - max-height: 90vh
  - overflow-y: auto
  - Funciona em qualquer resolução
  - Layout flexbox organizado (header/body/footer)
- Interface mais moderna e responsiva
- Animações suaves em transições
- Cores e contrastes otimizados

### 🐛 Corrigido
- Problema de rolagem no modal em telas menores
- Campo "Quanto?" agora sempre visível
- Validação de campos obrigatórios

---

## [2.5.0] - 2026-02-17

### ✨ Adicionado
- **Filtro por Status**
  - Dropdown para filtrar: Todos, Em Atraso, Finalizado, Em Andamento, Não Iniciado
  - Atualização instantânea da tabela
  - Mantém contadores de estatísticas
- **Dashboard de Estatísticas**
  - Cards coloridos com contadores
  - Atualização em tempo real
  - Indicadores visuais por status

### 🔧 Melhorado
- Performance na renderização da tabela
- Algoritmo de filtragem otimizado

---

## [2.0.0] - 2026-02-17

### ✨ Adicionado
- **Sistema de Notificações Automáticas**
  - Email/alerta 1 dia antes do prazo
  - Configuração de email da gestão
  - Notificações visuais no sistema
- **Solicitação de Nova Data**
  - Botão "🔄 Nova Data" para ações em atraso
  - Formulário com data e justificativa obrigatória
  - Registro completo no histórico
- **Histórico de Alterações**
  - Rastreamento de mudanças de data
  - Justificativas de atrasos
  - Registro de alterações automáticas de status
  - Botão "📜 Histórico" para visualizar
- **Exportação Excel/CSV**
  - Formato CSV com UTF-8 BOM
  - Todas as colunas incluídas
  - Download automático
  - Nome do arquivo com data
- **Detecção Automática de Atrasos**
  - Verificação a cada 1 hora
  - Mudança automática de status para "Em Atraso"
  - Registro no histórico
  - Sinalizadores visuais nas datas

### 🔧 Melhorado
- Sistema de datas mais robusto
- Validação aprimorada de formulários

---

## [1.5.0] - 2026-02-17

### ✨ Adicionado
- **Separação de Datas**
  - Campo "Data Início" (Quando Início?)
  - Campo "Data Fim" (Quando Fim?)
  - Substituiu campo único "Quando?"
- **Sistema de Status** com 4 opções:
  - Não Iniciado (cinza)
  - Em Andamento (amarelo)
  - Em Atraso (vermelho)
  - Finalizado (verde)
- **Responsáveis Predefinidos**:
  - Supervisora, Coordenador, Gerente
  - CQ1, CQ2, Instrutora, Revisora

### 🔧 Melhorado
- Interface de usuário mais intuitiva
- Cores e badges de status

---

## [1.0.0] - 2026-02-17 🎉

### ✨ Lançamento Inicial
- **CRUD Completo de Ações 5W2H**
  - Criar nova ação
  - Editar ação existente
  - Excluir ação (com confirmação)
  - Visualizar todas as ações em tabela
- **Formulário 5W2H Completo**:
  - O Quê? (What)
  - Por Quê? (Why)
  - Onde? (Where)
  - Quando? (When)
  - Quem? (Who)
  - Como? (How)
  - Quanto? (How Much)
- **Armazenamento Local**
  - Persistência via localStorage
  - Dados salvos automaticamente
  - Não requer servidor
- **Interface Moderna**
  - Design responsivo
  - Gradientes e animações
  - Modal para formulários
- **Validação de Campos**
  - Campos obrigatórios marcados com *
  - Validação HTML5
  - Mensagens de erro claras

---

## 🔮 Melhorias Futuras Planejadas

### Versão 4.0 (Próxima)
- [ ] **Sincronização em nuvem**
  - Backend com API REST
  - Banco de dados PostgreSQL/MySQL
  - Múltiplos usuários simultâneos
- [ ] **Sistema de Autenticação**
  - Login/logout
  - Permissões por cargo
  - Logs de auditoria
- [ ] **Notificações Real-Time**
  - Integração com Gmail API
  - WhatsApp Business API
  - SMS via Twilio
- [ ] **Dashboard Avançado**
  - Mais gráficos (linhas, área, scatter)
  - Filtros avançados (data range, múltiplos campos)
  - Métricas de performance
- [ ] **Anexos de Arquivos**
  - Upload de evidências
  - Fotos e documentos
  - Armazenamento em nuvem (AWS S3, Google Cloud)
- [ ] **Comentários e Discussões**
  - Thread de comentários por ação
  - Menções (@usuário)
  - Notificações de resposta
- [ ] **Modo Offline**
  - Service Worker
  - Progressive Web App (PWA)
  - Sincronização automática ao voltar online
- [ ] **Impressão de Etiquetas**
  - QR Code para cada ação
  - Etiquetas para identificação física
- [ ] **Integração com outras ferramentas**
  - Microsoft Teams
  - Slack
  - Trello
  - Jira

### Versão 3.2 (Curto Prazo)
- [ ] Busca textual global
- [ ] Ordenação de colunas da tabela
- [ ] Paginação para tabelas grandes (>100 itens)
- [ ] Modo escuro (dark mode)
- [ ] Internacionalização (i18n)
- [ ] Temas personalizáveis

---

## 📝 Convenções

### Tipos de Alterações
- **✨ Adicionado**: para novas funcionalidades
- **🔧 Melhorado**: para alterações em funcionalidades existentes
- **❌ Descontinuado**: para funcionalidades que serão removidas
- **🗑️ Removido**: para funcionalidades removidas
- **🐛 Corrigido**: para correção de bugs
- **🔒 Segurança**: em caso de vulnerabilidades
- **📚 Documentação**: mudanças na documentação

### Versionamento Semântico

**MAJOR.MINOR.PATCH**

- **MAJOR**: Mudanças incompatíveis na API (breaking changes)
- **MINOR**: Novas funcionalidades compatíveis com versões anteriores
- **PATCH**: Correções de bugs compatíveis

**Exemplo**:
- `3.1.0` → `3.2.0`: Nova funcionalidade (MINOR)
- `3.1.0` → `3.1.1`: Correção de bug (PATCH)
- `3.1.0` → `4.0.0`: Mudança incompatível (MAJOR)

---

## 🔗 Links

- [Repositório](C:\Users\bruna.01841\Desenvolvimento\)
- [Documentação Técnica](DOCUMENTACAO-TECNICA.md)
- [README](README.md)
- [Issues/Bugs](mailto:gestao@texcotton.com.br)

---

**Desenvolvido para Texcotton SGQ**
*Sistema de Gestão da Qualidade*
**Documento**: RQ-355.00 - Plano de Ação 5W2H

**Última Atualização**: 17/02/2026
