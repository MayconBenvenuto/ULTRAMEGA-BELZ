import { motion } from "framer-motion";
import Card from "./components/Card";

function Frota({ frotaAtual, tokioValor, allianzValor }) {
  const frotaNovo = tokioValor + allianzValor;
  const frotaEconomia = frotaAtual - frotaNovo;
  function formatCurrency(value) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
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
    padding: '10px 18px',
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
    fontSize: '0.9rem',
    marginTop: '8px',
  };

  return (
    <motion.div 
      className="section frota"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="section-title">Seguro de Frota</h2>
      <div className="comparison-grid">
        <Card>
          <div className="card-title">🚗 Situação Atual</div>
          <div>Veículos: <strong>37</strong></div>
          <div>Seguradora: <strong>Bradesco</strong></div>
          <div className="value-display value-atual">{formatCurrency(frotaAtual)} anualmente</div>
          <button
            onClick={() => handleDownload('segurofrota-atual.pdf')}
            className="download-btn"
            style={downloadBtnStyle}
          >
            BAIXAR SEGURO ATUAL
          </button>
        </Card>
        <Card>
          <div className="card-title">🚗 Nova Proposta Belz</div>
          <div>Veículos: <strong>37</strong></div>
          <div>Tokio: <strong>{formatCurrency(tokioValor)}</strong></div>
          <div>Allianz: <strong>{formatCurrency(allianzValor)}</strong></div>
          <div className="value-display value-novo">{formatCurrency(frotaNovo)} anualmente</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            <button
              onClick={() => handleDownload('segurofrota-tokio-belz.pdf')}
              className="download-btn"
              style={downloadBtnStyle}
            >
              BAIXAR PROPOSTA TOKIO (BELZ)
            </button>
            <button
              onClick={() => handleDownload('segurofrota-allianz-belz.pdf')}
              className="download-btn"
              style={downloadBtnStyle}
            >
              BAIXAR PROPOSTA ALLIANZ (BELZ)
            </button>
          </div>
        </Card>
      </div>

      {/* Tabela Comparativa */}
      <div style={{ marginTop: 30 }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: 15, color: '#011147' }}>Comparativo Detalhado</h3>
        <div className="table-responsive">
          <table className="summary-table">            <thead>
              <tr>
                <th>Seguradora</th>
                <th>Valor Anual</th>
                <th>Valor Mensal</th>
                <th>Status</th>
                <th>Economia Anual</th>
                <th>Economia Mensal</th>
              </tr>
            </thead>
            <tbody>              
              
              <tr>
                <td>Bradesco (Atual)</td>
                <td>{formatCurrency(frotaAtual)}</td>
                <td>{formatCurrency(frotaAtual / 12)}</td>
                <td style={{ color: '#e74c3c', fontWeight: 'bold' }}>Atual</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr style={{fontWeight: 'bold' }}>
                <td>Total Belz</td>
                <td>{formatCurrency(frotaNovo)}</td>
                <td>{formatCurrency(frotaNovo / 12)}</td>
                <td style={{ color: '#2ecc71', fontWeight: 'bold' }}>Proposta Total</td>
                <td style={{ color: '#2ecc71', fontWeight: 'bold' }}>{formatCurrency(frotaEconomia)}</td>
                <td style={{ color: '#2ecc71', fontWeight: 'bold' }}>{formatCurrency(frotaEconomia / 12)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export default Frota;
