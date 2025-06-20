import React from "react";
import Card from "./components/Card";
import { motion } from "framer-motion";

function Vida({ vidaAtual, vidaColaboradoresAtual, vidaUnitarioAtual, vidaNovo }) {
  const vidaEconomia = vidaAtual - vidaNovo;

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

  // Estilo de botão com ajustes responsivos
  const downloadBtnStyle = {
    display: 'inline-block',
    padding: '12px 24px',
    background: '#1976d2',
    color: '#fff',
    borderRadius: 8,
    fontWeight: 700,
    textDecoration: 'none',
    boxShadow: '0 2px 8px #01114733',
    marginTop: 16,
    transition: 'background 0.2s',
    textAlign: 'center',
    width: 'auto',
    maxWidth: '100%',
    cursor: 'pointer',
    border: 'none',
  };

  return (
    <motion.div 
      className="section vida"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="section-title">Seguro de Vida </h2>
      <div className="comparison-grid" style={{ alignItems: 'flex-start' }}>
        <Card>
          <p className="card-title">📋 Situação Atual</p>
          <div className="card-title">👥 {vidaColaboradoresAtual} Colaboradores</div>
          <div className="value-display value-novo" style={{ color: 'var(--accent-color)' }}>{formatCurrency(vidaAtual)}</div>
          <div>Valor por colaborador: <strong>{formatCurrency(vidaUnitarioAtual)}</strong></div>          <button
            onClick={() => handleDownload('segurodevida-alfa-atual.pdf')}
            className="download-btn"
            style={downloadBtnStyle}
          >
            BAIXAR SEGURO ATUAL (ALFA)
          </button>
        </Card>        <Card>
          <p className="card-title">📋 Proposta Belz</p>
          <div className="card-title">👥 70 Colaboradores</div>
          <div className="value-display value-novo" style={{ color: '#011147' }}>{formatCurrency(vidaNovo)}</div>
          <div>Valor por colaborador: <strong>{formatCurrency(vidaNovo / 70)}</strong></div>          <button
            onClick={() => handleDownload('segurodevida-sulamerica-belz.pdf')}
            className="download-btn"
            style={downloadBtnStyle}
          >
            BAIXAR SEGURO BELZ (SULAMÉRICA)
          </button>
        </Card>

      </div>
      
      {/* Tabela Comparativa */}
      <div style={{ marginTop: 30 }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: 15, color: '#011147' }}>Comparativo Detalhado</h3>
        <div className="table-responsive">
          <table className="summary-table">
            <thead>              <tr>
                <th>Categoria</th>
                <th>Atual (Alfa)</th>
                <th>Proposta (SulAmérica)</th>
                <th>Investimento</th>
              </tr>
            </thead>            
            
            <tbody>
              <tr>
                <td>Valor Mensal</td>
                <td>{formatCurrency(vidaAtual / 12)}</td>
                <td>{formatCurrency(vidaNovo / 12)}</td>
                <td style={{ color: '#006400', fontWeight: 'bold' }}>{formatCurrency(vidaEconomia / 12)}</td>
              </tr>
              <tr>
                <td>Valor Anual</td>
                <td>{formatCurrency(vidaAtual)}</td>
                <td>{formatCurrency(vidaNovo)}</td>
                <td style={{ color: '#006400', fontWeight: 'bold' }}>{formatCurrency(vidaEconomia)}</td>
              </tr>
              <tr>
                <td><strong>*OBSERVAÇÃO: INCLUSÃO DE TELEMEDICINA</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export default Vida;
