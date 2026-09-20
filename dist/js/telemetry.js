/**
 * Telemetry & Sensor Stream Engine (ESP32 / MPU-6050 & Relational Engine I/O)
 * Generates live hardware metrics, 6-DOF sensor frames, and pipeline IO throughput
 */

class TelemetryEngine {
    constructor() {
        this.isRunning = true;
        this.sampleRateHz = 50;
        this.frameCounter = 1;
        this.baseComparisonsSec = 1420;
        this.mpuData = {
            accelX: 0.02,
            accelY: -0.01,
            accelZ: 0.98,
            gyroX: 0.12,
            gyroY: -0.24,
            gyroZ: 0.05,
            tempC: 28.4,
            roll: 1.2,
            pitch: -0.8,
            yaw: 42.1
        };
        this.engineStats = {
            activeTuples: 0,
            comparisonsSec: 1420,
            cacheHitRate: 99.4,
            pipelineLatencyUs: 280,
            lastFrameString: ''
        };
        this.listeners = [];
        this.interval = null;
        this.start();
    }

    start() {
        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(() => {
            if (!this.isRunning) return;
            this.updateData();
            this.notify();
        }, 1000 / this.sampleRateHz);
    }

    /**
     * Dynamically synchronize engine workload with sensor telemetry stream
     * @param {Object} metrics - metrics object from RelationalDivisionEngine.divide()
     * @param {number|string} elapsedMs - execution time in milliseconds
     */
    syncEngineWorkload(metrics, elapsedMs) {
        if (!metrics) return;
        const rCount = metrics.rTuplesCount || 0;
        const sCount = metrics.divisorCount || 0;
        const theoretical = metrics.theoreticalPairsCount || (rCount * sCount);
        const comparisons = theoretical + rCount;
        const elapsed = parseFloat(elapsedMs) || 0.5;

        this.engineStats.activeTuples = rCount + sCount;
        this.engineStats.pipelineLatencyUs = Math.round(elapsed * 1000);

        // Dynamically scale comparisons/sec based on workload
        const throughput = Math.round(comparisons / Math.max(0.001, elapsed / 1000));
        this.baseComparisonsSec = Math.max(1200, Math.min(throughput, 95000));
    }

    updateData() {
        // MPU-6050 small sinusoidal & random walk drift
        const t = performance.now() / 1000;
        this.mpuData.accelX = parseFloat((0.02 + Math.sin(t * 1.5) * 0.08 + (Math.random() - 0.5) * 0.02).toFixed(3));
        this.mpuData.accelY = parseFloat((-0.01 + Math.cos(t * 1.2) * 0.06 + (Math.random() - 0.5) * 0.02).toFixed(3));
        this.mpuData.accelZ = parseFloat((0.98 + Math.sin(t * 0.5) * 0.02 + (Math.random() - 0.5) * 0.01).toFixed(3));

        this.mpuData.gyroX = parseFloat((Math.sin(t * 2) * 1.2 + (Math.random() - 0.5) * 0.3).toFixed(2));
        this.mpuData.gyroY = parseFloat((Math.cos(t * 2) * 1.5 + (Math.random() - 0.5) * 0.3).toFixed(2));
        this.mpuData.gyroZ = parseFloat((Math.sin(t * 0.8) * 0.6 + (Math.random() - 0.5) * 0.2).toFixed(2));

        this.mpuData.roll = parseFloat((Math.atan2(this.mpuData.accelY, this.mpuData.accelZ) * 180 / Math.PI).toFixed(1));
        this.mpuData.pitch = parseFloat((Math.atan2(-this.mpuData.accelX, Math.sqrt(this.mpuData.accelY**2 + this.mpuData.accelZ**2)) * 180 / Math.PI).toFixed(1));
        this.mpuData.yaw = parseFloat(((this.mpuData.yaw + this.mpuData.gyroZ * 0.02 + 360) % 360).toFixed(1));
        this.mpuData.tempC = parseFloat((28.2 + Math.sin(t * 0.1) * 0.4).toFixed(1));

        // Coupled Engine stats with dynamic variance
        const jitter = (Math.random() - 0.5) * (this.baseComparisonsSec * 0.04);
        this.engineStats.comparisonsSec = Math.round(this.baseComparisonsSec + jitter);
        this.engineStats.cacheHitRate = parseFloat((99.1 + Math.random() * 0.8).toFixed(1));

        // Format telemetry packet frame
        const framePad = String(this.frameCounter++).padStart(5, '0');
        const sign = n => (n >= 0 ? '+' : '') + n;
        this.engineStats.lastFrameString = `[PKT-${framePad}] ACC:{X:${sign(this.mpuData.accelX)} Y:${sign(this.mpuData.accelY)} Z:${sign(this.mpuData.accelZ)}} GYR:{X:${sign(this.mpuData.gyroX)} Y:${sign(this.mpuData.gyroY)} Z:${sign(this.mpuData.gyroZ)}} OPS:${this.engineStats.comparisonsSec}`;
    }

    addListener(cb) {
        this.listeners.push(cb);
    }

    notify() {
        this.listeners.forEach(cb => cb(this.mpuData, this.engineStats));
    }
}

const telemetry = new TelemetryEngine();
if (typeof window !== 'undefined') window.telemetry = telemetry;
if (typeof module !== 'undefined' && module.exports) module.exports = { TelemetryEngine, telemetry };
