const fs = require('fs');
const path = require('path');

const layoutPath = path.resolve(__dirname, '..', 'components', 'Layout.js');
let code = fs.readFileSync(layoutPath, 'utf8');

// 1. Clean Topbar buttons: remove Sec A, Sec B, Sec C, GATE, AI badges & add clean Export button
const oldTopbarSection = `                    <!-- Competitive Exams Portal (GATE / UGC-NET / ISRO) -->
                    <button id="global-btn-exams" class="btn-topbar-tab h-8 inline-flex items-center gap-1.5 px-2.5 rounded bg-white dark:bg-[#0d0d12] hover:bg-[#EFF4FB] dark:hover:bg-[#171722] text-navy-700 dark:text-gray-100 hover:text-amber-500 dark:hover:text-amber-400 border border-gray-200 dark:border-[#1e1e28] text-xs font-medium transition-colors cursor-pointer shrink-0" title="Competitive Exams: GATE CSE, UGC-NET, & ISRO Practice (Alt+G)">
                        <span>🏆</span>
                        <span class="font-medium hidden sm:inline">Exams</span>
                        <span class="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400">GATE</span>
                    </button>

                    <!-- AI for Practice Sandbox -->
                    <button id="global-btn-practice" class="btn-topbar-tab h-8 inline-flex items-center gap-1.5 px-2.5 rounded bg-white dark:bg-[#0d0d12] hover:bg-[#EFF4FB] dark:hover:bg-[#171722] text-navy-700 dark:text-gray-100 hover:text-cyan-500 dark:hover:text-cyan-400 border border-gray-200 dark:border-[#1e1e28] text-xs font-medium transition-colors cursor-pointer shrink-0" title="AI for Practice: Problem Generator & SQL Pitfall Analyzer (Alt+P)">
                        <span>🤖</span>
                        <span class="font-medium hidden sm:inline">AI Practice</span>
                        <span class="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-cyan-500/15 text-cyan-600 dark:text-cyan-400">AI</span>
                    </button>

                    <!-- Mandatory Section A: Learn Tab -->
                    <button id="global-btn-learn" class="btn-topbar-tab h-8 inline-flex items-center gap-1.5 px-2.5 rounded bg-white dark:bg-[#0d0d12] hover:bg-[#EFF4FB] dark:hover:bg-[#171722] text-navy-700 dark:text-gray-100 hover:text-[#7551FF] dark:hover:text-[#7551FF] border border-gray-200 dark:border-[#1e1e28] text-xs font-medium transition-colors cursor-pointer shrink-0" title="Learn: Concept Explanation, Animated Video, & References (Alt+L)">
                        <span>📖</span>
                        <span class="font-medium">Learn</span>
                        <span class="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-[#7551FF]/10 text-[#7551FF]">Sec A</span>
                    </button>

                    <!-- Mandatory Section B: Developed By Tab -->
                    <button id="global-btn-about" class="btn-topbar-tab h-8 inline-flex items-center gap-1.5 px-2.5 rounded bg-white dark:bg-[#0d0d12] hover:bg-[#EFF4FB] dark:hover:bg-[#171722] text-navy-700 dark:text-gray-100 hover:text-[#8bc5f3] dark:hover:text-[#8bc5f3] border border-gray-200 dark:border-[#1e1e28] text-xs font-medium transition-colors cursor-pointer shrink-0" title="Developed By: Student Developers & Faculty Guide (Alt+A)">
                        <span>👨‍💻</span>
                        <span class="font-medium">Developed By</span>
                        <span class="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-[#8bc5f3]/15 text-[#3b82f6] dark:text-[#8bc5f3]">Sec B</span>
                    </button>

                    <!-- Mandatory Section C: Help Tab -->
                    <button id="global-btn-help" class="btn-topbar-tab h-8 inline-flex items-center gap-1.5 px-2.5 rounded bg-white dark:bg-[#0d0d12] hover:bg-[#EFF4FB] dark:hover:bg-[#171722] text-navy-700 dark:text-gray-100 hover:text-[#62b06d] dark:hover:text-[#62b06d] border border-gray-200 dark:border-[#1e1e28] text-xs font-medium transition-colors cursor-pointer shrink-0" title="Help & Operational User Manual (Alt+H)">
                        <span>❓</span>
                        <span class="font-medium">Help</span>
                        <span class="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-[#62b06d]/15 text-[#62b06d]">Sec C</span>
                    </button>`;

const newTopbarSection = `                    <!-- Competitive Exams Portal (50 Real Questions) -->
                    <button id="global-btn-exams" class="btn-topbar-tab h-8 inline-flex items-center gap-1.5 px-2.5 rounded bg-white dark:bg-[#0d0d12] hover:bg-[#EFF4FB] dark:hover:bg-[#171722] text-navy-700 dark:text-gray-100 hover:text-amber-500 dark:hover:text-amber-400 border border-gray-200 dark:border-[#1e1e28] text-xs font-medium transition-colors cursor-pointer shrink-0" title="Competitive Exams: 50 Questions from GATE CSE, UGC-NET, & ISRO (Alt+G)">
                        <span>🏆</span>
                        <span class="font-medium hidden sm:inline">50 Exams</span>
                    </button>

                    <!-- AI for Practice Sandbox -->
                    <button id="global-btn-practice" class="btn-topbar-tab h-8 inline-flex items-center gap-1.5 px-2.5 rounded bg-white dark:bg-[#0d0d12] hover:bg-[#EFF4FB] dark:hover:bg-[#171722] text-navy-700 dark:text-gray-100 hover:text-cyan-500 dark:hover:text-cyan-400 border border-gray-200 dark:border-[#1e1e28] text-xs font-medium transition-colors cursor-pointer shrink-0" title="AI for Practice: Problem Generator & SQL Pitfall Analyzer (Alt+P)">
                        <span>🤖</span>
                        <span class="font-medium hidden sm:inline">AI Practice</span>
                    </button>

                    <!-- Learn Tab -->
                    <button id="global-btn-learn" class="btn-topbar-tab h-8 inline-flex items-center gap-1.5 px-2.5 rounded bg-white dark:bg-[#0d0d12] hover:bg-[#EFF4FB] dark:hover:bg-[#171722] text-navy-700 dark:text-gray-100 hover:text-[#7551FF] dark:hover:text-[#7551FF] border border-gray-200 dark:border-[#1e1e28] text-xs font-medium transition-colors cursor-pointer shrink-0" title="Learn: Concept Explanation, Animated Video, & References (Alt+L)">
                        <span>📖</span>
                        <span class="font-medium">Learn</span>
                    </button>

                    <!-- Developed By Tab -->
                    <button id="global-btn-about" class="btn-topbar-tab h-8 inline-flex items-center gap-1.5 px-2.5 rounded bg-white dark:bg-[#0d0d12] hover:bg-[#EFF4FB] dark:hover:bg-[#171722] text-navy-700 dark:text-gray-100 hover:text-[#8bc5f3] dark:hover:text-[#8bc5f3] border border-gray-200 dark:border-[#1e1e28] text-xs font-medium transition-colors cursor-pointer shrink-0" title="Developed By: Student Developers & Faculty Guide (Alt+A)">
                        <span>👨‍💻</span>
                        <span class="font-medium hidden md:inline">Developed By</span>
                        <span class="font-medium md:hidden">About</span>
                    </button>

                    <!-- Help Tab -->
                    <button id="global-btn-help" class="btn-topbar-tab h-8 inline-flex items-center gap-1.5 px-2.5 rounded bg-white dark:bg-[#0d0d12] hover:bg-[#EFF4FB] dark:hover:bg-[#171722] text-navy-700 dark:text-gray-100 hover:text-[#62b06d] dark:hover:text-[#62b06d] border border-gray-200 dark:border-[#1e1e28] text-xs font-medium transition-colors cursor-pointer shrink-0" title="Help & Operational User Manual (Alt+H)">
                        <span>❓</span>
                        <span class="font-medium">Help</span>
                    </button>

                    <!-- Clean Topbar Export Trigger (Alt+E) -->
                    <button id="global-btn-download" class="btn-topbar-tab h-8 inline-flex items-center gap-1.5 px-2.5 rounded bg-[#EFF4FB] dark:bg-[#161624] hover:bg-[#7551FF]/10 text-navy-700 dark:text-gray-100 hover:text-[#7551FF] dark:hover:text-[#C0B8FE] border border-gray-200 dark:border-[#222234] text-xs font-semibold transition-colors cursor-pointer shrink-0" title="Download Publication-Grade Reports & Data (PDF, Word, CSV, LaTeX) — Alt+E">
                        <span>📥</span>
                        <span class="font-medium">Export</span>
                    </button>`;

// Normalize CRLF for string replacement
code = code.replace(/\r\n/g, '\n');
if (code.includes(oldTopbarSection)) {
    code = code.replace(oldTopbarSection, newTopbarSection);
    console.log('[SUCCESS] Replaced topbar section.');
} else {
    console.warn('[WARN] Old topbar section not found exactly.');
}

// 2. Clean Sidebar bottom card
const oldSidebarBottom = `            <!-- Bottom Section: Horizon Gradient Card & Tactile Collapse Toggle -->
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
                        <span class="text-[10px] font-extrabold tracking-wider uppercase text-brand-300">RELATIONAL DIVISION</span>
                        <p class="mt-1 text-[11px] leading-tight text-gray-300 font-medium">
                            Interactive Verification Engine
                        </p>
                        <div class="mt-2.5 flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[9px] font-semibold text-white backdrop-blur-sm border border-white/10">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>Pure ES6 Relational Engine</span>
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
            </div>`;

const newSidebarBottom = `            <!-- Bottom Section: Sleek Minimal Status & Tactile Collapse Toggle -->
            <div class="flex flex-col mt-auto">
                <div class="p-3 border-t border-gray-200 dark:border-[#1a1a22] flex items-center justify-between bg-white dark:bg-[#08080b]">
                    <div class="sidebar-label flex items-center gap-2 text-[11px] font-mono text-gray-400">
                        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>ES6 Engine v2.4.0</span>
                    </div>
                    <button id="sidebar-toggle-btn" class="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-navy-700 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer group" title="Toggle Sidebar Collapse (Ctrl+B)">
                        <span id="sidebar-toggle-icon" class="w-5 h-5 rounded-md bg-gray-100 dark:bg-[#161622] group-hover:bg-brand-500/20 text-gray-500 dark:text-gray-400 group-hover:text-brand-400 flex items-center justify-center text-[10px] transition-all">◀</span>
                        <span id="sidebar-toggle-label" class="sidebar-label hidden sm:inline text-[11px]">Collapse</span>
                    </button>
                </div>
            </div>`;

if (code.includes(oldSidebarBottom)) {
    code = code.replace(oldSidebarBottom, newSidebarBottom);
    console.log('[SUCCESS] Replaced sidebar bottom section.');
} else {
    console.warn('[WARN] Old sidebar bottom section not found exactly.');
}

// 3. Update ensureFloatingDownload to remove the intrusive floating button
const oldEnsureFloating = `    static ensureFloatingDownload() {
        if (!document.getElementById('floating-download-tab')) {
            const icons = this.icons;
            const floatingHtml = \`
            <!-- Persistent Floating Download Tab (Section D) -->
            <aside id="floating-download-tab" class="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center print:hidden pointer-events-auto" aria-label="Quick Export Actions">
                <button id="global-btn-download" class="btn-floating-download group relative flex items-center gap-2.5 py-3.5 px-3.5 pl-4 rounded-l-2xl bg-gradient-to-r from-[#4318FF] via-[#5b2df6] to-[#7551FF] hover:from-[#3311DB] hover:to-[#422AFB] text-white shadow-[-4px_4px_25px_rgba(117,81,255,0.45)] hover:shadow-[-6px_8px_35px_rgba(117,81,255,0.7)] border-l-2 border-t border-b border-[#868CFF]/60 hover:-translate-x-1.5 transition-all duration-200 cursor-pointer active:scale-95" title="Download Publication-Grade Academic Reports & Data (PDF, Word, Text, CSV) — Alt+E" aria-label="Download Publication-Grade Reports">
                    <div class="relative flex items-center justify-center">
                        <span class="w-2 h-2 rounded-full bg-emerald-400 absolute -top-1 -right-1 animate-ping"></span>
                        <span class="w-2 h-2 rounded-full bg-emerald-400 absolute -top-1 -right-1"></span>
                        <span class="transform group-hover:scale-110 transition-transform">\${icons.download}</span>
                    </div>
                    <div class="flex flex-col text-left">
                        <div class="flex items-center gap-1.5">
                            <span class="text-xs font-bold font-dm tracking-tight text-white leading-none">Download</span>
                            <span class="text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-white/20 text-white leading-none border border-white/20">Sec D</span>
                        </div>
                        <span class="text-[10px] text-white/80 font-mono tracking-tight leading-tight mt-1 hidden sm:block">PDF • Word • CSV</span>
                    </div>
                    <span class="text-white/60 group-hover:text-white transition-transform group-hover:-translate-x-0.5 text-xs font-bold ml-0.5">◀</span>
                </button>
            </aside>
            \`;
            document.body.insertAdjacentHTML('beforeend', floatingHtml);
        }
    }`;

const newEnsureFloating = `    static ensureFloatingDownload() {
        // Intrusive floating tab removed per quality feedback to keep views clean & uncluttered.
        // Export is accessible via the topbar #global-btn-download and Alt+E shortcut.
        const existing = document.getElementById('floating-download-tab');
        if (existing) existing.remove();
    }`;

if (code.includes(oldEnsureFloating)) {
    code = code.replace(oldEnsureFloating, newEnsureFloating);
    console.log('[SUCCESS] Replaced ensureFloatingDownload.');
} else {
    console.warn('[WARN] Old ensureFloatingDownload not found exactly.');
}

fs.writeFileSync(layoutPath, code, 'utf8');
console.log('[DONE] Layout.js updated.');
