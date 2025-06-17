import React from "react";
import Card from "./components/Card";
import { motion } from "framer-motion";

function SeguroEmpresarial({ empresarialAtual, empresarialNovo }) {
  const empresarialEconomia = empresarialAtual - empresarialNovo;

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
    marginTop: '8px',
  };

  return (
    <motion.div 
      className="section empresarial"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="section-title">Seguro Empresarial</h2>
      <div className="comparison-grid">        <Card>
          <div className="card-title">🏢 Situação Atual</div>
          <div>Seguradora: <strong>Atual</strong></div>
          <div>Apólice:</div>
          <div className="value-display value-atual">{formatCurrency(empresarialAtual)}</div>
          <button
            onClick={() => handleDownload('seguroempresarial-atual.pdf')}
            className="download-btn"
            style={downloadBtnStyle}
          >
            BAIXAR SEGURO EMPRESARIAL ATUAL
          </button>
        </Card>

        <Card>
          <div className="card-title">🏢 Proposta Belz</div>
          <div>Seguradora: <strong>Nova Proposta</strong></div>
          <div>Apólice:</div>
          <div className="value-display value-novo">{formatCurrency(empresarialNovo)}</div>
          {/* Botão será adicionado quando os arquivos estiverem prontos */}
          <div style={{ marginTop: 16 }}>
            <div>Economia anual: <strong style={{ color: '#2ecc71' }}>{formatCurrency(empresarialEconomia)}</strong></div>
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
                <th>Situação Atual</th>
                <th>Proposta Belz</th>
                <th>Economia</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Seguro Empresarial</td>
                <td>{formatCurrency(empresarialAtual)}</td>
                <td>{formatCurrency(empresarialNovo)}</td>
                <td style={{ color: '#2ecc71', fontWeight: 'bold' }}>{formatCurrency(empresarialEconomia)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export default SeguroEmpresarial;
