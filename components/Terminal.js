/**
 * Technical Terminal Readout Window Component
 * Streams engine logs, execution cycles, telemetry, and assertions
 * Linear / Vercel Developer Aesthetic Monospace Log Stream
 */

class TechTerminal {
    constructor(containerId, options = 100) {
        this.containerId = containerId;
        this.lines = [];
        this.maxLines = typeof options === 'number' ? options : (options?.maxLines || 100);
    }

    log(message, type = 'info') {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const now = new Date();
        const ts = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;

        let typeClass = 'terminal-line';
        let prefix = '$';
        if (type === 'success') {
            typeClass += ' terminal-success';
            prefix = '✓';
        } else if (type === 'warn') {
            typeClass += ' terminal-warn';
            prefix = '▲';
        } else if (type === 'error') {
            typeClass += ' terminal-error';
            prefix = '✕';
        } else if (type === 'data') {
            typeClass += ' terminal-data';
            prefix = '»';
        }

        const lineEl = document.createElement('div');
        lineEl.className = typeClass;

        const tsSpan = document.createElement('span');
        tsSpan.className = 'terminal-ts';
        tsSpan.textContent = `[${ts}]`;

        const prefixSpan = document.createElement('span');
        prefixSpan.className = 'terminal-prefix';
        prefixSpan.textContent = prefix;

        const textSpan = document.createElement('span');
        textSpan.className = 'terminal-text';
        textSpan.textContent = String(message);

        lineEl.appendChild(tsSpan);
        lineEl.appendChild(prefixSpan);
        lineEl.appendChild(textSpan);

        // Smart auto-scrolling: only auto-scroll if user is already near the bottom
        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight <= 60;

        container.appendChild(lineEl);

        if (isNearBottom) {
            container.scrollTop = container.scrollHeight;
        }

        this.lines.push({ ts, message: String(message), type });

        // Enforce maxLines truncation without leaking elements
        while (this.lines.length > this.maxLines) {
            this.lines.shift();
        }
        while (container.children.length > this.maxLines) {
            container.removeChild(container.firstElementChild);
        }
    }

    success(msg) { this.log(msg, 'success'); }
    warn(msg) { this.log(msg, 'warn'); }
    error(msg) { this.log(msg, 'error'); }
    data(msg) { this.log(msg, 'data'); }
    info(msg) { this.log(msg, 'info'); }

    clear() {
        const container = document.getElementById(this.containerId);
        if (container) container.innerHTML = '';
        this.lines = [];
    }

    exportLogs() {
        return this.lines.map(l => `[${l.ts}] ${l.type.toUpperCase()}: ${l.message}`).join('\n');
    }
}

if (typeof window !== 'undefined') {
    window.TechTerminal = TechTerminal;
}
