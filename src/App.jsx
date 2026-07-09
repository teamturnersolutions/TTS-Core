import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Terminal from './components/Terminal';

export default function App() {
  const [terminalFocusTrigger, setTerminalFocusTrigger] = useState(0);
  const canvasRef = useRef(null);

  // Trigger focus in Terminal component
  const handleFocusTerminal = () => {
    setTerminalFocusTrigger((prev) => prev + 1);
  };

  // Matrix Rain Background Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters: Binary and Hexadecimal
    const chars = '01010101ABCDEF';
    const charArr = chars.split('');
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const drops = Array(columns).fill(1);

    const draw = () => {
      // Clear with slight alpha to create trailing effect
      ctx.fillStyle = 'rgba(4, 4, 6, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        
        // Alternate colors slightly for cyan/magenta digital rain
        if (i % 5 === 0) {
          ctx.fillStyle = 'rgba(255, 0, 127, 0.15)'; // Magenta
        } else {
          ctx.fillStyle = 'rgba(0, 240, 255, 0.18)'; // Cyan
        }

        // Draw character
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);

        // Reset drop to top randomly after leaving canvas
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Speed of descent
        drops[i] += 0.5;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={styles.appContainer}>
      {/* Background Layer */}
      <canvas ref={canvasRef} style={styles.backgroundCanvas} />
      <div className="cyber-grid" />

      {/* App Content */}
      <Header />
      
      <main style={styles.main}>
        <Hero onFocusTerminal={handleFocusTerminal} />
        <Projects />
        <Terminal focusTrigger={terminalFocusTrigger} />
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLeft}>
            <span style={styles.footerCode}>[LOC: LOCALHOST_DEV]</span>
            <span style={styles.footerSeparator}>//</span>
            <span>&copy; {new Date().getFullYear()} teamturnersolutions. All nodes configured.</span>
          </div>
          <div style={styles.footerRight}>
            <span style={styles.footerStatus}>TUNNEL_SECURE: AES_256</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  appContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  backgroundCanvas: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: -2,
    pointerEvents: 'none',
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  footer: {
    borderTop: '1px solid var(--border-cyber)',
    background: 'rgba(4, 4, 6, 0.9)',
    backdropFilter: 'blur(5px)',
    padding: '1.5rem 2rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    color: 'var(--color-text-dim)',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  footerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  footerCode: {
    color: 'var(--color-cyan)',
  },
  footerSeparator: {
    opacity: 0.5,
  },
  footerRight: {
    color: 'var(--color-magenta)',
    textShadow: '0 0 5px rgba(255, 0, 127, 0.3)',
  },
};
