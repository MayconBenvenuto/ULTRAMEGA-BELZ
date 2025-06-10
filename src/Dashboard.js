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
  // const vidaNovo = 1668; // valor total opção 1 (removido do comparativo)
  const vidaNovo2 = 4142.79; // valor total opção 2
  // Atualize o comparativo para incluir Vida
  const chartData = [
    { name: "Saúde", atual: saudeAtual, novo: saudeNovo },
    { name: "Frota", atual: frotaAtual, novo: frotaNovo },
    { name: "Vida", atual: 0, novo: vidaNovo2 },
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

      {/* Seção Custos Atuais - movida para logo após Frota */}
      <motion.div
        className="section ultramega-custos"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        style={{ marginTop: 30, borderLeftColor: '#1a237e', background: '#f5f7fa', color: '#1a237e', fontWeight: 600 }}
      >
        <h2 className="section-title" style={{ color: '#1a237e' }}>Custos Atuais:</h2>
        <p style={{ fontSize: '1.1rem' }}>
          A Ultramega já possui os seguintes custos mensais:<br />
          <span style={{ color: '#1a237e' }}><strong>Ouvidoria:</strong> R$ 1.300,00</span><br />
          <span style={{ color: '#1a237e' }}><strong>Ginástica Laboral:</strong> R$ 2.500,00</span><br />
          <span style={{ color: '#1a237e' }}><strong>Saúde Atual:</strong> R$ 59.214,13</span><br />
          <span style={{ color: '#1a237e' }}><strong>Frota Atual:</strong> R$ 260.050,01</span><br />
          <br />
          <span style={{ display: 'inline-block', color: '#fff', background: '#1a237e', padding: '6px 16px', borderRadius: 8, fontWeight: 700, fontSize: '1.2rem', marginBottom: 8 }}>
            Custo total atual: R$ 323.064,14 por ano
          </span>
          <br/>
          <span style={{ display: 'inline-block', color: '#1a237e', background: '#e3eafc', padding: '6px 16px', borderRadius: 8, fontWeight: 700, fontSize: '1.2rem', marginTop: 8, border: '1.5px solid #1a237e' }}>
            Custo mensal: R$ 26.922,01
          </span>
        </p>
        <p style={{ fontSize: '1.15rem', marginTop: 20 }}>
          <span style={{
            display: 'block',
            background: '#e74c3c',
            color: '#fff',
            fontWeight: 800,
            fontSize: '1.35rem',
            padding: '18px 0',
            borderRadius: 14,
            boxShadow: '0 2px 12px #e74c3c22',
            letterSpacing: 0.5,
            margin: '0 auto',
            width: '100%',
            textAlign: 'center',
            border: '2px solid #e74c3c'
          }}>
            Economia estimada por mês com a Belz: <span style={{ color: '#fff', fontWeight: 900 }}>{formatCurrency((saudeEconomia + frotaEconomia))}</span>
          </span>
        </p>
      </motion.div>

      {/* Seção Belz Conecta Saúde */}
      <motion.div
        className="section belz-conecta-saude super-destaque"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        style={{ marginTop: 40, borderLeftColor: '#011147', boxShadow: '0 0 40px 0 #01114755', background: 'linear-gradient(135deg, #011147 60%, #ffffff 100%)', color: '#fff', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: 0, right: 0, width: '180px', height: '180px', background: 'radial-gradient(circle at 80% 20%, #fff8, transparent 70%)', zIndex: 0 }}></div>
        <h2 className="section-title" style={{ color: '#fff', fontSize: '2.2rem', letterSpacing: 1 }}>🌟 Belz Conecta Saúde</h2>
        <p style={{ fontSize: '1.25rem', zIndex: 1, position: 'relative', color: '#fff' }}>
          O produto <strong style={{ color: '#fff', background: '#011147', padding: '2px 8px', borderRadius: 6 }}>Belz Conecta Saúde</strong> oferece uma solução completa de gestão e acompanhamento da saúde dos colaboradores, com acesso a uma plataforma exclusiva, suporte especializado e atendimento à NR-1.<br /><br />
          <span style={{ display: 'inline-block', background: '#fff', color: '#011147', fontWeight: 700, padding: '8px 18px', borderRadius: 10, fontSize: '1.3rem', margin: '10px 0' }}>
            Investimento: R$ 14.976,00
          </span>
        </p>
      </motion.div>

      <div className="chart-section">
        <h2 className="section-title">📊 Comparativo de Valores</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke={isDark ? "#fff" : "#011147"} />
            <YAxis stroke={isDark ? "#fff" : "#011147"} />
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              contentStyle={{
                background: isDark ? "#2d3436" : "#fff",
                border: "none",
                borderRadius: "8px",
                color: isDark ? "#fff" : "#011147",
              }}
            />
            <Bar dataKey="atual" fill="#1a237e" name="Valor Atual" />
            <Bar dataKey="novo" fill="#1976d2" name="Valor Novo" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <motion.div
        className="total-savings"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{ color: '#1a237e' }}>💰 Economia Total Estimada</h2>
        <div className="amount" style={{ color: '#1976d2' }}>{formatCurrency(saudeEconomia + frotaEconomia)}</div>
        <p style={{ color: '#1a237e' }}>Valor economizado anualmente com as propostas da Belz Corretora</p>
        <p style={{ fontSize: '1.2rem', marginTop: 10, color: '#1976d2', fontWeight: 700 }}>
          Economia estimada por mês: {formatCurrency((saudeEconomia + frotaEconomia) / 12)}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
