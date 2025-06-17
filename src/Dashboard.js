import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Saude from "./Saude";
import Frota from "./Frota";
import Vida from "./Vida";
import SeguroEmpresarial from "./SeguroEmpresarial";
import { useTheme } from "./ThemeContext";
import conteudoSite from "./configConteudo";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  // Centralização dos valores principais
  // Saúde
  const saudeAtual = 61280.09; // Valor atualizado
  const saudeNovo = 47100.53;
  // Frota
  const frotaAtual = 21670.83 * 12; // Corrigido para valor anual
  const tokioValor = 15800.03;
  const allianzValor = 206507.71;
  const frotaNovo = tokioValor + allianzValor;
  // Valores para Vida
  const vidaColaboradoresAtual = 33;
  const vidaAtual = 668; // valor total opção 1
  const vidaUnitarioAtual = vidaAtual / vidaColaboradoresAtual;
  const vidaNovo = 1763.37;

  // Valores para Seguro Empresarial
  const empresarialAtual = 102743.55; // Valor atual do seguro empresarial
  const empresarialNovo = 3500.00; // Valor da proposta Belz

  // Custos extras
  const ouvidoria = 1300.00;
  const ginasticaLaboral = 2500.00;  // Custos totais atuais
  // Corrigido: frotaAtual é anual, então para o custo mensal usamos frotaAtual / 12
  const custoMensalAtual = ouvidoria + ginasticaLaboral + saudeAtual + (frotaAtual / 12) + vidaAtual;
  const custoTotalAtualAno = ouvidoria * 12 + ginasticaLaboral * 12 + saudeAtual * 12 + frotaAtual + vidaAtual * 12;
  // Belz Conecta Saúde
  const belzConectaSaude = 14976.00; // valor anual

  // Custos totais proposta Belz
  const custoMensalBelz = ouvidoria + ginasticaLaboral + saudeNovo + (frotaNovo / 12) + vidaNovo + (empresarialNovo / 12) + (belzConectaSaude / 12);
  const custoTotalBelzAno = ouvidoria * 12 + ginasticaLaboral * 12 + saudeNovo * 12 + frotaNovo + vidaNovo * 12 + empresarialNovo + belzConectaSaude;

  // Economia
  // Agora inclui Belz Conecta Saúde como custo adicional na proposta Belz
  // economia anual = (saudeAtual - saudeNovo)*12 + (frotaAtual - frotaNovo) + (vidaAtual - vidaNovo)*12 + (empresarialAtual - empresarialNovo) - belzConectaSaude
  const economiaSaudeAnual = (saudeAtual - saudeNovo) * 12;
  const economiaFrotaAnual = frotaAtual - frotaNovo;
  const economiaVidaAnual = (vidaAtual - vidaNovo) * 12;
  const economiaEmpresarialAnual = empresarialAtual - empresarialNovo;
  const economiaAnualCorreta = economiaSaudeAnual + economiaFrotaAnual + economiaVidaAnual + economiaEmpresarialAnual - belzConectaSaude;
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
    >      <Saude saudeAtual={saudeAtual} saudeNovo={saudeNovo} />
      <Vida 
        vidaAtual={vidaAtual}
        vidaColaboradoresAtual={vidaColaboradoresAtual}
        vidaUnitarioAtual={vidaUnitarioAtual}
        vidaNovo={1763.37} // Novo valor Belz
      />
      <SeguroEmpresarial 
        empresarialAtual={empresarialAtual}
        empresarialNovo={empresarialNovo}
      />
      <Frota frotaAtual={frotaAtual} tokioValor={tokioValor} allianzValor={allianzValor} />

      {/* Seção Custos Atuais - Design Elegante Azul Escuro */}
<motion.div
  className="section ultramega-custos-container"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 1 }}
  style={{
    background: 'linear-gradient(120deg, #fff 60%, #f4f7f6 100%)',
    boxShadow: '0 8px 32px 0 #01114722',
    borderRadius: 32,
    padding: '40px 24px',
    border: 'none',
    margin: '40px 0',
    position: 'relative',
    overflow: 'visible',
  }}
>

  <div className="ultramega-custos-content" style={{ position: 'relative', zIndex: 2 }}>
    <div className="ultramega-custos-header" style={{ textAlign: 'center', marginBottom: 32 }}>
      <h2 className="ultramega-custos-title" style={{ color: '#011147', fontSize: '2.2rem', fontWeight: 800, letterSpacing: 0.5, textShadow: '0 2px 8px #01114722' }}>
        {conteudoSite.custos.titulo}
      </h2>
    </div>
    <div className="ultramega-custos-grid" style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 32,
      justifyContent: 'center',
      marginBottom: 40,
    }}>
      {[ 
        { label: conteudoSite.custos.ouvidoria, valor: ouvidoria, icon: '🎧', color: '#1976d2' },
        { label: conteudoSite.custos.ginastica, valor: ginasticaLaboral, icon: '💪', color: '#1976d2' },
        { label: conteudoSite.custos.saude, valor: saudeAtual, icon: '⚕️', color: '#1976d2' },
        { label: conteudoSite.custos.frota, valor: frotaAtual / 12, icon: '🚙', color: '#1976d2' },
        { label: conteudoSite.custos.vida, valor: vidaAtual, icon: '🛡️', color: '#1976d2' }
      ].map((item, index) => (
        <motion.div
          className="ultramega-custo-card"
          key={item.label}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
          whileHover={{ y: -8, scale: 1.04, boxShadow: '0 8px 32px #1976d244' }}
          style={{
            background: '#fff',
            borderRadius: 20,
            border: '1.5px solid #e3e8f0',
            minWidth: 220,
            maxWidth: 260,
            boxShadow: '0 2px 12px #01114711',
            padding: '28px 18px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'box-shadow 0.2s',
            position: 'relative',
          }}
        >
          <div style={{
            width: 54,
            height: 54,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${item.color} 60%, #42a5f5 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            marginBottom: 12,
            boxShadow: `0 4px 16px ${item.color}22`,
          }}>{item.icon}</div>
          <div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#011147', marginBottom: 6, textAlign: 'center' }}>{item.label}</div>
          <div style={{ fontWeight: 900, fontSize: '2.1rem', color: 'red', marginBottom: 4, textShadow: '0 2px 8px #01114722' }}>
            R$ {item.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
          </div>
        </motion.div>
      ))}
    </div>
    <div className="ultramega-custos-totals-grid" style={{
      display: 'flex',
      flexDirection: 'row',
      gap: 32,
      justifyContent: 'center',
      alignItems: 'stretch',
      margin: '0 auto',
      maxWidth: 900,
    }}>
      <motion.div
        className="ultramega-total-card ultramega-total-card-mensal"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{
          background: 'linear-gradient(135deg, #ff5252 60%, #ff5252 100%)',
          color: '#fff',
          borderRadius: 18,
          boxShadow: '0 8px 32px #1976d244',
          padding: '32px 28px',
          minWidth: 220,
          textAlign: 'center',
        }}
      >
        <div style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.85 }}>Custo Mensal</div>
        <div style={{ fontWeight: 900, fontSize: '2.2rem', letterSpacing: 0.5 }}>{formatCurrency(custoMensalAtual)}</div>
      </motion.div>
      <motion.div
        className="ultramega-custos-multiplier"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1.2 }}
        style={{
          background: 'transparent',
          color: '#ff5252',
          fontWeight: 900,
          fontSize: '2.2rem',
          alignSelf: 'center',
          border: 'none',
          boxShadow: 'none',
        }}
      >
        <span className="operator">×</span>
        <span className="number" style={{ fontSize: '1.2rem', fontWeight: 700, marginLeft: 2 }}>12</span>
      </motion.div>
      <motion.div
        className="ultramega-total-card ultramega-total-card-anual"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        style={{
          background: 'linear-gradient(135deg, #ff5252 60%, #ff5252 100%)',
          color: '#fff',
          borderRadius: 18,
          boxShadow: '0 8px 32px #1976d244',
          padding: '32px 28px',
          minWidth: 220,
          textAlign: 'center',
        }}
      >
        <div style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.85 }}>Custo Anual</div>        <div style={{ fontWeight: 900, fontSize: '2.2rem', letterSpacing: 0.5 }}>{formatCurrency(custoTotalAtualAno)}</div>
      </motion.div>
    </div>
  </div>
</motion.div>      {/* Seção Custos Proposta Belz - Design Elegante Azul Belz */}
<motion.div
  className="section belz-custos-container"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 1.2 }}
  style={{
    background: 'linear-gradient(120deg, #e3f2fd 60%, #f1f8ff 100%)',
    boxShadow: '0 8px 32px 0 #1976d222',
    borderRadius: 32,
    padding: '40px 24px',
    border: 'none',
    margin: '40px 0',
    position: 'relative',
    overflow: 'visible',
  }}
>

  <div className="belz-custos-content" style={{ position: 'relative', zIndex: 2 }}>
    <div className="belz-custos-header" style={{ textAlign: 'center', marginBottom: 32 }}>
      <h2 className="belz-custos-title" style={{ color: '#011147', fontSize: '2.2rem', fontWeight: 800, letterSpacing: 0.5, textShadow: '0 2px 8px #01114722' }}>
        Custos Mensais - Proposta Belz
      </h2>
    </div>
    <div className="belz-custos-grid" style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 32,
      justifyContent: 'center',
      marginBottom: 40,
    }}>      {[ 
        { label: conteudoSite.custos.ouvidoria, valor: ouvidoria, icon: '🎧', color: '#1976d2' },
        { label: conteudoSite.custos.ginastica, valor: ginasticaLaboral, icon: '💪', color: '#1976d2' },
        { label: conteudoSite.custos.saude, valor: saudeNovo, icon: '⚕️', color: '#1976d2' },
        { label: conteudoSite.custos.frota, valor: frotaNovo / 12, icon: '🚙', color: '#1976d2' },
        { label: conteudoSite.custos.vida, valor: vidaNovo, icon: '🛡️', color: '#1976d2' },
        { label: 'Empresarial', valor: empresarialNovo / 12, icon: '🏢', color: '#1976d2' },
        { label: 'Belz Conecta', valor: belzConectaSaude / 12, icon: '🌐', color: '#1976d2' }
      ].map((item, index) => (
        <motion.div
          className="belz-custo-card"
          key={item.label}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}          whileHover={{ y: -8, scale: 1.04, boxShadow: '0 8px 32px #1976d244' }}
          style={{
            background: '#fff',
            borderRadius: 20,
            border: '1.5px solid #e3f2fd',
            minWidth: 220,
            maxWidth: 260,
            boxShadow: '0 2px 12px #1976d211',
            padding: '28px 18px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'box-shadow 0.2s',
            position: 'relative',
          }}
        >
          <div style={{
            width: 54,
            height: 54,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${item.color} 60%, #42a5f5 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            marginBottom: 12,
            boxShadow: `0 4px 16px ${item.color}22`,
          }}>{item.icon}</div>
          <div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#011147', marginBottom: 6, textAlign: 'center' }}>{item.label}</div>
          <div style={{ fontWeight: 900, fontSize: '2.1rem', color: '#1976d2', marginBottom: 4, textShadow: '0 2px 8px #1976d222' }}>
            R$ {item.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
          </div>
        </motion.div>
      ))}
    </div>
    <div className="belz-custos-totals-grid" style={{
      display: 'flex',
      flexDirection: 'row',
      gap: 32,
      justifyContent: 'center',
      alignItems: 'stretch',
      margin: '0 auto',
      maxWidth: 900,
    }}>
      <motion.div
        className="belz-total-card belz-total-card-mensal"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}        style={{
          background: 'linear-gradient(135deg, #1976d2 60%, #42a5f5 100%)',
          color: '#fff',
          borderRadius: 18,
          boxShadow: '0 8px 32px #1976d244',
          padding: '32px 28px',
          minWidth: 220,
          textAlign: 'center',
        }}
      >
        <div style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.85 }}>Custo Mensal</div>
        <div style={{ fontWeight: 900, fontSize: '2.2rem', letterSpacing: 0.5 }}>{formatCurrency(custoMensalBelz)}</div>
      </motion.div>
      <motion.div
        className="belz-custos-multiplier"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1.6 }}
        style={{
          background: 'transparent',
          color: '#1976d2',
          fontWeight: 900,
          fontSize: '2.2rem',
          alignSelf: 'center',
          border: 'none',
          boxShadow: 'none',
        }}
      >
        <span className="operator">×</span>
        <span className="number" style={{ fontSize: '1.1rem', fontWeight: 700, marginLeft: 2 }}>12</span>
      </motion.div>
      <motion.div
        className="belz-total-card belz-total-card-anual"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        style={{
          background: 'linear-gradient(135deg, #42a5f5 60%, #1976d2 100%)',          color: '#fff',
          borderRadius: 18,
          boxShadow: '0 8px 32px #1976d244',
          padding: '32px 28px',
          minWidth: 220,
          textAlign: 'center',
        }}
      >
        <div style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.85 }}>Custo Anual</div>
        <div style={{ fontWeight: 900, fontSize: '2.2rem', letterSpacing: 0.5 }}>{formatCurrency(custoTotalBelzAno)}</div>
      </motion.div>
    </div>
  </div>
</motion.div><div className="chart-section" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
        <h2 className="section-title" style={{ textAlign: 'center', width: '100%' }}>{conteudoSite.chart.titulo}</h2>
        <ResponsiveContainer width="100%" height={400}>          <BarChart data={[
            { name: "Saúde", atual: saudeAtual * 12, novo: saudeNovo * 12 },
            { name: "Frota", atual: 260049.96, novo: 222307.68 },
            { name: "Vida", atual: 668 * 12, novo: 1763.37 * 12 },
            { name: "Empresarial", atual: empresarialAtual, novo: empresarialNovo },
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
              { value: 'Valor Atual', type: 'rect', color: 'red', id: 'atual' },
              { value: 'Valor Belz', type: 'rect', color: '#011147', id: 'novo' }
            ]} wrapperStyle={{ fontSize: '1.1rem' }} />
            <Bar dataKey="atual" fill="red" name="Valor Atual" maxBarSize={60} minPointSize={0} isAnimationActive={false} />
            <Bar dataKey="novo" fill="#011147" name="Valor Belz" maxBarSize={90} minPointSize={50} />
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
        </p>        <div className="amount" style={{ color: '#011147', fontSize: '2.8rem', marginTop: 18, textAlign: 'center', width: '100%' }}>{conteudoSite.economia.economiaAno} {formatCurrency(economiaAnualCorreta)}</div>
        <p style={{ color: '#1a237e', textAlign: 'center', width: '100%' }}>{conteudoSite.economia.descricao}</p>
      </motion.div>

      {/* Seção Belz Conecta Saúde + Proposta Belz - Movida para o final */}
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
    </motion.div>
  );
}

export default Dashboard;
