/**
 * BACSE202: Relational Division Simulator — Bespoke Obsidian Edition
 * Visualizer Module:
 * - Interactive Relational Algebra Expression DAG Tree (SVG) with High-Contrast Dark Obsidian Palette
 * - Step-by-Step Intermediate Table Renderer with Deep Obsidian Rows (#0e0e14)
 * - Tuple-by-Tuple Universal Quantification Tracer (✓ Emerald on Dark Emerald, ✕ Rose on Dark Rose)
 * - Coverage Matrix & Match Heatmap with Neon Multi-Tone Gradients
 */

class Visualizer {
    /**
     * Render the Relational Algebra Operator Tree (SVG DAG)
     * High-contrast dark theme: #101017 node backgrounds, crisp colored borders, pure white text & electric purple subtext.
     * High-contrast dark obsidian pill edge badges with bright white operator symbols.
     * @param {HTMLElement} container
     * @param {Object} trace - Execution result from RelationalDivisionEngine.divide()
     */
    static renderDAG(container, trace) {
        if (!container || !trace) return;

        const nodes = [
            { id: 'r_in', label: 'Relation R', sub: `${trace.metrics.rTuplesCount} tuples`, x: 125, y: 55, color: '#7551FF', stepKey: 'R', formula: 'Dividend Relation R(A, B)' },
            { id: 's_in', label: 'Relation S', sub: `Divisor (${trace.metrics.divisorCount})`, x: 355, y: 55, color: '#7551FF', stepKey: 'S', formula: 'Divisor Relation S(B)' },
            { id: 't1', label: 'T1: Π_A(R)', sub: `Candidates (${trace.metrics.totalCandidates})`, x: 125, y: 165, color: '#7551FF', stepKey: 'T1', formula: 'T1 = Π_A(R) [Distinct candidate entities in R]' },
            { id: 't2', label: 'T2: T1 × S', sub: `Pairs (${trace.metrics.theoreticalPairsCount})`, x: 240, y: 270, color: '#868CFF', stepKey: 'T2', formula: 'T2 = T1 × S [All theoretical candidate-divisor pairings]' },
            { id: 't3', label: 'T3: T2 - R', sub: `Missing (${trace.metrics.missingPairsCount})`, x: 240, y: 375, color: '#EE5D50', stepKey: 'T3', formula: 'T3 = T2 - R [Pairings missing from actual relation R]' },
            { id: 't4', label: 'T4: Π_A(T3)', sub: `Disqualified (${trace.metrics.disqualifiedCount})`, x: 240, y: 480, color: '#FFB547', stepKey: 'T4', formula: 'T4 = Π_A(T3) [Candidates missing at least 1 requirement]' },
            { id: 't5', label: 'T5: T1 - T4', sub: `Result (${trace.metrics.qualifiedCount} Qualified)`, x: 125, y: 590, color: '#05CD99', stepKey: 'T5', formula: 'T5 = T1 - T4 (R ÷ S) [Universal condition satisfied: ∀ y ∈ S, ⟨x,y⟩ ∈ R]' }
        ];

        const edges = [
            { from: 'r_in', to: 't1', label: 'Π_A(R)', midX: 125, midY: 110 },
            { from: 's_in', to: 't2', label: 'Cartesian ×', midX: 300, midY: 165 },
            { from: 't1', to: 't2', label: 'Cartesian ×', midX: 185, midY: 220 },
            { from: 't2', to: 't3', label: 'T2 - R', midX: 240, midY: 325 },
            { from: 't3', to: 't4', label: 'Π_A(T3)', midX: 240, midY: 430 },
            { from: 't4', to: 't5', label: 'Subtract T4', midX: 185, midY: 535 },
            { from: 't1', to: 't5', label: 'T1 Baseline', curve: 'left', midX: 24, midY: 380 }
        ];

        let svg = `
        <svg viewBox="0 0 500 660" class="w-full h-auto max-w-lg mx-auto select-none" style="max-height: 590px;">
            <defs>
                <marker id="dag-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#7551FF" />
                </marker>
                <marker id="dag-arrow-active" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#05CD99" />
                </marker>
                <filter id="dag-node-shadow" x="-15%" y="-15%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.75"/>
                </filter>
            </defs>

            <!-- Connections & Edges -->
            <g class="dag-edges">
        `;

        // Draw connections and paths
        edges.forEach(edge => {
            const src = nodes.find(n => n.id === edge.from);
            const dst = nodes.find(n => n.id === edge.to);
            if (!src || !dst) return;

            let pathD = '';
            if (edge.curve === 'left') {
                pathD = `M ${src.x - 75} ${src.y + 20} C 10 260, 10 500, ${dst.x - 100} ${dst.y}`;
            } else {
                let startX = src.x;
                let startY = src.y + 25;
                let endX = dst.x;
                let endY = dst.y - 25;

                if (edge.from === 's_in' && edge.to === 't2') {
                    startX = src.x - 35;
                    endX = dst.x + 35;
                } else if (edge.from === 't1' && edge.to === 't2') {
                    startX = src.x + 35;
                    endX = dst.x - 35;
                } else if (edge.from === 't4' && edge.to === 't5') {
                    startX = src.x - 25;
                    endX = dst.x + 45;
                }

                pathD = `M ${startX} ${startY} L ${endX} ${endY}`;
            }

            svg += `
                <path d="${pathD}" fill="none" stroke="#3b3f58" stroke-width="2" stroke-dasharray="${edge.curve ? '5,4' : 'none'}" class="transition-colors hover:stroke-[#7551FF]" marker-end="url(#dag-arrow)" opacity="0.9" />
            `;

            // High-contrast dark obsidian pill edge badges with bright white operator symbols
            if (edge.label && edge.midX && edge.midY) {
                const labelWidth = edge.label.length * 6.8 + 18;
                svg += `
                    <g class="dag-edge-label" transform="translate(${edge.midX}, ${edge.midY})">
                        <rect x="${-labelWidth / 2}" y="-11" width="${labelWidth}" height="22" rx="11" fill="#09090f" stroke="#2a2a3e" stroke-width="1.2" />
                        <text x="0" y="4.5" text-anchor="middle" font-size="9.5" font-family="'JetBrains Mono', monospace" font-weight="700" fill="#ffffff">
                            ${edge.label}
                        </text>
                    </g>
                `;
            }
        });

        svg += `</g><g class="dag-nodes">`;

        // Draw AST Operator Nodes (#101017 background, colored borders, pure white text, electric purple subtext)
        nodes.forEach(node => {
            const isFinal = node.id === 't5';
            const width = isFinal ? 200 : 170;
            const height = isFinal ? 56 : 50;
            const rx = 16;

            // Subtext color: bright emerald for T5, bright rose for T3, electric purple #C0B8FE for others
            const subTextColor = isFinal ? '#05CD99' : (node.id === 't3' ? '#EE5D50' : (node.id === 't4' ? '#FFB547' : '#C0B8FE'));

            svg += `
                <g class="dag-node cursor-pointer transition-transform duration-200 hover:scale-105" data-step="${node.stepKey}" transform="translate(${node.x - width/2}, ${node.y - height/2})">
                    <rect width="${width}" height="${height}" rx="${rx}" fill="#101017" stroke="${node.color}" stroke-width="${isFinal ? '2.5' : '2'}" filter="url(#dag-node-shadow)" />
                    <text x="${width/2}" y="${height/2 - 4}" text-anchor="middle" font-size="12.5" font-weight="700" font-family="'DM Sans', 'Poppins', sans-serif" fill="#ffffff">
                        ${node.label}
                    </text>
                    <text x="${width/2}" y="${height/2 + 13}" text-anchor="middle" font-size="10.5" font-weight="600" font-family="'JetBrains Mono', monospace" fill="${subTextColor}">
                        ${node.sub}
                    </text>
                </g>
            `;
        });

        svg += `</g></svg>`;

        container.innerHTML = svg;

        // Interactive node click triggers
        container.querySelectorAll('.dag-node').forEach(nodeElem => {
            nodeElem.addEventListener('click', () => {
                const stepKey = nodeElem.getAttribute('data-step');
                const nodeObj = nodes.find(n => n.stepKey === stepKey);
                Visualizer.inspectNode(nodeObj, trace);
            });
        });
    }

    /**
     * Inspect a specific DAG AST Operator Node in the inspector drawer
     */
    static inspectNode(node, trace) {
        if (!node || !trace) return;

        const drawer = document.getElementById('dag-node-inspector');
        const badge = document.getElementById('dag-inspect-badge');
        const name = document.getElementById('dag-inspect-name');
        const body = document.getElementById('dag-inspect-body');
        const jumpBtn = document.getElementById('dag-inspect-jump-btn');

        if (drawer) drawer.classList.remove('hidden');
        if (badge) {
            badge.textContent = node.stepKey;
            badge.style.backgroundColor = `${node.color}20`;
            badge.style.borderColor = `${node.color}50`;
            badge.style.color = node.color;
        }
        if (name) name.textContent = `${node.label} // AST Node`;

        let schemaText = 'Schema: (A, B)';
        let cardText = '0 tuples';
        if (node.stepKey === 'R') {
            schemaText = `Schema: (${trace.candidateAttrs.concat(trace.divisorAttrs).join(', ')})`;
            cardText = `${trace.metrics.rTuplesCount} tuples in R`;
        } else if (node.stepKey === 'S') {
            schemaText = `Schema: (${trace.divisorAttrs.join(', ')})`;
            cardText = `${trace.metrics.divisorCount} divisor requirements`;
        } else if (node.stepKey === 'T1') {
            schemaText = `Schema: (${trace.candidateAttrs.join(', ')})`;
            cardText = `${trace.metrics.totalCandidates} candidate entities`;
        } else if (node.stepKey === 'T2') {
            schemaText = `Schema: (${trace.candidateAttrs.concat(trace.divisorAttrs).join(', ')})`;
            cardText = `${trace.metrics.theoreticalPairsCount} theoretical pairs`;
        } else if (node.stepKey === 'T3') {
            schemaText = `Schema: (${trace.candidateAttrs.concat(trace.divisorAttrs).join(', ')})`;
            cardText = `${trace.metrics.missingPairsCount} missing pairs`;
        } else if (node.stepKey === 'T4') {
            schemaText = `Schema: (${trace.candidateAttrs.join(', ')})`;
            cardText = `${trace.metrics.disqualifiedCount} disqualified candidates`;
        } else if (node.stepKey === 'T5') {
            schemaText = `Schema: (${trace.candidateAttrs.join(', ')})`;
            cardText = `${trace.metrics.qualifiedCount} universally qualified`;
        }

        if (body) {
            body.innerHTML = `
                <div class="p-3 rounded-xl bg-lightPrimary/70 dark:bg-[#111116] border border-gray-100 dark:border-[#1f1f29] space-y-1">
                    <div class="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider font-mono">Algebra Formula</div>
                    <div class="text-xs font-bold text-navy-700 dark:text-white truncate" title="${node.formula}">${node.formula}</div>
                </div>
                <div class="p-3 rounded-xl bg-lightPrimary/70 dark:bg-[#111116] border border-gray-100 dark:border-[#1f1f29] space-y-1">
                    <div class="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider font-mono">Cardinality</div>
                    <div class="text-xs font-bold text-navy-700 dark:text-white">${cardText}</div>
                </div>
                <div class="p-3 rounded-xl bg-lightPrimary/70 dark:bg-[#111116] border border-gray-100 dark:border-[#1f1f29] space-y-1">
                    <div class="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider font-mono">Relational Schema</div>
                    <div class="text-xs font-bold text-[#7551FF] dark:text-[#C0B8FE] font-mono">${schemaText}</div>
                </div>
            `;
        }

        if (jumpBtn) {
            jumpBtn.onclick = () => {
                Visualizer.highlightStep(node.stepKey, true);
            };
        }

        if (typeof toast !== 'undefined') {
            toast.info(`Selected ${node.label} in DAG AST.`);
        }
    }

    /**
     * Highlight and scroll to a specific intermediate step table
     */
    static highlightStep(stepKey, switchTab = true) {
        if (!stepKey) return;
        const k = stepKey.toLowerCase();

        if (switchTab && typeof window.simApp !== 'undefined') {
            if (['t1', 't2', 't3', 't4'].includes(k)) {
                window.simApp.switchCenterView('steps');
            } else if (k === 't5') {
                window.simApp.switchCenterView('result');
            }
        }

        setTimeout(() => {
            let target = document.getElementById(`step-card-${k}`);
            if (!target && k === 't5') {
                target = document.getElementById('step-card-t5') || document.getElementById('container-result-table');
            }

            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                target.classList.remove('tech-highlight-pulse');
                void target.offsetWidth; // trigger reflow
                target.classList.add('tech-highlight-pulse');
            }
        }, 60);
    }

    /**
     * Render a relation as a dense, high-contrast Obsidian table
     * Deep obsidian rows (#0e0e14) with crisp white text, hover highlight #181822, active selection in #7551FF/20.
     * @param {Relation} relation
     * @param {Object} options - styling/badge options
     * @returns {string} HTML string
     */
    static renderTableHTML(relation, options = {}) {
        if (!relation || relation.cardinality === 0) {
            return `
                <div class="p-6 text-center text-gray-400 dark:text-gray-500 font-mono text-xs italic bg-lightPrimary/50 dark:bg-[#0d0d12] rounded-xl border border-dashed border-gray-200 dark:border-[#1f1f29]">
                    ∅ Empty Relation (0 tuples)
                </div>
            `;
        }

        const { highlightRows = [] } = options;

        let html = `
        <div class="overflow-x-auto rounded-xl border border-gray-100 dark:border-[#1f1f29]">
            <table class="w-full text-left border-collapse text-xs">
                <thead>
                    <tr class="border-b border-gray-200 dark:border-[#1f1f29] bg-lightPrimary/60 dark:bg-[#101018]">
                        <th class="py-2.5 px-3 text-center text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-8 font-mono">#</th>
        `;

        relation.attributes.forEach(attr => {
            html += `<th class="py-2.5 px-3 text-[10px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider font-mono">${attr}</th>`;
        });

        html += `
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-[#181822] bg-white dark:bg-[#0e0e14]">
        `;

        relation.tuples.forEach((tuple, idx) => {
            const isHighlighted = highlightRows.includes(idx);
            const rowClass = isHighlighted
                ? 'bg-[#7551FF]/20 font-bold text-[#C0B8FE] dark:text-white border-l-2 border-[#7551FF]'
                : 'hover:bg-lightPrimary/50 dark:hover:bg-[#181822] text-navy-700 dark:text-white';

            html += `
                <tr class="${rowClass} transition-colors">
                    <td class="py-2 px-3 text-center text-[11px] text-gray-400 font-mono">${idx + 1}</td>
            `;

            relation.attributes.forEach(attr => {
                const val = tuple[attr] !== undefined && tuple[attr] !== null ? tuple[attr] : '';
                html += `
                    <td class="py-2 px-3 font-mono text-xs">
                        <span>${val}</span>
                    </td>
                `;
            });

            html += `</tr>`;
        });

        html += `
                </tbody>
            </table>
        </div>
        `;

        return html;
    }

    /**
     * Render the Tuple-by-Tuple Universal Quantification Tracer
     * High-contrast checkmarks (✓ emerald on dark emerald, ✕ rose on dark rose)
     */
    static renderTracer(container, auditData, S) {
        if (!container) return;

        if (!auditData || auditData.length === 0) {
            container.innerHTML = `
                <div class="p-8 text-center text-gray-400 dark:text-gray-500 font-mono text-xs bg-lightPrimary/50 dark:bg-[#0d0d12] rounded-xl border border-dashed border-gray-200 dark:border-[#1f1f29]">
                    ∅ No candidate entities found in Relation R to trace.
                </div>
            `;
            return;
        }

        let currentIndex = 0;

        const updateView = (index) => {
            currentIndex = Math.max(0, Math.min(index, auditData.length - 1));
            const item = auditData[currentIndex];
            const candidateLabel = item.candidateKey;

            let requirementsHTML = '';
            S.tuples.forEach(sTuple => {
                const sKey = S.attributes.map(b => `${b} = "${sTuple[b]}"`).join(', ');
                const isMatched = item.matchedS.some(m => S.attributes.every(b => m[b] === sTuple[b]));

                // High-contrast checkmarks: ✓ emerald on dark emerald, ✕ rose on dark rose
                requirementsHTML += `
                    <div class="flex items-center justify-between p-3.5 rounded-2xl border ${isMatched ? 'border-[#05CD99]/30 bg-[#061d15]' : 'border-[#EE5D50]/30 bg-[#1e0a0e]'} font-mono text-xs transition-all shadow-sm">
                        <div class="flex items-center gap-3">
                            <span class="w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs ${isMatched ? 'bg-[#05CD99]/25 text-[#05CD99] border border-[#05CD99]/60 shadow-[0_0_8px_rgba(5,205,153,0.3)]' : 'bg-[#EE5D50]/25 text-[#EE5D50] border border-[#EE5D50]/60 shadow-[0_0_8px_rgba(238,93,80,0.3)]'}">
                                ${isMatched ? '✓' : '✕'}
                            </span>
                            <span class="font-bold text-white tracking-wide">${sKey}</span>
                        </div>
                        <span class="px-2.5 py-1 rounded-full text-[11px] font-bold ${isMatched ? 'bg-[#05CD99]/20 text-[#05CD99] border border-[#05CD99]/40' : 'bg-[#EE5D50]/20 text-[#EE5D50] border border-[#EE5D50]/40'}">
                            ${isMatched ? '✓ Satisfied in R' : '✕ Missing in R'}
                        </span>
                    </div>
                `;
            });

            const verdictBadge = item.isQualified
                ? `<span class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#05CD99]/20 text-[#05CD99] border border-[#05CD99]/40 font-mono flex items-center gap-2 shadow-sm">
                    ✓ QUALIFIES (Formal Verification: Universal condition satisfied ∀ y ∈ S, ⟨x,y⟩ ∈ R)
                   </span>`
                : `<span class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#EE5D50]/20 text-[#EE5D50] border border-[#EE5D50]/40 font-mono flex items-center gap-2 shadow-sm">
                    ✕ DISQUALIFIED (Boundary Invariance: Missing ${item.missingS.length} of ${item.totalRequired} required items)
                   </span>`;

            let selectOptions = '';
            auditData.forEach((c, idx) => {
                selectOptions += `<option value="${idx}" ${idx === currentIndex ? 'selected' : ''}>Candidate ${idx + 1} / ${auditData.length}: ${c.candidateKey} (${c.matchPercentage}% - ${c.isQualified ? 'QUALIFIES' : 'FAIL'})</option>`;
            });

            container.innerHTML = `
                <div class="p-5 rounded-[20px] bg-white dark:bg-[#0d0d12] border border-gray-100 dark:border-[#1f1f29] space-y-4 shadow-sm">
                    
                    <!-- Header with Candidate Nav & Dropdown -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-200/80 dark:border-[#1f1f29]">
                        <div>
                            <div class="text-[11px] font-bold tracking-wider uppercase text-[#7551FF] dark:text-[#A195FD] font-mono">
                                CANDIDATE STEPPER // [${currentIndex + 1} OF ${auditData.length}]
                            </div>
                            <h4 class="text-lg font-bold text-navy-700 dark:text-white mt-0.5">
                                Entity: <span class="text-[#7551FF] dark:text-[#C0B8FE]">${candidateLabel}</span>
                            </h4>
                        </div>
                        <div class="flex items-center gap-2">
                            <select id="tracer-candidate-select" class="rounded-xl border border-gray-200 dark:border-[#252538] bg-white dark:bg-[#111116] px-3 py-1.5 text-xs font-semibold text-navy-700 dark:text-white outline-none focus:border-[#7551FF] transition-colors cursor-pointer">
                                ${selectOptions}
                            </select>
                            <button id="tracer-prev" class="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#181822] border border-gray-200 dark:border-[#252538] text-navy-700 dark:text-white hover:bg-gray-100 dark:hover:bg-[#222232] hover:border-[#7551FF] font-bold text-xs transition-colors disabled:opacity-30 disabled:pointer-events-none" ${currentIndex === 0 ? 'disabled' : ''}>
                                ◀ Prev
                            </button>
                            <button id="tracer-next" class="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#181822] border border-gray-200 dark:border-[#252538] text-navy-700 dark:text-white hover:bg-gray-100 dark:hover:bg-[#222232] hover:border-[#7551FF] font-bold text-xs transition-colors disabled:opacity-30 disabled:pointer-events-none" ${currentIndex === auditData.length - 1 ? 'disabled' : ''}>
                                Next ▶
                            </button>
                        </div>
                    </div>

                    <!-- Verdict and Progress Bar -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>${verdictBadge}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400 font-mono">
                            Fulfillment: <span class="font-bold text-[#7551FF] dark:text-[#A195FD] text-sm">${item.matchPercentage}%</span> (${item.matchedCount}/${item.totalRequired} requirements satisfied)
                        </div>
                    </div>

                    <!-- Progress Bar with High-Contrast Multi-Tone Gradient -->
                    <div class="w-full bg-gray-100 dark:bg-[#181824] rounded-full h-3 overflow-hidden p-0.5 border border-gray-200/50 dark:border-[#252538]">
                        <div class="h-2 rounded-full ${item.isQualified ? 'bg-[#05CD99] shadow-[0_0_10px_rgba(5,205,153,0.6)]' : 'bg-gradient-to-r from-[#7551FF] to-[#00F5FF] shadow-[0_0_10px_rgba(117,81,255,0.5)]'} transition-all duration-300" style="width: ${item.matchPercentage}%;"></div>
                    </div>

                    <!-- Requirement checklist -->
                    <div class="space-y-2.5 pt-1">
                        <div class="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-mono">
                            Formal Verification — Universal Quantification (∀ y ∈ S, ⟨x, y⟩ ∈ R):
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            ${requirementsHTML}
                        </div>
                    </div>
                </div>
            `;

            const prevBtn = container.querySelector('#tracer-prev');
            const nextBtn = container.querySelector('#tracer-next');
            const selectDropdown = container.querySelector('#tracer-candidate-select');

            if (prevBtn) prevBtn.addEventListener('click', () => updateView(currentIndex - 1));
            if (nextBtn) nextBtn.addEventListener('click', () => updateView(currentIndex + 1));
            if (selectDropdown) selectDropdown.addEventListener('change', (e) => updateView(parseInt(e.target.value, 10)));
        };

        updateView(0);
    }

    /**
     * Render the Coverage Matrix & Match Heatmap
     * High-contrast obsidian table with vibrant degree of fulfillment gradients
     */
    static renderCoverageMatrix(container, auditData, threshold = 75) {
        if (!container || !auditData) return;

        let rowsHTML = '';
        auditData.forEach(item => {
            const isFull = item.matchPercentage === 100;
            const isFuzzy = item.matchPercentage >= threshold;

            const barStyle = isFull
                ? 'background-color: #05CD99; box-shadow: 0 0 10px rgba(5,205,153,0.5);'
                : isFuzzy
                ? 'background: linear-gradient(90deg, #7551FF 0%, #00F5FF 100%); box-shadow: 0 0 10px rgba(117,81,255,0.4);'
                : 'background-color: #EE5D50; box-shadow: 0 0 10px rgba(238,93,80,0.4);';

            const statusBadge = isFull
                ? '<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#05CD99]/20 text-[#05CD99] border border-[#05CD99]/30 font-mono">100% QUALIFIED</span>'
                : isFuzzy
                ? `<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#7551FF]/20 text-[#C0B8FE] border border-[#7551FF]/30 font-mono">FUZZY PASS (≥${threshold}%)</span>`
                : `<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#EE5D50]/20 text-[#EE5D50] border border-[#EE5D50]/30 font-mono">BELOW THRESHOLD</span>`;

            rowsHTML += `
                <tr class="hover:bg-lightPrimary/50 dark:hover:bg-[#181822] transition-colors font-mono bg-white dark:bg-[#0e0e14]">
                    <td class="py-3 px-3.5 text-xs font-bold text-navy-700 dark:text-white">
                        ${item.candidateKey}
                    </td>
                    <td class="py-3 px-3.5">
                        <div class="flex items-center gap-3">
                            <div class="w-36 sm:w-48 bg-gray-100 dark:bg-[#181824] rounded-full h-2.5 overflow-hidden border border-gray-200/60 dark:border-[#252538] relative">
                                <div class="h-2.5 rounded-full transition-all" style="width: ${item.matchPercentage}%; ${barStyle}"></div>
                                <div class="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-10 shadow-[0_0_6px_#FFB547]" style="left: ${threshold}%;" title="Threshold: ${threshold}%"></div>
                            </div>
                            <span class="text-xs font-bold text-navy-700 dark:text-white w-10 text-right">${item.matchPercentage}%</span>
                        </div>
                    </td>
                    <td class="py-3 px-3.5 text-xs text-navy-700 dark:text-white">
                        ${item.matchedCount} / ${item.totalRequired}
                    </td>
                    <td class="py-3 px-3.5 text-xs text-[#EE5D50] font-bold">
                        ${item.missingS.length}
                    </td>
                    <td class="py-3 px-3.5 text-xs text-gray-500 dark:text-gray-400">
                        ${item.extraItems.length}
                    </td>
                    <td class="py-3 px-3.5 text-right">
                        ${statusBadge}
                    </td>
                </tr>
            `;
        });

        container.innerHTML = `
            <div class="overflow-hidden rounded-[20px] border border-gray-100 dark:border-[#1f1f29] bg-white dark:bg-[#0d0d12] space-y-0">
                <div class="p-3.5 bg-lightPrimary/60 dark:bg-[#101018] border-b border-gray-100 dark:border-[#1f1f29] flex items-center justify-between font-mono text-xs text-gray-600 dark:text-gray-300">
                    <span>Active Fuzzy Cutoff: <strong class="text-amber-400 font-bold">${threshold}%</strong></span>
                    <span class="text-[11px] text-gray-400 dark:text-gray-400 flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#FFB547]"></span>
                        Amber marker indicates qualification boundary
                    </span>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="border-b border-gray-200 dark:border-[#1f1f29] bg-lightPrimary/40 dark:bg-[#101018]">
                                <th class="py-2.5 px-3.5 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider font-mono">Candidate Entity</th>
                                <th class="py-2.5 px-3.5 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider font-mono">Coverage vs Divisor S</th>
                                <th class="py-2.5 px-3.5 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider font-mono">Satisfied</th>
                                <th class="py-2.5 px-3.5 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider font-mono">Missing</th>
                                <th class="py-2.5 px-3.5 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider font-mono">Extras</th>
                                <th class="py-2.5 px-3.5 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider font-mono text-right">Verdict</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 dark:divide-[#181822]">
                            ${rowsHTML}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Visualizer };
}
