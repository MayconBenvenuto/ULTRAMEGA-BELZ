import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Saude from "./Saude";
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

  // Vida: valor unitário fixo de R$ 27,99
  const vidaNovo = 1668; // valor total opção 1
  const vidaNovo2 = 4142.79; // valor total opção 2
  // Atualize o comparativo para incluir Vida
  const chartData = [
    { name: "Saúde", atual: saudeAtual, novo: saudeNovo },
    { name: "Frota", atual: frotaAtual, novo: frotaNovo },
    { name: "Vida (Opção 1)", atual: 0, novo: vidaNovo },
    { name: "Vida (Opção 2)", atual: 0, novo: vidaNovo2 },
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

  // Substitua o componente <Vida /> por:
  function VidaSection({ vidaNovo, vidaNovo2 }) {
    return (
      <motion.div 
        className="section vida"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="section-title">Seguro de Vida</h2>
        <div className="comparison-grid">
          <motion.div className="comparison-card" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <div className="card-title">👥 Opção 1 - 63 Colaboradores</div>
            <div className="value-display value-novo">R$ 1.668,00</div>
            <div>Valor por colaborador: <strong>R$ 27,99</strong></div>
          </motion.div>
          <motion.div className="comparison-card" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <div className="card-title">👥 Opção 2 - 148 Colaboradores</div>
            <div className="value-display value-novo">R$ 4.142,79</div>
            <div>Valor por colaborador: <strong>R$ 27,99</strong></div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Opção</th>
                <th>Colaboradores</th>
                <th>Valor Total</th>
                <th>Valor Unitário</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Opção 1</td>
                <td>63</td>
                <td>R$ 1.668,00</td>
                <td>R$ 27,99</td>
              </tr>
              <tr>
                <td>Opção 2</td>
                <td>148</td>
                <td>R$ 4.142,79</td>
                <td>R$ 27,99</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
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
      <VidaSection />
      <Frota />

      {/* Seção Belz Conecta Saúde */}
      <motion.div
        className="section saude"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        style={{ marginTop: 40 }}
      >
        <h2 className="section-title">Belz Conecta Saúde</h2>
        <p>
          O produto <strong>Belz Conecta Saúde</strong> oferece uma solução completa de gestão e acompanhamento da saúde dos colaboradores, com acesso a uma plataforma exclusiva e suporte especializado atendendo a atualização da NR-1.<br /><br />
          <strong>Investimento:</strong> R$ 14.976,00<br />
        </p>
      </motion.div>

      <div className="chart-section">
        <h2 className="section-title">📊 Comparativo de Valores</h2>
        <ResponsiveContainer width="100%" height={350}>
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
        <div className="amount">{formatCurrency(saudeEconomia + frotaEconomia)}</div>
        <p>Valor economizado anualmente com as propostas da Belz Corretora</p>
      </motion.div>

      {/* Seção Custos Atuais */}
      <motion.div
        className="section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        style={{ marginTop: 40 }}
      >
        <h2 className="section-title">Custos Atuais da Ultramega</h2>
        <p>
          A Ultramega já possui os seguintes custos mensais:<br />
          <strong>Ouvidoria:</strong> R$ 1.300,00<br />
          <strong>Ginástica Laboral:</strong> R$ 2.500,00<br />
          <br />
          <strong>Custo total atual:</strong> R$ 3.800,00 por mês
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
