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

  return (
    <motion.div 
      className="section saude"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-title">Seguro Saúde Mensal</h2>
      <div className="comparison-grid">
        <Card>
          <div className="card-title">📋 Situação Atual</div>
          <div>Seguradora: <strong>SulAmérica/Hapvida</strong></div>
          <div>Apólice:</div>
          <div className="value-display value-atual">{formatCurrency(saudeAtual)}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
            <a
              href="/arquivos/sulamerica.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="download-btn"
              style={{
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
              }}
            >
              BAIXAR SULAMÉRICA (PDF)
            </a>
            <a
              href="/arquivos/hapvida.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="download-btn"
              style={{
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
              }}
            >
              BAIXAR HAPVIDA (PDF)
            </a>
          </div>
        </Card>
        <Card>
          <div className="card-title">✨Com A Nova Proposta <strong>Belz</strong></div>
          <div>Seguradora: <strong>Bradesco/Unimed</strong></div>
          <div>Apólice:</div>
          <div className="value-display value-novo">{formatCurrency(saudeNovo)}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
            <button
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: '#011147',
                color: '#fff',
                borderRadius: 8,
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 2px 8px #01114733',
                transition: 'background 0.2s',
                textAlign: 'center',
                border: 'none',
                cursor: 'pointer',
                opacity: 1,
              }}
              tabIndex={0}
              aria-disabled="true"
            >
              Download Proposta Belz (SulAmérica)
            </button>
            <button
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: '#011147',
                color: '#fff',
                borderRadius: 8,
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 2px 8px #01114733',
                transition: 'background 0.2s',
                textAlign: 'center',
                border: 'none',
                cursor: 'pointer',
                opacity: 1,
              }}
              tabIndex={0}
              aria-disabled="true"
            >
              Download Proposta Belz (Hapvida)
            </button>
          </div>
        </Card>
      </div>
      <motion.div 
        className={saudeEconomia > 0 ? "difference" : "difference negative"}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Economia: {formatCurrency(saudeEconomia)}
      </motion.div>
    </motion.div>
  );
}

export default Saude;
