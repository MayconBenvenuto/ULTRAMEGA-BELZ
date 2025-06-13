import React from "react";
import Card from "./components/Card";
import { motion } from "framer-motion";

function Vida({ vidaAtual, vidaColaboradoresAtual, vidaUnitarioAtual, vidaNovo }) {
  function formatCurrency(value) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <motion.div 
      className="section vida"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="section-title">Seguro de Vida</h2>
      <div className="comparison-grid" style={{ alignItems: 'flex-start' }}>
        <Card>
          <div className="card-title">👥 {vidaColaboradoresAtual} Colaboradores</div>
          <div className="value-display value-novo">{formatCurrency(vidaAtual)}</div>
          <div>Valor por colaborador: <strong>{formatCurrency(vidaUnitarioAtual)}</strong></div>
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', width: '100%', maxWidth: 220, marginLeft: 'auto' }}>
          <a
            href="/arquivos/seguro-de-vida.pdf"
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
              marginTop: 16,
              transition: 'background 0.2s',
              textAlign: 'center',
            }}
          >
            📄 Baixar Seguro de Vida (PDF)
          </a>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <table className="summary-table">
          <thead>
            <tr>
              <th>Colaboradores</th>
              <th>Valor Total</th>
              <th>Valor Unitário</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{vidaColaboradoresAtual}</td>
              <td>{formatCurrency(vidaAtual)}</td>
              <td>{formatCurrency(vidaUnitarioAtual)}</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}

export default Vida;
