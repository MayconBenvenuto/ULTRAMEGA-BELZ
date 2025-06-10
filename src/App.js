import React from "react";
import { motion } from "framer-motion";
import Dashboard from "./Dashboard";
import { ThemeProvider, useTheme } from "./ThemeContext";
import "./App.css";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {isDark ? "🌞" : "🌙"}
    </button>
  );
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
        <h1>🏢 Dashboard Comparativo de Seguros</h1>
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
