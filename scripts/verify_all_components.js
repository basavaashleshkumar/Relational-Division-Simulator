/**
 * Relational Division Simulator — Comprehensive Component Verification Suite
 * Executes automated tests against all modules, engines, presets, parsers, and UI components.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// 1. Mock minimal browser environment for testing
global.localStorage = {
    _data: {},
    getItem(k) { return this._data[k] || null; },
    setItem(k, v) { this._data[k] = String(v); },
    removeItem(k) { delete this._data[k]; },
    clear() { this._data = {}; }
};
global.sessionStorage = {
    _data: {},
    getItem(k) { return this._data[k] || null; },
    setItem(k, v) { this._data[k] = String(v); },
    removeItem(k) { delete this._data[k]; },
    clear() { this._data = {}; }
};
global.window = {
    location: { search: '', pathname: '/simulation.html', href: '' }
};

// Import modules
const { Relation, RelationalDivisionEngine } = require('../js/engine.js');
global.Relation = Relation;
global.RelationalDivisionEngine = RelationalDivisionEngine;
const { PRESETS } = require('../js/presets.js');
const { SQLGenerator } = require('../js/sql-generator.js');
global.SQLGenerator = SQLGenerator;
const { TestSuiteRunner } = require('../js/test-suite.js');
const { UniversalImporter } = require('../js/universal-importer.js');
const { CompetitiveExams } = require('../js/competitive-exams.js');
const { AIPractice } = require('../js/ai-practice.js');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition, testName, details = '') {
    totalChecks++;
    if (condition) {
        passedChecks++;
        console.log(`  [PASS] ${testName}`);
    } else {
        failedChecks++;
        console.error(`  [FAIL] ${testName}: ${details}`);
    }
}

console.log('================================================================');
console.log('  STARTING DETAILED COMPONENT INTEGRITY AUDIT');
console.log('================================================================\n');

// -------------------------------------------------------------
// SECTION 1: Automated 8-Case Boundary Test Suite
// -------------------------------------------------------------
console.log('>>> [1/8] Verifying 8-Case Automated Test Suite...');
const testSuiteResult = TestSuiteRunner.runAll();
assert(testSuiteResult.total === 8, 'Test suite total count equals 8');
assert(testSuiteResult.passed === 8, `All 8 test assertions passed (8/${testSuiteResult.total})`);
assert(testSuiteResult.passRate === 100, 'Pass rate is 100%');
testSuiteResult.results.forEach(r => {
    assert(r.passed, `Case ${r.id}: ${r.name}`);
});

// -------------------------------------------------------------
// SECTION 2: Domain Presets (All 7 Domains)
// -------------------------------------------------------------
console.log('\n>>> [2/8] Verifying 7 Domain Presets & Relational Division Output...');
const presetKeys = Object.keys(PRESETS);
assert(presetKeys.length === 7, `PRESETS contains exactly 7 industry scenarios (found: ${presetKeys.length})`);
assert(presetKeys.includes('irctc'), 'IRCTC Railway Reservation preset exists');

for (const key of presetKeys) {
    const p = PRESETS[key];
    assert(p.id && p.title && p.rName && p.sName, `Preset [${key}] metadata structure is complete`);
    
    const R = new Relation(p.rName, p.rAttrs, p.rTuples);
    const S = new Relation(p.sName, p.sAttrs, p.sTuples);
    
    assert(R.cardinality === p.rTuples.length, `Preset [${key}] Relation R cardinality matches tuple count (${R.cardinality})`);
    assert(S.cardinality === p.sTuples.length, `Preset [${key}] Relation S cardinality matches tuple count (${S.cardinality})`);

    // Run division
    const trace = RelationalDivisionEngine.divide(R, S);
    assert(trace.T1 && trace.T2 && trace.T3 && trace.T4 && trace.T5, `Preset [${key}] 5-Stage decomposition (T1..T5) computed`);

    // Extract qualified candidates
    const candidateAttr = p.rAttrs.find(a => !p.sAttrs.includes(a)) || p.rAttrs[0];
    const qualified = trace.T5.tuples.map(t => t.StudentName || t.CandidateName || t.DoctorName || t.SupplierName || t.Hostname || t.AstronautName || t.PassengerName);
    
    // Check against expectedQualified
    const allExpectedPresent = p.expectedQualified.every(eq => qualified.includes(eq));
    assert(allExpectedPresent, `Preset [${key}] expected candidates (${p.expectedQualified.join(', ')}) matched actual quotient (${qualified.join(', ')})`);
}

// -------------------------------------------------------------
// SECTION 3: Formal Relational Languages & SQL Generator (SL -> SQL -> TRC -> DRC)
// -------------------------------------------------------------
console.log('\n>>> [3/8] Verifying Formal Language & SQL Translation Studio...');
const sampleR = new Relation('CourseEnrollments', ['StudentID', 'CourseCode'], [
    { StudentID: 'S1', CourseCode: 'CS101' },
    { StudentID: 'S1', CourseCode: 'CS102' },
    { StudentID: 'S2', CourseCode: 'CS101' }
]);
const sampleS = new Relation('CoreCourses', ['CourseCode'], [
    { CourseCode: 'CS101' },
    { CourseCode: 'CS102' }
]);

const sqlGen = SQLGenerator.generateAll(sampleR, sampleS, ['StudentID'], ['CourseCode']);
assert(sqlGen.relationalAlgebra && sqlGen.relationalAlgebra.formula.includes('Π'), 'Symbolic Language (SL / RA) formula generated');
assert(sqlGen.relationalAlgebra.steps.includes('T1 =') && sqlGen.relationalAlgebra.steps.includes('T5 ='), 'Relational Algebra 5-step decomposition verified');

assert(sqlGen.tupleCalculus && sqlGen.tupleCalculus.formula.includes('∀ s ∈ CoreCourses'), 'Tuple Relational Calculus (TRC) universal quantifier generated');
assert(sqlGen.tupleCalculus.safeNegationFormula.includes('¬ ∃ s ∈ CoreCourses'), 'TRC safe computational negation generated');

assert(sqlGen.domainCalculus && sqlGen.domainCalculus.formula.includes('⇒'), 'Domain Relational Calculus (DRC) implication generated');
assert(sqlGen.domainCalculus.safeNegationFormula.includes('∉'), 'DRC safe domain-independent form generated');

assert(sqlGen.doubleNotExists && sqlGen.doubleNotExists.sql.includes('NOT EXISTS'), 'SQL Paradigm 1: Double NOT EXISTS generated');
assert(sqlGen.groupByHaving && sqlGen.groupByHaving.sql.includes('HAVING') && sqlGen.groupByHaving.sql.includes('COUNT(DISTINCT'), 'SQL Paradigm 2: GROUP BY HAVING COUNT(DISTINCT) generated');
assert(sqlGen.setDifference && (sqlGen.setDifference.sql.includes('EXCEPT') || sqlGen.setDifference.sql.includes('MINUS')), 'SQL Paradigm 3: Set Difference generated');
assert(sqlGen.exactDivision && sqlGen.exactDivision.sql.includes('COUNT(DISTINCT'), 'SQL Paradigm 4: Exact Division SQL generated');

// -------------------------------------------------------------
// SECTION 4: Universal Multi-Format Data Importer
// -------------------------------------------------------------
console.log('\n>>> [4/8] Verifying Universal Data Importer (CSV, JSON, Excel, SQL)...');

// Test 4.1: CSV Comma-delimited
const csvR = `StudentID,CourseCode\nCS101,CSE201\nCS101,CSE202\nCS102,CSE201`;
const csvS = `CourseCode\nCSE201\nCSE202`;
const parsedCsvR = UniversalImporter.parseDelimited(csvR);
const parsedCsvS = UniversalImporter.parseDelimited(csvS);
assert(parsedCsvR.attrs.length === 2 && parsedCsvR.tuples.length === 3, 'CSV Parser: Dividend relation R parsed');
assert(parsedCsvS.attrs.length === 1 && parsedCsvS.tuples.length === 2, 'CSV Parser: Divisor relation S parsed');

// Test 4.2: Tab-delimited (Excel copy-paste)
const excelR = `EmpID\tSkill\nE1\tSQL\nE1\tPython\nE2\tSQL`;
const parsedExcelR = UniversalImporter.parseDelimited(excelR);
assert(parsedExcelR.attrs.length === 2 && parsedExcelR.tuples.length === 3, 'Excel TSV Parser: Tab-delimited rows parsed');

// Test 4.3: JSON Structure
const jsonSample = JSON.stringify({
    R: [{ id: '1', item: 'A' }, { id: '1', item: 'B' }],
    S: [{ item: 'A' }, { item: 'B' }]
});
const parsedJson = UniversalImporter.parseJSON(jsonSample);
assert(parsedJson.rTuples.length === 2 && parsedJson.sTuples.length === 2, 'JSON Parser: Structured R and S parsed');

// Test 4.4: Raw SQL DDL & DML Scripts
const sqlScript = `
CREATE TABLE PassengerReservations (PNR VARCHAR(10), Station VARCHAR(10));
INSERT INTO PassengerReservations VALUES ('P1', 'NDLS'), ('P1', 'CNB'), ('P2', 'NDLS');

CREATE TABLE RequiredStops (Station VARCHAR(10));
INSERT INTO RequiredStops VALUES ('NDLS'), ('CNB');
`;
const parsedSql = UniversalImporter.parseSQL(sqlScript);
assert(parsedSql.rName === 'PassengerReservations' && parsedSql.rTuples.length === 3, 'SQL Parser: CREATE TABLE & multi-row INSERT INTO parsed for R');
assert(parsedSql.sName === 'RequiredStops' && parsedSql.sTuples.length === 2, 'SQL Parser: Divisor S parsed from SQL script');

// End-to-end import execution
const importedR = new Relation(parsedSql.rName, parsedSql.rAttrs, parsedSql.rTuples);
const importedS = new Relation(parsedSql.sName, parsedSql.sAttrs, parsedSql.sTuples);
const importedTrace = RelationalDivisionEngine.divide(importedR, importedS);
assert(importedTrace.T5.tuples.length === 1 && importedTrace.T5.tuples[0].PNR === 'P1', 'End-to-End Imported SQL Script Division executed: P1 qualifies');

// -------------------------------------------------------------
// SECTION 5: Competitive Exams & GATE Portal (50 Questions)
// -------------------------------------------------------------
console.log('\n>>> [5/8] Verifying Competitive Exams & GATE Portal Module...');
const questions = CompetitiveExams.questions;
assert(questions.length === 50, `Competitive Exams database contains exactly 50 questions (found: ${questions.length})`);

let allExamsValid = true;
questions.forEach(q => {
    if (!q.id || !q.exam || !q.title || !q.question || !q.options || !q.explanation) allExamsValid = false;
    const correctCount = q.options.filter(o => o.isCorrect).length;
    if (correctCount !== 1) allExamsValid = false;
});
assert(allExamsValid, 'All competitive questions have valid options and single correct answer');

// Test modal HTML generation
const examHtml = CompetitiveExams.renderModalHtml();
assert(examHtml.includes('global-exams-modal') && examHtml.includes('GATE CSE'), 'Competitive Exams modal HTML renders with GATE problems');

// Test stats tracking
CompetitiveExams.saveAnswer('gate-2019', 'A', true);
const stats = CompetitiveExams.getStats();
assert(stats.attempted >= 1 && stats.correct >= 1 && stats.streak >= 1, 'Competitive Exams user stats & streak tracking works');

// -------------------------------------------------------------
// SECTION 6: AI for Practice & Query Pitfall Analyzer
// -------------------------------------------------------------
console.log('\n>>> [6/8] Verifying AI for Practice Sandbox...');
const challenges = AIPractice.challenges;
assert(challenges.length >= 3, `AI Practice database contains ${challenges.length} multi-domain challenges`);

challenges.forEach(c => {
    assert(c.standardQualified && c.exactQualified && c.hints && c.pitfalls, `Challenge [${c.id}] has complete metadata, hints, and expected answers`);
});

// Test AI Query Analyzer
const doubleNotExistsAnalysis = AIPractice.analyzeSQLQuery(`
SELECT DISTINCT R1.StudentID FROM Enrollments R1
WHERE NOT EXISTS (
    SELECT * FROM Courses S
    WHERE NOT EXISTS (
        SELECT * FROM Enrollments R2 WHERE R2.StudentID = R1.StudentID AND R2.Course = S.Course
    )
);
`);
assert(doubleNotExistsAnalysis.valid && doubleNotExistsAnalysis.grade === 'Sound', 'AI Analyzer identifies correct Double NOT EXISTS query');

const pitfallAnalysis = AIPractice.analyzeSQLQuery(`
SELECT sid FROM Catalog JOIN Parts ON Catalog.pid = Parts.pid
GROUP BY sid HAVING COUNT(pid) = (SELECT COUNT(*) FROM Parts);
`);
assert(pitfallAnalysis.feedback.some(f => f.includes('Critical Pitfall') && f.includes('DISTINCT')), 'AI Analyzer successfully catches missing DISTINCT in COUNT() pitfall!');

const notInAnalysis = AIPractice.analyzeSQLQuery(`SELECT sid FROM Catalog WHERE pid NOT IN (SELECT pid FROM Parts)`);
assert(notInAnalysis.feedback.some(f => f.includes('Three-Valued Logic Risk') && f.includes('NULL')), 'AI Analyzer warns against NOT IN three-valued logic pitfall with NULLs');

// -------------------------------------------------------------
// SECTION 7: HTML & Client Asset Integrity
// -------------------------------------------------------------
console.log('\n>>> [7/8] Verifying HTML & Client Markup Files...');
const pages = ['index.html', 'dashboard.html', 'simulation.html', 'documentation.html'];

for (const p of pages) {
    const fpath = path.join(ROOT_DIR, p);
    assert(fs.existsSync(fpath), `Page ${p} exists on filesystem`);
    const content = fs.readFileSync(fpath, 'utf8');

    assert(content.includes('components/Layout.js'), `${p} loads components/Layout.js`);
    assert(content.includes('js/competitive-exams.js'), `${p} loads js/competitive-exams.js`);
    assert(content.includes('js/ai-practice.js'), `${p} loads js/ai-practice.js`);
    assert(content.includes('js/universal-importer.js'), `${p} loads js/universal-importer.js`);

    // Verify 0 occurrences of deprecated badges
    assert(!content.includes('240Hz'), `${p} contains 0 instances of deprecated 240Hz`);
    assert(!content.includes('RESEARCH_RELEASE'), `${p} contains 0 instances of RESEARCH_RELEASE`);
}

// -------------------------------------------------------------
// SECTION 8: Distribution Bundle (dist/) Sync
// -------------------------------------------------------------
console.log('\n>>> [8/8] Verifying Distribution (dist/) Synchronization...');
const distManifestPath = path.join(ROOT_DIR, 'dist', 'dist-manifest.json');
assert(fs.existsSync(distManifestPath), 'dist/dist-manifest.json exists');

const manifest = JSON.parse(fs.readFileSync(distManifestPath, 'utf8'));
assert(manifest.totalFiles >= 45, `dist contains ${manifest.totalFiles} packaged artifacts`);

const criticalDistFiles = [
    'index.html',
    'dashboard.html',
    'simulation.html',
    'documentation.html',
    'js/competitive-exams.js',
    'js/ai-practice.js',
    'js/universal-importer.js',
    'js/engine.js',
    'js/presets.js',
    'js/sql-generator.js',
    'components/Layout.js'
];
criticalDistFiles.forEach(cf => {
    const distFpath = path.join(ROOT_DIR, 'dist', cf);
    assert(fs.existsSync(distFpath), `Critical artifact dist/${cf} exists in distribution`);
});

console.log('\n================================================================');
console.log(`  AUDIT RESULTS: ${passedChecks}/${totalChecks} CHECKS PASSED (${Math.round((passedChecks/totalChecks)*100)}%)`);
console.log(`  FAILURES: ${failedChecks}`);
console.log('================================================================\n');

if (failedChecks > 0) {
    process.exit(1);
} else {
    process.exit(0);
}
