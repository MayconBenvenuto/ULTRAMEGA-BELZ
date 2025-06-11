import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Saude from "./Saude";
import Frota from "./Frota";
import { useTheme } from "./ThemeContext";

function Dashboard() {  
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  // NOVOS VALORES ATUALIZADOS (conforme solicitado)
  // Custos atuais Ultramega
  const ouvidoria = 1300.00;
  const ginasticaLaboral = 2500.00;
  const saudeAtual = 59214.13;
  const frotaAtual = 21670.83;
  const vidaAtual = 668.80;
  const custoMensalAtual = ouvidoria+ginasticaLaboral+saudeAtual+frotaAtual+vidaAtual; // valor informado
  const custoTotalAtualAno = custoMensalAtual * 12; // valor informado

  // Proposta Belz
  const saudeNovo = 47100.00;
  const vidaNovo = 4142.79;
  const frotaNovo = 18525.64;
  const conectaSaude = 14976.00;
  const custoMensalBelz = 84744.43; // valor informado
  const custoTotalBelzAno = 1016933.16; // valor informado

  // Cálculo da economia
  const economiaMensal = custoMensalAtual - custoMensalBelz;
  const economiaAnual = custoTotalAtualAno - custoTotalBelzAno;

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
    // Dados fixos para exibição
    const vidaColaboradoresAtual = 24; // Exemplo, ajuste se necessário
    const vidaColaboradoresBelz = 148; // Exemplo, ajuste se necessário
    const vidaUnitarioAtual = vidaAtual / vidaColaboradoresAtual;
    const vidaUnitarioBelz = vidaNovo / vidaColaboradoresBelz;
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
            <div className="card-title">👥 Atual - {vidaColaboradoresAtual} Colaboradores</div>
            <div className="value-display value-novo">{formatCurrency(vidaAtual)}</div>
            <div>Valor por colaborador: <strong>{formatCurrency(vidaUnitarioAtual)}</strong></div>
          </motion.div>
          <motion.div className="comparison-card" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <div className="card-title">👥 Belz - {vidaColaboradoresBelz} Colaboradores</div>
            <div className="value-display value-novo">{formatCurrency(vidaNovo)}</div>
            <div>Valor por colaborador: <strong>{formatCurrency(vidaUnitarioBelz)}</strong></div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Condição</th>
                <th>Colaboradores</th>
                <th>Valor Total</th>
                <th>Valor Unitário</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Atual</td>
                <td>{vidaColaboradoresAtual}</td>
                <td>{formatCurrency(vidaAtual)}</td>
                <td>{formatCurrency(vidaUnitarioAtual)}</td>
              </tr>
              <tr>
                <td>Belz</td>
                <td>{vidaColaboradoresBelz}</td>
                <td>{formatCurrency(vidaNovo)}</td>
                <td>{formatCurrency(vidaUnitarioBelz)}</td>
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
          <p style={{ fontSize: '1.4rem', color: '#e74c3c' }}>
            A Ultramega já possui os seguintes custos mensais:<br />
            <span><strong>Ouvidoria:</strong> R$ {ouvidoria.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span><br />
            <span><strong>Ginástica Laboral:</strong> R$ {ginasticaLaboral.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span><br />
            <span><strong>Saúde Atual:</strong> R$ {saudeAtual.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span><br />
            <span><strong>Frota Atual:</strong> R$ {frotaAtual.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span><br />
            <span><strong>Vida:</strong> R$ {vidaAtual.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span><br />
            <br />
            <span className="valor-destaque">
          Custo Anual: <span style={{ color: '#fff', fontWeight: 900,'fontSize': '1.8rem' }}>{formatCurrency(custoTotalAtualAno)}</span>
            </span>
            <br/>
            <span className="valor-destaque" style={{ marginTop: 8, border: '1.5px solid #b71c1c' }}>
          Custo Mensal: <span style={{ color: '#fff', fontWeight: 900,'fontSize': '1.8rem' }}>{formatCurrency(custoMensalAtual)}</span>
            </span>
          </p>
         
        </motion.div>

      {/* Seção Belz Conecta Saúde + Proposta Belz */}
      <motion.div
        className="section belz-conecta-saude super-destaque"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        style={{
          marginTop: 56,
          borderLeft: '8px solid #1976d2',
          boxShadow: '0 8px 48px 0 #01114755',
          background: 'linear-gradient(120deg, #011147 65%, #1976d2 100%)',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 36,
          padding: 0,
          minHeight: 340,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
        }}
      >
        {/* Decoração de fundo com gradiente e formas */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 320, height: 320, background: 'radial-gradient(circle at 80% 20%, #fff3, transparent 80%)', zIndex: 0, filter: 'blur(2px)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, background: 'radial-gradient(circle at 10% 90%, #1976d2aa, transparent 80%)', zIndex: 0, filter: 'blur(2px)' }} />
        {/* Coluna texto */}
        <div style={{ flex: 1.5, padding: '54px 36px 54px 54px', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <img 
                src={process.env.PUBLIC_URL + '/conectasaude.png?v=1'} 
                alt="Logo Conecta Saúde" 
                style={{ height: 220, width: 250, marginRight: 6, borderRadius: 8, background: '', boxShadow: '0 2px 8px #01114733', objectFit: 'contain', maxWidth: '100%' ,'alignItems': 'center', 'justifyContent': 'center' }} 
                onError={e => { e.target.onerror = null; e.target.src = process.env.PUBLIC_URL + '/belz-logo.png'; }}
              />

              <img 
                src={process.env.PUBLIC_URL + '/proposta-belz.svg?v=1'} 
                alt="Proposta Belz" 
                className="proposta-belz-img"
                style={{
                  width: '100%',
                  maxWidth: 720,
                  height: 'auto',
                  borderRadius: 12,
                  background: '',
                  boxShadow: '0 2px 8px #01114733',
                  objectFit: 'contain',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  display: 'block',
                }}
                onError={e => { e.target.onerror = null; e.target.src = process.env.PUBLIC_URL + '/belz-logo.png'; }}
              />
              <style>{`
                @media (max-width: 600px) {
                  .proposta-belz-img {
                    max-width: 98vw !important;
                    min-width: 0 !important;
                    width: 98vw !important;
                    height: auto !important;
                  }
                }
              `}</style>          
        </div>
      </motion.div>

      <div className="chart-section" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
        <h2 className="section-title" style={{ textAlign: 'center', width: '100%' }}>📊 Comparativo de Valores Anual</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={[
            { name: "Saúde", atual: saudeAtual*12, novo: saudeNovo*12 },
            { name: "Frota", atual: frotaAtual*12, novo: frotaNovo*12 },
            { name: "Vida", atual: vidaAtual*12, novo: vidaNovo*12 },
          ]} barCategoryGap={30} barGap={8}>
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
            <Bar dataKey="atual" fill="#1a237e" name="Valor Atual" maxBarSize={60} minPointSize={30} />
            <Bar dataKey="novo" fill="#1976d2" name="Valor Belz" maxBarSize={90} minPointSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <motion.div
        className="total-savings"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '100%' }}
      >
        <h2 style={{ color: '#1a237e', textAlign: 'center', width: '100%' }}>💰 Economia Total Estimada</h2>
        <p style={{ fontSize: '1.2rem', marginTop: 10, textAlign: 'center' }}>
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
            border: '2px solid #011147',
            textAlign: 'center',
            width: '100%',
            maxWidth: 420
          }}>
            Economia estimada por MÊS: {formatCurrency(economiaMensal)}
          </span>
        </p>
        <div className="amount" style={{ color: '#011147', fontSize: '2.8rem', marginTop: 18, textAlign: 'center', width: '100%' }}>Economia estimada por ANO: {formatCurrency(economiaAnual)}</div>
        <p style={{ color: '#1a237e', textAlign: 'center', width: '100%' }}>Valor economizado anualmente com as propostas da Belz Corretora</p>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
