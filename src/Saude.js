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
      <h2 className="section-title">Seguro Saúde</h2>
      <div className="comparison-grid">
        <Card>
          <div className="card-title">📋 Situação Atual</div>
          <div>Seguradora: <strong>SulAmérica/Hapvida</strong></div>
          <div>Apólice:</div>
          <div className="value-display value-atual">{formatCurrency(saudeAtual)}</div>
        </Card>
        <Card>
          <div className="card-title">✨Com A Nova Proposta <strong>Belz</strong></div>
          <div>Seguradora: <strong>Bradesco/Unimed</strong></div>
          <div>Apólice:</div>
          <div className="value-display value-novo">{formatCurrency(saudeNovo)}</div>
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
