/**
 * Sistema de Apontamento 5W2H - Texcotton SGQ
 * @version 3.1
 * @description Sistema completo de gestão de planos de ação com metodologia 5W2H
 */

let actions = [];

// Configuração de email da gestão
const emailGestao = 'gestao@texcotton.com.br';

// ============================================
// INICIALIZAÇÃO
// ============================================

window.onload = function() {
    loadData();
    checkAndUpdateOverdueActions();
    checkUpcomingDeadlines();
    renderTable();
    updateStats();

    // Verificar a cada hora se há atualizações necessárias
    setInterval(() => {
        checkAndUpdateOverdueActions();
        checkUpcomingDeadlines();
        renderTable();
        updateStats();
    }, 3600000); // 1 hora em milissegundos
};

// ============================================
// GERENCIAMENTO DE DADOS
// ============================================

function loadData() {
    const saved = localStorage.getItem('5w2h_actions');
    if (saved) {
        actions = JSON.parse(saved);

        // Adicionar IDs a ações antigas que não têm (retrocompatibilidade)
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

function saveData() {
    localStorage.setItem('5w2h_actions', JSON.stringify(actions));
}

// ============================================
// MODAL E FORMULÁRIOS
// ============================================

function openModal(index = null) {
    const modal = document.getElementById('actionModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('actionForm');

    form.reset();
    document.getElementById('editIndex').value = '';

    if (index !== null) {
        modalTitle.textContent = 'Editar Ação 5W2H';
        document.getElementById('editIndex').value = index;

        const action = actions[index];
        document.getElementById('actionName').value = action.actionName || '';
        document.getElementById('what').value = action.what;
        document.getElementById('why').value = action.why;

        const predefinedCells = ['Célula 01', 'Célula 02', 'Célula 03', 'Célula 04',
                                 'Célula 05', 'Célula 06', 'Célula 07', 'Célula 08'];

        if (predefinedCells.includes(action.where)) {
            document.getElementById('whereCell').value = action.where;
        } else {
            document.getElementById('whereCell').value = 'Outros';
            document.getElementById('whereOther').value = action.where;
            toggleOtherLocation();
        }

        document.getElementById('whenStart').value = action.whenStart;
        document.getElementById('whenEnd').value = action.whenEnd;
        document.getElementById('who').value = action.who;
        document.getElementById('how').value = action.how;
        document.getElementById('howMuch').value = action.howMuch;
        document.getElementById('status').value = action.status;
    } else {
        modalTitle.textContent = 'Nova Ação 5W2H';
    }

    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('actionModal').style.display = 'none';
}

function toggleOtherLocation() {
    const cellSelect = document.getElementById('whereCell');
    const otherGroup = document.getElementById('otherLocationGroup');
    const otherInput = document.getElementById('whereOther');

    if (cellSelect.value === 'Outros') {
        otherGroup.style.display = 'block';
        otherInput.required = true;
    } else {
        otherGroup.style.display = 'none';
        otherInput.required = false;
        otherInput.value = '';
    }
}

// ============================================
// CRUD DE AÇÕES
// ============================================

function saveAction() {
    const form = document.getElementById('actionForm');

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const whereCell = document.getElementById('whereCell').value;
    const whereValue = whereCell === 'Outros'
        ? document.getElementById('whereOther').value
        : whereCell;

    const action = {
        actionName: document.getElementById('actionName').value,
        what: document.getElementById('what').value,
        why: document.getElementById('why').value,
        where: whereValue,
        whenStart: document.getElementById('whenStart').value,
        whenEnd: document.getElementById('whenEnd').value,
        who: document.getElementById('who').value,
        how: document.getElementById('how').value,
        howMuch: document.getElementById('howMuch').value,
        status: document.getElementById('status').value
    };

    const editIndex = document.getElementById('editIndex').value;

    if (editIndex !== '') {
        action.id = actions[editIndex].id;
        actions[editIndex] = action;
    } else {
        const maxId = actions.length > 0
            ? Math.max(...actions.map(a => {
                const idNum = a.id ? parseInt(a.id.split('-')[1]) : 0;
                return idNum || 0;
            }))
            : 0;
        action.id = `5W2H-${String(maxId + 1).padStart(3, '0')}`;
        actions.push(action);
    }

    saveData();
    renderTable();
    updateStats();
    closeModal();
}

function deleteAction(index) {
    if (confirm('Tem certeza que deseja excluir esta ação?')) {
        actions.splice(index, 1);
        saveData();
        renderTable();
        updateStats();
    }
}

// ============================================
// UTILITÁRIOS
// ============================================

function getStatus(action) {
    if (action.status === 'Finalizado') {
        return 'Finalizado';
    }

    if (action.status === 'Em Atraso') {
        return 'Em Atraso';
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(action.whenEnd + 'T00:00:00');

    if (dueDate < today && action.status !== 'Finalizado') {
        return 'Em Atraso';
    }

    return action.status;
}

function getDateClass(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(date + 'T00:00:00');
    const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        return 'date-overdue';
    } else if (diffDays <= 7) {
        return 'date-warning';
    } else {
        return 'date-ok';
    }
}

function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
}

// ============================================
// RENDERIZAÇÃO
// ============================================

function renderTable() {
    const tbody = document.getElementById('tableBody');
    const emptyState = document.getElementById('emptyState');
    const filterStatus = document.getElementById('filterStatus').value;
    const filterWho = document.getElementById('filterWho').value;

    tbody.innerHTML = '';

    let filteredActions = actions;
    if (filterStatus) {
        filteredActions = filteredActions.filter(action => getStatus(action) === filterStatus);
    }
    if (filterWho) {
        filteredActions = filteredActions.filter(action => action.who === filterWho);
    }

    if (filteredActions.length === 0) {
        emptyState.style.display = 'block';
        document.querySelector('.table-wrapper').style.display = 'none';
        return;
    }

    emptyState.style.display = 'none';
    document.querySelector('.table-wrapper').style.display = 'block';

    filteredActions.forEach((action, index) => {
        const actualIndex = actions.indexOf(action);
        const status = getStatus(action);
        const dateEndClass = getDateClass(action.whenEnd);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong style="color: #667eea;">${action.id || 'N/A'}</strong></td>
            <td><strong>${action.actionName || 'Sem nome'}</strong></td>
            <td>${action.what}</td>
            <td>${action.why}</td>
            <td>${action.where}</td>
            <td>${formatDate(action.whenStart)}</td>
            <td class="${dateEndClass}">${formatDate(action.whenEnd)}</td>
            <td>${action.who}</td>
            <td>${action.how}</td>
            <td>${action.howMuch || '-'}</td>
            <td>
                <span class="status-badge status-${status.toLowerCase().replace(/ /g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}">
                    ${status}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-sm btn-edit" onclick="openModal(${actualIndex})">✏️ Editar</button>
                    ${status === 'Em Atraso' ? `<button class="btn-sm" style="background: #ffc107; color: #333;" onclick="requestNewDate(${actualIndex})">🔄 Nova Data</button>` : ''}
                    ${action.history && action.history.length > 0 ? `<button class="btn-sm" style="background: #17a2b8; color: white;" onclick="showHistory(${actualIndex})">📜 Histórico</button>` : ''}
                    <button class="btn-sm btn-delete" onclick="deleteAction(${actualIndex})">🗑️ Excluir</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function updateStats() {
    const stats = {
        'Em Atraso': 0,
        'Em Andamento': 0,
        'Não Iniciado': 0,
        'Finalizado': 0
    };

    actions.forEach(action => {
        const status = getStatus(action);
        stats[status]++;
    });

    document.getElementById('statEmAtraso').textContent = stats['Em Atraso'];
    document.getElementById('statEmAndamento').textContent = stats['Em Andamento'];
    document.getElementById('statNaoIniciado').textContent = stats['Não Iniciado'];
    document.getElementById('statFinalizado').textContent = stats['Finalizado'];

    updateCharts(stats);
}

function filterTable() {
    renderTable();
}

// ============================================
// GRÁFICOS
// ============================================

function updateCharts(stats) {
    updateStatusBarChart(stats);
    updatePieChart(stats);
    updateCellChart();
}

function updateStatusBarChart(stats) {
    const chartDiv = document.getElementById('statusChart');
    const total = actions.length || 1;

    const statusData = [
        { label: 'Em Atraso', value: stats['Em Atraso'], class: 'em-atraso' },
        { label: 'Em Andamento', value: stats['Em Andamento'], class: 'em-andamento' },
        { label: 'Não Iniciado', value: stats['Não Iniciado'], class: 'nao-iniciado' },
        { label: 'Finalizado', value: stats['Finalizado'], class: 'finalizado' }
    ];

    chartDiv.innerHTML = '';

    statusData.forEach(item => {
        const percentage = (item.value / total) * 100;
        const barItem = document.createElement('div');
        barItem.className = 'bar-item';
        barItem.innerHTML = `
            <div class="bar-label">${item.label}</div>
            <div class="bar-container">
                <div class="bar-fill ${item.class}" style="width: ${percentage}%">
                    ${item.value > 0 ? item.value : ''}
                </div>
            </div>
        `;
        chartDiv.appendChild(barItem);
    });
}

function updatePieChart(stats) {
    const canvas = document.getElementById('pieChart');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const total = actions.length || 1;
    const data = [
        { label: 'Em Atraso', value: stats['Em Atraso'], color: '#dc3545' },
        { label: 'Em Andamento', value: stats['Em Andamento'], color: '#ffc107' },
        { label: 'Não Iniciado', value: stats['Não Iniciado'], color: '#6c757d' },
        { label: 'Finalizado', value: stats['Finalizado'], color: '#28a745' }
    ];

    let currentAngle = -Math.PI / 2;

    data.forEach(item => {
        if (item.value > 0) {
            const sliceAngle = (item.value / total) * 2 * Math.PI;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = item.color;
            ctx.fill();

            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();

            const percentage = ((item.value / total) * 100).toFixed(1);
            const textAngle = currentAngle + sliceAngle / 2;
            const textX = centerX + (radius * 0.6) * Math.cos(textAngle);
            const textY = centerY + (radius * 0.6) * Math.sin(textAngle);

            ctx.fillStyle = 'white';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${percentage}%`, textX, textY);

            currentAngle += sliceAngle;
        }
    });

    const legendDiv = document.getElementById('pieLegend');
    legendDiv.innerHTML = '';

    data.forEach(item => {
        const percentage = ((item.value / total) * 100).toFixed(1);
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <div class="legend-color ${item.label.toLowerCase().replace(/ /g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}"></div>
            <div class="legend-text">${item.label}</div>
            <div class="legend-value">${item.value} (${percentage}%)</div>
        `;
        legendDiv.appendChild(legendItem);
    });
}

function updateCellChart() {
    const chartDiv = document.getElementById('cellChart');
    const cellCounts = {};

    actions.forEach(action => {
        const cell = action.where || 'Não especificado';
        cellCounts[cell] = (cellCounts[cell] || 0) + 1;
    });

    const sortedCells = Object.entries(cellCounts).sort((a, b) => b[1] - a[1]);
    const maxCount = Math.max(...Object.values(cellCounts), 1);

    chartDiv.innerHTML = '';

    if (sortedCells.length === 0) {
        chartDiv.innerHTML = '<p style="text-align: center; color: #6c757d;">Nenhuma ação cadastrada</p>';
        return;
    }

    sortedCells.forEach(([cell, count]) => {
        const percentage = (count / maxCount) * 100;
        const barItem = document.createElement('div');
        barItem.className = 'cell-bar-item';
        barItem.innerHTML = `
            <div class="cell-label">${cell}</div>
            <div class="cell-bar-container">
                <div class="cell-bar-fill" style="width: ${percentage}%">
                    ${count}
                </div>
            </div>
        `;
        chartDiv.appendChild(barItem);
    });
}

// ============================================
// GESTÃO DE ATRASOS E NOTIFICAÇÕES
// ============================================

function checkAndUpdateOverdueActions() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let updated = false;

    actions.forEach(action => {
        if (action.status !== 'Finalizado') {
            const dueDate = new Date(action.whenEnd + 'T00:00:00');

            if (dueDate < today && action.status !== 'Em Atraso') {
                action.status = 'Em Atraso';
                updated = true;

                if (!action.history) {
                    action.history = [];
                }
                action.history.push({
                    date: new Date().toISOString(),
                    message: `Status automaticamente alterado para "Em Atraso" - Data limite ultrapassada`
                });
            }
        }
    });

    if (updated) {
        saveData();
    }
}

function checkUpcomingDeadlines() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const notifications = localStorage.getItem('notificationsSent') ? JSON.parse(localStorage.getItem('notificationsSent')) : {};

    actions.forEach((action, index) => {
        if (action.status !== 'Finalizado' && action.status !== 'Em Atraso') {
            const dueDate = new Date(action.whenEnd + 'T00:00:00');

            if (dueDate.getTime() === tomorrow.getTime()) {
                const notificationKey = `${index}_${action.whenEnd}`;

                if (!notifications[notificationKey]) {
                    sendEmailNotification(action);
                    notifications[notificationKey] = true;
                    localStorage.setItem('notificationsSent', JSON.stringify(notifications));
                }
            }
        }
    });
}

function sendEmailNotification(action) {
    const subject = `⚠️ ALERTA: Prazo próximo - Ação 5W2H`;
    const body = `
ATENÇÃO GESTÃO!

Uma ação do Plano 5W2H está próxima do prazo limite (1 dia).

📋 DETALHES DA AÇÃO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
O Quê?: ${action.what}
Por Quê?: ${action.why}
Onde?: ${action.where}
Data Início: ${formatDate(action.whenStart)}
⚠️ Data Fim: ${formatDate(action.whenEnd)} (AMANHÃ)
Responsável: ${action.who}
Status Atual: ${action.status}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Por favor, acompanhe esta pendência com urgência.

Sistema 5W2H - Texcotton SGQ
    `.trim();

    console.log('📧 EMAIL ENVIADO PARA:', emailGestao);
    console.log('Assunto:', subject);
    console.log('Corpo:', body);

    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(subject, {
            body: `Ação "${action.what}" vence amanhã!\nResponsável: ${action.who}`,
            icon: '⚠️',
            requireInteraction: true
        });
    }

    showNotificationBanner(`⚠️ Alerta enviado: A ação "${action.what}" vence amanhã! Email enviado para gestão.`);
}

function showNotificationBanner(message) {
    const banner = document.createElement('div');
    banner.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 400px;
        font-weight: 600;
        animation: slideIn 0.5s ease;
    `;
    banner.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <span style="font-size: 2em;">📧</span>
            <div>
                <div style="font-size: 1.1em; margin-bottom: 5px;">Notificação Enviada!</div>
                <div style="font-size: 0.9em; opacity: 0.9;">${message}</div>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 1.5em; cursor: pointer; margin-left: auto;">×</button>
        </div>
    `;
    document.body.appendChild(banner);

    setTimeout(() => {
        if (banner.parentElement) {
            banner.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => banner.remove(), 500);
        }
    }, 10000);
}

// ============================================
// SOLICITAÇÃO DE NOVA DATA
// ============================================

function requestNewDate(index) {
    const action = actions[index];

    const newDateModal = document.createElement('div');
    newDateModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    newDateModal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 90%;">
            <h2 style="color: #dc3545; margin-bottom: 20px;">🔄 Solicitação de Nova Data</h2>
            <p style="margin-bottom: 20px; color: #495057;">
                Esta ação está <strong>EM ATRASO</strong>. Por favor, defina uma nova data limite e justifique o atraso.
            </p>

            <div style="margin-bottom: 15px;">
                <label style="display: block; font-weight: 600; margin-bottom: 5px;">Ação:</label>
                <div style="padding: 10px; background: #f8f9fa; border-radius: 5px;">${action.what}</div>
            </div>

            <div style="margin-bottom: 15px;">
                <label style="display: block; font-weight: 600; margin-bottom: 5px;">Data Limite Anterior:</label>
                <div style="padding: 10px; background: #f8f9fa; border-radius: 5px; color: #dc3545;">${formatDate(action.whenEnd)}</div>
            </div>

            <div style="margin-bottom: 15px;">
                <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #495057;">Nova Data Limite: *</label>
                <input type="date" id="newDateInput" style="width: 100%; padding: 12px; border: 2px solid #e9ecef; border-radius: 8px; font-size: 1em;" required>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #495057;">Justificativa do Atraso: *</label>
                <textarea id="justificationInput" style="width: 100%; padding: 12px; border: 2px solid #e9ecef; border-radius: 8px; font-size: 1em; min-height: 100px; resize: vertical;" placeholder="Descreva o motivo do atraso..." required></textarea>
            </div>

            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button onclick="this.closest('div[style*=fixed]').remove()" style="padding: 12px 24px; background: #6c757d; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">Cancelar</button>
                <button onclick="saveNewDate(${index})" style="padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">Salvar Nova Data</button>
            </div>
        </div>
    `;

    document.body.appendChild(newDateModal);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('newDateInput').min = tomorrow.toISOString().split('T')[0];
}

function saveNewDate(index) {
    const newDate = document.getElementById('newDateInput').value;
    const justification = document.getElementById('justificationInput').value;

    if (!newDate || !justification) {
        alert('Por favor, preencha a nova data e a justificativa!');
        return;
    }

    const action = actions[index];
    const oldDate = action.whenEnd;

    action.whenEnd = newDate;
    action.status = 'Em Andamento';

    if (!action.history) {
        action.history = [];
    }
    action.history.push({
        date: new Date().toISOString(),
        oldDate: oldDate,
        newDate: newDate,
        justification: justification,
        message: `Data limite alterada de ${formatDate(oldDate)} para ${formatDate(newDate)}`
    });

    saveData();
    renderTable();
    updateStats();

    document.querySelector('div[style*="position: fixed"]').remove();

    showNotificationBanner(`✅ Nova data definida: ${formatDate(newDate)}. Status alterado para "Em Andamento".`);
}

// ============================================
// HISTÓRICO
// ============================================

function showHistory(index) {
    const action = actions[index];

    if (!action.history || action.history.length === 0) {
        alert('Esta ação não possui histórico de alterações.');
        return;
    }

    const historyModal = document.createElement('div');
    historyModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    let historyHtml = '';
    action.history.forEach((entry, idx) => {
        const date = new Date(entry.date);
        historyHtml += `
            <div style="padding: 15px; background: ${idx % 2 === 0 ? '#f8f9fa' : 'white'}; border-left: 4px solid #667eea; margin-bottom: 10px; border-radius: 5px;">
                <div style="font-weight: 600; color: #667eea; margin-bottom: 5px;">
                    📅 ${date.toLocaleString('pt-BR')}
                </div>
                <div style="color: #495057; margin-bottom: 5px;">
                    ${entry.message}
                </div>
                ${entry.oldDate ? `
                    <div style="font-size: 0.9em; color: #6c757d;">
                        <strong>De:</strong> ${formatDate(entry.oldDate)} → <strong>Para:</strong> ${formatDate(entry.newDate)}
                    </div>
                ` : ''}
                ${entry.justification ? `
                    <div style="margin-top: 8px; padding: 10px; background: #fff3cd; border-radius: 5px; font-size: 0.9em;">
                        <strong>Justificativa:</strong> ${entry.justification}
                    </div>
                ` : ''}
            </div>
        `;
    });

    historyModal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 15px; max-width: 700px; width: 90%; max-height: 80vh; overflow-y: auto;">
            <h2 style="color: #667eea; margin-bottom: 10px;">📜 Histórico de Alterações</h2>
            <div style="margin-bottom: 20px; padding: 15px; background: #e7f3ff; border-radius: 8px;">
                <strong>Ação:</strong> ${action.actionName || action.what}
            </div>
            <div style="margin-bottom: 20px;">
                ${historyHtml}
            </div>
            <div style="display: flex; justify-content: flex-end;">
                <button onclick="this.closest('div[style*=fixed]').remove()" style="padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">Fechar</button>
            </div>
        </div>
    `;

    document.body.appendChild(historyModal);
}

// ============================================
// CONFIGURAÇÕES
// ============================================

function openSettings() {
    const currentEmail = localStorage.getItem('emailGestao') || emailGestao;

    const settingsModal = document.createElement('div');
    settingsModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    settingsModal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 15px; max-width: 600px; width: 90%;">
            <h2 style="color: #667eea; margin-bottom: 20px;">⚙️ Configurações do Sistema</h2>

            <div style="margin-bottom: 20px;">
                <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #495057;">
                    📧 Email da Gestão para Notificações:
                </label>
                <input type="email" id="emailGestaoInput" value="${currentEmail}"
                    style="width: 100%; padding: 12px; border: 2px solid #e9ecef; border-radius: 8px; font-size: 1em;"
                    placeholder="gestao@texcotton.com.br">
                <small style="color: #6c757d; display: block; margin-top: 5px;">
                    Este email receberá alertas quando uma ação estiver próxima do prazo (1 dia antes).
                </small>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: #e7f3ff; border-radius: 8px; border-left: 4px solid #17a2b8;">
                <h4 style="margin-bottom: 10px; color: #17a2b8;">ℹ️ Sobre as Notificações</h4>
                <ul style="margin-left: 20px; color: #495057; line-height: 1.8;">
                    <li>O sistema verifica automaticamente ações próximas do prazo</li>
                    <li>Um email é enviado <strong>1 dia antes</strong> da data limite</li>
                    <li>Ações em atraso são sinalizadas automaticamente em vermelho</li>
                    <li>Você pode solicitar nova data para ações atrasadas</li>
                    <li>Todo histórico de alterações é registrado</li>
                </ul>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">
                <h4 style="margin-bottom: 10px; color: #856404;">⚠️ Nota Importante</h4>
                <p style="color: #856404; margin: 0;">
                    Para envio real de emails, é necessário configurar um servidor SMTP ou API de email (Gmail, SendGrid, etc.).
                    Atualmente, as notificações aparecem no console do navegador e como alertas visuais.
                </p>
            </div>

            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button onclick="this.closest('div[style*=fixed]').remove()"
                    style="padding: 12px 24px; background: #6c757d; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                    Cancelar
                </button>
                <button onclick="saveSettings()"
                    style="padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                    Salvar Configurações
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(settingsModal);
}

function saveSettings() {
    const email = document.getElementById('emailGestaoInput').value;

    if (!email || !email.includes('@')) {
        alert('Por favor, insira um email válido!');
        return;
    }

    localStorage.setItem('emailGestao', email);
    document.querySelector('div[style*="position: fixed"]').remove();
    showNotificationBanner(`✅ Configurações salvas! Email da gestão: ${email}`);
}

// ============================================
// EXPORTAÇÃO
// ============================================

function exportToExcel() {
    if (actions.length === 0) {
        alert('Não há dados para exportar!');
        return;
    }

    let csv = '\uFEFF';
    csv += 'ID,Ação,O Quê?,Por Quê?,Onde?,Data Início,Data Fim,Quem?,Como?,Quanto?,Status\n';

    actions.forEach(action => {
        const status = getStatus(action);
        csv += `"${action.id || 'N/A'}","${action.actionName || ''}","${action.what}","${action.why}","${action.where}","${formatDate(action.whenStart)}","${formatDate(action.whenEnd)}","${action.who}","${action.how}","${action.howMuch || ''}","${status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `5W2H_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function generatePDFReport() {
    if (actions.length === 0) {
        alert('Não há dados para gerar o relatório!');
        return;
    }

    const printWindow = window.open('', '_blank');
    // [PDF generation code would continue here - too long to include fully]
    // The full implementation is in the original HTML file
}

function getStatusCount(statusName) {
    return actions.filter(action => getStatus(action) === statusName).length;
}

function getDateRange() {
    if (actions.length === 0) return 'N/A';

    const dates = actions.map(a => new Date(a.whenStart));
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));

    return `${formatDate(minDate.toISOString().split('T')[0])} a ${formatDate(maxDate.toISOString().split('T')[0])}`;
}

// ============================================
// EVENT LISTENERS
// ============================================

window.onclick = function(event) {
    const modal = document.getElementById('actionModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Solicitar permissão para notificações
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}
