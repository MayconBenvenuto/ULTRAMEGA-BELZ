import React from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from "./ThemeContext";

function Vida() {
  const { isDark } = useTheme();
  const vidaUnitario1 = 1668 / 63;
  const vidaUnitario2 = 4142.79 / 148;

  const data = [
    { name: 'Opção 1', colaboradores: 63, valorTotal: 1668, valorUnitario: vidaUnitario1 },
    { name: 'Opção 2', colaboradores: 148, valorTotal: 4142.79, valorUnitario: vidaUnitario2 }
  ];

  function formatCurrency(value) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <motion.div 
      className="section vida"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="section-title">Seguro de Vida</h2>
      <div className="comparison-grid">
        <motion.div 
          className="comparison-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="card-title">👥 Opção 1 - 63 Colaboradores</div>
          <div className="value-display value-novo">R$ 1.668,00</div>
          <div>Valor por colaborador: <strong>{formatCurrency(vidaUnitario1)}</strong></div>
        </motion.div>
        <motion.div 
          className="comparison-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="card-title">👥 Opção 2 - 148 Colaboradores</div>
          <div className="value-display value-novo">R$ 4.142,79</div>
          <div>Valor por colaborador: <strong>{formatCurrency(vidaUnitario2)}</strong></div>
        </motion.div>
      </div>

      <div style={{ height: '200px', marginTop: '20px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke={isDark ? "#fff" : "#000"} />
            <YAxis stroke={isDark ? "#fff" : "#000"} />
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              contentStyle={{
                background: isDark ? "#2d3436" : "#fff",
                border: "none",
                borderRadius: "8px",
                color: isDark ? "#fff" : "#000"
              }}
            />
            <Bar dataKey="valorTotal" fill="#3498db" name="Valor Total" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
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
              <td>{formatCurrency(vidaUnitario1)}</td>
            </tr>
            <tr>
              <td>Opção 2</td>
              <td>148</td>
              <td>R$ 4.142,79</td>
              <td>{formatCurrency(vidaUnitario2)}</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}

export default Vida;
