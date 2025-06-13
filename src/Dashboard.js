import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Saude from "./Saude";
import Frota from "./Frota";
import Vida from "./Vida";
import { useTheme } from "./ThemeContext";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  // Centralização dos valores principais
  // Saúde
  const saudeAtual = 59214.13;
  const saudeNovo = 47100.53;
  // Frota
  const frotaAtual = 260050.01;
  const tokioValor = 15800.03;
  const allianzValor = 206507.71;
  const frotaNovo = tokioValor + allianzValor;

  // Economia
  const economiaSaudeAnual = (saudeAtual - saudeNovo) * 12;
  const economiaFrotaAnual = frotaAtual - frotaNovo;
  const economiaAnualCorreta = economiaSaudeAnual + economiaFrotaAnual;
  const economiaMensalCorreta = economiaAnualCorreta / 12;

  // Valores para Vida
  const vidaColaboradoresAtual = 63;
  const vidaColaboradoresNovo = 148;
  const vidaAtual = 1668; // valor total opção 1
  const vidaNovo = 4142.79; // valor total opção 2
  const vidaUnitarioAtual = vidaAtual / vidaColaboradoresAtual;
  const vidaUnitarioNovo = vidaNovo / vidaColaboradoresNovo;
  // Custos extras
  const ouvidoria = 1300.00;
  const ginasticaLaboral = 2500.00;
  // Custos totais
  const custoMensalAtual = ouvidoria + ginasticaLaboral + saudeAtual + frotaAtual + vidaAtual;
  const custoTotalAtualAno = custoMensalAtual * 12;

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

  return (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Saude saudeAtual={saudeAtual} saudeNovo={saudeNovo} />
      <Vida 
        vidaAtual={vidaAtual}
        vidaNovo={vidaNovo}
        vidaColaboradoresAtual={vidaColaboradoresAtual}
        vidaColaboradoresNovo={vidaColaboradoresNovo}
        vidaUnitarioAtual={vidaUnitarioAtual}
        vidaUnitarioNovo={vidaUnitarioNovo}
      />
      <Frota frotaAtual={frotaAtual} tokioValor={tokioValor} allianzValor={allianzValor} />

      {/* Seção Custos Atuais - Design Elegante Azul Escuro */}
<motion.div
  className="section ultramega-custos-container"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 1 }}
>
  {/* Padrão geométrico de fundo */}
  <div className="ultramega-custos-pattern-bg" />
  
  <div className="ultramega-custos-content">
    {/* Header da seção */}
    <div className="ultramega-custos-header">
      
      <h2 className="ultramega-custos-title">
        Custos Atuais Mensais
      </h2>
    </div>
    
    {/* Cards de custos em layout mais limpo */}
    <div className="ultramega-custos-grid">
      {[
        { label: 'Ouvidoria', valor: ouvidoria, icon: '🎧', color: '#FF0000' },
        { label: 'Ginástica Laboral', valor: ginasticaLaboral, icon: '💪', color: '#FF0000' },
        { label: 'Saúde Atual', valor: saudeAtual, icon: '⚕️', color: '#FF0000' },
        { label: 'Frota Atual', valor: frotaAtual, icon: '🚙', color: '#FF0000' },
        { label: 'Vida', valor: vidaAtual, icon: '🛡️', color: '#FF0000' }
      ].map((item, index) => (
        <motion.div
          className="ultramega-custo-card"
          key={item.label}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="ultramega-custo-card-header">
            <div 
              className="ultramega-custo-card-icon-wrapper"
              style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`, boxShadow: `0 8px 20px ${item.color}40` }}
            >
              {item.icon}
            </div>
            <div>
              <div className="ultramega-custo-card-label">
                {item.label}
              </div>
            </div>
          </div>
          
          <div className="ultramega-custo-card-value">
            R$ {item.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
          </div>
        </motion.div>
      ))}
    </div>

    {/* Linha divisória elegante */}
    <div className="ultramega-custos-divider" />

    {/* Seção de totais com layout horizontal */}
    <div className="ultramega-custos-totals-grid">
      {/* Total Mensal */}
      <motion.div
        className="ultramega-total-card ultramega-total-card-mensal"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="ultramega-total-card-decoration right" />
        
        <div className="ultramega-total-card-label-text">
          Custo Mensal
        </div>
        <div className="ultramega-total-card-value-text">
          {formatCurrency(custoMensalAtual)}
        </div>
      </motion.div>

      {/* Multiplicador */}
      <motion.div
        className="ultramega-custos-multiplier"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1.2 }}
      >
        <span className="operator">×</span>
        <span className="number">12</span>
      </motion.div>

      {/* Total Anual */}
      <motion.div
        className="ultramega-total-card ultramega-total-card-anual"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <div className="ultramega-total-card-decoration left" />
        
        <div className="ultramega-total-card-label-text">
          Custo Anual
        </div>
        <div className="ultramega-total-card-value-text">
          {formatCurrency(custoTotalAtualAno)}
        </div>
      </motion.div>
    </div>
  </div>
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
            style={{ height: 'auto', width: 300, marginRight: 6, marginBottom: 30, borderRadius: 8, background: '', boxShadow: '0 2px 8px #01114733', objectFit: 'contain', maxWidth: '100%' ,'alignItems': 'center', 'justifyContent': 'center' }} 
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
                    max-width: 88vw !important;
                    min-width: 0 !important;
                    width: 88vw !important;
                    height: auto !important;
                    margin: 0 auto !important;
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
            Economia estimada por MÊS: {formatCurrency(economiaMensalCorreta)}
          </span>
        </p>
        <div className="amount" style={{ color: '#011147', fontSize: '2.8rem', marginTop: 18, textAlign: 'center', width: '100%' }}>Economia estimada por ANO: {formatCurrency(economiaAnualCorreta)}</div>
        <p style={{ color: '#1a237e', textAlign: 'center', width: '100%' }}>Valor economizado anualmente com as propostas da Belz Corretora</p>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
