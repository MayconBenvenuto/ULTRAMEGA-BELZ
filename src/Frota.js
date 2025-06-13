import { motion } from "framer-motion";
import Card from "./components/Card";

function Frota({ frotaAtual, tokioValor, allianzValor }) {
  const frotaNovo = tokioValor + allianzValor;
  const frotaEconomia = frotaAtual - frotaNovo;

  function formatCurrency(value) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <motion.div 
      className="section frota"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="section-title">Seguro de Frota</h2>
      <div className="comparison-grid">
        <Card>
          <div className="card-title">🚗 Situação Atual</div>
          <div>Veículos: <strong>37</strong></div>
          <div>Seguradora: <strong>Bradesco</strong></div>
          <div className="value-display value-atual">{formatCurrency(frotaAtual)} anualmente</div>
        </Card>
        <Card>
          <div className="card-title">🚗 Nova Proposta Belz</div>
          <div>Veículos: <strong>37</strong></div>
          <div>Tokio: <strong>{formatCurrency(tokioValor)}</strong></div>
          <div>Allianz: <strong>{formatCurrency(allianzValor)}</strong></div>
          <div className="value-display value-novo">{formatCurrency(frotaNovo)} anualmente</div>
        </Card>
      </div>

      <motion.div 
        className={frotaEconomia > 0 ? "difference" : "difference negative"}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Economia anual de: {formatCurrency(frotaEconomia)}
      </motion.div>

      <motion.div 
        className={frotaEconomia > 0 ? "difference" : "difference negative"}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Economia mensal de: {formatCurrency(frotaEconomia / 12)}
      </motion.div>
    </motion.div>
  );
}

export default Frota;
