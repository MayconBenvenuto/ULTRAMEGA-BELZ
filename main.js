// JavaScript extraído do index.html
const SPREADSHEET_URLS = {
    saude: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbbfEq-_GHehNqBfY0HD6S-98wxWQ2z5vptb09Ze_6eTM-1b4ACcnqpswMDuXePw/pub?gid=871178406&single=true&output=csv',
    vida: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbbfEq-_GHehNqBfY0HD6S-98wxWQ2z5vptb09Ze_6eTM-1b4ACcnqpswMDuXePw/pub?gid=184764413&single=true&output=csv',
    frota: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbbfEq-_GHehNqBfY0HD6S-98wxWQ2z5vptb09Ze_6eTM-1b4ACcnqpswMDuXePw/pub?gid=1487316909&single=true&output=csv'
};
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}
function parseCSV(text) {
    const lines = text.split('\n');
    const result = [];
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
            const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index] || '';
            });
            result.push(row);
        }
    }
    return result;
}
async function loadSpreadsheetData() {
    try {
        const responses = await Promise.all([
            fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(SPREADSHEET_URLS.saude)}`),
            fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(SPREADSHEET_URLS.vida)}`),
            fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(SPREADSHEET_URLS.frota)}`)
        ]);
        const [saudeResponse, vidaResponse, frotaResponse] = responses;
        const saudeData = parseCSV((await saudeResponse.json()).contents);
        const vidaData = parseCSV((await vidaResponse.json()).contents);
        const frotaData = parseCSV((await frotaResponse.json()).contents);
        return { saudeData, vidaData, frotaData };
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        return {
            saudeData: [
                { tipo: 'atual', seguradora: 'SulAmérica/Hapvida', valor: 'R$ 50.000,00' },
                { tipo: 'novo', seguradora: 'Unimed/Bradesco', valor: 'R$ 45.000,00' }
            ],
            vidaData: [
                { opcao: '1', colaboradores: '63', valor: 'R$ 1.668,00' },
                { opcao: '2', colaboradores: '148', valor: 'R$ 4.142,79' }
            ],
            frotaData: [
                { tipo: 'atual', seguradora: 'Bradesco', valor: 'R$ 260.050,01' },
                { tipo: 'tokio', seguradora: 'Tokio', valor: 'R$ 15.800,03' },
                { tipo: 'allianz', seguradora: 'Allianz', valor: 'R$ 206.507,71' }
            ]
        };
    }
}
function updateInterface(data) {
    // Dados de Saúde (usando valores estimados)
    const saudeAtual = 59214.13;
    const saudeNovo = 46100.53; // Atualizado para 46.100,53
    const saudeEconomia = saudeAtual - saudeNovo;
    document.getElementById('saude-seguradora-atual').textContent = 'SulAmérica/Hapvida'; // Atualizado para SulAmérica/Hapvida
    document.getElementById('saude-apolice-atual').textContent = 'Apólice SulAmérica';
    document.getElementById('saude-valor-atual').textContent = formatCurrency(saudeAtual);
    document.getElementById('saude-seguradora-nova').textContent = 'Unimed/Bradesco';
    document.getElementById('saude-apolice-nova').textContent = 'Nova Apólice Belz';
    document.getElementById('saude-valor-novo').textContent = formatCurrency(saudeNovo);
    const saudeDiferenca = document.getElementById('saude-diferenca');
    saudeDiferenca.textContent = `Economia: ${formatCurrency(saudeEconomia)}`;
    saudeDiferenca.className = saudeEconomia > 0 ? 'difference' : 'difference negative';
    // Dados de Vida
    const vidaUnitario1 = 1668 / 63;
    const vidaUnitario2 = 4142.79 / 148;
    document.getElementById('vida-unitario-1').textContent = formatCurrency(vidaUnitario1);
    document.getElementById('vida-unitario-2').textContent = formatCurrency(vidaUnitario2);
    // Dados de Frota
    const frotaAtual = 260050.01;
    const frotaNovo = 15800.03 + 206507.71;
    const frotaEconomia = frotaAtual - frotaNovo;
    document.getElementById('frota-valor-novo').textContent = formatCurrency(frotaNovo);
    const frotaDiferenca = document.getElementById('frota-diferenca');
    frotaDiferenca.textContent = `Economia: ${formatCurrency(frotaEconomia)}`;
    frotaDiferenca.className = frotaEconomia > 0 ? 'difference' : 'difference negative';
    // Economia Total
    const economiaTotal = saudeEconomia + frotaEconomia;
    document.getElementById('economia-total').textContent = formatCurrency(economiaTotal);
}
async function initDashboard() {
    try {
        const data = await loadSpreadsheetData();
        updateInterface(data);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    } catch (error) {
        console.error('Erro ao inicializar dashboard:', error);
        document.getElementById('loading').innerHTML = '<p>Erro ao carregar dados. Usando valores de exemplo.</p>';
        updateInterface({});
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('content').style.display = 'block';
        }, 2000);
    }
}
setInterval(async () => {
    try {
        const data = await loadSpreadsheetData();
        updateInterface(data);
    } catch (error) {
        console.error('Erro ao atualizar dados:', error);
    }
}, 300000);
document.addEventListener('DOMContentLoaded', initDashboard);
