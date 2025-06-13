import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Saude from "./Saude";
import Frota from "./Frota";
import Vida from "./Vida";
import { useTheme } from "./ThemeContext";
import conteudoSite from "./configConteudo";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  // Centralização dos valores principais
  // Saúde
  const saudeAtual = 59214.13;
  const saudeNovo = 47100.53;
  // Frota
  const frotaAtual = 21670.83 * 12; // Corrigido para valor anual
  const tokioValor = 15800.03;
  const allianzValor = 206507.71;
  const frotaNovo = tokioValor + allianzValor;

  // Valores para Vida
  const vidaColaboradoresAtual = 70;
  const vidaAtual = 668; // valor total opção 1
  const vidaUnitarioAtual = vidaAtual / vidaColaboradoresAtual;
  const vidaNovo = 1763.37;

  // Custos extras
  const ouvidoria = 1300.00;
  const ginasticaLaboral = 2500.00;
  // Custos totais
  // Corrigido: frotaAtual é anual, então para o custo mensal usamos frotaAtual / 12
  const custoMensalAtual = ouvidoria + ginasticaLaboral + saudeAtual + (frotaAtual / 12) + vidaAtual;
  const custoTotalAtualAno = ouvidoria * 12 + ginasticaLaboral * 12 + saudeAtual * 12 + frotaAtual + vidaAtual * 12;

  // Economia
  // Cálculo correto: economia anual = (saudeAtual - saudeNovo)*12 + (frotaAtual - frotaNovo) + (vidaAtual - vidaNovo)*12
  const economiaSaudeAnual = (saudeAtual - saudeNovo) * 12;
  const economiaFrotaAnual = frotaAtual - frotaNovo;
  const economiaVidaAnual = (vidaAtual - vidaNovo) * 12;
  const economiaAnualCorreta = economiaSaudeAnual + economiaFrotaAnual + economiaVidaAnual;
  const economiaMensalCorreta = economiaAnualCorreta / 12;

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
        vidaColaboradoresAtual={vidaColaboradoresAtual}
        vidaUnitarioAtual={vidaUnitarioAtual}
        vidaNovo={1763.37} // Novo valor Belz
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
        {conteudoSite.custos.titulo}
      </h2>
    </div>
    
    {/* Cards de custos em layout mais limpo */}
    <div className="ultramega-custos-grid">
      {[ 
        { label: conteudoSite.custos.ouvidoria, valor: ouvidoria, icon: '🎧', color: '#FF0000' },
        { label: conteudoSite.custos.ginastica, valor: ginasticaLaboral, icon: '💪', color: '#FF0000' },
        { label: conteudoSite.custos.saude, valor: saudeAtual, icon: '⚕️', color: '#FF0000' },
        // Corrigido: mostrar valor mensal da frota
        { label: conteudoSite.custos.frota, valor: frotaAtual / 12, icon: '🚙', color: '#FF0000' },
        { label: conteudoSite.custos.vida, valor: vidaAtual, icon: '🛡️', color: '#FF0000' }
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
                  maxWidth: 1080,
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
        <h2 className="section-title" style={{ textAlign: 'center', width: '100%' }}>{conteudoSite.chart.titulo}</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={[
            { name: "Saúde", atual: saudeAtual * 12, novo: saudeNovo * 12 },
            { name: "Frota", atual: 260049.96, novo: 222307.68 },
            { name: "Vida", atual: 668 * 12, novo: 1763.37 * 12 },
            { name: "Belz Conecta Saúde", atual: 0, novo: 14976.00 },
          ]} barCategoryGap={30} barGap={8}>
            <XAxis dataKey="name" stroke={isDark ? "#fff" : "#011147"} />
            <YAxis stroke={isDark ? "#fff" : "#011147"} />
            <Tooltip
              formatter={(value, key, item) => [formatCurrency(value), item && item.payload && item.dataKey === 'atual' ? 'Valor Atual' : 'Valor Belz']}
              labelFormatter={label => `Categoria: ${label}`}
              contentStyle={{
                background: isDark ? "#2d3436" : "#fff",
                border: "none",
                borderRadius: "8px",
                color: isDark ? "#fff" : "#011147",
              }}
              itemSorter={item => item.dataKey === 'atual' ? 1 : 0}
            />
            <Legend payload={[
              { value: 'Valor Atual', type: 'rect', color: '#1a237e', id: 'atual' },
              { value: 'Valor Belz', type: 'rect', color: '#1976d2', id: 'novo' }
            ]} wrapperStyle={{ fontSize: '1.1rem' }} />
            <Bar dataKey="atual" fill="#1a237e" name="Valor Atual" maxBarSize={60} minPointSize={0} isAnimationActive={false} />
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
        <h2 style={{ color: '#1a237e', textAlign: 'center', width: '100%' }}>{conteudoSite.economia.titulo}</h2>
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
            {conteudoSite.economia.economiaMes} {formatCurrency(economiaMensalCorreta)}
          </span>
        </p>
        <div className="amount" style={{ color: '#011147', fontSize: '2.8rem', marginTop: 18, textAlign: 'center', width: '100%' }}>{conteudoSite.economia.economiaAno} {formatCurrency(economiaAnualCorreta)}</div>
        <p style={{ color: '#1a237e', textAlign: 'center', width: '100%' }}>{conteudoSite.economia.descricao}</p>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
