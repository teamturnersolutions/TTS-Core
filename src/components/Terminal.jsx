import React, { useState, useEffect, useRef } from 'react';

const BANNER = `
========================================================================
████████╗████████╗███████╗   ██████╗ ██████╗ ██████╗ ███████╗
╚══██╔══╝╚══██╔══╝██╔════╝  ██╔════╝██╔═══██╗██╔══██╗██╔════╝
   ██║      ██║   ███████╗  ██║     ██║   ██║██████╔╝█████╗  
   ██║      ██║   ╚════██║  ██║     ██║   ██║██╔══██╗██╔══╝  
   ██║      ██║   ███████║  ╚██████╗╚██████╔╝██║  ██║███████╗
   ╚═╝      ╚═╝   ╚══════╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝
========================================================================
TTS_HOMELAB // Network Core v3.0.0
Authorized terminal session active. Node communication links verified.
Type 'help' to display list of available core commands.
Type 'ecosystem' to print the integration map of homelab networks.
`;

const COMMAND_RESPONSES = {
  help: `Available commands:
  about     - Info about Team Turner Solutions core values
  ecosystem - Print visual integration flow and architectural layers
  projects  - Index of active projects. Type 'projects [name]' for spec sheet
              (e.g., 'projects equiptrack' or 'projects kyle')
  skills    - Summary of technical stacks and tooling
  contact   - Secure contact information
  system    - Homelab system status telemetry
  clear     - Clear terminal buffer
  sudo      - Attempt superuser escalation
  banner    - Print system greeting banner`,

  about: `teamturnersolutions // core guidelines:
  * Local-first whenever practical, minimizing cloud overhead.
  * Open source before proprietary tooling.
  * Docker-first deployments to maintain system portability.
  * AI augmentation instead of AI replacement.
  * Modular architecture for high code reuse.
  * Security by design: segmenting containers, monitoring, least privilege.
  * Educational value: crafting secure sandboxes for exploration.`,

  ecosystem: `
                     [TT Labs // Infrastructure]
                                 │
                                 ▼
                    [Home AI Platform // Kyle]
                                 │
                                 ▼
                     [Reusable Core Services]
                 (MCP • APIs • Auth • Monitoring)
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
           [EquipTrack]                   [Cyber Museum]
                                                 │
                                                 ▼
                                            [Cyber Farm]
                                                 │
                                                 ▼
                                        [Future TTVerse / XR]

========================================================================
CORE PHILOSOPHIES:
- Local-first & Open Source
- Containerized (Docker-first)
- AI Augmentation & Integration
- Sandbox Environments for Safety & Education
========================================================================`,

  skills: `HOMELAB SYSTEM TOOLING:
  Infrastructure : Proxmox, Docker, Kubernetes, Terraform, Tailscale
  Languages      : JavaScript, TypeScript, Go, Python, SQL, Bash
  Frameworks     : React, Next.js, Node.js, Express, FastAPI
  Data Pipelines : PostgreSQL, BigQuery, Prisma ORM, Apache Kafka
  AI Models/SDKs : Model Context Protocol (MCP), Ollama, Whisper, PyTorch`,

  contact: `SECURE COMMUNICATION LINK:
  EMAIL  : contact@teamturnersolutions.com
  PGP    : [KEYS AVAILABLE ON REQUEST]
  STATUS : LISTENING FOR INCOMING PACKETS`,

  system: `SYS_DIAGNOSTICS:
  OS_HOST   : PROXMOX_VE_8.1 (AMD64)
  CONTAINER : DOCKER_NODE_VITE (172.18.0.4)
  UPTIME    : 99.98% UPTIME RATIO
  AI_STATUS : OLLAMA_ONLINE (Models: Whisper, Llama3)
  TUNNEL    : SECURED via Encrypted Proxy Gateway`,

  sudo: ` escalate privileges // permission denied
  Guest user account is not authorized to escalate to root.
  Inciting packet has been logged. Do not repeat.`,
};

const PROJECT_DETAILS = {
  equiptrack: `[NODE_01: EQUIPTRACK]
  ===========================================================
  STATUS       : DEPLOYED_GCP (Production Live)
  LAYER        : Applications
  HOST         : GCP Cloud Run / Firebase
  HEALTH       : NOMINAL
  DIAGNOSTICS  : 99.98% Uptime
  PURPOSE      : An enterprise-grade logistics and asset lifecycle orchestration 
                 platform developed for BJ's DC820. Replaces legacy spreadsheets 
                 with barcode/RFID-enabled tracking, predictive maintenance pipelines, 
                 role-based access control, and dedicated kiosk modes. Deployed on 
                 Google Cloud Platform via containerized Cloud Run instances to ensure 
                 high availability and horizontal scaling.
  CORE TECH    : React, Next.js, Prisma, PostgreSQL, Cloud Run`,

  ttverse: `[NODE_02: TTVERSE]
  ===========================================================
  STATUS       : PIVOTED_REUSE
  LAYER        : Future
  HOST         : Homelab Prototype Node
  HEALTH       : INACTIVE_ARCHIVE
  DIAGNOSTICS  : Component Harvesting
  PURPOSE      : An experimental immersive virtual environment framework focused on 
                 dynamic, procedural world-generation. Pivoted away from a monolithic 
                 virtual reality space towards modular, reusable telemetry tracking and 
                 real-time WebXR spatial rendering components to be integrated across 
                 secondary applications.
  CORE TECH    : React, WebXR, Three.js, AI Agents`,

  cyberfarm: `[NODE_03: CYBER FARM]
  ===========================================================
  STATUS       : ACTIVE_CONCEPT
  LAYER        : Applications
  HOST         : Isolated Homelab VLAN
  HEALTH       : STANDBY
  DIAGNOSTICS  : Educational Sandbox
  PURPOSE      : A controlled cyber range sandbox engineered specifically for 
                 educational security training. Features isolated, intentionally 
                 vulnerable targets, automated attack emulation routines, and security 
                 monitoring logs. Designed to teach offensive and defensive security 
                 principles in a safe, sandboxed local environment.
  CORE TECH    : Docker, Kali Linux, Node.js, WebSockets`,

  museum: `[NODE_04: CYBER MUSEUM]
  ===========================================================
  STATUS       : MVP_DEVELOPING
  LAYER        : Applications
  HOST         : Vercel / Local Host
  HEALTH       : NOMINAL
  DIAGNOSTICS  : Active MVP Sprint
  PURPOSE      : An interactive Progressive Web Application that serves as a 
                 chronological timeline of cybersecurity history. Presents notable 
                 historical cyber attacks and vulnerabilities as interactive exhibits 
                 rather than static articles, delivering an engaging educational walkthrough.
  CORE TECH    : React, PWA, Tailwind CSS, Vite`,

  kyle: `[NODE_05: KYLE AI]
  ===========================================================
  STATUS       : ARCH_PHASE
  LAYER        : AI_Core
  HOST         : Local Control Plane Node
  HEALTH       : DESIGN_ACTIVE
  DIAGNOSTICS  : System Brain Node
  PURPOSE      : A modular local AI orchestration engine acting as a unified assistant 
                 layer across homelab infrastructure. Leverages the Model Context Protocol 
                 (MCP) and Ollama to integrate with local large language models (LLMs), 
                 allowing secure, context-aware command execution and system monitoring.
  CORE TECH    : Model Context Protocol (MCP), Ollama, Local LLMs, Node.js`,

  homeai: `[NODE_06: HOME AI PLATFORM]
  ===========================================================
  STATUS       : OPERATIONAL
  LAYER        : AI_Core
  HOST         : Homelab GPU Server
  HEALTH       : NOMINAL
  DIAGNOSTICS  : Multi-Model Inference
  PURPOSE      : A self-hosted, secure local AI inference and development stack. 
                 Built around Ollama, LM Studio, Open WebUI, and containerized Docker services 
                 to facilitate private model exploration, pipeline testing, and custom 
                 workspace management without external API dependencies.
  CORE TECH    : Ollama, Open WebUI, LM Studio, Docker`,

  homelab: `[NODE_07: TT LABS / HOMELAB]
  ===========================================================
  STATUS       : OPERATIONAL
  LAYER        : Infrastructure
  HOST         : Local Bare-Metal Server
  HEALTH       : NOMINAL
  DIAGNOSTICS  : Core Infrastructure Root
  PURPOSE      : A robust, virtualized bare-metal infrastructure designed to host 
                 experimental development environments. Employs Proxmox VE for 
                 hypervisor virtualization, Docker and Kubernetes for container 
                 orchestration, and automated Prometheus/Grafana stacks for 
                 comprehensive telemetry monitoring.
  CORE TECH    : Proxmox VE, Docker, Kubernetes, Grafana, Prometheus`,

  research: `[NODE_08: OPEN SOURCE RESEARCH]
  ===========================================================
  STATUS       : ONGOING
  LAYER        : AI_Core
  HOST         : Research Environment Node
  HEALTH       : NOMINAL
  DIAGNOSTICS  : Workflow Pipeline
  PURPOSE      : A continuous integration workflow and research program focusing on 
                 the evaluation of rising GitHub open-source technologies (e.g. Guidance, 
                 OpenHuman, ServiceStack AI). Streamlines the discovery and incorporation 
                 of modular microservices to accelerate product development without 
                 replicating existing solutions.
  CORE TECH    : MCP, Guidance, OpenHuman, ServiceStack AI`,

  devxp: `[NODE_09: DEVELOPER EXPERIENCE PLATFORM]
  ===========================================================
  STATUS       : GROWING_NODES
  LAYER        : Infrastructure
  HOST         : Global Dev Repository
  HEALTH       : NOMINAL
  DIAGNOSTICS  : Standardized Templates
  PURPOSE      : A standardized repository of containerized environments, automated 
                 bootstrap scripts, Infrastructure-as-Code (Terraform) templates, and 
                 deployment configurations. Accelerates project initiation by providing 
                 consistent developer baselines and automated CI/CD patterns.
  CORE TECH    : Docker, Shell Scripting, Terraform, CI/CD`,

  speech: `[NODE_10: LOCAL AI SPEECH RESEARCH]
  ===========================================================
  STATUS       : EARLY_RESEARCH
  LAYER        : Applications
  HOST         : AI Speech Training Node
  HEALTH       : RESEARCHING
  DIAGNOSTICS  : Targeted Model Training
  PURPOSE      : An ongoing speech-to-text R&D initiative utilizing customized local 
                 neural networks. Focuses on fine-tuning Whisper AI models with personalized 
                 training datasets to enhance accuracy for speech-impaired profiles in 
                 locally hosted, private setups.
  CORE TECH    : Whisper AI, Python, PyTorch, Ollama`,

  iot: `[NODE_11: IoT / XR INTEGRATION]
  ===========================================================
  STATUS       : ROADMAP_STG
  LAYER        : Future
  HOST         : Future Integration Hub
  HEALTH       : DRAFTING
  DIAGNOSTICS  : Conceptual Roadmap
  PURPOSE      : A forward-looking research node bridging physical IoT smart sensors with 
                 immersive WebXR user interfaces. Utilizes ESP32 microcontrollers, lightweight 
                 MQTT messaging brokers, and local AI agents to construct responsive digital twin 
                 environments.
  CORE TECH    : ESP32, MQTT, WebXR, AI Agents`
};

export default function Terminal({ focusTrigger }) {
  const [history, setHistory] = useState([
    { type: 'output', text: BANNER }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [commandIndex, setCommandIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState([]);

  const inputRef = useRef(null);
  const bufferEndRef = useRef(null);

  // Focus terminal when trigger changes
  useEffect(() => {
    if (focusTrigger > 0 && inputRef.current) {
      inputRef.current.focus();
      // Scroll terminal into view
      const terminalSection = document.getElementById('terminal-section');
      if (terminalSection) {
        terminalSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [focusTrigger]);

  // Keep terminal scrolled to bottom
  useEffect(() => {
    if (bufferEndRef.current) {
      bufferEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const trimmedInput = inputValue.trim();
      if (!trimmedInput) return;

      const newHistory = [...history, { type: 'input', text: `guest@teamturner:~$ ${inputValue}` }];
      const cmdParts = trimmedInput.toLowerCase().split(/\s+/);
      const baseCmd = cmdParts[0];
      const arg = cmdParts[1];

      let outputText = '';

      if (baseCmd === 'clear') {
        setHistory([]);
        setCommandHistory((prev) => [...prev, inputValue]);
        setCommandIndex(-1);
        setInputValue('');
        return;
      }

      if (baseCmd === 'banner') {
        outputText = BANNER;
      } else if (baseCmd === 'projects') {
        if (!arg) {
          outputText = `TTS HOMELAB PROJECTS INDEX:
  - equiptrack : Internal logistics tracker for BJ's DC820
  - ttverse    : Virtual environment generating worlds on demand
  - cyberfarm  : Educational cybersecurity range sandbox
  - museum     : Interactive cyber history timeline PWA
  - kyle       : Modular assistant & homelab orchestration layer
  - homeai     : Self-hosted local Ollama/Docker AI stack
  - homelab    : Modular virtualization node (Proxmox/K8s)
  - research   : Open source evaluation workflow integrations
  - devxp      : Developer bootstrap images and CD templates
  - speech     : Local speech recognition research
  - iot        : Smart physical sensor interfaces in WebXR

To query full telemetry specs of a node, type 'projects [name]'
(example: 'projects equiptrack')`;
        } else {
          // Normalize alias keys
          let normalizedArg = arg;
          if (arg === 'cyber' || arg === 'farm') normalizedArg = 'cyberfarm';
          if (arg === 'cybermuseum') normalizedArg = 'museum';
          if (arg === 'kyleai') normalizedArg = 'kyle';
          if (arg === 'home' || arg === 'homeai') normalizedArg = 'homeai';
          if (arg === 'ttlabs' || arg === 'labs') normalizedArg = 'homelab';
          if (arg === 'osresearch') normalizedArg = 'research';
          if (arg === 'developer' || arg === 'platform') normalizedArg = 'devxp';
          if (arg === 'speechresearch') normalizedArg = 'speech';
          if (arg === 'xr') normalizedArg = 'iot';

          if (PROJECT_DETAILS[normalizedArg]) {
            outputText = PROJECT_DETAILS[normalizedArg];
          } else {
            outputText = `No project spec sheet found matching: '${arg}'.
Type 'projects' to view the index of valid keys.`;
          }
        }
      } else if (COMMAND_RESPONSES[baseCmd]) {
        outputText = COMMAND_RESPONSES[baseCmd];
      } else {
        outputText = `Command not found: '${trimmedInput}'. Type 'help' for valid options.`;
      }

      setHistory([...newHistory, { type: 'output', text: outputText }]);
      setCommandHistory((prev) => [...prev, inputValue]);
      setCommandIndex(-1);
      setInputValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      const nextIndex = commandIndex === -1 ? commandHistory.length - 1 : Math.max(0, commandIndex - 1);
      setCommandIndex(nextIndex);
      setInputValue(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length === 0 || commandIndex === -1) return;

      const nextIndex = commandIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setCommandIndex(-1);
        setInputValue('');
      } else {
        setCommandIndex(nextIndex);
        setInputValue(commandHistory[nextIndex]);
      }
    }
  };

  return (
    <section id="terminal-section" style={styles.section}>
      <div style={styles.headerContainer}>
        <div style={styles.cyberSubTitle}>[// COMMAND_LINE_INTERFACE]</div>
        <h2 style={styles.sectionTitle}>
          SECURE <span className="text-green">TERMINAL</span>
        </h2>
        <div style={styles.headerLine}></div>
      </div>

      <div
        onClick={handleTerminalClick}
        className="cyber-panel green corner-decor"
        style={styles.terminalContainer}
      >
        <div style={styles.terminalHeader}>
          <div style={styles.windowControls}>
            <span style={{ ...styles.dot, backgroundColor: '#ff5f56' }}></span>
            <span style={{ ...styles.dot, backgroundColor: '#ffbd2e' }}></span>
            <span style={{ ...styles.dot, backgroundColor: '#27c93f' }}></span>
          </div>
          <div style={styles.terminalTitle}>guest@teamturner: ~ (ssh)</div>
          <div style={styles.terminalSize}>80x24</div>
        </div>

        <div style={styles.terminalOutput}>
          {history.map((line, idx) => (
            <div
              key={idx}
              style={{
                ...styles.line,
                color: line.type === 'input' ? 'var(--color-cyan)' : 'var(--color-text)',
                whiteSpace: 'pre-wrap',
              }}
            >
              {line.text}
            </div>
          ))}
          <div ref={bufferEndRef} />
        </div>

        <div style={styles.inputContainer}>
          <span style={styles.prompt}>guest@teamturner:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.input}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '4rem 2rem 8rem 2rem',
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
  },
  headerContainer: {
    marginBottom: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cyberSubTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    color: 'var(--color-green)',
    letterSpacing: '0.2em',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginTop: '0.5rem',
    marginBottom: '1rem',
  },
  headerLine: {
    width: '100px',
    height: '2px',
    background: 'linear-gradient(90deg, var(--color-green), transparent)',
  },
  terminalContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '60vh',
    minHeight: '380px',
    maxHeight: '650px',
    background: 'rgba(5, 5, 8, 0.95)',
    border: '1px solid rgba(57, 255, 20, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
    padding: '0 0 1rem 0',
    cursor: 'text',
  },
  terminalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#0d0e15',
    padding: '0.5rem 1rem',
    borderBottom: '1px solid var(--border-cyber)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    color: 'var(--color-text-dim)',
  },
  windowControls: {
    display: 'flex',
    gap: '0.35rem',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    display: 'inline-block',
  },
  terminalTitle: {
    letterSpacing: '0.05rem',
  },
  terminalSize: {
    opacity: 0.6,
  },
  terminalOutput: {
    flexGrow: 1,
    padding: '1.25rem 1.25rem 0.5rem 1.25rem',
    overflowY: 'auto',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    lineHeight: '1.5',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  line: {
    wordBreak: 'break-all',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 1.25rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
  },
  prompt: {
    color: 'var(--color-green)',
    marginRight: '0.5rem',
    userSelect: 'none',
  },
  input: {
    flexGrow: 1,
    background: 'none',
    border: 'none',
    outline: 'none',
    color: 'var(--color-cyan)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    caretColor: 'var(--color-green)',
  },
};
