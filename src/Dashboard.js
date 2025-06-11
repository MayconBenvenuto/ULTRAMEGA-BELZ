import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Saude from "./Saude";
import Frota from "./Frota";
import { useTheme } from "./ThemeContext";

function Dashboard() {  
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  // Variáveis centralizadas para custos
  const ouvidoria = 1300.00;
  const ginasticaLaboral = 2500.00;
  const saudeAtual = 59214.13;
  const saudeNovo = 47100.53;
  const frotaAtual = 260050.01;
  const frotaNovo = 15800.03 + 206507.71;
  const vidaOp1Colaboradores = 63;
  const vidaUnitario = 27.99;
  const vidaOp2Colaboradores = 148;
  const vidaOp2Total = 4142.79;

  // Cálculos
  const vidaOp1Total = vidaUnitario * vidaOp1Colaboradores;
  const saudeEconomia = saudeAtual - saudeNovo;
  const frotaEconomia = frotaAtual - frotaNovo;
  const custoTotalAtualAno = ouvidoria * 12 + ginasticaLaboral * 12 + saudeAtual  + frotaAtual ;
  const custoMensalAtual = ouvidoria + ginasticaLaboral + saudeAtual/12 + frotaAtual/12;

  // Atualize o comparativo para incluir Vida
  const chartData = [
    { name: "Saúde", atual: saudeAtual, novo: saudeNovo },
    { name: "Frota", atual: frotaAtual, novo: frotaNovo },
    { name: "Vida", atual: 668, novo: vidaOp2Total },
  ];

  function formatCurrency(value) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  useEffect(() => {    
    async function fetchData() {
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
  function VidaSection() {
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
            <div className="card-title">👥 Opção 1 - {vidaOp1Colaboradores} Colaboradores</div>
            <div className="value-display value-novo">{formatCurrency(vidaOp1Total)}</div>
            <div>Valor por colaborador: <strong>{formatCurrency(vidaUnitario)}</strong></div>
          </motion.div>
          <motion.div className="comparison-card" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <div className="card-title">👥 Opção 2 - {vidaOp2Colaboradores} Colaboradores</div>
            <div className="value-display value-novo">{formatCurrency(vidaOp2Total)}</div>
            <div>Valor por colaborador: <strong>{formatCurrency(vidaUnitario)}</strong></div>
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
                <td>{vidaOp1Colaboradores}</td>
                <td>{formatCurrency(vidaOp1Total)}</td>
                <td>{formatCurrency(vidaUnitario)}</td>
              </tr>
              <tr>
                <td>Opção 2</td>
                <td>{vidaOp2Colaboradores}</td>
                <td>{formatCurrency(vidaOp2Total)}</td>
                <td>{formatCurrency(vidaUnitario)}</td>
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
          <p style={{ fontSize: '1.3rem', color: '#e74c3c' }}>
            A Ultramega já possui os seguintes custos mensais:<br />
            <span><strong>Ouvidoria:</strong> R$ {ouvidoria.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span><br />
            <span><strong>Ginástica Laboral:</strong> R$ {ginasticaLaboral.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span><br />
            <span><strong>Saúde Atual:</strong> R$ {saudeAtual.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span><br />
            <span><strong>Frota Atual Anual:</strong> R$ {frotaAtual.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span><br />
            <span><strong>Frota Atual Mensal:</strong> R$ {(frotaAtual/12).toLocaleString('pt-BR', {minimumFractionDigits: 2 })}</span><br />
            <br />
            <span className="valor-destaque">
          Custo total atual: <span style={{ color: '#fff', fontWeight: 900 }}>{formatCurrency(custoTotalAtualAno)} por ano</span>
            </span>
            <br/>
            <span className="valor-destaque" style={{ marginTop: 8, border: '1.5px solid #b71c1c' }}>
          Custo mensal: <span style={{ color: '#fff', fontWeight: 900 }}>{formatCurrency(custoMensalAtual)}</span>
            </span>
          </p>
          <p style={{ fontSize: '1.15rem', marginTop: 20 }}>
            <span style={{
          display: 'block',
          background: '#011147',
          color: '#fff',
          fontWeight: 800,
          fontSize: '1.35rem',
          padding: '18px 0',
          borderRadius: 14,
          boxShadow: '0 2px 12px #1976d222',
          letterSpacing: 0.5,
          margin: '0 auto',
          width: '100%',
          textAlign: 'center',
          border: '2px solid #011147',
            }}>
          <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.35rem', display: 'inline-block', width: '100%' }}>
            Economia estimada por mês com a Belz:<br />
            <span style={{ color: '#fff', fontWeight: 900, fontSize: '2.2rem', letterSpacing: 1, display: 'block', marginTop: 8 }}>
              {formatCurrency((saudeEconomia + frotaEconomia))}
            </span>
          </span>
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
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} barCategoryGap={30} barGap={8}>
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
            <Legend wrapperStyle={{ fontSize: '1.1rem' }} />
            <Bar dataKey="atual" fill="#1a237e" name="Valor Atual" maxBarSize={60} minPointSize={vidaOp2Total > 0 ? 30 : 20} />
            <Bar dataKey="novo" fill="#1976d2" name="Valor Novo" maxBarSize={90} minPointSize={vidaOp2Total > 0 ? 50 : 30} />
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
        <div className="amount" style={{ color: '#011147', fontSize: '3.2rem'}}>{formatCurrency(saudeEconomia + frotaEconomia)}</div>
        <p style={{ color: '#1a237e' }}>Valor economizado anualmente com as propostas da Belz Corretora</p>
        <p style={{ fontSize: '1.2rem', marginTop: 10 }}>
          <span style={{
            display: 'inline-block',
            background: '#011147',
            color: '#fff',
            fontWeight: 900,
            fontSize: '2.25rem',
            padding: '10px 24px',
            borderRadius: 10,
            boxShadow: '0 2px 12px #e74c3c22',
            letterSpacing: 0.5,
            border: '2px solid ##011147',
          }}>
            Economia estimada por mês: {formatCurrency((saudeEconomia + frotaEconomia) / 12)}
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
