import React from "react";
import { motion } from "framer-motion";
import Dashboard from "./Dashboard";
import { ThemeProvider, useTheme } from "./ThemeContext";
import "./App.css";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return 
}

function AppContent() {
  const { isDark } = useTheme();

  return (
    <motion.div
      className={`container ${isDark ? "dark-theme" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header">

        <img 
            src={process.env.PUBLIC_URL + '/ultramega.png?v=1'} 
            alt="Logo Conecta Saúde" 
            style={{ height: 'auto', width: 150, marginRight: 6, marginBottom: 30, borderRadius: 8, background: '', boxShadow: '0 2px 8px #01114733', objectFit: 'contain', maxWidth: '100%' ,'alignItems': 'center', 'justifyContent': 'center' }} 
            onError={e => { e.target.onerror = null; e.target.src = process.env.PUBLIC_URL + '/belz-logo.png'; }}
              />

        <h1
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            margin: 0,
          }}
        >
          ULTRAMEGA - BELZ SEGUROS
        </h1>
        <img 
            src={process.env.PUBLIC_URL + '/belz.png?v=1'} 
            alt="Logo Conecta Saúde" 
            style={{ height: 'auto', width: 150, marginRight: 6, marginBottom: 30, borderRadius: 8, background: '', boxShadow: '0 2px 8px #01114733', objectFit: 'contain', maxWidth: '100%' ,'alignItems': 'center', 'justifyContent': 'center' }} 
            onError={e => { e.target.onerror = null; e.target.src = process.env.PUBLIC_URL + '/belz-logo.png'; }}
              />
        <p>Análise detalhada das propostas da Belz Corretora de Seguros</p>
        <ThemeToggle />
      </div>
      <Dashboard />
    </motion.div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
