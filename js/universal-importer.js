/**
 * Relational Division Simulator — Universal Multi-Format Data Importer
 * Enables students and evaluators to import data via:
 * 1. CSV / TSV file upload & paste
 * 2. JSON structured relation upload & paste
 * 3. Excel / Google Sheets copy-paste tabular data
 * 4. SQL DDL & DML Scripts (CREATE TABLE & INSERT INTO parser)
 */

class UniversalImporter {
    /**
     * Parse CSV / TSV text into attribute list and tuples
     */
    static parseDelimited(text) {
        const clean = (text || '').trim();
        if (!clean) return null;

        const lines = clean.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
        if (lines.length < 2) throw new Error('Data must contain at least a header row and one data row.');

        // Detect delimiter: comma, tab, semicolon, pipe
        const firstLine = lines[0];
        let delim = ',';
        if (firstLine.includes('\t')) delim = '\t';
        else if (firstLine.includes(';') && !firstLine.includes(',')) delim = ';';
        else if (firstLine.includes('|')) delim = '|';

        const attrs = lines[0].split(delim).map(a => a.trim().replace(/^["']|["']$/g, ''));
        const tuples = [];

        for (let i = 1; i < lines.length; i++) {
            const parts = lines[i].split(delim).map(p => p.trim().replace(/^["']|["']$/g, ''));
            if (parts.length === attrs.length) {
                const tuple = {};
                attrs.forEach((attr, idx) => {
                    tuple[attr] = parts[idx];
                });
                tuples.push(tuple);
            }
        }

        return { attrs, tuples };
    }

    /**
     * Parse SQL DDL (CREATE TABLE) and DML (INSERT INTO) scripts
     */
    static parseSQL(sqlText) {
        const clean = (sqlText || '').trim();
        if (!clean) return null;

        const tables = {};

        // 1. Find CREATE TABLE statements with balanced parenthesis handling
        const createRegex = /CREATE\s+TABLE\s+([a-zA-Z0-9_]+)\s*\(/gi;
        let match;
        while ((match = createRegex.exec(clean)) !== null) {
            const tableName = match[1];
            const startIdx = match.index + match[0].length;
            let depth = 1;
            let endIdx = startIdx;
            while (endIdx < clean.length && depth > 0) {
                if (clean[endIdx] === '(') depth++;
                else if (clean[endIdx] === ')') depth--;
                if (depth === 0) break;
                endIdx++;
            }
            const body = clean.slice(startIdx, endIdx);

            // Split colDefs by comma at depth 0
            const colDefs = [];
            let currentDef = '';
            let innerDepth = 0;
            for (let c of body) {
                if (c === '(') innerDepth++;
                else if (c === ')') innerDepth--;
                if (c === ',' && innerDepth === 0) {
                    colDefs.push(currentDef.trim());
                    currentDef = '';
                } else {
                    currentDef += c;
                }
            }
            if (currentDef.trim()) colDefs.push(currentDef.trim());

            const cols = colDefs
                .map(c => c.split(/\s+/)[0].replace(/[`"']/g, ''))
                .filter(c => c.length > 0 && !['PRIMARY', 'KEY', 'FOREIGN', 'CONSTRAINT'].includes(c.toUpperCase()));

            tables[tableName] = { name: tableName, attrs: cols, tuples: [] };
        }

        // 2. Find INSERT INTO statements: INSERT INTO Name VALUES (...), (...)
        const insertRegex = /INSERT\s+INTO\s+([a-zA-Z0-9_]+)(?:\s*\(([^)]+)\))?\s+VALUES\s*([\s\S]*?)(?:;|$)/gi;
        while ((match = insertRegex.exec(clean)) !== null) {
            const tableName = match[1];
            const rawValues = match[3];

            if (!tables[tableName]) {
                tables[tableName] = { name: tableName, attrs: [], tuples: [] };
            }

            // Extract each (...) value group by tracking depth
            const valueGroups = [];
            let inGroup = false;
            let currentGroup = '';
            let vDepth = 0;
            let inQuote = false;
            let quoteChar = '';

            for (let i = 0; i < rawValues.length; i++) {
                const ch = rawValues[i];
                if ((ch === "'" || ch === '"') && rawValues[i - 1] !== '\\') {
                    if (!inQuote) { inQuote = true; quoteChar = ch; }
                    else if (quoteChar === ch) { inQuote = false; }
                }

                if (!inQuote) {
                    if (ch === '(') {
                        vDepth++;
                        if (vDepth === 1) {
                            inGroup = true;
                            currentGroup = '';
                            continue;
                        }
                    } else if (ch === ')') {
                        vDepth--;
                        if (vDepth === 0) {
                            inGroup = false;
                            valueGroups.push(currentGroup.trim());
                            currentGroup = '';
                            continue;
                        }
                    }
                }
                if (inGroup) currentGroup += ch;
            }

            valueGroups.forEach(grp => {
                const vals = [];
                let valBuf = '';
                let q = false;
                let qC = '';
                for (let j = 0; j < grp.length; j++) {
                    const c = grp[j];
                    if ((c === "'" || c === '"') && grp[j - 1] !== '\\') {
                        if (!q) { q = true; qC = c; }
                        else if (qC === c) { q = false; }
                    }
                    if (c === ',' && !q) {
                        vals.push(valBuf.trim().replace(/^['"`]|['"`]$/g, ''));
                        valBuf = '';
                    } else {
                        valBuf += c;
                    }
                }
                if (valBuf.trim()) {
                    vals.push(valBuf.trim().replace(/^['"`]|['"`]$/g, ''));
                }

                // If table has no attrs yet, fabricate col1, col2...
                if (tables[tableName].attrs.length === 0) {
                    tables[tableName].attrs = vals.map((_, idx) => `Col_${idx + 1}`);
                }

                const tuple = {};
                tables[tableName].attrs.forEach((attr, idx) => {
                    tuple[attr] = vals[idx] !== undefined ? vals[idx] : '';
                });
                tables[tableName].tuples.push(tuple);
            });
        }

        const tableNames = Object.keys(tables);
        if (tableNames.length < 2) {
            throw new Error(`SQL must define at least two tables (e.g. Table R and Table S). Found: ${tableNames.length}`);
        }

        // First table is R (Dividend), Second table is S (Divisor)
        const relR = tables[tableNames[0]];
        const relS = tables[tableNames[1]];

        return {
            rName: relR.name,
            rAttrs: relR.attrs,
            rTuples: relR.tuples,
            sName: relS.name,
            sAttrs: relS.attrs,
            sTuples: relS.tuples
        };
    }

    /**
     * Parse JSON relations
     */
    static parseJSON(jsonText) {
        const clean = (jsonText || '').trim();
        if (!clean) return null;

        const obj = JSON.parse(clean);

        // Schema structure 1: { R: [...], S: [...] }
        if (obj.R && obj.S && Array.isArray(obj.R) && Array.isArray(obj.S)) {
            const rTuples = obj.R;
            const sTuples = obj.S;
            const rAttrs = Object.keys(rTuples[0] || {});
            const sAttrs = Object.keys(sTuples[0] || {});

            return {
                rName: obj.rName || 'CustomDividend_R',
                rAttrs,
                rTuples,
                sName: obj.sName || 'CustomDivisor_S',
                sAttrs,
                sTuples
            };
        }

        // Schema structure 2: { dividend: { name, attrs, tuples }, divisor: { name, attrs, tuples } }
        if (obj.dividend && obj.divisor) {
            return {
                rName: obj.dividend.name || 'Dividend_R',
                rAttrs: obj.dividend.attrs,
                rTuples: obj.dividend.tuples,
                sName: obj.divisor.name || 'Divisor_S',
                sAttrs: obj.divisor.attrs,
                sTuples: obj.divisor.tuples
            };
        }

        throw new Error('JSON must contain "R" and "S" arrays of objects.');
    }

    /**
     * Render the Universal Importer Modal HTML
     */
    static renderModalHtml() {
        return `
        <div id="global-importer-modal" class="tech-modal-overlay">
            <div class="tech-modal-container rounded-[20px] bg-[#0c0c12] text-white shadow-2xl border border-[#22222e] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                
                <!-- Header -->
                <div class="tech-modal-header border-b border-[#1c1c28] px-6 py-4 flex items-center justify-between bg-[#101018]">
                    <div class="flex items-center gap-2.5">
                        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse"></span>
                        <span class="font-poppins text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <span>📥 UNIVERSAL DATA IMPORTER // CSV • EXCEL • JSON • SQL</span>
                        </span>
                    </div>
                    <button class="btn-close-modal text-gray-400 hover:text-white font-mono text-base px-2 py-1 rounded cursor-pointer" data-target="global-importer-modal">✕</button>
                </div>

                <!-- Format Selection Tabs -->
                <div class="bg-[#12121b] border-b border-[#1e1e2c] px-6 py-2.5 flex flex-wrap items-center gap-2 text-xs font-medium">
                    <button class="btn-imp-tab px-3 py-1.5 rounded-lg bg-[#7551FF] text-white font-semibold cursor-pointer" data-target="pane-csv">
                        📄 CSV / TSV / Excel Paste
                    </button>
                    <button class="btn-imp-tab px-3 py-1.5 rounded-lg bg-[#181824] hover:bg-[#222234] text-gray-300 border border-[#2a2a3c] font-semibold cursor-pointer" data-target="pane-sql">
                        💻 Raw SQL (CREATE & INSERT)
                    </button>
                    <button class="btn-imp-tab px-3 py-1.5 rounded-lg bg-[#181824] hover:bg-[#222234] text-gray-300 border border-[#2a2a3c] font-semibold cursor-pointer" data-target="pane-json">
                        📦 JSON Structure
                    </button>
                    <button class="btn-imp-tab px-3 py-1.5 rounded-lg bg-[#181824] hover:bg-[#222234] text-gray-300 border border-[#2a2a3c] font-semibold cursor-pointer" data-target="pane-file">
                        📂 File Upload (.csv / .json)
                    </button>
                </div>

                <!-- Modal Body -->
                <div class="tech-modal-body p-6 space-y-5 max-h-[72vh] overflow-y-auto horizon-scrollbar">
                    
                    <!-- TAB 1: CSV / Excel Paste -->
                    <div id="pane-csv" class="imp-pane space-y-4">
                        <div class="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300">
                            <strong>CSV / Excel Instructions:</strong> Paste comma-separated or tab-separated data from Excel/Google Sheets below. Ensure divisor attributes match the target requirement column in Dividend relation $R$.
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <!-- Dividend R -->
                            <div class="space-y-2">
                                <div class="flex items-center justify-between">
                                    <label class="text-xs font-bold text-[#868CFF] font-mono">1. Dividend Relation R (e.g. Student, Course)</label>
                                    <button id="btn-sample-r-csv" class="text-[10px] text-gray-400 hover:text-white underline cursor-pointer">Load Sample</button>
                                </div>
                                <textarea id="imp-csv-r" rows="8" class="w-full font-mono text-xs p-3 rounded-xl bg-[#0a0a0f] border border-[#222234] text-gray-200 focus:outline-none focus:border-[#7551FF] horizon-scrollbar" placeholder="StudentID,StudentName,CourseCode&#10;S1,Alice,CS101&#10;S1,Alice,CS102&#10;S2,Bob,CS101"></textarea>
                            </div>

                            <!-- Divisor S -->
                            <div class="space-y-2">
                                <div class="flex items-center justify-between">
                                    <label class="text-xs font-bold text-emerald-400 font-mono">2. Divisor Relation S (Requirements)</label>
                                    <button id="btn-sample-s-csv" class="text-[10px] text-gray-400 hover:text-white underline cursor-pointer">Load Sample</button>
                                </div>
                                <textarea id="imp-csv-s" rows="8" class="w-full font-mono text-xs p-3 rounded-xl bg-[#0a0a0f] border border-[#222234] text-gray-200 focus:outline-none focus:border-emerald-500 horizon-scrollbar" placeholder="CourseCode&#10;CS101&#10;CS102"></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- TAB 2: SQL Scripts -->
                    <div id="pane-sql" class="imp-pane hidden space-y-4">
                        <div class="p-3 rounded-lg bg-indigo-950/20 border border-indigo-500/30 text-xs text-indigo-300 flex items-center justify-between">
                            <span><strong>SQL DDL/DML Parser:</strong> Paste standard SQL commands containing <code>CREATE TABLE</code> and <code>INSERT INTO</code> statements for relation $R$ and $S$.</span>
                            <button id="btn-sample-sql" class="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono text-[10px] cursor-pointer hover:bg-indigo-500/30">Load Sample SQL</button>
                        </div>
                        <textarea id="imp-sql-text" rows="10" class="w-full font-mono text-xs p-3.5 rounded-xl bg-[#0a0a0f] border border-[#222234] text-gray-200 focus:outline-none focus:border-[#7551FF] horizon-scrollbar" placeholder="CREATE TABLE StudentCourses (StudentID VARCHAR(10), CourseID VARCHAR(10));&#10;INSERT INTO StudentCourses VALUES ('S101', 'CS101'), ('S101', 'CS102');&#10;&#10;CREATE TABLE CoreRequirements (CourseID VARCHAR(10));&#10;INSERT INTO CoreRequirements VALUES ('CS101'), ('CS102');"></textarea>
                    </div>

                    <!-- TAB 3: JSON -->
                    <div id="pane-json" class="imp-pane hidden space-y-4">
                        <div class="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-300 flex items-center justify-between">
                            <span><strong>JSON Importer:</strong> Provide JSON with <code>"R"</code> and <code>"S"</code> array of objects.</span>
                            <button id="btn-sample-json" class="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono text-[10px] cursor-pointer hover:bg-cyan-500/30">Load Sample JSON</button>
                        </div>
                        <textarea id="imp-json-text" rows="10" class="w-full font-mono text-xs p-3.5 rounded-xl bg-[#0a0a0f] border border-[#222234] text-gray-200 focus:outline-none focus:border-cyan-500 horizon-scrollbar" placeholder='{\n  "R": [\n    { "SupplierID": "SUP1", "PartID": "P1" },\n    { "SupplierID": "SUP1", "PartID": "P2" }\n  ],\n  "S": [\n    { "PartID": "P1" },\n    { "PartID": "P2" }\n  ]\n}'></textarea>
                    </div>

                    <!-- TAB 4: File Upload -->
                    <div id="pane-file" class="imp-pane hidden space-y-4">
                        <div class="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300">
                            <strong>Local File Importer:</strong> Select <code>.csv</code> or <code>.json</code> file from your machine to import into Table R or Divisor S.
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div class="p-4 rounded-xl border border-dashed border-[#2a2a3c] bg-[#101018] text-center space-y-2">
                                <div class="text-xs font-bold text-[#868CFF]">Upload Table R (Dividend)</div>
                                <input type="file" id="file-upload-r" accept=".csv,.txt,.json" class="text-xs text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-[#7551FF] file:text-white cursor-pointer">
                            </div>
                            <div class="p-4 rounded-xl border border-dashed border-[#2a2a3c] bg-[#101018] text-center space-y-2">
                                <div class="text-xs font-bold text-emerald-400">Upload Table S (Divisor)</div>
                                <input type="file" id="file-upload-s" accept=".csv,.txt,.json" class="text-xs text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-emerald-600 file:text-white cursor-pointer">
                            </div>
                        </div>
                    </div>

                    <!-- Validation & Status Banner -->
                    <div id="imp-status-box" class="hidden p-3.5 rounded-xl text-xs font-mono"></div>

                </div>

                <!-- Footer -->
                <div class="tech-modal-footer border-t border-[#1c1c28] px-6 py-3 flex justify-between items-center bg-[#101018]">
                    <button class="btn-close-modal px-4 py-2 text-xs rounded-lg bg-[#181824] hover:bg-[#222234] text-gray-300 font-semibold border border-[#2a2a3c] transition-colors cursor-pointer" data-target="global-importer-modal">Cancel</button>
                    <button id="btn-do-import" class="px-5 py-2 text-xs bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-lg shadow-lg shadow-emerald-500/20 transition-all cursor-pointer flex items-center gap-1.5">
                        <span>⚡ Import & Compute Division (R ÷ S)</span>
                    </button>
                </div>

            </div>
        </div>
        `;
    }

    /**
     * Bind events for importer modal
     */
    static bindEvents() {
        // Wire modal close buttons and backdrop click
        const modal = document.getElementById('global-importer-modal');
        if (modal) {
            modal.querySelectorAll('.btn-close-modal').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    modal.classList.remove('open');
                });
            });
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    e.preventDefault();
                    modal.classList.remove('open');
                }
            });
        }

        // Tab switching
        document.querySelectorAll('.btn-imp-tab').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget.dataset.target;
                document.querySelectorAll('.btn-imp-tab').forEach(b => {
                    b.className = 'btn-imp-tab px-3 py-1.5 rounded-lg bg-[#181824] hover:bg-[#222234] text-gray-300 border border-[#2a2a3c] font-semibold cursor-pointer';
                });
                e.currentTarget.className = 'btn-imp-tab px-3 py-1.5 rounded-lg bg-[#7551FF] text-white font-semibold cursor-pointer';

                document.querySelectorAll('.imp-pane').forEach(p => p.classList.add('hidden'));
                document.getElementById(target)?.classList.remove('hidden');
            });
        });

        // Load Samples
        document.getElementById('btn-sample-r-csv')?.addEventListener('click', () => {
            document.getElementById('imp-csv-r').value = `StudentID,StudentName,CourseCode\nCS101,Aarav Patel,CSE201\nCS101,Aarav Patel,CSE202\nCS101,Aarav Patel,CSE203\nCS102,Diya Sharma,CSE201\nCS102,Diya Sharma,CSE202\nCS103,Rohan Sen,CSE201\nCS103,Rohan Sen,CSE202\nCS103,Rohan Sen,CSE203\nCS103,Rohan Sen,CSE301`;
        });

        document.getElementById('btn-sample-s-csv')?.addEventListener('click', () => {
            document.getElementById('imp-csv-s').value = `CourseCode\nCSE201\nCSE202\nCSE203`;
        });

        document.getElementById('btn-sample-sql')?.addEventListener('click', () => {
            document.getElementById('imp-sql-text').value = `CREATE TABLE PassengerReservations (PNR_No VARCHAR(20), PassengerName VARCHAR(50), StationCode VARCHAR(10));
INSERT INTO PassengerReservations VALUES 
('PNR_101', 'Rajesh Sharma', 'NDLS'),
('PNR_101', 'Rajesh Sharma', 'CNB'),
('PNR_101', 'Rajesh Sharma', 'PRYJ'),
('PNR_102', 'Sunita Rao', 'NDLS'),
('PNR_102', 'Sunita Rao', 'CNB'),
('PNR_103', 'Deepa Nair', 'NDLS'),
('PNR_103', 'Deepa Nair', 'CNB'),
('PNR_103', 'Deepa Nair', 'PRYJ');

CREATE TABLE MandatoryHaltStations (StationCode VARCHAR(10));
INSERT INTO MandatoryHaltStations VALUES ('NDLS'), ('CNB'), ('PRYJ');`;
        });

        document.getElementById('btn-sample-json')?.addEventListener('click', () => {
            document.getElementById('imp-json-text').value = JSON.stringify({
                rName: "CloudClusterNodeSkills",
                R: [
                    { "NodeID": "K8S_01", "Tool": "Terraform" },
                    { "NodeID": "K8S_01", "Tool": "Docker" },
                    { "NodeID": "K8S_01", "Tool": "Ansible" },
                    { "NodeID": "K8S_02", "Tool": "Docker" },
                    { "NodeID": "K8S_03", "Tool": "Terraform" },
                    { "NodeID": "K8S_03", "Tool": "Docker" },
                    { "NodeID": "K8S_03", "Tool": "Ansible" }
                ],
                sName: "MandatoryClusterTools",
                S: [
                    { "Tool": "Terraform" },
                    { "Tool": "Docker" },
                    { "Tool": "Ansible" }
                ]
            }, null, 2);
        });

        // File upload readers
        document.getElementById('file-upload-r')?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                document.getElementById('imp-csv-r').value = ev.target.result;
                if (window.toast) window.toast.info(`Loaded ${file.name} into Table R input.`);
            };
            reader.readAsText(file);
        });

        document.getElementById('file-upload-s')?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                document.getElementById('imp-csv-s').value = ev.target.result;
                if (window.toast) window.toast.info(`Loaded ${file.name} into Divisor S input.`);
            };
            reader.readAsText(file);
        });

        // DO IMPORT ACTION
        document.getElementById('btn-do-import')?.addEventListener('click', () => {
            const statusBox = document.getElementById('imp-status-box');
            try {
                let parsed = null;

                // Check active pane
                const isSql = !document.getElementById('pane-sql').classList.contains('hidden');
                const isJson = !document.getElementById('pane-json').classList.contains('hidden');

                if (isSql) {
                    const sql = document.getElementById('imp-sql-text')?.value || '';
                    parsed = UniversalImporter.parseSQL(sql);
                } else if (isJson) {
                    const json = document.getElementById('imp-json-text')?.value || '';
                    parsed = UniversalImporter.parseJSON(json);
                } else {
                    // Delimited CSV
                    const rText = document.getElementById('imp-csv-r')?.value || '';
                    const sText = document.getElementById('imp-csv-s')?.value || '';
                    const resR = UniversalImporter.parseDelimited(rText);
                    const resS = UniversalImporter.parseDelimited(sText);

                    if (!resR || !resS) throw new Error('Both Table R and Table S CSV inputs must be provided.');

                    parsed = {
                        rName: 'CustomRelation_R',
                        rAttrs: resR.attrs,
                        rTuples: resR.tuples,
                        sName: 'CustomDivisor_S',
                        sAttrs: resS.attrs,
                        sTuples: resS.tuples
                    };
                }

                // Check schema compatibility: S attributes must be subset of R attributes
                const sInR = parsed.sAttrs.every(attr => parsed.rAttrs.includes(attr));
                if (!sInR) {
                    throw new Error(`Schema Invariant Violation: All divisor attributes (${parsed.sAttrs.join(', ')}) must be present in dividend relation R (${parsed.rAttrs.join(', ')}).`);
                }

                // Push to live workspace
                if (window.simWorkspace) {
                    window.simWorkspace.loadCustomData(
                        parsed.rName, parsed.rAttrs, parsed.rTuples,
                        parsed.sName, parsed.sAttrs, parsed.sTuples
                    );
                    const modal = document.getElementById('global-importer-modal');
                    if (modal) modal.classList.remove('open');
                    if (window.toast) window.toast.success(`Imported ${parsed.rTuples.length} R tuples & ${parsed.sTuples.length} S tuples! Pipeline computed.`);
                } else {
                    // Redirect to simulation with imported data saved in sessionStorage
                    sessionStorage.setItem('rel_div_import_data', JSON.stringify(parsed));
                    window.location.href = 'simulation.html?imported=true';
                }

            } catch (err) {
                if (statusBox) {
                    statusBox.classList.remove('hidden');
                    statusBox.className = 'p-3.5 rounded-xl text-xs font-mono bg-rose-950/30 border border-rose-500/40 text-rose-300';
                    statusBox.innerHTML = `<strong>Import Error:</strong> ${err.message}`;
                }
                if (window.toast) window.toast.error(err.message);
            }
        });
    }

    /**
     * Open the Universal Importer modal
     */
    static openModal() {
        let modal = document.getElementById('global-importer-modal');
        if (!modal) {
            document.body.insertAdjacentHTML('beforeend', this.renderModalHtml());
            modal = document.getElementById('global-importer-modal');
            this.bindEvents();
        }
        modal.classList.add('open');
        try {
            window.history.pushState({ modalOpen: 'global-importer-modal' }, '', window.location.href);
        } catch (_) {}
    }

    /**
     * Close the Universal Importer modal
     */
    static closeModal() {
        const modal = document.getElementById('global-importer-modal');
        if (modal) modal.classList.remove('open');
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UniversalImporter };
}
