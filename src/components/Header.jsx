import React, { useState, useEffect } from 'react';

export default function Header({ onTerminalToggle, isTerminalOpen }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).toUpperCase();
  };

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <div className="glitch-text" data-text="TTS // CYBER_CORE" style={styles.logo}>
          TTS // CYBER_CORE
        </div>
        <div style={styles.statusIndicator}>
          <span style={styles.pulseNode}></span>
          <span style={styles.statusText}>SYS_STATUS: NOMINAL</span>
        </div>
      </div>

      <nav style={styles.nav}>
        <button onClick={() => handleNavClick('hero')} style={styles.navLink}>
          [// ABOUT]
        </button>
        <button onClick={() => handleNavClick('projects')} style={styles.navLink}>
          [// PROJECTS]
        </button>
        <button onClick={() => handleNavClick('terminal-section')} style={styles.navLink}>
          [// TERMINAL]
        </button>
      </nav>

      <div style={styles.clockContainer}>
        <div style={styles.dateText}>{formatDate(time)}</div>
        <div style={styles.timeText}>{formatTime(time)}</div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    borderBottom: '1px solid var(--border-cyber)',
    background: 'rgba(4, 4, 6, 0.85)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    width: '100%',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  logo: {
    fontFamily: 'var(--font-cyber)',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'var(--color-cyan)',
    letterSpacing: '0.1rem',
    cursor: 'pointer',
  },
  statusIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  pulseNode: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-green)',
    boxShadow: '0 0 8px var(--color-green)',
    animation: 'pulse 2s infinite',
  },
  statusText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    color: 'var(--color-text-dim)',
    letterSpacing: '0.05rem',
  },
  nav: {
    display: 'flex',
    gap: '2rem',
  },
  navLink: {
    background: 'none',
    border: 'none',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-cyber)',
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'color 0.2s',
    letterSpacing: '0.05rem',
  },
  clockContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    fontFamily: 'var(--font-mono)',
  },
  dateText: {
    fontSize: '0.7rem',
    color: 'var(--color-text-dim)',
    letterSpacing: '0.1em',
  },
  timeText: {
    fontSize: '1.1rem',
    color: 'var(--color-cyan)',
    textShadow: '0 0 5px rgba(0, 240, 255, 0.3)',
    fontWeight: 'bold',
  },
};
