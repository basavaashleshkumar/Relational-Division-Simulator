const fs = require('fs');
const path = require('path');

const simPath = path.resolve(__dirname, '..', 'simulation.html');
let html = fs.readFileSync(simPath, 'utf8');

// Normalize CRLF
html = html.replace(/\r\n/g, '\n');

// Find and replace the top strip and workspace driver
const oldQuickSectionRegex = /<!-- ========================================================= -->\s*<!-- QUICK ACTION STRIP: 1-Click Presets, Run, & Export[\s\S]*?<!-- Relation R \(Dividend\) Card -->/;

const newQuickSection = `<!-- ========================================================= -->
            <!-- TOP UNIFIED TOOLBAR: 7 Presets, Run, Import & Export      -->
            <!-- ========================================================= -->
            <div class="px-4 sm:px-6 pt-3 pb-1 flex-shrink-0">
                <div class="rounded-2xl bg-white dark:bg-[#0c0c12] border border-gray-200 dark:border-[#1e1e28] p-2.5 sm:p-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
                    
                    <!-- Left: 7 Real-World Domain Presets -->
                    <div class="flex items-center gap-1.5 overflow-x-auto horizon-scrollbar py-0.5">
                        <span class="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mr-1 flex items-center gap-1.5 font-mono flex-shrink-0">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#7551FF]"></span>
                            Preset:
                        </span>
                        <button class="quick-preset-btn active" data-preset="university" title="01: University CS Core Courses">
                            <span>🎓 University</span>
                        </button>
                        <button class="quick-preset-btn" data-preset="devops" title="02: Cloud DevOps & SRE Stack">
                            <span>☁️ DevOps</span>
                        </button>
                        <button class="quick-preset-btn" data-preset="healthcare" title="03: Pediatric Cardiac Licenses">
                            <span>🩺 Healthcare</span>
                        </button>
                        <button class="quick-preset-btn" data-preset="supplychain" title="04: EV Battery Supply Chain">
                            <span>🚗 EV Supply</span>
                        </button>
                        <button class="quick-preset-btn" data-preset="cybersecurity" title="05: NIST Zero-Trust Security">
                            <span>🛡️ NIST Sec</span>
                        </button>
                        <button class="quick-preset-btn" data-preset="projectapollo" title="06: Project Apollo Space Crew">
                            <span>🚀 Apollo</span>
                        </button>
                        <button class="quick-preset-btn" data-preset="irctc" title="07: IRCTC Railway Reservation (Rajdhani Route)">
                            <span>🚆 IRCTC Rail</span>
                        </button>
                    </div>

                    <!-- Right: Execution & Data Actions -->
                    <div class="flex items-center gap-2 flex-shrink-0">
                        <!-- Run Pipeline Button -->
                        <button id="quick-btn-run" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7551FF] hover:bg-[#6540ee] active:scale-95 text-white font-bold text-xs shadow-md shadow-[#7551FF]/20 transition-all cursor-pointer" title="Execute Pipeline (Ctrl+Enter)">
                            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            <span>Run Pipeline</span>
                            <kbd class="px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-mono tracking-tighter">Ctrl+Enter</kbd>
                        </button>

                        <!-- Import Data Trigger -->
                        <button id="btn-open-importer" type="button" class="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-[#121218] hover:bg-gray-50 dark:hover:bg-[#1a1a24] text-navy-700 dark:text-gray-200 border border-gray-200 dark:border-[#222230] font-medium text-xs transition-colors cursor-pointer" title="Import CSV, Excel, JSON, or SQL">
                            <span>📥</span>
                            <span class="hidden sm:inline">Import</span>
                        </button>

                        <!-- Export Report Trigger -->
                        <button id="quick-btn-export" class="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-[#121218] hover:bg-gray-50 dark:hover:bg-[#1a1a24] text-navy-700 dark:text-gray-200 border border-gray-200 dark:border-[#222230] font-medium text-xs transition-colors cursor-pointer" title="Export Academic Report / CSV">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                            <span class="hidden sm:inline">Export</span>
                        </button>

                        <!-- Status Pill -->
                        <div class="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#62b06d]/10 text-[#62b06d] border border-[#62b06d]/30 text-[11px] font-mono font-medium">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#62b06d]"></span>
                            <span id="quick-status-label">READY</span>
                        </div>
                    </div>

                </div>
            </div>

            <!-- ========================================================= -->
            <!-- MAIN WORKSPACE SPLIT: CONTROL PANEL & VISUALIZER          -->
            <!-- ========================================================= -->
            <div class="flex-1 flex flex-col xl:flex-row overflow-hidden px-4 sm:px-6 pb-4 sm:pb-6 pt-2 gap-5">

                <!-- ========================================================= -->
                <!-- PANE 1: CONTROL PANEL & DATA INPUTS (LEFT COLUMN)         -->
                <!-- ========================================================= -->
                <aside class="w-full xl:w-[540px] 2xl:w-[580px] flex-shrink-0 flex flex-col gap-3.5 overflow-y-auto horizon-scrollbar">

                    <!-- Division Parameters Card -->
                    <div class="rounded-2xl bg-white dark:bg-[#0c0c12] p-4 space-y-3 border border-gray-200 dark:border-[#1e1e28]">
                        <!-- Backwards compatibility hooks for scripts -->
                        <select id="preset-selector" class="sr-only" aria-hidden="true">
                            <option value="university">🎓 01: University CS Core Courses</option>
                            <option value="devops">☁️ 02: Cloud DevOps & SRE Stack</option>
                            <option value="healthcare">🩺 03: Pediatric Cardiac Licenses</option>
                            <option value="supplychain">🚗 04: EV Battery Supply Chain</option>
                            <option value="cybersecurity">🛡️ 05: NIST Zero-Trust Security</option>
                            <option value="projectapollo">🚀 06: Project Apollo Space Crew</option>
                            <option value="irctc">🚆 07: IRCTC Railway Reservation (Rajdhani Route)</option>
                        </select>
                        <button id="btn-run-sim" class="sr-only" aria-hidden="true"></button>
                        <button id="btn-open-exams-sidebar" class="sr-only" aria-hidden="true"></button>
                        <button id="btn-open-practice-sidebar" class="sr-only" aria-hidden="true"></button>

                        <div class="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-[#1e1e28]">
                            <span class="text-xs font-bold uppercase tracking-wider text-navy-700 dark:text-gray-200 font-mono">Division Parameters</span>
                            <span class="text-[11px] font-mono text-gray-400">Pure ES6 AST Engine</span>
                        </div>

                        <!-- Exact Division Mode Toggle Switch -->
                        <div class="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-[#1e1e28]">
                            <div class="pr-2">
                                <div class="text-xs font-bold text-navy-700 dark:text-white flex items-center gap-1.5">
                                    <span>Exact Division ($R \\div_{\\text{exact}} S$)</span>
                                </div>
                                <div class="text-[11px] text-gray-500 dark:text-gray-400">Strict bijection: Zero superfluous tuples in $R$</div>
                            </div>
                            <input type="checkbox" id="toggle-exact-mode" class="horizon-switch" aria-label="Toggle Exact Division Mode">
                        </div>

                        <!-- Fuzzy Match Threshold Range Slider -->
                        <div class="p-2.5 rounded-xl bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-[#1e1e28] space-y-1.5">
                            <div class="flex items-center justify-between text-xs">
                                <span class="font-bold text-navy-700 dark:text-white">Fuzzy Match Threshold</span>
                                <span id="label-threshold" class="px-2 py-0.5 rounded-lg bg-brand-50 text-brand-500 dark:bg-[#7551FF]/20 dark:text-[#A195FD] font-bold text-xs font-mono border dark:border-[#7551FF]/30">75%</span>
                            </div>
                            <input type="range" id="slider-threshold" min="0" max="100" value="75" step="5" class="horizon-range w-full cursor-pointer" aria-label="Fuzzy Match Threshold Slider">
                        </div>
                    </div>

                    <!-- Relation R (Dividend) Card -->`;

if (oldQuickSectionRegex.test(html)) {
    html = html.replace(oldQuickSectionRegex, newQuickSection);
    fs.writeFileSync(simPath, html, 'utf8');
    console.log('[SUCCESS] simulation.html streamlined successfully.');
} else {
    console.error('[ERROR] Regex match failed in simulation.html.');
    process.exit(1);
}
