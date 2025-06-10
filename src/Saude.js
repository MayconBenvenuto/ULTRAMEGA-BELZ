import React from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from "./ThemeContext";

function Saude() {
  const { isDark } = useTheme();
  const saudeAtual = 59214.13;
  const saudeNovo = 47100.53;
  const saudeEconomia = saudeAtual - saudeNovo;

  const data = [
    { name: 'Atual', value: saudeAtual },
    { name: 'Novo', value: saudeNovo }
  ];

  const COLORS = ['#e74c3c', '#27ae60'];

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
        <motion.div 
          className="comparison-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="card-title">📋 Situação Atual</div>
          <div>Seguradora: <strong>SulAmérica/Hapvida</strong></div>
          <div>Apólice:</div>
          <div className="value-display value-atual">{formatCurrency(saudeAtual)}</div>
        </motion.div>
        <motion.div 
          className="comparison-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="card-title">✨Com A Nova Proposta <strong>Belz</strong></div>
          <div>Seguradora: <strong>Unimed/Bradesco</strong></div>
          <div>Apólice:</div>
          <div className="value-display value-novo">{formatCurrency(saudeNovo)}</div>
        </motion.div>
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
