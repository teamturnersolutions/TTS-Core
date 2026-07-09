import React, { useState } from 'react';

const projectsData = [
  {
    id: '01',
    title: 'EquipTrack',
    layer: 'applications',
    status: 'DEPLOYED_GCP',
    statusColor: 'var(--color-green)',
    desc: 'An enterprise-grade logistics and asset lifecycle orchestration platform developed for BJ\'s DC820. Replaces legacy spreadsheets with barcode/RFID-enabled tracking, predictive maintenance pipelines, role-based access control, and dedicated kiosk modes. Deployed on Google Cloud Platform via containerized Cloud Run instances to ensure high availability and horizontal scaling.',
    tech: ['React', 'Next.js', 'Prisma', 'PostgreSQL', 'Cloud Run', 'Firebase'],
    host: 'GCP Cloud Run / Firebase',
    metric: '99.98% Uptime',
    health: 'NOMINAL',
    colorClass: 'green',
  },
  {
    id: '02',
    title: 'TTVerse',
    layer: 'future',
    status: 'PIVOTED_REUSE',
    statusColor: 'var(--color-yellow)',
    desc: 'An experimental immersive virtual environment framework focused on dynamic, procedural world-generation. Pivoted away from a monolithic virtual reality space towards modular, reusable telemetry tracking and real-time WebXR spatial rendering components to be integrated across secondary applications.',
    tech: ['React', 'WebXR', 'Three.js', 'AI Agents'],
    host: 'Homelab Prototype Node',
    metric: 'Component Harvesting',
    health: 'INACTIVE_ARCHIVE',
    colorClass: 'magenta',
  },
  {
    id: '03',
    title: 'Cyber Farm',
    layer: 'applications',
    status: 'ACTIVE_CONCEPT',
    statusColor: 'var(--color-cyan)',
    desc: 'A controlled cyber range sandbox engineered specifically for educational security training. Features isolated, intentionally vulnerable targets, automated attack emulation routines, and security monitoring logs. Designed to teach offensive and defensive security principles in a safe, sandboxed local environment.',
    tech: ['Docker', 'Kali Linux', 'Node.js', 'WebSockets'],
    host: 'Isolated Homelab VLAN',
    metric: 'Educational Sandbox',
    health: 'STANDBY',
    colorClass: '',
  },
  {
    id: '04',
    title: 'Cyber Museum (PWA)',
    layer: 'applications',
    status: 'MVP_DEVELOPING',
    statusColor: 'var(--color-cyan)',
    desc: 'An interactive Progressive Web Application that serves as a chronological timeline of cybersecurity history. Presents notable historical cyber attacks and vulnerabilities as interactive exhibits rather than static articles, delivering an engaging educational walkthrough.',
    tech: ['React', 'PWA', 'Tailwind', 'Vite'],
    host: 'Vercel / Local Host',
    metric: 'Active MVP Sprint',
    health: 'NOMINAL',
    colorClass: '',
  },
  {
    id: '05',
    title: 'Kyle AI',
    layer: 'ai',
    status: 'ARCH_PHASE',
    statusColor: 'var(--color-yellow)',
    desc: 'A modular local AI orchestration engine acting as a unified assistant layer across homelab infrastructure. Leverages the Model Context Protocol (MCP) and Ollama to integrate with local large language models (LLMs), allowing secure, context-aware command execution and system monitoring.',
    tech: ['MCP', 'Ollama', 'Local LLMs', 'NodeJS'],
    host: 'Local Control Plane Node',
    metric: 'System Brain Node',
    health: 'DESIGN_ACTIVE',
    colorClass: 'magenta',
  },
  {
    id: '06',
    title: 'Home AI Platform',
    layer: 'ai',
    status: 'OPERATIONAL',
    statusColor: 'var(--color-green)',
    desc: 'A self-hosted, secure local AI inference and development stack. Built around Ollama, LM Studio, Open WebUI, and containerized Docker services to facilitate private model exploration, pipeline testing, and custom workspace management without external API dependencies.',
    tech: ['Ollama', 'Open WebUI', 'LM Studio', 'Docker'],
    host: 'Homelab GPU Server',
    metric: 'Multi-Model Inference',
    health: 'NOMINAL',
    colorClass: 'green',
  },
  {
    id: '07',
    title: 'TT Labs / Homelab',
    layer: 'infrastructure',
    status: 'OPERATIONAL',
    statusColor: 'var(--color-green)',
    desc: 'A robust, virtualized bare-metal infrastructure designed to host experimental development environments. Employs Proxmox VE for hypervisor virtualization, Docker and Kubernetes for container orchestration, and automated Prometheus/Grafana stacks for comprehensive telemetry monitoring.',
    tech: ['Proxmox', 'Docker', 'Kubernetes', 'Grafana', 'Prometheus'],
    host: 'Local Bare-Metal Server',
    metric: 'Core Infrastructure Root',
    health: 'NOMINAL',
    colorClass: 'green',
  },
  {
    id: '08',
    title: 'Open Source Research',
    layer: 'ai',
    status: 'ONGOING',
    statusColor: 'var(--color-cyan)',
    desc: 'A continuous integration workflow and research program focusing on the evaluation of rising GitHub open-source technologies (e.g. Guidance, OpenHuman, ServiceStack AI). Streamlines the discovery and incorporation of modular microservices to accelerate product development without replicating existing solutions.',
    tech: ['MCP', 'Guidance', 'OpenHuman', 'ServiceStack'],
    host: 'Research Environment Node',
    metric: 'Workflow Pipeline',
    health: 'NOMINAL',
    colorClass: '',
  },
  {
    id: '09',
    title: 'Dev Experience Platform',
    layer: 'infrastructure',
    status: 'GROWING_NODES',
    statusColor: 'var(--color-cyan)',
    desc: 'A standardized repository of containerized environments, automated bootstrap scripts, Infrastructure-as-Code (Terraform) templates, and deployment configurations. Accelerates project initiation by providing consistent developer baselines and automated CI/CD patterns.',
    tech: ['Docker', 'Bash', 'Terraform', 'CI/CD'],
    host: 'Global Dev Repository',
    metric: 'Standardized Templates',
    health: 'NOMINAL',
    colorClass: '',
  },
  {
    id: '10',
    title: 'Local AI Speech Research',
    layer: 'applications',
    status: 'EARLY_RESEARCH',
    statusColor: 'var(--color-yellow)',
    desc: 'An ongoing speech-to-text R&D initiative utilizing customized local neural networks. Focuses on fine-tuning Whisper AI models with personalized training datasets to enhance accuracy for speech-impaired profiles in locally hosted, private setups.',
    tech: ['Whisper AI', 'Python', 'PyTorch', 'Ollama'],
    host: 'AI Speech Training Node',
    metric: 'Targeted Model Training',
    health: 'RESEARCHING',
    colorClass: 'magenta',
  },
  {
    id: '11',
    title: 'IoT / XR Integration',
    layer: 'future',
    status: 'ROADMAP_STG',
    statusColor: 'var(--color-yellow)',
    desc: 'A forward-looking research node bridging physical IoT smart sensors with immersive WebXR user interfaces. Utilizes ESP32 microcontrollers, lightweight MQTT messaging brokers, and local AI agents to construct responsive digital twin environments.',
    tech: ['ESP32', 'MQTT', 'WebXR', 'AI Agents'],
    host: 'Future Integration Hub',
    metric: 'Conceptual Roadmap',
    health: 'DRAFTING',
    colorClass: 'magenta',
  },
];

const ecosystemASCII = `
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
`;

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProjId, setSelectedProjId] = useState('01');
  const [cockpitTab, setCockpitTab] = useState('diagnostics'); // 'diagnostics' | 'topology'

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.layer === activeFilter);

  // If currently selected project is filtered out, select the first available project in the filtered list
  const activeProjects = filteredProjects;
  const currentProject = activeProjects.find((p) => p.id === selectedProjId) || activeProjects[0] || projectsData[0];

  const filterTabs = [
    { id: 'all', label: 'ALL_NODES' },
    { id: 'infrastructure', label: 'INFRASTRUCTURE' },
    { id: 'ai', label: 'AI_CORE' },
    { id: 'applications', label: 'APPLICATIONS' },
    { id: 'future', label: 'FUTURE_ROADS' },
  ];

  return (
    <section id="projects" style={styles.projectsSection}>
      <div style={styles.headerContainer}>
        <div style={styles.cyberSubTitle}>[// PORTFOLIO_INDEX]</div>
        <h2 style={styles.sectionTitle}>
          Ecosystem <span className="text-magenta">Architecture</span>
        </h2>
        <div style={styles.headerLine}></div>
      </div>

      {/* Filter Tabs */}
      <div style={styles.filterBar}>
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveFilter(tab.id);
              // Auto-select first in filtered list
              const filtered = tab.id === 'all' ? projectsData : projectsData.filter((p) => p.layer === tab.id);
              if (filtered.length > 0) setSelectedProjId(filtered[0].id);
            }}
            className={`cyber-btn corner-clip ${activeFilter === tab.id ? 'green' : 'magenta'}`}
            style={{
              ...styles.filterBtn,
              background: activeFilter === tab.id ? 'rgba(57, 255, 20, 0.1)' : 'transparent',
              borderColor: activeFilter === tab.id ? 'var(--color-green)' : 'var(--border-cyber)',
              color: activeFilter === tab.id ? 'var(--color-green)' : 'var(--color-text-dim)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dual Pane Systems Inspector */}
      <div style={styles.inspectorContainer}>
        {/* Left Pane: Node Directory Selector */}
        <div className="cyber-panel corner-clip" style={styles.leftPane}>
          <div style={styles.paneHeader}>
            <span>NODE_DIRECTORY ({activeProjects.length})</span>
            <span style={{ color: 'var(--color-cyan)' }}>[STATE: SCANNING]</span>
          </div>
          <div style={styles.listContainer}>
            {activeProjects.map((proj) => {
              const isSelected = currentProject.id === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProjId(proj.id)}
                  style={{
                    ...styles.listItem,
                    borderColor: isSelected ? 'var(--color-cyan)' : 'var(--border-cyber)',
                    background: isSelected ? 'rgba(0, 240, 255, 0.06)' : 'rgba(10, 11, 18, 0.4)',
                    boxShadow: isSelected ? 'var(--cyber-glow-cyan)' : 'none',
                  }}
                >
                  <div style={styles.listItemLeft}>
                    <span style={{ 
                      ...styles.nodeId, 
                      color: isSelected ? 'var(--color-cyan)' : 'var(--color-text-dim)' 
                    }}>
                      NODE_{proj.id}
                    </span>
                    <span style={{ 
                      ...styles.nodeTitle, 
                      color: isSelected ? 'var(--color-text)' : 'var(--color-text-dim)' 
                    }}>
                      {proj.title}
                    </span>
                  </div>
                  <div style={{ 
                    ...styles.listBadge, 
                    borderColor: proj.statusColor, 
                    color: proj.statusColor 
                  }}>
                    {proj.status}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Telemetry & Cockpit details */}
        <div 
          className={`cyber-panel corner-decor ${currentProject.colorClass}`} 
          style={styles.rightPane}
        >
          {/* Cockpit Tabs */}
          <div style={styles.cockpitTabs}>
            <button 
              onClick={() => setCockpitTab('diagnostics')} 
              style={{
                ...styles.cockpitTabBtn,
                color: cockpitTab === 'diagnostics' ? 'var(--color-cyan)' : 'var(--color-text-dim)',
                borderBottomColor: cockpitTab === 'diagnostics' ? 'var(--color-cyan)' : 'transparent',
              }}
            >
              [// DIAGNOSTICS]
            </button>
            <button 
              onClick={() => setCockpitTab('topology')} 
              style={{
                ...styles.cockpitTabBtn,
                color: cockpitTab === 'topology' ? 'var(--color-cyan)' : 'var(--color-text-dim)',
                borderBottomColor: cockpitTab === 'topology' ? 'var(--color-cyan)' : 'transparent',
              }}
            >
              [// SYSTEM_TOPOLOGY]
            </button>
          </div>

          {cockpitTab === 'diagnostics' ? (
            <div style={styles.diagnosticsContainer}>
              <div style={styles.cockpitHeader}>
                <div>
                  <h3 style={styles.cockpitTitle}>{currentProject.title}</h3>
                  <div style={styles.cockpitSub}>LAYER: {currentProject.layer.toUpperCase()}</div>
                </div>
                <div style={{ ...styles.cockpitStatus, borderColor: currentProject.statusColor, color: currentProject.statusColor }}>
                  SYSTEM_STATE: {currentProject.status}
                </div>
              </div>

              <div style={styles.descSection}>
                <h4 style={styles.sectionHeading}>SYSTEM_OVERVIEW:</h4>
                <p style={styles.overviewText}>{currentProject.desc}</p>
              </div>

              <div style={styles.metaGrid}>
                <div style={styles.metaItem}>
                  <span style={styles.metaLabel}>DEPLOYMENT_HOST</span>
                  <span style={styles.metaValue}>{currentProject.host}</span>
                </div>
                <div style={styles.metaItem}>
                  <span style={styles.metaLabel}>DIAGNOSTIC_HEALTH</span>
                  <span style={{ ...styles.metaValue, color: currentProject.statusColor }}>
                    {currentProject.health}
                  </span>
                </div>
                <div style={styles.metaItem}>
                  <span style={styles.metaLabel}>INTEGRATION_METRIC</span>
                  <span style={{ ...styles.metaValue, color: 'var(--color-green)' }}>
                    {currentProject.metric}
                  </span>
                </div>
              </div>

              <div style={styles.techSection}>
                <h4 style={styles.sectionHeading}>INTEGRATED_TECHNOLOGIES:</h4>
                <div style={styles.techContainer}>
                  {currentProject.tech.map((t) => (
                    <span key={t} style={styles.techTag}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={styles.topologyContainer}>
              <div style={styles.topologyHeader}>
                <span>INTEGRATION FLOW MAP</span>
                <span style={{ color: 'var(--color-magenta)' }}>// LOCALHOST ROOTED</span>
              </div>
              <pre style={styles.ascii}>{ecosystemASCII}</pre>
              <div style={styles.themesContainer}>
                <h4 style={styles.themesTitle}>COMMON INTEGRATION THEMES:</h4>
                <div style={styles.themesGrid}>
                  <div style={styles.themeItem}><span>•</span> Local-first architectures</div>
                  <div style={styles.themeItem}><span>•</span> Open source priority</div>
                  <div style={styles.themeItem}><span>•</span> Containerized via Docker</div>
                  <div style={styles.themeItem}><span>•</span> AI augmentation workflows</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const styles = {
  projectsSection: {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  },
  headerContainer: {
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cyberSubTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    color: 'var(--color-cyan)',
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
    background: 'linear-gradient(90deg, var(--color-cyan), transparent)',
  },
  filterBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    marginBottom: '2rem',
  },
  filterBtn: {
    padding: '0.4rem 1.25rem',
    fontSize: '0.75rem',
    borderWidth: '1px',
    cursor: 'pointer',
  },
  inspectorContainer: {
    display: 'grid',
    gridTemplateColumns: '380px 1fr',
    gap: '2rem',
    alignItems: 'start',
    width: '100%',
    '@media (max-width: 900px)': {
      gridTemplateColumns: '1fr',
    },
  },
  leftPane: {
    display: 'flex',
    flexDirection: 'column',
    height: '520px',
    padding: '1.25rem',
    background: 'rgba(5, 5, 8, 0.6)',
  },
  paneHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    color: 'var(--color-text-dim)',
    borderBottom: '1px solid var(--border-cyber)',
    paddingBottom: '0.75rem',
    marginBottom: '1rem',
  },
  listContainer: {
    flexGrow: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    paddingRight: '0.25rem',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.85rem 1rem',
    border: '1px solid var(--border-cyber)',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s ease',
  },
  listItemLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.15rem',
  },
  nodeId: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
  },
  nodeTitle: {
    fontFamily: 'var(--font-cyber)',
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  listBadge: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.6rem',
    border: '1px solid',
    padding: '0.1rem 0.4rem',
    borderRadius: '2px',
    whiteSpace: 'nowrap',
  },
  rightPane: {
    height: '520px',
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    borderLeftWidth: '3px',
  },
  cockpitTabs: {
    display: 'flex',
    gap: '1.5rem',
    borderBottom: '1px solid var(--border-cyber)',
    paddingBottom: '0.5rem',
    marginBottom: '1.5rem',
  },
  cockpitTabBtn: {
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    paddingBottom: '0.25rem',
    cursor: 'pointer',
    fontFamily: 'var(--font-cyber)',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
    letterSpacing: '0.05em',
  },
  diagnosticsContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  cockpitHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  cockpitTitle: {
    fontSize: '1.8rem',
    color: 'var(--color-text)',
    lineHeight: '1.1',
  },
  cockpitSub: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    color: 'var(--color-cyan)',
    marginTop: '0.25rem',
  },
  cockpitStatus: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    border: '1px solid',
    padding: '0.25rem 0.75rem',
    borderRadius: '3px',
    letterSpacing: '0.05em',
    background: 'rgba(0, 0, 0, 0.2)',
  },
  descSection: {
    margin: '1.25rem 0',
  },
  sectionHeading: {
    fontFamily: 'var(--font-cyber)',
    fontSize: '0.75rem',
    color: 'var(--color-text-dim)',
    marginBottom: '0.5rem',
    letterSpacing: '0.05em',
  },
  overviewText: {
    fontSize: '0.9rem',
    color: 'var(--color-text)',
    lineHeight: '1.6',
  },
  metaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    background: 'rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.03)',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1.25rem',
  },
  metaItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  metaLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    color: 'var(--color-text-dim)',
  },
  metaValue: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    color: 'var(--color-text)',
    fontWeight: 'bold',
  },
  techSection: {},
  techContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  techTag: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    color: 'var(--color-cyan)',
    padding: '0.25rem 0.6rem',
    borderRadius: '3px',
  },
  topologyContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  topologyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    color: 'var(--color-text-dim)',
  },
  ascii: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    lineHeight: '1.25',
    color: 'var(--color-cyan)',
    overflowX: 'auto',
    whiteSpace: 'pre',
    padding: '0.5rem 0',
    opacity: 0.85,
  },
  themesContainer: {
    borderTop: '1px solid var(--border-cyber)',
    paddingTop: '0.75rem',
  },
  themesTitle: {
    fontFamily: 'var(--font-cyber)',
    fontSize: '0.75rem',
    color: 'var(--color-text)',
    marginBottom: '0.4rem',
  },
  themesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '0.35rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    color: 'var(--color-text-dim)',
  },
  themeItem: {
    display: 'flex',
    gap: '0.4rem',
    alignItems: 'center',
  },
};
