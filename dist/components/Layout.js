/**
 * ============================================================================
 * Horizon Navigation & Layout Architect — TechLayout Component
 * Bespoke Dark Black Ergonomic Navigation Architecture
 * Course: BACSE202 — Database Management Systems
 * Faculty Mentor: Dr. Swaminathan A, Assistant Professor
 * Principal Investigator: Basavaashlesh
 * ============================================================================
 */

class TechLayout {
    /**
     * Get active theme ('dark' | 'light')
     */
    static getTheme() {
        return localStorage.getItem('bacse202_theme') || 'dark';
    }

    /**
     * Set active theme and update DOM
     */
    static setTheme(theme) {
        const isDark = theme === 'dark';
        if (isDark) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            document.body.classList.add('dark');
            document.body.classList.remove('light');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            document.body.classList.remove('dark');
            document.body.classList.add('light');
        }
        localStorage.setItem('bacse202_theme', theme);

        const iconContainer = document.getElementById('global-theme-icon');
        if (iconContainer) {
            iconContainer.innerHTML = isDark ? TechLayout.icons.sun : TechLayout.icons.moon;
        }
    }

    /**
     * Toggle current theme
     */
    static toggleTheme() {
        const current = this.getTheme();
        const next = current === 'dark' ? 'light' : 'dark';
        this.setTheme(next);
        if (window.toast) {
            toast.info(`Switched to ${next === 'dark' ? 'Bespoke Dark Mode' : 'Day Mode'}`);
        }
    }

    /**
     * Authentic Horizon & Custom Bespoke SVG Icons
     */
    static get icons() {
        return {
            dashboard: `
                <svg width="18" height="18" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4">
                    <path d="M8.0001 16V11H12.0001V16C12.0001 16.55 12.4501 17 13.0001 17H16.0001C16.5501 17 17.0001 16.55 17.0001 16V8.99997H18.7001C19.1601 8.99997 19.3801 8.42997 19.0301 8.12997L10.6701 0.599971C10.2901 0.259971 9.7101 0.259971 9.3301 0.599971L0.970098 8.12997C0.630098 8.42997 0.840098 8.99997 1.3001 8.99997H3.0001V16C3.0001 16.55 3.4501 17 4.0001 17H7.0001C7.5501 17 8.0001 16.55 8.0001 16Z" fill="currentColor"/>
                </svg>
            `,
            chart: `
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4">
                    <path d="M2.28393 6.31358H2.55761C3.61128 6.31358 4.47337 7.17567 4.47337 8.22934V17.8082C4.47337 18.8618 3.61128 19.7239 2.55761 19.7239H2.28393C1.23026 19.7239 0.368164 18.8618 0.368164 17.8082V8.22934C0.368164 7.17567 1.23026 6.31358 2.28393 6.31358V6.31358ZM9.94698 0.566284C11.0007 0.566284 11.8627 1.42838 11.8627 2.48205V17.8082C11.8627 18.8618 11.0007 19.7239 9.94698 19.7239C8.89331 19.7239 8.03122 18.8618 8.03122 17.8082V2.48205C8.03122 1.42838 8.89331 0.566284 9.94698 0.566284ZM17.61 11.5135C18.6637 11.5135 19.5258 12.3756 19.5258 13.4293V17.8082C19.5258 18.8618 18.6637 19.7239 17.61 19.7239C16.5564 19.7239 15.6943 18.8618 15.6943 17.8082V13.4293C15.6943 12.3756 16.5564 11.5135 17.61 11.5135V11.5135Z" fill="currentColor"/>
                </svg>
            `,
            doc: `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
            `,
            landing: `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                </svg>
            `,
            search: `
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
            `,
            moon: `
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4">
                    <path d="M9.95703 18C12.733 18 15.2684 16.737 16.9481 14.6675C17.1966 14.3613 16.9256 13.9141 16.5416 13.9872C12.1751 14.8188 8.16522 11.4709 8.16522 7.06303C8.16522 4.52398 9.52444 2.18914 11.7335 0.931992C12.074 0.738211 11.9884 0.221941 11.6015 0.150469C11.059 0.0504468 10.5086 8.21369e-05 9.95703 0C4.98914 0 0.957031 4.02578 0.957031 9C0.957031 13.9679 4.98281 18 9.95703 18Z" fill="currentColor"/>
                </svg>
            `,
            sun: `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            `,
            download: `
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
            `,
            help: `
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            `,
            hamburger: `
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            `,
            close: `
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            `,
            chevronDown: `
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
            `,
            command: `
                <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                </svg>
            `,
            bolt: `
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
            `
        };
    }

    /**
     * Map page ID to display title
     */
    static getPageBrandText(activePage = 'dashboard') {
        switch (activePage) {
            case 'dashboard':
                return 'Main Dashboard';
            case 'simulation':
                return 'Simulation Workspace';
            case 'documentation':
                return 'Technical Documentation';
            case 'landing':
                return 'System Landing';
            default:
                return activePage.charAt(0).toUpperCase() + activePage.slice(1);
        }
    }

    /**
     * 8 Core Platform Submodules Specification
     */
    static get submodules() {
        return [
            {
                id: 'dag',
                name: 'Operator DAG Tree',
                hash: 'dag',
                page: 'simulation.html',
                icon: '🌳',
                badge: 'SYNTAX TREE',
                desc: 'Relational algebra operator hierarchy ($T_1 \\dots T_5$)'
            },
            {
                id: 'tracer',
                name: 'Tuple Tracer',
                hash: 'tracer',
                page: 'simulation.html',
                icon: '🔬',
                badge: 'DEBUGGER',
                desc: 'Step through universal quantification ($\\forall y \\in S$)'
            },
            {
                id: 'sql',
                name: 'SQL Compiler Studio',
                hash: 'sql',
                page: 'simulation.html',
                icon: '💻',
                badge: '3 DIALECTS',
                desc: 'Double NOT EXISTS, GROUP BY HAVING, and EXCEPT'
            },
            {
                id: 'matrix',
                name: 'Coverage Matrix',
                hash: 'matrix',
                page: 'simulation.html',
                icon: '▦',
                badge: 'VERIFICATION',
                desc: 'Candidate requirement fulfillment satisfaction grid'
            },
            {
                id: 'telemetry',
                name: 'Hardware Telemetry',
                hash: 'telemetry',
                page: 'simulation.html',
                icon: '📡',
                badge: 'SENSOR I/O',
                desc: 'Real-time ESP32 / MPU-6050 & engine performance streams'
            },
            {
                id: 'tests',
                name: '8-Case Test Suite',
                hash: 'tests',
                page: 'simulation.html',
                icon: '🧪',
                badge: 'UNIT TESTS',
                desc: 'Boundary conditions, empty relations, and formal invariants'
            },
            {
                id: 'verification',
                name: 'Verification Matrix',
                hash: 'verification',
                page: 'documentation.html',
                icon: '🎯',
                badge: 'VERIFIED',
                desc: 'Formal algebraic verification matrix & system validation'
            },
            {
                id: 'manual',
                name: 'User Manual',
                hash: 'manual',
                page: 'documentation.html',
                icon: '📘',
                badge: 'GUIDE',
                desc: 'Operational manual, pipeline walkthrough, and shortcuts'
            }
        ];
    }

    /**
     * All Filterable Items for the Command Palette (Ctrl+K)
     */
    static getCommandPaletteItems() {
        return [
            // 1. Primary Zones
            {
                id: 'zone-dash',
                title: 'Main Dashboard',
                desc: 'Platform hub, hardware telemetry stat cards, and system terminal',
                category: 'zones',
                badge: 'ZONE',
                url: 'dashboard.html',
                icon: '📊',
                keywords: 'dashboard hub overview stats widgets terminal architecture'
            },
            {
                id: 'zone-sim',
                title: 'Simulation Workspace',
                desc: 'Interactive division pipeline, inline relation editors, and multi-pane AST',
                category: 'zones',
                badge: 'ZONE',
                url: 'simulation.html',
                icon: '⚡',
                keywords: 'simulation workspace workspace execute pipeline editor tables'
            },
            {
                id: 'zone-doc',
                title: 'Technical Documentation',
                desc: 'Formal algebraic proofs, SQL dialect cost analysis, and literature citations',
                category: 'zones',
                badge: 'ZONE',
                url: 'documentation.html',
                icon: '📖',
                keywords: 'documentation theory proofs math latex faculty references'
            },
            {
                id: 'zone-land',
                title: 'System Landing Page',
                desc: 'Project overview, architectural highlights, and evaluator landing zone',
                category: 'zones',
                badge: 'ZONE',
                url: 'index.html',
                icon: '🚀',
                keywords: 'landing index home welcome start entry'
            },

            // 2. 8 Submodules
            {
                id: 'cmd-dag',
                title: 'Operator DAG Tree',
                desc: 'Visual interactive relational algebra syntax tree ($T_1 \\dots T_5$)',
                category: 'submodules',
                badge: 'SUBMODULE',
                url: 'simulation.html#dag',
                hash: 'dag',
                icon: '🌳',
                keywords: 'dag tree syntax ast operator projection cross product difference'
            },
            {
                id: 'cmd-tracer',
                title: 'Tuple Tracer Debugger',
                desc: 'Interactive universal quantifier (∀y∈S) verification per candidate',
                category: 'submodules',
                badge: 'SUBMODULE',
                url: 'simulation.html#tracer',
                hash: 'tracer',
                icon: '🔬',
                keywords: 'tracer tuple debugger universal quantifier candidate step'
            },
            {
                id: 'cmd-sql',
                title: 'SQL Compiler Studio',
                desc: '3 Canonical SQL translations: Double NOT EXISTS, GROUP BY, and EXCEPT',
                category: 'submodules',
                badge: 'SUBMODULE',
                url: 'simulation.html#sql',
                hash: 'sql',
                icon: '💻',
                keywords: 'sql studio dialect not exists group by having except compiler query'
            },
            {
                id: 'cmd-matrix',
                title: 'Coverage Matrix',
                desc: 'Interactive candidate requirement satisfaction verification matrix',
                category: 'submodules',
                badge: 'SUBMODULE',
                url: 'simulation.html#matrix',
                hash: 'matrix',
                icon: '▦',
                keywords: 'matrix coverage grid satisfaction candidate requirement'
            },
            {
                id: 'cmd-telemetry',
                title: 'Hardware Telemetry Stream',
                desc: 'Sensor metrics: ESP32, MPU-6050, cache hit rates, engine clock',
                category: 'submodules',
                badge: 'SUBMODULE',
                url: 'simulation.html#telemetry',
                hash: 'telemetry',
                icon: '📡',
                keywords: 'telemetry hardware sensor esp32 mpu6050 clock cache latency'
            },
            {
                id: 'cmd-tests',
                title: '8-Case Automated Test Suite',
                desc: 'Boundary conditions, empty relations, supersets, and formal invariants',
                category: 'submodules',
                badge: 'SUBMODULE',
                url: 'simulation.html#tests',
                hash: 'tests',
                icon: '🧪',
                keywords: 'tests test suite unit boundary invariant assertions 8 cases'
            },
            {
                id: 'cmd-verification-matrix',
                title: 'Formal Verification Matrix',
                desc: 'Comprehensive algebraic verification matrix & system conformance benchmarks',
                category: 'submodules',
                badge: 'VERIFICATION',
                url: 'documentation.html#verification',
                hash: 'verification',
                icon: '🎯',
                keywords: 'formal verification matrix validation algebraic criteria swaminathan conformance'
            },
            {
                id: 'cmd-validation',
                title: 'System Validation',
                desc: 'Formal algebraic invariants and automated boundary validation suite',
                category: 'docs',
                badge: 'VALIDATION',
                url: 'documentation.html#verification',
                hash: 'verification',
                icon: '✅',
                keywords: 'system validation formal verification boundary invariants conformance'
            },
            {
                id: 'cmd-manual',
                title: 'Operational User Manual',
                desc: 'Step-by-step usage instructions, pipeline walkthrough, and shortcuts',
                category: 'submodules',
                badge: 'SUBMODULE',
                url: 'documentation.html#manual',
                hash: 'manual',
                icon: '📘',
                keywords: 'manual user guide help documentation operational how to operate'
            },

            // Additional Derivation Views
            {
                id: 'cmd-steps',
                title: '5-Stage Relational Derivation',
                desc: 'Intermediate relations breakdown: Projection, Product, Disqualification, Output',
                category: 'submodules',
                badge: 'SUBMODULE',
                url: 'simulation.html#steps',
                hash: 'steps',
                icon: '🪜',
                keywords: 'steps derivation t1 t2 t3 t4 t5 stages intermediate breakdown'
            },
            {
                id: 'cmd-result',
                title: 'Result Relation T5 Output',
                desc: 'Final quotient table after Cartesian product and set difference',
                category: 'submodules',
                badge: 'SUBMODULE',
                url: 'simulation.html#result',
                hash: 'result',
                icon: '🏁',
                keywords: 'result output t5 quotient table final'
            },

            // 3. 6 Real-World Presets
            {
                id: 'preset-univ',
                title: 'Preset: University CS Prerequisites',
                desc: 'Students who completed all core CS foundational courses',
                category: 'presets',
                badge: 'PRESET',
                presetKey: 'university',
                url: 'simulation.html?preset=university',
                icon: '🎓',
                keywords: 'preset university cs students courses prerequisites'
            },
            {
                id: 'preset-devops',
                title: 'Preset: Cloud DevOps Infrastructure',
                desc: 'Kubernetes nodes running all required microservice containers',
                category: 'presets',
                badge: 'PRESET',
                presetKey: 'devops',
                url: 'simulation.html?preset=devops',
                icon: '☁️',
                keywords: 'preset cloud devops docker kubernetes cluster containers'
            },
            {
                id: 'preset-med',
                title: 'Preset: Pediatric Licensure Board',
                desc: 'Physicians certified in all required clinical pediatric rotations',
                category: 'presets',
                badge: 'PRESET',
                presetKey: 'medical',
                url: 'simulation.html?preset=medical',
                icon: '🏥',
                keywords: 'preset medical doctors licensure pediatric board certification'
            },
            {
                id: 'preset-ev',
                title: 'Preset: EV Battery Supply Chain',
                desc: 'Suppliers approved for all critical lithium-ion quality audits',
                category: 'presets',
                badge: 'PRESET',
                presetKey: 'supply_chain',
                url: 'simulation.html?preset=supply_chain',
                icon: '🔋',
                keywords: 'preset supply chain ev battery lithium audit quality'
            },
            {
                id: 'preset-nist',
                title: 'Preset: NIST Zero-Trust Security',
                desc: 'Enterprise endpoints verified against all CIS compliance baselines',
                category: 'presets',
                badge: 'PRESET',
                presetKey: 'security',
                url: 'simulation.html?preset=security',
                icon: '🛡️',
                keywords: 'preset nist security zero trust compliance cis endpoints'
            },
            {
                id: 'preset-apollo',
                title: 'Preset: Apollo AGC Guidance Crew',
                desc: 'Astronaut candidates certified for all Saturn V lunar mission modules',
                category: 'presets',
                badge: 'PRESET',
                presetKey: 'apollo',
                url: 'simulation.html?preset=apollo',
                icon: '🌕',
                keywords: 'preset apollo agc astronaut saturn space lunar mission'
            },

            // 4. Documentation & Theoretical Proofs
            {
                id: 'doc-theory',
                title: 'Formal Mathematical Theory',
                desc: 'Algebraic definition: R ÷ S = Π_A(R) − Π_A((Π_A(R) × S) − R)',
                category: 'docs',
                badge: 'THEORY',
                url: 'documentation.html#theory',
                hash: 'theory',
                icon: '📐',
                keywords: 'theory math formula universal quantification proof algebraic definition'
            },
            {
                id: 'doc-pipeline',
                title: '5-Stage Pipeline Proofs',
                desc: 'Mathematical formalisms and invariants for stages T1 to T5',
                category: 'docs',
                badge: 'THEORY',
                url: 'documentation.html#pipeline',
                hash: 'pipeline',
                icon: '⚙️',
                keywords: 'pipeline derivation formal proof intermediate relational algebra'
            },
            {
                id: 'doc-sql-deep',
                title: 'SQL Dialects Comparative Analysis',
                desc: 'Cost evaluation of Correlated NOT EXISTS vs Aggregation vs EXCEPT',
                category: 'docs',
                badge: 'DOCS',
                url: 'documentation.html#sql',
                hash: 'sql',
                icon: '📝',
                keywords: 'sql dialects comparison cost optimization performance query plan'
            },
            {
                id: 'doc-telemetry-specs',
                title: 'Sensor Telemetry Architecture',
                desc: 'ESP32 / MPU-6050 hardware interface and serial stream protocol',
                category: 'docs',
                badge: 'DOCS',
                url: 'documentation.html#telemetry-doc',
                hash: 'telemetry-doc',
                icon: '🛰️',
                keywords: 'telemetry sensor specs hardware esp32 i2c serial baud rate'
            },
            {
                id: 'doc-faculty',
                title: 'Faculty Guide & Course Details',
                desc: 'Dr. Swaminathan A, Assistant Professor, Department of CSE / SCOPE',
                category: 'docs',
                badge: 'ACADEMIC',
                url: 'documentation.html#faculty',
                hash: 'faculty',
                icon: '👨‍🏫',
                keywords: 'faculty swaminathan professor vit scope cse bacse202 guide'
            },
            {
                id: 'doc-refs',
                title: 'Academic References & Citations',
                desc: 'C.J. Date, Silberschatz, Korth, Sudarshan, and IEEE literature citations',
                category: 'docs',
                badge: 'ACADEMIC',
                url: 'documentation.html#references',
                hash: 'references',
                icon: '📚',
                keywords: 'references citations date silberschatz korth sudarshan textbook ieee'
            },

            // 5. Platform Actions
            {
                id: 'act-theme',
                title: 'Toggle Day / Night Mode',
                desc: 'Switch between bespoke dark black and light themes',
                category: 'actions',
                badge: 'ACTION',
                shortcut: 'Alt+T',
                action: 'toggleTheme',
                icon: '🌓',
                keywords: 'theme dark light toggle mode switch night day'
            },
            {
                id: 'act-export',
                title: 'Export Publication-Grade Academic Report (PDF, Word, Markdown, CSV)',
                desc: 'Open the comprehensive publication-grade academic report and dataset export modal',
                category: 'actions',
                badge: 'ACTION',
                shortcut: 'Alt+E',
                action: 'openExportModal',
                icon: '📥',
                keywords: 'export download publication academic report pdf word doc markdown md text csv'
            },
            {
                id: 'act-help',
                title: 'Open User Manual & Quick Reference',
                desc: 'Display mathematical operator formulas, guide, and shortcuts',
                category: 'actions',
                badge: 'ACTION',
                shortcut: 'Alt+H',
                action: 'openHelpModal',
                icon: '❓',
                keywords: 'help manual shortcuts reference keys'
            },
            {
                id: 'act-run',
                title: 'Execute Relational Pipeline',
                desc: 'Compute quotient R ÷ S across all 5 intermediate pipeline stages',
                category: 'actions',
                badge: 'ACTION',
                shortcut: 'Ctrl+Enter',
                action: 'runPipeline',
                icon: '▶️',
                keywords: 'run execute pipeline compute divide calculate simulation'
            },
            {
                id: 'act-retest',
                title: 'Re-Run Automated Unit Tests',
                desc: 'Execute 8 formal boundary tests and relational invariants',
                category: 'actions',
                badge: 'ACTION',
                action: 'runTests',
                icon: '🔄',
                keywords: 'tests retest rerun unit tests verify asserts'
            },
            {
                id: 'act-sidebar',
                title: 'Toggle Navigation Sidebar',
                desc: 'Smoothly collapse or expand the Horizon navigation sidebar',
                category: 'actions',
                badge: 'ACTION',
                shortcut: 'Ctrl+B',
                action: 'toggleSidebar',
                icon: '↔️',
                keywords: 'sidebar collapse expand toggle hide show'
            }
        ];
    }

    /**
     * Render Horizon Floating Top Navbar & Horizon Sidebar HTML
     */
    static render(activePage = 'dashboard') {
        const isLanding = activePage === 'landing';
        const isDark = this.getTheme() === 'dark';
        const brandText = this.getPageBrandText(activePage);
        const icons = this.icons;
        const submodules = this.submodules;

        // Primary 4 Zones Configuration
        const zones = [
            {
                name: 'Dashboard',
                key: 'dashboard',
                path: 'dashboard.html',
                emoji: '📊',
                icon: icons.dashboard
            },
            {
                name: 'Simulation Workspace',
                shortName: 'Simulation',
                key: 'simulation',
                path: 'simulation.html',
                emoji: '⚡',
                icon: icons.chart
            },
            {
                name: 'Technical Documentation',
                shortName: 'Documentation',
                key: 'documentation',
                path: 'documentation.html',
                emoji: '📖',
                icon: icons.doc
            },
            {
                name: 'System Landing',
                shortName: 'Landing',
                key: 'landing',
                path: 'index.html',
                emoji: '🚀',
                icon: icons.landing
            }
        ];

        // 1. Quick-Nav 4-Zone Links HTML
        const zoneLinksHtml = zones.map(z => {
            const isActive = activePage === z.key;
            if (isActive) {
                return `
                <a href="${z.path}" class="quick-nav-zone-pill active flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-md shadow-brand-500/30 transition-all">
                    <span>${z.emoji}</span>
                    <span class="hidden md:inline">${z.shortName || z.name}</span>
                </a>
                `;
            } else {
                return `
                <a href="${z.path}" class="quick-nav-zone-pill flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                    <span>${z.emoji}</span>
                    <span class="hidden md:inline">${z.shortName || z.name}</span>
                </a>
                `;
            }
        }).join('');

        // 2. Submodule Quick Jump Dropdown Menu Items HTML
        const submoduleDropdownHtml = submodules.map(sub => `
            <a href="${sub.page}#${sub.hash}" class="quickjump-item flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-[#1a1a26] transition-all group" data-page="${sub.page}" data-hash="${sub.hash}">
                <span class="text-sm flex-shrink-0 group-hover:scale-110 transition-transform">${sub.icon}</span>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                        <span class="font-semibold text-gray-200 group-hover:text-white truncate">${sub.name}</span>
                        <span class="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">${sub.badge}</span>
                    </div>
                    <p class="text-[10px] text-gray-400 truncate mt-0.5">${sub.desc}</p>
                </div>
            </a>
        `).join('');

        // 3. Horizon Floating Top Navbar HTML
        const topNavHtml = `
        <header class="sticky top-0 z-40 w-full px-3 sm:px-6 pt-3 pb-2 transition-all">
            <nav class="sticky top-4 z-40 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 rounded-2xl bg-white/90 dark:bg-[#0a0a0ed9] p-2.5 sm:p-3 backdrop-blur-xl border border-gray-200/70 dark:border-white/[0.08] shadow-lg shadow-black/5 dark:shadow-black/60 transition-all">
                
                <!-- Left Side: Breadcrumbs & Page Identity -->
                <div class="flex items-center justify-between lg:justify-start gap-3">
                    <div class="ml-1 py-0.5">
                        <div class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                            <a href="index.html" class="hover:text-brand-500 dark:hover:text-brand-400 font-medium transition-colors flex items-center gap-1">
                                <span>🚀</span>
                                <span>Relational Div</span>
                            </a>
                            <span class="text-gray-400 dark:text-gray-600">/</span>
                            <span class="font-semibold text-navy-700 dark:text-gray-200 capitalize">
                                ${brandText}
                            </span>
                            <span id="breadcrumb-submodule" class="hidden font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30"></span>
                        </div>
                        <div class="flex items-center gap-2.5 mt-0.5">
                            <h2 class="text-lg sm:text-xl font-bold font-poppins text-navy-700 dark:text-white tracking-tight leading-tight">
                                ${brandText}
                            </h2>
                            <span class="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                240Hz ES6
                            </span>
                        </div>
                    </div>

                    <!-- Mobile Drawer Toggle for Left on Mobile -->
                    <button id="mobile-sidebar-toggle-alt" class="xl:hidden flex lg:hidden cursor-pointer text-gray-400 hover:text-white p-2 rounded-xl bg-gray-100 dark:bg-[#111116] border border-gray-200 dark:border-[#22222c] transition-colors" title="Toggle Navigation Drawer">
                        ${icons.hamburger}
                    </button>
                </div>

                <!-- Center: Quick-Nav 4-Zone Bar & Submodule Quick Jump -->
                <div class="flex flex-wrap items-center justify-start lg:justify-center gap-2">
                    
                    <!-- 1-Click 4 Main Zones Strip -->
                    <div class="flex items-center p-1 rounded-xl bg-gray-100/80 dark:bg-[#111116] border border-gray-200 dark:border-[#22222c] shadow-inner">
                        ${zoneLinksHtml}
                    </div>

                    <!-- Submodule Quick Jump Dropdown Pill Menu -->
                    <div class="relative submodule-quickjump-wrapper">
                        <button id="btn-quickjump-dropdown" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100/80 dark:bg-[#111116] hover:bg-gray-200 dark:hover:bg-[#181822] text-navy-700 dark:text-gray-200 text-xs font-semibold border border-gray-200 dark:border-[#22222c] transition-all cursor-pointer shadow-sm group">
                            <span class="text-brand-500 dark:text-brand-400 font-bold group-hover:scale-110 transition-transform">⚡</span>
                            <span>Quick Jump</span>
                            <span class="font-mono text-[9px] px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-300 ml-0.5">8</span>
                            <span id="quickjump-chevron" class="text-gray-400 transition-transform duration-200">${icons.chevronDown}</span>
                        </button>

                        <!-- Dropdown Panel (8 Submodules) -->
                        <div id="quickjump-dropdown-menu" class="hidden absolute left-0 sm:right-0 sm:left-auto top-full mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-[#0c0c12] border border-gray-200 dark:border-[#22222e] shadow-2xl p-2 z-50 transition-all backdrop-blur-2xl">
                            <div class="px-3 py-2 border-b border-gray-100 dark:border-[#1a1a26] flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                <span>Platform Submodules</span>
                                <span class="font-mono text-[10px] text-brand-400">Direct Anchors</span>
                            </div>
                            <div class="space-y-0.5 mt-1 max-h-[360px] overflow-y-auto horizon-scrollbar">
                                ${submoduleDropdownHtml}
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Right Side: Floating Action Pill -->
                <div class="flex items-center justify-end">
                    <div class="relative flex items-center gap-1.5 sm:gap-2 rounded-full bg-white dark:bg-[#111116] px-2.5 sm:px-3 py-1.5 shadow-xl border border-gray-200 dark:border-[#22222c] transition-all flex-shrink-0">
                        
                        <!-- Interactive Command Palette / Search Trigger Pill -->
                        <button id="global-search-trigger" class="flex h-8 sm:h-9 items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-[#181822] hover:dark:bg-[#20202e] dark:text-white px-2.5 sm:px-3.5 w-32 sm:w-44 md:w-52 transition-all border border-transparent dark:border-white/5 hover:border-brand-500/50 cursor-pointer group" title="Open Command Palette (Ctrl+K)">
                            <span class="pr-2 text-gray-400 group-hover:text-brand-400 transition-colors flex-shrink-0">
                                ${icons.search}
                            </span>
                            <span class="text-xs text-gray-400 dark:text-gray-400 group-hover:text-white transition-colors truncate text-left flex-1 font-medium">
                                Search...
                            </span>
                            <kbd class="hidden sm:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 bg-gray-200 dark:bg-[#252536] text-gray-600 dark:text-gray-300 rounded border border-gray-300 dark:border-white/10 ml-1 flex-shrink-0">
                                Ctrl+K
                            </kbd>
                        </button>

                        <!-- Mobile Drawer Toggle Button (Hidden on xl) -->
                        <button id="mobile-sidebar-toggle" class="xl:hidden flex cursor-pointer text-gray-600 dark:text-gray-300 hover:text-brand-400 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#1f1f2e] transition-colors" title="Toggle Navigation Drawer">
                            ${icons.hamburger}
                        </button>

                        <!-- Day/Night Mode Toggle with Sun/Moon Icons -->
                        <button id="global-theme-toggle" class="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-brand-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1f1f2e] transition-colors" title="Toggle Day/Night Mode (Alt+T)">
                            <span id="global-theme-icon" class="flex items-center justify-center">
                                ${isDark ? icons.sun : icons.moon}
                            </span>
                        </button>

                        <!-- Global Export / Download Report Button -->
                        <button id="global-btn-download" class="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-brand-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1f1f2e] transition-colors" title="Download Academic Reports: PDF, Word, Text, CSV (Alt+E)">
                            <span class="flex items-center justify-center">
                                ${icons.download}
                            </span>
                        </button>

                        <!-- Help Button -->
                        <button id="global-btn-help" class="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-brand-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1f1f2e] transition-colors" title="Operational User Manual & Shortcuts (Alt+H)">
                            <span class="flex items-center justify-center">
                                ${icons.help}
                            </span>
                        </button>

                        <!-- Profile Avatar Pill -->
                        <div class="relative">
                            <button id="global-profile-btn" class="flex items-center rounded-full cursor-pointer focus:outline-none ring-2 ring-transparent hover:ring-brand-500 transition-all" title="Principal Investigator Profile & Course Guide">
                                <div class="h-8 w-8 rounded-full bg-gradient-to-tr from-brand-500 via-brandLinear to-brand-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-brand-500/30">
                                    BA
                                </div>
                            </button>

                            <!-- Profile Popup Dropdown -->
                            <div id="global-profile-dropdown" class="hidden absolute right-0 top-11 w-68 flex-col rounded-2xl bg-white dark:bg-[#0c0c12] p-4 shadow-2xl border border-gray-100 dark:border-[#22222e] z-50">
                                <div class="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-white/10">
                                    <div class="h-10 w-10 rounded-full bg-gradient-to-tr from-brand-500 to-brandLinear flex items-center justify-center text-white font-bold text-sm shadow">
                                        BA
                                    </div>
                                    <div>
                                        <p class="text-sm font-bold text-navy-700 dark:text-white">Basavaashlesh</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">Principal Investigator</p>
                                    </div>
                                </div>
                                <div class="py-3 text-xs space-y-2 border-b border-gray-200 dark:border-white/10">
                                    <div class="flex justify-between items-center">
                                        <span class="text-gray-500 dark:text-gray-400">Course:</span>
                                        <span class="font-semibold text-navy-700 dark:text-white">BACSE202</span>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="text-gray-500 dark:text-gray-400">Faculty Mentor:</span>
                                        <span class="font-semibold text-brand-500 dark:text-brand-400 text-right">Dr. Swaminathan A</span>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="text-gray-500 dark:text-gray-400">Department:</span>
                                        <span class="font-medium text-navy-700 dark:text-white">SCOPE / CSE</span>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="text-gray-500 dark:text-gray-400">Execution Engine:</span>
                                        <span class="text-emerald-400 font-semibold font-mono">240Hz Pure ES6</span>
                                    </div>
                                </div>
                                <div class="pt-3 flex justify-between items-center text-xs">
                                    <span class="text-gray-500 dark:text-gray-400">Conformance:</span>
                                    <span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 font-bold text-emerald-400 text-[11px] font-mono">
                                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                        100% Verified
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </nav>
        </header>
        `;

        // Generate Sidebar Primary Route Links
        const sidebarRoutes = [
            {
                name: 'Dashboard',
                key: 'dashboard',
                path: 'dashboard.html',
                icon: icons.dashboard
            },
            {
                name: 'Simulation Workspace',
                key: 'simulation',
                path: 'simulation.html',
                icon: icons.chart
            },
            {
                name: 'Technical Documentation',
                key: 'documentation',
                path: 'documentation.html',
                icon: icons.doc
            }
        ];

        const navLinksHtml = sidebarRoutes.map(route => {
            const isActive = activePage === route.key;
            if (isActive) {
                return `
                <a href="${route.path}" class="relative mb-1.5 flex hover:cursor-pointer block text-decoration-none group">
                    <div class="my-[2px] flex cursor-pointer items-center px-6 py-3 font-bold relative w-full bg-brand-50/80 dark:bg-[#161622] rounded-xl mx-3 border border-brand-500/30 dark:border-brand-500/40 text-brand-600 dark:text-white shadow-[0_0_20px_rgba(117,81,255,0.15)] transition-all">
                        <!-- Purple-blue vertical bar indicator -->
                        <div class="absolute left-0 top-2 bottom-2 w-1.5 rounded-r-full bg-gradient-to-b from-brand-400 to-brand-600 shadow-[0_0_10px_#7551FF]"></div>
                        
                        <span class="text-brand-500 dark:text-brand-400 flex items-center justify-center ml-2">
                            ${route.icon}
                        </span>
                        <p class="leading-none ml-3 font-bold text-navy-700 dark:text-white sidebar-label text-sm flex-1">
                            ${route.name}
                        </p>
                        <!-- Active Badge -->
                        <span class="sidebar-label ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 flex items-center gap-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-brand-400 animate-ping"></span>
                            ACTIVE
                        </span>
                    </div>
                </a>
                `;
            } else {
                return `
                <a href="${route.path}" class="relative mb-1.5 flex hover:cursor-pointer block text-decoration-none group">
                    <div class="my-[2px] flex cursor-pointer items-center px-6 py-3 text-gray-600 dark:text-gray-400 font-medium text-sm hover:text-navy-700 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#111118] rounded-xl mx-3 transition-all duration-150 w-full">
                        <span class="text-gray-400 dark:text-gray-500 group-hover:text-brand-500 dark:group-hover:text-brand-400 flex items-center justify-center transition-colors ml-2">
                            ${route.icon}
                        </span>
                        <p class="leading-none ml-3 font-medium text-gray-600 dark:text-gray-400 group-hover:text-navy-700 dark:group-hover:text-white sidebar-label text-sm transition-colors">
                            ${route.name}
                        </p>
                    </div>
                </a>
                `;
            }
        }).join('');

        // Submodule Sidebar Links HTML (8 submodules)
        const sidebarSubmodulesHtml = submodules.map(sub => `
            <a href="${sub.page}#${sub.hash}" class="sidenav-subitem text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center px-4 py-2 hover:text-navy-700 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#12121c] rounded-lg gap-2.5 transition-all group" data-hash="${sub.hash}" title="${sub.name}">
                <span class="w-1.5 h-1.5 rounded-full bg-brand-500/60 group-hover:bg-brand-400 group-hover:scale-125 transition-all"></span>
                <span class="flex-1 truncate">${sub.name}</span>
                <span class="text-[10px] font-mono text-gray-400 dark:text-gray-600 group-hover:text-brand-400">#${sub.hash}</span>
            </a>
        `).join('');

        // 4. Horizon Sidebar HTML
        const sideNavHtml = isLanding ? '' : `
        <!-- Offcanvas Backdrop for Mobile -->
        <div id="sidebar-backdrop" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 hidden xl:hidden transition-opacity"></div>

        <aside id="app-sidebar" class="w-[290px] min-w-[290px] max-w-[290px] h-full flex-shrink-0 flex flex-col justify-between bg-white dark:bg-[#08080b] text-navy-700 dark:text-white border-r border-gray-200 dark:border-[#1a1a22] transition-all duration-200 z-50 overflow-y-auto">
            
            <div class="flex flex-col">
                <!-- Brand Mark with Purple Glow -->
                <div class="mx-[24px] mt-[24px] mb-[18px] flex items-center justify-between">
                    <a href="index.html" class="flex items-center gap-2.5 text-decoration-none group">
                        <div class="h-9 w-9 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-brandLinear flex items-center justify-center text-white font-black text-base shadow-[0_0_15px_rgba(117,81,255,0.6)] group-hover:scale-105 transition-transform flex-shrink-0">
                            ÷
                        </div>
                        <div class="sidebar-label">
                            <span class="font-poppins text-[20px] font-extrabold uppercase tracking-tight text-navy-700 dark:text-white flex items-center gap-1.5">
                                RELATIONAL <span class="text-brand-500 dark:text-brand-400 bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-brand-400 dark:to-brandLinear drop-shadow-[0_0_18px_rgba(117,81,255,0.8)]">DIV</span>
                            </span>
                            <p class="text-[9px] font-mono tracking-widest text-gray-400 dark:text-gray-500 uppercase -mt-1">BACSE202 // SIMULATOR</p>
                        </div>
                    </a>

                    <!-- Mobile Close Drawer Button -->
                    <button id="sidebar-close-btn" class="xl:hidden block text-gray-500 hover:text-navy-700 dark:text-gray-400 dark:hover:text-white cursor-pointer p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a1a22] transition-colors" title="Close Sidebar">
                        ${icons.close}
                    </button>
                </div>

                <!-- Hairline Divider -->
                <div class="h-px bg-gray-200 dark:bg-[#1a1a22] mb-5 mx-6"></div>

                <!-- Navigation Links List -->
                <ul class="mb-auto pt-1 list-none p-0 m-0">
                    ${navLinksHtml}
                </ul>

                <!-- Submodules & Direct Anchors (8 Core Submodules) -->
                <div class="sidebar-hide-on-collapse mt-4">
                    <div class="px-6 pb-2 flex items-center justify-between">
                        <div class="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 sidebar-section-title">
                            Submodule Quick Jump
                        </div>
                        <span class="font-mono text-[9px] text-brand-400">8 Modules</span>
                    </div>
                    <div class="space-y-0.5 mx-3">
                        ${sidebarSubmodulesHtml}
                    </div>
                </div>
            </div>

            <!-- Bottom Section: Horizon Gradient Card & Tactile Collapse Toggle -->
            <div class="flex flex-col">
                <!-- Bottom Academic Endorsement Card in Deep Bespoke Gradient -->
                <div class="horizon-card-bottom relative mt-8 mb-4 mx-4 flex flex-col items-center rounded-[20px] bg-gradient-to-br from-[#1b103c] via-[#120a2e] to-[#08080b] p-4 text-white border border-brand-500/30 shadow-[0_10px_30px_rgba(66,42,251,0.2)]">
                    <!-- Floating circular top badge -->
                    <div class="absolute -top-6 flex h-12 w-12 items-center justify-center rounded-full border-[2px] border-brand-500/40 bg-gradient-to-b from-[#868CFF] to-brand-500 shadow-md shadow-brand-500/40">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                        </svg>
                    </div>

                    <div class="mt-5 flex flex-col items-center text-center">
                        <span class="text-[10px] font-extrabold tracking-wider uppercase text-brand-300">BACSE202 PLATFORM</span>
                        <p class="mt-1 text-[11px] leading-tight text-gray-300 font-medium">
                            Faculty Mentor: <b class="text-white">Dr. Swaminathan A</b><br><span class="text-gray-400 text-[10px]">Assistant Professor, SCOPE / CSE</span>
                        </p>
                        <div class="mt-2.5 flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[9px] font-semibold text-white backdrop-blur-sm border border-white/10">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>Pure ES6 Engine • 240Hz</span>
                        </div>
                    </div>
                </div>

                <!-- Tactile Sidebar Collapse Toggle Button -->
                <div class="p-3 border-t border-gray-200 dark:border-[#1a1a22] flex items-center justify-between bg-white dark:bg-[#08080b]">
                    <button id="sidebar-toggle-btn" class="flex items-center gap-2.5 text-xs font-medium text-gray-500 hover:text-navy-700 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer group" title="Toggle Sidebar Collapse (Ctrl+B)">
                        <span id="sidebar-toggle-icon" class="w-5 h-5 rounded-md bg-gray-100 dark:bg-[#161622] group-hover:bg-brand-500/20 text-gray-500 dark:text-gray-400 group-hover:text-brand-400 flex items-center justify-center text-[10px] transition-all">◀</span>
                        <span id="sidebar-toggle-label" class="sidebar-label">Collapse Sidebar</span>
                    </button>
                    <kbd class="sidebar-label text-[10px] font-mono px-1.5 py-0.5 bg-gray-100 dark:bg-[#161622] text-gray-500 dark:text-gray-400 rounded border border-gray-200 dark:border-[#222230]">Ctrl+B</kbd>
                </div>
            </div>

        </aside>
        `;

        return { topNavHtml, sideNavHtml };
    }

    /**
     * Ensure Bespoke Dark Black Styles & Horizon UI Theme Tokens are Injected
     */
    static ensureStyles() {
        if (!document.getElementById('horizon-layout-styles')) {
            const style = document.createElement('style');
            style.id = 'horizon-layout-styles';
            style.textContent = `
                /* Bespoke Dark Black & Brand Color Tokens */
                :root {
                    --bg-bespoke-canvas: #08080b;
                    --bg-bespoke-navbar: rgba(10, 10, 14, 0.85);
                    --bg-bespoke-panel: #0c0c12;
                    --bg-bespoke-card: #111116;
                    --bg-bespoke-subcard: #14141d;
                    --border-bespoke-hairline: #1a1a22;
                    --border-bespoke-subtle: #22222c;
                    --border-bespoke-highlight: #333344;
                    --color-brand-glow: rgba(117, 81, 255, 0.6);
                }

                /* Deep Bespoke Dark Canvas Overrides */
                html.dark body {
                    background-color: var(--bg-bespoke-canvas) !important;
                }

                /* Sidebar Collapse Transition */
                #app-sidebar {
                    transition: width 0.22s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.22s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.22s cubic-bezier(0.4, 0, 0.2, 1);
                }
                #app-sidebar.collapsed {
                    width: 76px !important;
                    min-width: 76px !important;
                    max-width: 76px !important;
                }
                #app-sidebar.collapsed .sidebar-label,
                #app-sidebar.collapsed .sidebar-hide-on-collapse,
                #app-sidebar.collapsed .horizon-card-bottom,
                #app-sidebar.collapsed #sidebar-toggle-label {
                    display: none !important;
                }
                #app-sidebar.collapsed .px-6 {
                    padding-left: 1rem !important;
                    padding-right: 1rem !important;
                    justify-content: center;
                }
                #app-sidebar.collapsed #sidebar-toggle-icon {
                    transform: rotate(180deg);
                }

                /* Mobile Offcanvas Drawer */
                @media (max-width: 1279px) {
                    #app-sidebar {
                        position: fixed !important;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        z-index: 50 !important;
                        transform: translateX(-100%);
                        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
                    }
                    #app-sidebar.mobile-open {
                        transform: translateX(0) !important;
                    }
                }

                /* Bespoke Black Modals (Export, Help, Command Palette) */
                .tech-modal-overlay {
                    position: fixed;
                    inset: 0;
                    background-color: rgba(4, 4, 7, 0.82);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    padding: 16px;
                }
                .tech-modal-overlay.open {
                    opacity: 1;
                    pointer-events: auto;
                }

                .tech-modal-container {
                    background-color: #0c0c12 !important;
                    border: 1px solid #22222e !important;
                    border-radius: 24px !important;
                    width: 100%;
                    max-width: 640px;
                    max-height: 88vh;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.9), 0 0 30px rgba(117, 81, 255, 0.15);
                    transform: scale(0.96) translateY(8px);
                    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow: hidden;
                    color: #ffffff;
                }
                .tech-modal-overlay.open .tech-modal-container {
                    transform: scale(1) translateY(0);
                }

                /* Command Palette Results List Item Active Highlight */
                .cmd-item.selected {
                    background-color: #1a1a26 !important;
                    border-color: #7551FF !important;
                }
                .cmd-item.selected .cmd-title {
                    color: #ffffff !important;
                }

                /* Quick Jump Scrollbar */
                .horizon-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .horizon-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .horizon-scrollbar::-webkit-scrollbar-thumb {
                    background: #252536;
                    border-radius: 9999px;
                }
                .horizon-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #7551FF;
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * Inject Global Download, Help, and Command Palette Modals into the DOM
     */
    static ensureModals() {
        // 1. Academic Report & Dataset Export Modal
        if (!document.getElementById('global-export-modal')) {
            const exportModalHtml = `
            <div id="global-export-modal" class="tech-modal-overlay">
                <div class="tech-modal-container rounded-[24px] bg-[#0c0c12] text-white shadow-2xl border border-[#22222e]">
                    <div class="tech-modal-header border-b border-[#1c1c28] px-6 py-4 flex items-center justify-between bg-[#101018]">
                        <div class="flex items-center gap-2.5">
                            <span class="w-2.5 h-2.5 rounded-full bg-brand-500 shadow-[0_0_8px_#7551FF] animate-pulse"></span>
                            <span class="font-poppins text-sm font-bold text-white uppercase tracking-wider">
                                PUBLICATION-GRADE ACADEMIC REPORT & DATASET EXPORT // BACSE202
                            </span>
                        </div>
                        <button class="btn-close-modal text-gray-400 hover:text-white font-mono text-base px-2 py-1 rounded cursor-pointer" data-target="global-export-modal">✕</button>
                    </div>

                    <div class="tech-modal-body p-6 space-y-4 max-h-[70vh] overflow-y-auto horizon-scrollbar">
                        <p class="text-xs text-gray-300">
                            Download the publication-grade academic report, relational algebra breakdown ($T_1 \dots T_5$), SQL queries, and formal verification benchmarks in your preferred academic format:
                        </p>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                            <!-- 1. PDF Academic Report -->
                            <div class="p-4 rounded-xl border border-[#20202e] bg-[#12121b] hover:border-brand-500/60 transition-all flex flex-col justify-between space-y-3">
                                <div>
                                    <div class="flex items-center justify-between">
                                        <span class="font-bold text-brand-400">1. PDF REPORT</span>
                                        <span class="px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-bold text-[10px] border border-brand-500/30">PRINT-READY</span>
                                    </div>
                                    <p class="text-[11px] text-gray-400 mt-1.5 font-sans leading-relaxed">
                                        Publication-Grade Academic Report (PDF) with formal proofs, relational algebra derivation trace, and system benchmarks.
                                    </p>
                                </div>
                                <button id="btn-export-pdf" class="w-full flex items-center justify-center gap-2 text-xs py-2.5 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white rounded-xl font-semibold shadow-md shadow-brand-500/20 transition-all cursor-pointer">
                                    <span>📄 Publication-Grade PDF</span>
                                </button>
                            </div>

                            <!-- 2. Microsoft Word Document -->
                            <div class="p-4 rounded-xl border border-[#20202e] bg-[#12121b] hover:border-emerald-500/60 transition-all flex flex-col justify-between space-y-3">
                                <div>
                                    <div class="flex items-center justify-between">
                                        <span class="font-bold text-emerald-400">2. WORD (.DOC)</span>
                                        <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/30">MS WORD</span>
                                    </div>
                                    <p class="text-[11px] text-gray-400 mt-1.5 font-sans leading-relaxed">
                                        Publication-Grade Academic Report (Word .doc) containing formatted tables, mathematical definitions, and coverage matrix.
                                    </p>
                                </div>
                                <button id="btn-export-word" class="w-full flex items-center justify-center gap-2 text-xs py-2.5 bg-[#181824] hover:bg-[#202030] text-gray-200 hover:text-white border border-[#2a2a3c] rounded-xl font-semibold transition-all cursor-pointer">
                                    <span>📝 Word Document (.doc)</span>
                                </button>
                            </div>

                            <!-- 3. Plain Text / Markdown -->
                            <div class="p-4 rounded-xl border border-[#20202e] bg-[#12121b] hover:border-amber-500/60 transition-all flex flex-col justify-between space-y-3">
                                <div>
                                    <div class="flex items-center justify-between">
                                        <span class="font-bold text-amber-400">3. MARKDOWN (.MD / .TXT)</span>
                                        <span class="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/30">MARKDOWN</span>
                                    </div>
                                    <p class="text-[11px] text-gray-400 mt-1.5 font-sans leading-relaxed">
                                        Publication-Grade Academic Report (Markdown / .txt) formatted with clean GitHub-flavored ASCII tables and formulas.
                                    </p>
                                </div>
                                <button id="btn-export-text" class="w-full flex items-center justify-center gap-2 text-xs py-2.5 bg-[#181824] hover:bg-[#202030] text-gray-200 hover:text-white border border-[#2a2a3c] rounded-xl font-semibold transition-all cursor-pointer">
                                    <span>📑 Markdown Report (.md)</span>
                                </button>
                            </div>

                            <!-- 4. Tabular CSV Data -->
                            <div class="p-4 rounded-xl border border-[#20202e] bg-[#12121b] hover:border-rose-500/60 transition-all flex flex-col justify-between space-y-3">
                                <div>
                                    <div class="flex items-center justify-between">
                                        <span class="font-bold text-rose-400">4. CSV DATASETS</span>
                                        <span class="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold text-[10px] border border-rose-500/30">SPREADSHEET</span>
                                    </div>
                                    <p class="text-[11px] text-gray-400 mt-1.5 font-sans leading-relaxed">
                                        Publication-Grade Academic Report Datasets (CSV) for relations $R$ (Dividend), $S$ (Divisor), and $T_5$ (Final Division Result).
                                    </p>
                                </div>
                                <div class="grid grid-cols-3 gap-1.5">
                                    <button id="btn-export-csv-r-all" class="bg-[#181824] hover:bg-[#202030] border border-[#2a2a3c] text-center justify-center text-[10px] font-semibold text-gray-200 py-2 rounded-lg transition-all cursor-pointer" title="Export Table R">R (CSV)</button>
                                    <button id="btn-export-csv-s-all" class="bg-[#181824] hover:bg-[#202030] border border-[#2a2a3c] text-center justify-center text-[10px] font-semibold text-gray-200 py-2 rounded-lg transition-all cursor-pointer" title="Export Table S">S (CSV)</button>
                                    <button id="btn-export-csv-t5-all" class="bg-[#181824] hover:bg-[#202030] border border-[#2a2a3c] text-center justify-center text-[10px] font-semibold text-gray-200 py-2 rounded-lg transition-all cursor-pointer" title="Export Table T5">T5 (CSV)</button>
                                </div>
                            </div>
                        </div>

                        <div class="p-3 bg-[#12121b] border border-[#20202e] rounded-xl text-[11px] text-gray-400 flex items-center justify-between">
                            <span>Course: BACSE202 — Database Management Systems &amp; Formal Query Verification</span>
                            <span>Faculty Mentor: <b class="text-white">Dr. Swaminathan A, Assistant Professor</b></span>
                        </div>
                    </div>

                    <div class="tech-modal-footer border-t border-[#1c1c28] px-6 py-3 flex justify-end bg-[#101018]">
                        <button class="btn-close-modal px-4 py-2 text-xs rounded-xl bg-[#181824] hover:bg-[#222234] text-gray-300 font-semibold border border-[#2a2a3c] transition-colors cursor-pointer" data-target="global-export-modal">Close</button>
                    </div>
                </div>
            </div>
            `;
            document.body.insertAdjacentHTML('beforeend', exportModalHtml);
        }

        // 2. Operational User Manual & Help Modal
        if (!document.getElementById('global-help-modal')) {
            const helpModalHtml = `
            <div id="global-help-modal" class="tech-modal-overlay">
                <div class="tech-modal-container rounded-[24px] bg-[#0c0c12] text-white shadow-2xl border border-[#22222e]" style="max-width: 680px;">
                    <div class="tech-modal-header border-b border-[#1c1c28] px-6 py-4 flex items-center justify-between bg-[#101018]">
                        <div class="flex items-center gap-2.5">
                            <span class="w-2.5 h-2.5 rounded-full bg-brand-500 shadow-[0_0_8px_#7551FF] animate-pulse"></span>
                            <span class="font-poppins text-sm font-bold text-white uppercase tracking-wider">
                                OPERATIONAL USER MANUAL & QUICK REFERENCE
                            </span>
                        </div>
                        <button class="btn-close-modal text-gray-400 hover:text-white font-mono text-base px-2 py-1 rounded cursor-pointer" data-target="global-help-modal">✕</button>
                    </div>

                    <div class="tech-modal-body p-6 space-y-4 max-h-[70vh] overflow-y-auto horizon-scrollbar">
                        <!-- Mathematical summary -->
                        <div class="p-4 bg-[#12121b] rounded-xl space-y-1.5 border border-[#222230] text-xs font-mono">
                            <div class="text-[10px] text-gray-400 uppercase font-semibold">CORE RELATIONAL OPERATOR DEFINITION:</div>
                            <div class="text-brand-400 font-bold text-sm tracking-wide">R ÷ S = Π_A(R) − Π_A((Π_A(R) × S) − R)</div>
                            <div class="text-[11px] text-gray-300 font-sans">Universal Quantification: Identifies candidates $t_A \\in \\Pi_A(R)$ that pair with EVERY requirement in divisor relation $S$.</div>
                        </div>

                        <!-- 4 Step Guide -->
                        <div class="space-y-2">
                            <h4 class="text-xs font-bold uppercase tracking-wider text-gray-200">How to Operate the Simulator</h4>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                                <div class="p-3 rounded-xl border border-[#20202e] bg-[#12121b] space-y-1">
                                    <div class="font-bold text-brand-400 font-poppins">1. Choose Preset Scenario</div>
                                    <p class="text-gray-400 text-[11px]">Select from 6 real-world scenarios (University CS, Cloud DevOps, Pediatric Licensure, EV Supply Chain, NIST Security, Apollo Crew).</p>
                                </div>
                                <div class="p-3 rounded-xl border border-[#20202e] bg-[#12121b] space-y-1">
                                    <div class="font-bold text-brand-400 font-poppins">2. Edit Relations Inline</div>
                                    <p class="text-gray-400 text-[11px]">Click any cell in Table R or Table S to modify values in real-time. Use "+" to add rows and "✕" to delete rows.</p>
                                </div>
                                <div class="p-3 rounded-xl border border-[#20202e] bg-[#12121b] space-y-1">
                                    <div class="font-bold text-brand-400 font-poppins">3. Execute Pipeline</div>
                                    <p class="text-gray-400 text-[11px]">Click "▶ Execute Relational Pipeline" or press <kbd class="px-1.5 py-0.5 bg-[#1e1e2c] border border-[#2c2c40] rounded font-mono text-[10px]">Ctrl+Enter</kbd> for instant multi-stage execution.</p>
                                </div>
                                <div class="p-3 rounded-xl border border-[#20202e] bg-[#12121b] space-y-1">
                                    <div class="font-bold text-brand-400 font-poppins">4. Inspect Multi-Pane AST</div>
                                    <p class="text-gray-400 text-[11px]">Switch tabs to examine Output ($T_5$), Expression DAG Tree, 5-Step Derivation, Tuple Tracer, SQL Studio, and Hardware Telemetry.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Keyboard Shortcuts -->
                        <div>
                            <h4 class="text-xs font-bold uppercase tracking-wider text-gray-200 mb-2">Global Keyboard Shortcuts</h4>
                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                                <div class="p-2.5 rounded-xl border border-[#20202e] bg-[#12121b] text-center">
                                    <div class="text-[10px] text-gray-400">SEARCH / PALETTE</div>
                                    <div class="text-brand-400 font-bold mt-0.5">Ctrl + K</div>
                                </div>
                                <div class="p-2.5 rounded-xl border border-[#20202e] bg-[#12121b] text-center">
                                    <div class="text-[10px] text-gray-400">COLLAPSE SIDEBAR</div>
                                    <div class="text-brand-400 font-bold mt-0.5">Ctrl + B</div>
                                </div>
                                <div class="p-2.5 rounded-xl border border-[#20202e] bg-[#12121b] text-center">
                                    <div class="text-[10px] text-gray-400">EXECUTE PIPELINE</div>
                                    <div class="text-brand-400 font-bold mt-0.5">Ctrl + Enter</div>
                                </div>
                                <div class="p-2.5 rounded-xl border border-[#20202e] bg-[#12121b] text-center">
                                    <div class="text-[10px] text-gray-400">DAY / NIGHT</div>
                                    <div class="text-brand-400 font-bold mt-0.5">Alt + T</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tech-modal-footer border-t border-[#1c1c28] px-6 py-3 flex justify-between items-center bg-[#101018]">
                        <a href="documentation.html#manual" class="text-xs text-brand-400 font-semibold hover:underline">Read Complete User Manual →</a>
                        <button class="btn-close-modal px-4 py-2 text-xs bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-semibold transition-colors cursor-pointer" data-target="global-help-modal">Got it</button>
                    </div>
                </div>
            </div>
            `;
            document.body.insertAdjacentHTML('beforeend', helpModalHtml);
        }

        // 3. Bespoke Black Interactive Command Palette Modal (Ctrl+K)
        if (!document.getElementById('global-command-palette-modal')) {
            const commandPaletteHtml = `
            <div id="global-command-palette-modal" class="tech-modal-overlay">
                <div class="tech-modal-container rounded-[24px] bg-[#0c0c12] text-white shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(117,81,255,0.2)] border border-[#22222e] w-full max-w-2xl overflow-hidden flex flex-col transition-all">
                    
                    <!-- Search Header Input -->
                    <div class="p-4 sm:p-5 border-b border-[#1c1c28] flex items-center gap-3 bg-[#101018]">
                        <span class="text-brand-400 text-lg flex items-center justify-center flex-shrink-0 animate-pulse">
                            ${this.icons.search}
                        </span>
                        <input
                            id="command-palette-input"
                            type="text"
                            placeholder="Type a submodule, preset, topic, action, or /help... (Ctrl+K)"
                            class="w-full bg-transparent text-sm sm:text-base font-medium text-white placeholder:text-gray-500 outline-none"
                            autocomplete="off"
                            spellcheck="false"
                        />
                        <div class="flex items-center gap-2 flex-shrink-0">
                            <kbd class="text-[10px] font-mono px-2 py-0.5 bg-[#1a1a26] text-gray-400 rounded border border-[#2a2a3c]">ESC</kbd>
                            <button class="btn-close-modal text-gray-400 hover:text-white font-mono text-base px-1.5 py-0.5 rounded cursor-pointer" data-target="global-command-palette-modal">✕</button>
                        </div>
                    </div>

                    <!-- Category Filter Chips -->
                    <div class="px-4 py-2 border-b border-[#181824] bg-[#0e0e16] flex items-center gap-1.5 overflow-x-auto text-xs horizon-scrollbar">
                        <button class="cmd-filter-chip active px-2.5 py-1 rounded-lg font-semibold text-[11px] bg-brand-500 text-white transition-colors cursor-pointer" data-category="all">All Items</button>
                        <button class="cmd-filter-chip px-2.5 py-1 rounded-lg font-semibold text-[11px] text-gray-400 hover:text-white hover:bg-[#1a1a26] transition-colors cursor-pointer" data-category="submodules">⚡ Submodules</button>
                        <button class="cmd-filter-chip px-2.5 py-1 rounded-lg font-semibold text-[11px] text-gray-400 hover:text-white hover:bg-[#1a1a26] transition-colors cursor-pointer" data-category="zones">🏛️ 4 Zones</button>
                        <button class="cmd-filter-chip px-2.5 py-1 rounded-lg font-semibold text-[11px] text-gray-400 hover:text-white hover:bg-[#1a1a26] transition-colors cursor-pointer" data-category="presets">🎯 Presets</button>
                        <button class="cmd-filter-chip px-2.5 py-1 rounded-lg font-semibold text-[11px] text-gray-400 hover:text-white hover:bg-[#1a1a26] transition-colors cursor-pointer" data-category="docs">📖 Theory & Docs</button>
                        <button class="cmd-filter-chip px-2.5 py-1 rounded-lg font-semibold text-[11px] text-gray-400 hover:text-white hover:bg-[#1a1a26] transition-colors cursor-pointer" data-category="actions">🛠️ Actions</button>
                    </div>

                    <!-- Filterable Command Results List -->
                    <div id="command-palette-results" class="max-h-[380px] overflow-y-auto p-2 space-y-1 horizon-scrollbar">
                        <!-- Populated dynamically by TechLayout.filterCommandPalette -->
                    </div>

                    <!-- Command Palette Footer -->
                    <div class="px-4 py-2.5 border-t border-[#1c1c28] bg-[#101018] flex items-center justify-between text-[11px] text-gray-400 font-mono">
                        <div class="flex items-center gap-3">
                            <span><kbd class="px-1.5 py-0.5 rounded bg-[#1a1a26] text-gray-300 border border-[#2a2a3c]">↑</kbd> <kbd class="px-1.5 py-0.5 rounded bg-[#1a1a26] text-gray-300 border border-[#2a2a3c]">↓</kbd> Navigate</span>
                            <span><kbd class="px-1.5 py-0.5 rounded bg-[#1a1a26] text-gray-300 border border-[#2a2a3c]">↵</kbd> Select</span>
                            <span><kbd class="px-1.5 py-0.5 rounded bg-[#1a1a26] text-gray-300 border border-[#2a2a3c]">Esc</kbd> Close</span>
                        </div>
                        <span class="hidden sm:inline text-brand-400 font-sans font-semibold">BACSE202 Simulator</span>
                    </div>

                </div>
            </div>
            `;
            document.body.insertAdjacentHTML('beforeend', commandPaletteHtml);
        }
    }

    /**
     * Wire modal close, export, theme toggle, hotkeys, and Command Palette
     */
    static bindModalEvents() {
        // Modal Close buttons
        document.querySelectorAll('.btn-close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');
                if (targetId) {
                    const modal = document.getElementById(targetId);
                    if (modal) modal.classList.remove('open');
                }
            });
        });

        // Overlay click to close
        document.querySelectorAll('.tech-modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) overlay.classList.remove('open');
            });
        });

        // Open Export Modal button
        document.getElementById('global-btn-download')?.addEventListener('click', () => {
            document.getElementById('global-export-modal')?.classList.add('open');
        });

        // Open Help Modal button
        document.getElementById('global-btn-help')?.addEventListener('click', () => {
            document.getElementById('global-help-modal')?.classList.add('open');
        });

        // Day/Night Theme toggle button
        document.getElementById('global-theme-toggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Profile Avatar dropdown toggle
        const profileBtn = document.getElementById('global-profile-btn');
        const profileDropdown = document.getElementById('global-profile-dropdown');
        if (profileBtn && profileDropdown) {
            profileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                profileDropdown.classList.toggle('hidden');
            });

            document.addEventListener('click', (e) => {
                if (!profileDropdown.contains(e.target) && e.target !== profileBtn) {
                    profileDropdown.classList.add('hidden');
                }
            });
        }

        // Global hotkeys (Alt+T, Alt+H, Alt+E, Ctrl+K, Escape)
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.tech-modal-overlay.open').forEach(m => m.classList.remove('open'));
                if (profileDropdown) profileDropdown.classList.add('hidden');
                const qMenu = document.getElementById('quickjump-dropdown-menu');
                if (qMenu) qMenu.classList.add('hidden');
                this.setMobileSidebarOpen(false);
            } else if (e.altKey && (e.key === 't' || e.key === 'T')) {
                e.preventDefault();
                this.toggleTheme();
            } else if (e.altKey && (e.key === 'h' || e.key === 'H')) {
                e.preventDefault();
                document.getElementById('global-help-modal')?.classList.toggle('open');
            } else if (e.altKey && (e.key === 'e' || e.key === 'E')) {
                e.preventDefault();
                document.getElementById('global-export-modal')?.classList.toggle('open');
            } else if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
                e.preventDefault();
                this.openCommandPalette();
            }
        });

        // Wire Search trigger pill click in navbar
        document.getElementById('global-search-trigger')?.addEventListener('click', () => {
            this.openCommandPalette();
        });

        // Wire Export generation buttons
        this.bindExportActions();
    }

    /**
     * Submodule Quick Jump Dropdown & Top Navigation Logic
     */
    static bindQuickNav() {
        const jumpBtn = document.getElementById('btn-quickjump-dropdown');
        const jumpMenu = document.getElementById('quickjump-dropdown-menu');
        const chevron = document.getElementById('quickjump-chevron');

        if (jumpBtn && jumpMenu) {
            jumpBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isHidden = jumpMenu.classList.contains('hidden');
                if (isHidden) {
                    jumpMenu.classList.remove('hidden');
                    if (chevron) chevron.style.transform = 'rotate(180deg)';
                } else {
                    jumpMenu.classList.add('hidden');
                    if (chevron) chevron.style.transform = 'rotate(0deg)';
                }
            });

            document.addEventListener('click', (e) => {
                if (!jumpMenu.contains(e.target) && e.target !== jumpBtn) {
                    jumpMenu.classList.add('hidden');
                    if (chevron) chevron.style.transform = 'rotate(0deg)';
                }
            });
        }

        // Submodule click handling: smooth hash navigation and in-page execution
        document.querySelectorAll('.quickjump-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const targetPage = item.getAttribute('data-page');
                const targetHash = item.getAttribute('data-hash');
                const currentPath = window.location.pathname.split('/').pop() || 'index.html';

                if (jumpMenu) jumpMenu.classList.add('hidden');
                if (chevron) chevron.style.transform = 'rotate(0deg)';

                if (currentPath === targetPage) {
                    e.preventDefault();
                    window.location.hash = targetHash;
                    if (currentPath === 'simulation.html' && window.simWorkspace && typeof window.simWorkspace.switchCenterView === 'function') {
                        window.simWorkspace.switchCenterView(targetHash);
                    }
                    const el = document.getElementById(targetHash);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Sync Breadcrumb submodule pill on hashchange
        const syncBreadcrumbSub = () => {
            const hash = (window.location.hash || '').replace('#', '');
            const badgeEl = document.getElementById('breadcrumb-submodule');
            if (!badgeEl) return;

            if (hash) {
                const sub = this.submodules.find(s => s.hash === hash);
                badgeEl.textContent = sub ? `${sub.icon} ${sub.name}` : `#${hash}`;
                badgeEl.classList.remove('hidden');
            } else {
                badgeEl.classList.add('hidden');
            }
        };

        syncBreadcrumbSub();
        window.addEventListener('hashchange', syncBreadcrumbSub);
    }

    /**
     * Interactive Command Palette Modal Logic (Ctrl+K)
     */
    static bindCommandPalette() {
        const modal = document.getElementById('global-command-palette-modal');
        const input = document.getElementById('command-palette-input');
        const resultsContainer = document.getElementById('command-palette-results');
        const filterChips = document.querySelectorAll('.cmd-filter-chip');

        if (!modal || !input || !resultsContainer) return;

        let selectedIndex = 0;
        let activeCategory = 'all';
        let currentFilteredItems = [];

        // Open Command Palette
        this.openCommandPalette = () => {
            modal.classList.add('open');
            input.value = '';
            activeCategory = 'all';
            filterChips.forEach(c => {
                if (c.getAttribute('data-category') === 'all') {
                    c.classList.add('bg-brand-500', 'text-white');
                    c.classList.remove('text-gray-400');
                } else {
                    c.classList.remove('bg-brand-500', 'text-white');
                    c.classList.add('text-gray-400');
                }
            });
            this.renderCommandResults('', 'all');
            setTimeout(() => input.focus(), 50);
        };

        // Render Results based on query and category
        this.renderCommandResults = (query = '', category = 'all') => {
            const allItems = this.getCommandPaletteItems();
            const q = query.trim().toLowerCase();

            currentFilteredItems = allItems.filter(item => {
                const matchesCategory = category === 'all' || item.category === category;
                if (!matchesCategory) return false;
                if (!q) return true;

                const matchTitle = item.title.toLowerCase().includes(q);
                const matchDesc = item.desc.toLowerCase().includes(q);
                const matchKw = item.keywords ? item.keywords.toLowerCase().includes(q) : false;
                const matchBadge = item.badge ? item.badge.toLowerCase().includes(q) : false;

                return matchTitle || matchDesc || matchKw || matchBadge;
            });

            if (currentFilteredItems.length === 0) {
                resultsContainer.innerHTML = `
                <div class="p-8 text-center space-y-3">
                    <div class="text-3xl">🔍</div>
                    <p class="text-sm font-semibold text-gray-300">No matching submodules or commands found</p>
                    <p class="text-xs text-gray-500">Press Enter to search Technical Documentation for "${q}"</p>
                    <button id="btn-cmd-fallback-search" class="mt-2 px-3 py-1.5 rounded-lg bg-brand-500/20 text-brand-300 text-xs font-semibold hover:bg-brand-500/30 transition-colors">Search Docs →</button>
                </div>
                `;
                document.getElementById('btn-cmd-fallback-search')?.addEventListener('click', () => {
                    modal.classList.remove('open');
                    window.location.href = `documentation.html?q=${encodeURIComponent(q)}`;
                });
                selectedIndex = -1;
                return;
            }

            selectedIndex = 0;
            resultsContainer.innerHTML = currentFilteredItems.map((item, idx) => `
                <div class="cmd-item ${idx === 0 ? 'selected' : ''} flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-[#2a2a3c] bg-[#111118] hover:bg-[#161624] transition-all cursor-pointer group" data-index="${idx}">
                    <div class="flex items-center gap-3 min-w-0">
                        <span class="text-lg flex-shrink-0 group-hover:scale-110 transition-transform">${item.icon}</span>
                        <div class="min-w-0">
                            <div class="flex items-center gap-2">
                                <span class="cmd-title text-xs font-bold text-gray-200 group-hover:text-white truncate">${item.title}</span>
                                <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30 flex-shrink-0">${item.badge}</span>
                            </div>
                            <p class="text-[11px] text-gray-400 truncate mt-0.5">${item.desc}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 flex-shrink-0 ml-3">
                        ${item.shortcut ? `<kbd class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#1e1e2c] text-gray-400 border border-[#2c2c40]">${item.shortcut}</kbd>` : ''}
                        <span class="text-xs text-gray-500 group-hover:text-brand-400">↵</span>
                    </div>
                </div>
            `).join('');

            // Click handling for rendered items
            resultsContainer.querySelectorAll('.cmd-item').forEach(el => {
                el.addEventListener('click', () => {
                    const idx = parseInt(el.getAttribute('data-index'), 10);
                    if (currentFilteredItems[idx]) {
                        this.executeCommandItem(currentFilteredItems[idx]);
                    }
                });
                el.addEventListener('mouseenter', () => {
                    resultsContainer.querySelectorAll('.cmd-item').forEach(i => i.classList.remove('selected'));
                    el.classList.add('selected');
                    selectedIndex = parseInt(el.getAttribute('data-index'), 10);
                });
            });
        };

        // Live input filtering
        input.addEventListener('input', () => {
            this.renderCommandResults(input.value, activeCategory);
        });

        // Category Filter Chips click
        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                filterChips.forEach(c => {
                    c.classList.remove('bg-brand-500', 'text-white');
                    c.classList.add('text-gray-400');
                });
                chip.classList.add('bg-brand-500', 'text-white');
                chip.classList.remove('text-gray-400');

                activeCategory = chip.getAttribute('data-category');
                this.renderCommandResults(input.value, activeCategory);
            });
        });

        // Keyboard Arrow & Enter Navigation
        input.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (currentFilteredItems.length === 0) return;
                selectedIndex = (selectedIndex + 1) % currentFilteredItems.length;
                this.updateSelectedCommandItem();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (currentFilteredItems.length === 0) return;
                selectedIndex = (selectedIndex - 1 + currentFilteredItems.length) % currentFilteredItems.length;
                this.updateSelectedCommandItem();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (selectedIndex >= 0 && currentFilteredItems[selectedIndex]) {
                    this.executeCommandItem(currentFilteredItems[selectedIndex]);
                } else if (input.value.trim()) {
                    modal.classList.remove('open');
                    window.location.href = `documentation.html?q=${encodeURIComponent(input.value.trim())}`;
                }
            }
        });

        this.updateSelectedCommandItem = () => {
            const items = resultsContainer.querySelectorAll('.cmd-item');
            items.forEach((item, idx) => {
                if (idx === selectedIndex) {
                    item.classList.add('selected');
                    item.scrollIntoView({ block: 'nearest' });
                } else {
                    item.classList.remove('selected');
                }
            });
        };
    }

    /**
     * Execute a Command Palette Item Action / Route
     */
    static executeCommandItem(item) {
        const modal = document.getElementById('global-command-palette-modal');
        if (modal) modal.classList.remove('open');

        // Platform Action execution
        if (item.action) {
            switch (item.action) {
                case 'toggleTheme':
                    this.toggleTheme();
                    break;
                case 'openExportModal':
                    document.getElementById('global-export-modal')?.classList.add('open');
                    break;
                case 'openHelpModal':
                    document.getElementById('global-help-modal')?.classList.add('open');
                    break;
                case 'toggleSidebar':
                    this.toggleSidebar();
                    break;
                case 'runPipeline':
                    const runBtn = document.getElementById('btn-run-division');
                    if (runBtn) {
                        runBtn.click();
                        if (window.toast) toast.info('Triggered Relational Division Pipeline');
                    } else {
                        window.location.href = 'simulation.html';
                    }
                    break;
                case 'runTests':
                    const testBtn = document.getElementById('btn-retest');
                    if (testBtn) {
                        testBtn.click();
                        if (window.toast) toast.info('Re-running 8-Case Automated Test Suite');
                    } else {
                        window.location.href = 'simulation.html#tests';
                    }
                    break;
            }
            return;
        }

        // Preset activation
        if (item.presetKey) {
            const isSimPage = window.location.pathname.endsWith('simulation.html') || window.location.pathname.includes('simulation');
            if (isSimPage && window.simWorkspace && typeof window.simWorkspace.loadPreset === 'function') {
                window.simWorkspace.loadPreset(item.presetKey);
                const selector = document.getElementById('preset-selector');
                if (selector) selector.value = item.presetKey;
                if (window.toast) toast.success(`Loaded Preset: ${item.title}`);
            } else {
                window.location.href = item.url;
            }
            return;
        }

        // Hash submodule jump
        if (item.hash) {
            const targetPage = item.url.split('#')[0];
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';

            if (currentPath === targetPage) {
                window.location.hash = item.hash;
                if (currentPath === 'simulation.html' && window.simWorkspace && typeof window.simWorkspace.switchCenterView === 'function') {
                    window.simWorkspace.switchCenterView(item.hash);
                }
                const el = document.getElementById(item.hash);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.location.href = item.url;
            }
            return;
        }

        // Direct URL navigation
        if (item.url) {
            window.location.href = item.url;
        }
    }

    /**
     * Bind export generation functions
     */
    static bindExportActions() {
        const getSimData = () => {
            if (window.simWorkspace && window.simWorkspace.executionTrace) {
                return {
                    trace: window.simWorkspace.executionTrace,
                    R: window.simWorkspace.relationR,
                    S: window.simWorkspace.relationS,
                    sqlObj: window.simWorkspace.sqlObj
                };
            }
            if (typeof PRESETS !== 'undefined' && (typeof RelationalDivisionEngine !== 'undefined' || typeof RelationalEngine !== 'undefined')) {
                const Engine = typeof RelationalDivisionEngine !== 'undefined' ? RelationalDivisionEngine : RelationalEngine;
                const p = PRESETS['university'];
                const R = new Relation(p.R.name, p.R.attributes, p.R.tuples);
                const S = new Relation(p.S.name, p.S.attributes, p.S.tuples);
                const trace = Engine.divide ? Engine.divide(R, S) : Engine.divideWithTrace(R, S, { isExact: false, threshold: 75 });
                const sqlObj = typeof SQLGenerator !== 'undefined' ? SQLGenerator.generateAll(R, S, trace.candidateAttrs, trace.divisorAttrs) : {};
                return { trace, R, S, sqlObj };
            }
            return null;
        };

        document.getElementById('btn-export-pdf')?.addEventListener('click', () => {
            const data = getSimData();
            if (typeof ReportGenerator !== 'undefined' && data) {
                ReportGenerator.printPDF(data.trace, data.R, data.S, data.sqlObj);
            } else {
                window.print();
            }
        });

        document.getElementById('btn-export-word')?.addEventListener('click', () => {
            const data = getSimData();
            if (typeof ReportGenerator !== 'undefined' && data) {
                ReportGenerator.downloadWordDoc(data.trace, data.R, data.S, data.sqlObj);
                if (window.toast) toast.success('Word document (.doc) downloaded.');
            } else {
                alert('Simulation data not ready. Please launch the simulation workspace first.');
            }
        });

        document.getElementById('btn-export-text')?.addEventListener('click', () => {
            const data = getSimData();
            if (typeof ReportGenerator !== 'undefined' && data) {
                ReportGenerator.downloadText(data.trace, data.R, data.S, data.sqlObj);
                if (window.toast) toast.success('Text report (.txt) downloaded.');
            } else {
                alert('Simulation data not ready. Please launch the simulation workspace first.');
            }
        });

        document.getElementById('btn-export-csv-r-all')?.addEventListener('click', () => {
            const data = getSimData();
            if (data && data.R && typeof ReportGenerator !== 'undefined') {
                ReportGenerator.downloadCSV(data.R, 'relation_R_dividend.csv');
                if (window.toast) toast.success('Relation R CSV downloaded.');
            }
        });

        document.getElementById('btn-export-csv-s-all')?.addEventListener('click', () => {
            const data = getSimData();
            if (data && data.S && typeof ReportGenerator !== 'undefined') {
                ReportGenerator.downloadCSV(data.S, 'relation_S_divisor.csv');
                if (window.toast) toast.success('Relation S CSV downloaded.');
            }
        });

        document.getElementById('btn-export-csv-t5-all')?.addEventListener('click', () => {
            const data = getSimData();
            if (data && data.trace && data.trace.T5 && typeof ReportGenerator !== 'undefined') {
                ReportGenerator.downloadCSV(data.trace.T5, 'result_T5_division.csv');
                if (window.toast) toast.success('Result Relation T5 CSV downloaded.');
            }
        });
    }

    /**
     * Set sidebar collapsed state
     */
    static setSidebarCollapsed(collapsed) {
        const sidebar = document.getElementById('app-sidebar');
        if (!sidebar) return;
        const toggleIcon = document.getElementById('sidebar-toggle-icon');
        const toggleLabel = document.getElementById('sidebar-toggle-label');
        if (collapsed) {
            sidebar.classList.add('collapsed');
            if (toggleIcon) toggleIcon.textContent = '▶';
            if (toggleLabel) toggleLabel.textContent = 'Expand';
        } else {
            sidebar.classList.remove('collapsed');
            if (toggleIcon) toggleIcon.textContent = '◀';
            if (toggleLabel) toggleLabel.textContent = 'Collapse Sidebar';
        }
        localStorage.setItem('tech_sidebar_collapsed', collapsed ? 'true' : 'false');
    }

    /**
     * Toggle sidebar collapsed state
     */
    static toggleSidebar() {
        const isCollapsed = localStorage.getItem('tech_sidebar_collapsed') === 'true';
        this.setSidebarCollapsed(!isCollapsed);
    }

    /**
     * Set mobile drawer open state
     */
    static setMobileSidebarOpen(open) {
        const sidebar = document.getElementById('app-sidebar');
        const backdrop = document.getElementById('sidebar-backdrop');
        if (!sidebar) return;

        if (open) {
            sidebar.classList.add('mobile-open');
            if (backdrop) backdrop.classList.remove('hidden');
        } else {
            sidebar.classList.remove('mobile-open');
            if (backdrop) backdrop.classList.add('hidden');
        }
    }

    /**
     * Bind sidebar collapse interactions, mobile drawer, and active route syncing
     */
    static bindSidebarEvents() {
        const isCollapsed = localStorage.getItem('tech_sidebar_collapsed') === 'true';
        if (isCollapsed) {
            this.setSidebarCollapsed(true);
        }

        // Collapse toggle button
        document.getElementById('sidebar-toggle-btn')?.addEventListener('click', () => {
            this.toggleSidebar();
        });

        // Mobile drawer toggle & close
        document.getElementById('mobile-sidebar-toggle')?.addEventListener('click', () => {
            this.setMobileSidebarOpen(true);
        });

        document.getElementById('mobile-sidebar-toggle-alt')?.addEventListener('click', () => {
            this.setMobileSidebarOpen(true);
        });

        document.getElementById('sidebar-close-btn')?.addEventListener('click', () => {
            this.setMobileSidebarOpen(false);
        });

        document.getElementById('sidebar-backdrop')?.addEventListener('click', () => {
            this.setMobileSidebarOpen(false);
        });

        // Ctrl+B / Cmd+B shortcut for sidebar collapse
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'b' || e.key === 'B')) {
                e.preventDefault();
                this.toggleSidebar();
            }
        });

        // Sync active submodule styling in sidebar on hashchange
        const syncSubnav = () => {
            const currentHash = (window.location.hash || '').replace('#', '');
            if (!currentHash) return;
            document.querySelectorAll('#app-sidebar .sidenav-subitem[data-hash]').forEach(item => {
                if (item.getAttribute('data-hash') === currentHash) {
                    item.classList.add('text-brand-400', 'font-bold', 'bg-[#181826]');
                    item.classList.remove('text-gray-500', 'dark:text-gray-400');
                    const dot = item.querySelector('.rounded-full');
                    if (dot) dot.classList.add('bg-brand-400', 'scale-125');
                } else {
                    item.classList.remove('text-brand-400', 'font-bold', 'bg-[#181826]');
                    item.classList.add('text-gray-500', 'dark:text-gray-400');
                    const dot = item.querySelector('.rounded-full');
                    if (dot) dot.classList.remove('scale-125');
                }
            });
        };

        syncSubnav();
        window.addEventListener('hashchange', syncSubnav);
    }

    /**
     * Mount layout and initialize all bindings
     */
    static mount(activePage = 'dashboard') {
        // Ensure Theme Tokens & Bespoke Black CSS are present
        this.ensureStyles();

        // Apply saved theme immediately
        const savedTheme = this.getTheme();
        this.setTheme(savedTheme);

        const { topNavHtml, sideNavHtml } = this.render(activePage);

        // Mount Top Navigation
        const headerContainer = document.getElementById('layout-header');
        if (headerContainer) {
            headerContainer.innerHTML = topNavHtml;
        }

        // Mount Sidebar Navigation
        const sidebarContainer = document.getElementById('layout-sidebar');
        if (sidebarContainer) {
            sidebarContainer.innerHTML = sideNavHtml;
            if (activePage !== 'landing') {
                sidebarContainer.className = 'h-full flex-shrink-0 flex';
            }
        }

        // Ensure Export, Help, and Command Palette Modals exist in DOM
        this.ensureModals();

        // Bind Modal & Global Interaction Events
        this.bindModalEvents();

        // Bind Quick-Nav Dropdown and Breadcrumbs
        this.bindQuickNav();

        // Bind Command Palette Filter & Hotkeys (Ctrl+K)
        this.bindCommandPalette();

        // Bind Collapsible Sidebar Controls, Mobile Drawer & Active Subnav
        this.bindSidebarEvents();
    }
}

if (typeof window !== 'undefined') {
    window.TechLayout = TechLayout;
}
