import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Saude from "./Saude";
import Vida from "./Vida";
import Frota from "./Frota";
import { useTheme } from "./ThemeContext";

function Dashboard() {  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  const saudeAtual = 59214.13;
  const saudeNovo = 47100.53;
  const saudeEconomia = saudeAtual - saudeNovo;

  const frotaAtual = 260050.01;
  const frotaNovo = 15800.03 + 206507.71;
  const frotaEconomia = frotaAtual - frotaNovo;

  const economiaTotal = saudeEconomia + frotaEconomia;

  const chartData = [
    { name: "Saúde", atual: saudeAtual, novo: saudeNovo },
    { name: "Frota", atual: frotaAtual, novo: frotaNovo },
  ];

  function formatCurrency(value) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  useEffect(() => {    async function fetchData() {
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <motion.div
        className="loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="spinner"></div>
        <p>Carregando dados das planilhas...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Saude />
      <Vida />
      <Frota />

      <div className="chart-section">
        <h2 className="section-title">📊 Comparativo de Valores</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke={isDark ? "#fff" : "#000"} />
            <YAxis stroke={isDark ? "#fff" : "#000"} />
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              contentStyle={{
                background: isDark ? "#2d3436" : "#fff",
                border: "none",
                borderRadius: "8px",
                color: isDark ? "#fff" : "#000",
              }}
            />
            <Bar dataKey="atual" fill="#e74c3c" name="Valor Atual" />
            <Bar dataKey="novo" fill="#27ae60" name="Valor Novo" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <motion.div
        className="total-savings"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>💰 Economia Total Estimada</h2>
        <div className="amount">{formatCurrency(economiaTotal)}</div>
        <p>Valor economizado anualmente com as propostas da Belz Corretora</p>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
