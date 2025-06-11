import React from "react";
import { motion } from "framer-motion";

function Saude() {
  const saudeAtual = 59214.13;
  const saudeNovo = 47100.53;
  const saudeEconomia = saudeAtual - saudeNovo;

  function formatCurrency(value) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <motion.div 
      className="section saude super-destaque"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ position: 'relative', overflow: 'hidden', marginBottom: 40 }}
    >
      <div style={{ position: 'absolute', top: 0, right: 0, width: '180px', height: '180px', background: 'radial-gradient(circle at 80% 20%, #fff8, transparent 70%)', zIndex: 0 }}></div>
      <h2 className="section-title" style={{ color: '#fff', fontSize: '2.2rem', letterSpacing: 1 }}>🌟 Belz Conecta Saúde</h2>
      <div className="comparison-grid" style={{ zIndex: 1, position: 'relative' }}>
        <motion.div 
          className="comparison-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{ background: '#fff', color: '#011147', border: '2.5px solid #1976d2', boxShadow: '0 4px 32px #1976d222' }}
        >
          <div className="card-title">📋 Situação Atual</div>
          <div>Seguradora: <strong>SulAmérica/Hapvida</strong></div>
          <div>Apólice:</div>
          <div className="value-display value-atual">{formatCurrency(saudeAtual)}</div>
        </motion.div>
        <motion.div 
          className="comparison-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{ background: 'linear-gradient(135deg, #1976d2 60%, #fff 100%)', color: '#fff', border: '2.5px solid #fff', boxShadow: '0 4px 32px #1976d222' }}
        >
          <div className="card-title">✨Com A Nova Proposta <strong>Belz</strong></div>
          <div>Seguradora: <strong>Unimed/Bradesco</strong></div>
          <div>Apólice:</div>
          <div className="value-display value-novo">{formatCurrency(saudeNovo)}</div>
        </motion.div>
      </div>
      <motion.div 
        className={saudeEconomia > 0 ? "difference" : "difference negative"}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: 24, background: '#1976d2', color: '#fff', border: '2px solid #fff', boxShadow: '0 2px 12px #1976d222' }}
      >
        Economia: {formatCurrency(saudeEconomia)}
      </motion.div>
      <div style={{ fontSize: '1.25rem', zIndex: 1, position: 'relative', color: '#fff', marginTop: 24 }}>
        O produto <strong style={{ color: '#fff', background: '#011147', padding: '2px 8px', borderRadius: 6 }}>Belz Conecta Saúde</strong> oferece uma solução completa de gestão e acompanhamento da saúde dos colaboradores, com acesso a uma plataforma exclusiva, suporte especializado e atendimento à NR-1.<br /><br />
        <span style={{ display: 'inline-block', background: '#fff', color: '#011147', fontWeight: 700, padding: '8px 18px', borderRadius: 10, fontSize: '1.3rem', margin: '10px 0' }}>
          Investimento: R$ 14.976,00
        </span>
      </div>
    </motion.div>
  );
}

export default Saude;
