import React from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from "./ThemeContext";

function Frota() {
  const { isDark } = useTheme();
  const frotaAtual = 260050.01;
  const tokioValor = 15800.03;
  const allianzValor = 206507.71;
  const frotaNovo = tokioValor + allianzValor;
  const frotaEconomia = frotaAtual - frotaNovo;

  const data = [
    { name: 'Tokio', value: tokioValor },
    { name: 'Allianz', value: allianzValor }
  ];

  const COLORS = ['#3498db', '#e67e22'];

  function formatCurrency(value) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <motion.div 
      className="section frota"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="section-title">Seguro de Frota</h2>
      <div className="comparison-grid">
        <motion.div 
          className="comparison-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="card-title">🚗 Situação Atual</div>
          <div>Veículos: <strong>37</strong></div>
          <div>Seguradora: <strong>Bradesco</strong></div>
          <div className="value-display value-atual">{formatCurrency(frotaAtual)}</div>
        </motion.div>
        <motion.div 
          className="comparison-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="card-title">🚗 Nova Proposta Belz</div>
          <div>Veículos: <strong>37</strong></div>
          <div>Tokio: <strong>{formatCurrency(tokioValor)}</strong></div>
          <div>Allianz: <strong>{formatCurrency(allianzValor)}</strong></div>
          <div className="value-display value-novo">{formatCurrency(frotaNovo)}</div>
        </motion.div>
      </div>

      <motion.div 
        className={frotaEconomia > 0 ? "difference" : "difference negative"}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Economia anual: {formatCurrency(frotaEconomia)}
        Economia mensal: {formatCurrency(frotaEconomia / 12)}
      </motion.div>
    </motion.div>
  );
}

export default Frota;
