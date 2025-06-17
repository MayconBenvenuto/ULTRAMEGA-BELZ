import React from "react";
import Card from "./components/Card";
import { motion } from "framer-motion";

function Saude({ saudeAtual, saudeNovo }) {
  const saudeEconomia = saudeAtual - saudeNovo;

  function formatCurrency(value) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  // Função para lidar com downloads
  const handleDownload = (fileName) => {
    const link = document.createElement('a');
    link.href = `${process.env.PUBLIC_URL}/arquivos/${fileName}`;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadBtnStyle = {
    display: 'inline-block',
    padding: '12px 24px',
    background: '#1976d2',
    color: '#fff',
    borderRadius: 8,
    fontWeight: 700,
    textDecoration: 'none',
    boxShadow: '0 2px 8px #01114733',
    transition: 'background 0.2s',
    textAlign: 'center',
    cursor: 'pointer',
    border: 'none',
    width: '100%',
  };

  return (
    <motion.div 
      className="section saude"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-title">Seguro Saúde</h2>
      <div className="comparison-grid">
        <Card>
          <div className="card-title">📋 Situação Atual</div>
          <div>Seguradora: <strong>SulAmérica/Hapvida</strong></div>
          <div>Apólice:</div>
          <div className="value-display value-atual">{formatCurrency(saudeAtual)}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>            <button
              onClick={() => handleDownload('sulamerica-atual.pdf')}
              className="download-btn"
              style={downloadBtnStyle}
            >
              BAIXAR SULAMÉRICA ATUAL
            </button>
            <button
              onClick={() => handleDownload('hapvida-atual.pdf')}
              className="download-btn"
              style={downloadBtnStyle}
            >
              BAIXAR HAPVIDA ATUAL
            </button>
          </div>
        </Card>        <Card>
          <div className="card-title">📋 Proposta Belz</div>
          <div>Seguradora: <strong>Bradesco/Unimed</strong></div>
          <div>Apólice:</div>
          <div className="value-display value-novo">{formatCurrency(saudeNovo)}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
            <button
              onClick={() => handleDownload('segurosaude-bradesco-belz.pdf')}
              className="download-btn"
              style={downloadBtnStyle}
            >
              BAIXAR PROPOSTA BRADESCO (BELZ)
            </button>
            <button
              onClick={() => handleDownload('segurosaude-unimed-belz.pdf')}
              className="download-btn"
              style={downloadBtnStyle}
            >
              BAIXAR PROPOSTA UNIMED (BELZ)
            </button>
          </div>
          <div style={{ marginTop: 16 }}>
            <div>Economia mensal: <strong style={{ color: '#2ecc71' }}>{formatCurrency(saudeEconomia)}</strong></div>
            <div>Economia anual: <strong style={{ color: '#2ecc71' }}>{formatCurrency(saudeEconomia * 12)}</strong></div>
          </div>
        </Card>
      </div>
      
      {/* Tabela Comparativa */}
      <div style={{ marginTop: 30 }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: 15, color: '#011147' }}>Comparativo Detalhado</h3>
        <div className="table-responsive">
          <table className="summary-table">
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Atual (SulAmérica/Hapvida)</th>
                <th>Proposta (Bradesco/Unimed)</th>
                <th>Economia</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Valor Mensal</td>
                <td>{formatCurrency(saudeAtual)}</td>
                <td>{formatCurrency(saudeNovo)}</td>
                <td style={{ color: '#2ecc71', fontWeight: 'bold' }}>{formatCurrency(saudeEconomia)}</td>
              </tr>
              <tr>
                <td>Valor Anual</td>
                <td>{formatCurrency(saudeAtual * 12)}</td>
                <td>{formatCurrency(saudeNovo * 12)}</td>
                <td style={{ color: '#2ecc71', fontWeight: 'bold' }}>{formatCurrency(saudeEconomia * 12)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export default Saude;
