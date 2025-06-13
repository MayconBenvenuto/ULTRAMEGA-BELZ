import React from "react";
import { motion } from "framer-motion";
import Dashboard from "./Dashboard";
import { ThemeProvider, useTheme } from "./ThemeContext";
import conteudoSite from "./configConteudo";
import "./App.css";

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
          alt="Logo Ultramega" 
          className="header-logo"
          onError={e => { e.target.onerror = null; e.target.src = process.env.PUBLIC_URL + '/belz-logo.png'; }}
        />
        <div className="header-center">
          <h1>
            {conteudoSite.header.titulo}
          </h1>
          <p>{conteudoSite.header.subtitulo}</p>
        </div>
        <img 
          src={process.env.PUBLIC_URL + '/belz.png?v=1'} 
          alt="Logo Belz" 
          className="header-logo"
          onError={e => { e.target.onerror = null; e.target.src = process.env.PUBLIC_URL + '/ultramega.png'; }}
        />
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
