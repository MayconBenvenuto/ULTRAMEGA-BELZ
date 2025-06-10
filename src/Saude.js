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
          <div>Seguradora: <strong>SulAmérica</strong></div>
          <div>Apólice: <strong>Apólice SulAmérica</strong></div>
          <div className="value-display value-atual">{formatCurrency(saudeAtual)}</div>
        </motion.div>
        <motion.div 
          className="comparison-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="card-title">✨ Nova Proposta Belz</div>
          <div>Seguradora: <strong>Unimed/Bradesco</strong></div>
          <div>Apólice: <strong>Nova Apólice Belz</strong></div>
          <div className="value-display value-novo">{formatCurrency(saudeNovo)}</div>
        </motion.div>
      </div>

      <div style={{ height: '200px', marginTop: '20px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => formatCurrency(value)}
              contentStyle={{
                background: isDark ? "#2d3436" : "#fff",
                border: "none",
                borderRadius: "8px",
                color: isDark ? "#fff" : "#000"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
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
