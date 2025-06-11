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
        <img
          src={process.env.PUBLIC_URL + "/belz-logo.png?v=1"}
          alt="Logo Belz Corretora"
          style={{
            height: 54,
            width: 54,
            marginRight: 18,
            borderRadius: 12,
            background: "#fff",
            boxShadow: "0 2px 8px #01114733",
            objectFit: "contain",
            verticalAlign: "middle",
            display: "inline-block",
          }}
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
