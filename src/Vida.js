import React from "react";
import Card from "./components/Card";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from "./ThemeContext";

function Vida({ vidaAtual, vidaNovo, vidaColaboradoresAtual, vidaColaboradoresNovo, vidaUnitarioAtual, vidaUnitarioNovo }) {
  const { isDark } = useTheme();

  const data = [
    { name: 'Opção 1', colaboradores: vidaColaboradoresAtual, valorTotal: vidaAtual, valorUnitario: vidaUnitarioAtual },
    { name: 'Opção 2', colaboradores: vidaColaboradoresNovo, valorTotal: vidaNovo, valorUnitario: vidaUnitarioNovo }
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
        <Card>
          <div className="card-title">👥 Opção 1 - {vidaColaboradoresAtual} Colaboradores</div>
          <div className="value-display value-novo">{formatCurrency(vidaAtual)}</div>
          <div>Valor por colaborador: <strong>{formatCurrency(vidaUnitarioAtual)}</strong></div>
        </Card>
        <Card>
          <div className="card-title">👥 Opção 2 - {vidaColaboradoresNovo} Colaboradores</div>
          <div className="value-display value-novo">{formatCurrency(vidaNovo)}</div>
          <div>Valor por colaborador: <strong>{formatCurrency(vidaUnitarioNovo)}</strong></div>
        </Card>
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
              <td>{vidaColaboradoresAtual}</td>
              <td>{formatCurrency(vidaAtual)}</td>
              <td>{formatCurrency(vidaUnitarioAtual)}</td>
            </tr>
            <tr>
              <td>Opção 2</td>
              <td>{vidaColaboradoresNovo}</td>
              <td>{formatCurrency(vidaNovo)}</td>
              <td>{formatCurrency(vidaUnitarioNovo)}</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}

export default Vida;
