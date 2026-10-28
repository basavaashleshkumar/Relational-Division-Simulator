/**
 * Export Generation Script
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { performance } = require('perf_hooks');

const jsDir = path.join(__dirname, '..', 'js');
const filesToLoad = ['presets.js', 'engine.js', 'sql-generator.js', 'test-suite.js', 'report-generator.js'];

let combinedCode = '';
filesToLoad.forEach(file => {
    combinedCode += '\n' + fs.readFileSync(path.join(jsDir, file), 'utf8');
});

combinedCode += `
this.PRESETS = PRESETS;
this.Relation = Relation;
this.RelationalDivisionEngine = RelationalDivisionEngine;
this.SQLGenerator = SQLGenerator;
this.TestSuiteRunner = TestSuiteRunner;
this.ReportGenerator = ReportGenerator;
`;

const sandbox = {
    console,
    process,
    require,
    Date,
    Math,
    JSON,
    String,
    Number,
    Array,
    Object,
    RegExp,
    Set,
    Map,
    Buffer,
    setTimeout,
    clearTimeout,
    performance
};
sandbox.window = sandbox;
sandbox.global = sandbox;
vm.createContext(sandbox);
vm.runInContext(combinedCode, sandbox);

const exportsDir = path.join(__dirname, '..', 'exports');
if (!fs.existsSync(exportsDir)) {
    fs.mkdirSync(exportsDir, { recursive: true });
}

console.log('================================================================');
console.log('  GENERATING PUBLICATION-GRADE ACADEMIC EXPORTS');
console.log('================================================================');

const { PRESETS, Relation, RelationalDivisionEngine, SQLGenerator, TestSuiteRunner, ReportGenerator } = sandbox;

// 1. Setup Canonical Relations from University Preset
const preset = PRESETS.university;
const R = new Relation(preset.rName, preset.rAttrs, preset.rTuples);
const S = new Relation(preset.sName, preset.sAttrs, preset.sTuples);

console.log(`[+] Loaded Dividend Relation R: "${R.name}" (${R.cardinality} tuples, degree ${R.degree})`);
console.log(`[+] Loaded Divisor Relation S : "${S.name}" (${S.cardinality} tuples, degree ${S.degree})`);

// 2. Execute 5-Step Relational Division Pipeline
const trace = RelationalDivisionEngine.divide(R, S);

console.log(`[+] Relational Division Pipeline executed in ${trace.metrics.executionTimeMs} ms`);
console.log(`[+] Candidate Universe (T1)       : ${trace.T1.cardinality} candidates`);
console.log(`[+] Cartesian Product (T2)        : ${trace.T2.cardinality} theoretical pairings`);
console.log(`[+] Deficit Missing Pairs (T3)    : ${trace.T3.cardinality} missing pairings`);
console.log(`[+] Disqualified Candidates (T4)  : ${trace.T4.cardinality} candidates`);
console.log(`[+] Formally Qualified Result (T5): ${trace.T5.cardinality} candidates`);

// 3. Compile Multi-Paradigm SQL Translations
const sqlObj = SQLGenerator.generateAll(R, S, trace.candidateAttrs, trace.divisorAttrs);
console.log('[+] Multi-paradigm SQL compilation generated (Double NOT EXISTS, GROUP BY/HAVING, EXCEPT, Exact Division)');

// 4. Run Formal Verification Benchmark Suite
let testResults = null;
if (typeof TestSuiteRunner !== 'undefined' && typeof TestSuiteRunner.runAll === 'function') {
    testResults = TestSuiteRunner.runAll();
    console.log(`[+] 8-Case Automated Invariant Suite: ${testResults.passed}/${testResults.total} PASSED (${testResults.runtimeMs} ms)`);
}

// 5. Generate and save all 4 formats

// 5.1 Format 1: Print-Ready HTML (for PDF export)
const htmlReport = ReportGenerator.generateAcademicHTML(trace, R, S, sqlObj);
fs.writeFileSync(path.join(exportsDir, 'Academic_Report_Relational_Division.html'), htmlReport, 'utf8');
console.log('[*] Saved: exports/Academic_Report_Relational_Division.html');

// 5.2 Format 2: MS Word (.doc)
const wordDoc = ReportGenerator.generateWordHTML(trace, R, S, sqlObj);
fs.writeFileSync(path.join(exportsDir, 'Academic_Report_Relational_Division.doc'), wordDoc, 'utf8');
console.log('[*] Saved: exports/Academic_Report_Relational_Division.doc');

// 5.3 Format 3: Markdown / Plain Text (.md / .txt)
const markdownReport = ReportGenerator.generateMarkdown(trace, R, S, sqlObj);
fs.writeFileSync(path.join(exportsDir, 'Academic_Report_Relational_Division.md'), markdownReport, 'utf8');
fs.writeFileSync(path.join(exportsDir, 'Academic_Report_Relational_Division.txt'), markdownReport, 'utf8');
console.log('[*] Saved: exports/Academic_Report_Relational_Division.md');
console.log('[*] Saved: exports/Academic_Report_Relational_Division.txt');

// 5.4 Format 4: RFC 4180 CSV Datasets
const csvR = ReportGenerator.toRFC4180CSV(R, { stage: 'Dividend Relation R (CourseEnrollments)' });
fs.writeFileSync(path.join(exportsDir, 'relation_R_dividend.csv'), csvR, 'utf8');
console.log('[*] Saved: exports/relation_R_dividend.csv');

const csvS = ReportGenerator.toRFC4180CSV(S, { stage: 'Divisor Relation S (MandatoryCoreCS)' });
fs.writeFileSync(path.join(exportsDir, 'relation_S_divisor.csv'), csvS, 'utf8');
console.log('[*] Saved: exports/relation_S_divisor.csv');

const csvT5 = ReportGenerator.toRFC4180CSV(trace.T5, { stage: 'Qualified Result Relation T5 (Final Quotient)' });
fs.writeFileSync(path.join(exportsDir, 'result_T5_division.csv'), csvT5, 'utf8');
console.log('[*] Saved: exports/result_T5_division.csv');

const fullTraceCSV = ReportGenerator.generateFullTraceCSV(trace, R, S);
fs.writeFileSync(path.join(exportsDir, 'complete_relational_division_trace.csv'), fullTraceCSV, 'utf8');
console.log('[*] Saved: exports/complete_relational_division_trace.csv');

// Save benchmark results
if (testResults) {
    fs.writeFileSync(path.join(exportsDir, 'verification_benchmarks.json'), JSON.stringify(testResults, null, 2), 'utf8');
    console.log('[*] Saved: exports/verification_benchmarks.json');
}

console.log('================================================================');
console.log('  ALL PUBLICATION-GRADE ARTIFACTS GENERATED SUCCESSFULLY!');
console.log('================================================================');
