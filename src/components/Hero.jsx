import React, { useState, useEffect } from 'react';

export default function Hero({ onFocusTerminal }) {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'DESIGN. TRANSFORM. DEPLOY.';
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      // Loop typewriter after a pause
      const resetTimeout = setTimeout(() => {
        setDisplayText('');
        setIndex(0);
      }, 5000);
      return () => clearTimeout(resetTimeout);
    }
  }, [index]);

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" style={styles.heroSection}>
      <div style={styles.content}>
        <div style={styles.cyberHeader}>
          <span style={styles.securityClearance}>SECURE_PROTOCOL // LEVEL_01</span>
        </div>
        
        <h1 style={styles.title}>
          TEAM TURNER <br />
          <span className="text-cyan">SOLUTIONS</span>
        </h1>

        <div style={styles.typewriterContainer}>
          <span style={styles.typewriterPrefix}>$ RUN_INIT_TASK:</span>{' '}
          <span style={styles.typewriterText}>{displayText}</span>
          <span style={styles.cursor}>_</span>
        </div>

        <p style={styles.description}>
          Engineering high-impact, custom software architectures. We specialize in building responsive, high-performance web applications, robust data integration pipelines, and secure local environments built to scale.
        </p>

        <div style={styles.btnGroup}>
          <button className="cyber-btn corner-clip" onClick={onFocusTerminal}>
            <span style={styles.btnTerminalIcon}>&gt;_</span> LAUNCH_TERMINAL
          </button>
          <button className="cyber-btn magenta corner-clip" onClick={handleScrollToProjects}>
            VIEW_PROJECTS
          </button>
        </div>
      </div>

      <div className="cyber-panel corner-decor" style={styles.telemetryPanel}>
        <div style={styles.telemetryHeader}>
          <h3 style={styles.telemetryTitle}>SYSTEM_TELEMETRY</h3>
          <div style={styles.statusBlink}>ON_LINE</div>
        </div>

        <div style={styles.statsContainer}>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>CORE_LOAD</span>
            <div style={styles.progressBarContainer}>
              <div style={{ ...styles.progressBar, width: '42%', backgroundColor: 'var(--color-cyan)' }}></div>
            </div>
            <span style={styles.statValue}>42%</span>
          </div>

          <div style={styles.statRow}>
            <span style={styles.statLabel}>NET_THROUGHPUT</span>
            <div style={styles.progressBarContainer}>
              <div style={{ ...styles.progressBar, width: '78%', backgroundColor: 'var(--color-magenta)' }}></div>
            </div>
            <span style={styles.statValue}>892.4 MB/S</span>
          </div>

          <div style={styles.statRow}>
            <span style={styles.statLabel}>BUFFER_STATUS</span>
            <div style={styles.progressBarContainer}>
              <div style={{ ...styles.progressBar, width: '15%', backgroundColor: 'var(--color-green)' }}></div>
            </div>
            <span style={styles.statValue}>CLEAR</span>
          </div>
        </div>

        <div style={styles.diagnosticLog}>
          <div style={styles.logLine}>&gt; INITIALIZING ENCRYPTED TUNNEL... [OK]</div>
          <div style={styles.logLine}>&gt; MOUNTING LOCAL_DATABASE... [OK]</div>
          <div style={styles.logLine}>&gt; PORT_BINDING :8080 :3000... [ACTIVE]</div>
          <div style={styles.logLine}>&gt; SYN_FLOOD protection... [ON]</div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  heroSection: {
    minHeight: '85vh',
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '3rem',
    alignItems: 'center',
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1.5rem',
  },
  cyberHeader: {
    border: '1px solid rgba(0, 240, 255, 0.3)',
    background: 'rgba(0, 240, 255, 0.05)',
    padding: '0.25rem 0.75rem',
    borderRadius: '2px',
  },
  securityClearance: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    color: 'var(--color-cyan)',
    letterSpacing: '0.15rem',
  },
  title: {
    fontSize: '3.5rem',
    lineHeight: '1.1',
    fontWeight: '900',
    letterSpacing: '-0.02em',
  },
  typewriterContainer: {
    fontFamily: 'var(--font-mono)',
    fontSize: '1.1rem',
    background: 'rgba(10, 11, 18, 0.5)',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    borderLeft: '2px solid var(--color-cyan)',
    width: '100%',
    maxWidth: '500px',
  },
  typewriterPrefix: {
    color: 'var(--color-magenta)',
  },
  typewriterText: {
    color: 'var(--color-green)',
    textShadow: '0 0 5px rgba(57, 255, 20, 0.3)',
  },
  cursor: {
    color: 'var(--color-green)',
    fontWeight: 'bold',
    animation: 'pulse 1s infinite',
  },
  description: {
    fontSize: '1rem',
    color: 'var(--color-text-dim)',
    maxWidth: '560px',
    lineHeight: '1.7',
  },
  btnGroup: {
    display: 'flex',
    gap: '1.5rem',
    marginTop: '1rem',
  },
  btnTerminalIcon: {
    fontFamily: 'var(--font-mono)',
    marginRight: '0.25rem',
    color: 'var(--color-cyan)',
  },
  telemetryPanel: {
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '2rem',
    margin: '2rem 0',
  },
  telemetryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--border-cyber)',
    paddingBottom: '0.75rem',
    marginBottom: '1rem',
  },
  telemetryTitle: {
    fontSize: '1rem',
    color: 'var(--color-text)',
  },
  statusBlink: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    color: 'var(--color-green)',
    background: 'rgba(57, 255, 20, 0.1)',
    padding: '0.15rem 0.5rem',
    border: '1px solid var(--color-green)',
    borderRadius: '3px',
    animation: 'pulse 2.5s infinite',
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  statRow: {
    display: 'grid',
    gridTemplateColumns: '120px 1fr 60px',
    alignItems: 'center',
    gap: '1rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
  },
  statLabel: {
    color: 'var(--color-text-dim)',
  },
  progressBarContainer: {
    height: '6px',
    background: '#1a2035',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: '3px',
    boxShadow: '0 0 8px currentColor',
  },
  statValue: {
    color: 'var(--color-text)',
    textAlign: 'right',
  },
  diagnosticLog: {
    background: 'rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '4px',
    padding: '0.75rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    color: 'var(--color-text-dim)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
  },
  logLine: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};
