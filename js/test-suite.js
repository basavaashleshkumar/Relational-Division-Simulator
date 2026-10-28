/**
 * Relational Division Simulator
 * Automated Formal Verification Suite & Boundary Invariance Benchmark
 * Evaluates algebraic correctness, mathematical invariants, and error resilience
 */

class TestSuiteRunner {
    static getTests() {
        return [
            {
                id: 'TC-01',
                name: 'Standard Baseline Division (Single Qualifier)',
                category: 'Formal Verification',
                description: 'Formal Verification: Verifies that a candidate with exactly all divisor items qualifies, while candidates with incomplete sets are disqualified.',
                run: () => {
                    const R = new Relation('R', ['Student', 'Course'], [
                        { Student: 'Alice', Course: 'DB' },
                        { Student: 'Alice', Course: 'OS' },
                        { Student: 'Bob', Course: 'DB' }
                    ]);
                    const S = new Relation('S', ['Course'], [
                        { Course: 'DB' },
                        { Course: 'OS' }
                    ]);
                    const res = RelationalDivisionEngine.divide(R, S);
                    const qualified = res.T5.tuples.map(t => t.Student);
                    const passed = qualified.length === 1 && qualified[0] === 'Alice';
                    return {
                        passed,
                        expected: ['Alice'],
                        actual: qualified,
                        details: `Formal Verification: Expected only Alice. Found: [${qualified.join(', ')}]`
                    };
                }
            },
            {
                id: 'TC-02',
                name: 'Multiple Qualifying Candidates',
                category: 'Formal Verification',
                description: 'Formal Verification: Verifies that multiple candidates can simultaneously qualify if both satisfy the universal condition.',
                run: () => {
                    const R = new Relation('R', ['Emp', 'Skill'], [
                        { Emp: 'E1', Skill: 'SQL' },
                        { Emp: 'E1', Skill: 'Java' },
                        { Emp: 'E2', Skill: 'SQL' },
                        { Emp: 'E3', Skill: 'SQL' },
                        { Emp: 'E3', Skill: 'Java' }
                    ]);
                    const S = new Relation('S', ['Skill'], [
                        { Skill: 'SQL' },
                        { Skill: 'Java' }
                    ]);
                    const res = RelationalDivisionEngine.divide(R, S);
                    const qualified = res.T5.tuples.map(t => t.Emp).sort();
                    const expected = ['E1', 'E3'].sort();
                    const passed = JSON.stringify(qualified) === JSON.stringify(expected);
                    return {
                        passed,
                        expected,
                        actual: qualified,
                        details: `Formal Verification: Expected [E1, E3]. Found: [${qualified.join(', ')}]`
                    };
                }
            },
            {
                id: 'TC-03',
                name: 'Null Result / Disjoint Relations (Empty Set ∅)',
                category: 'Boundary Invariance',
                description: 'Boundary Invariance: Verifies that an empty relation is returned when no candidate possesses all required divisor items.',
                run: () => {
                    const R = new Relation('R', ['Candidate', 'Topic'], [
                        { Candidate: 'C1', Topic: 'AI' },
                        { Candidate: 'C2', Topic: 'ML' }
                    ]);
                    const S = new Relation('S', ['Topic'], [
                        { Topic: 'Cloud' },
                        { Topic: 'DevOps' }
                    ]);
                    const res = RelationalDivisionEngine.divide(R, S);
                    const passed = res.T5.cardinality === 0;
                    return {
                        passed,
                        expected: 0,
                        actual: res.T5.cardinality,
                        details: `Boundary Invariance: Expected 0 qualified tuples. Cardinality returned: ${res.T5.cardinality}`
                    };
                }
            },
            {
                id: 'TC-04',
                name: 'Single-Row Divisor (|S| = 1)',
                category: 'Boundary Invariance',
                description: 'Boundary Invariance: Verifies that division works correctly when divisor cardinality is reduced to a single tuple.',
                run: () => {
                    const R = new Relation('R', ['User', 'Role'], [
                        { User: 'AdminUser', Role: 'SuperAdmin' },
                        { User: 'GuestUser', Role: 'Guest' },
                        { User: 'EditorUser', Role: 'SuperAdmin' }
                    ]);
                    const S = new Relation('S', ['Role'], [
                        { Role: 'SuperAdmin' }
                    ]);
                    const res = RelationalDivisionEngine.divide(R, S);
                    const qualified = res.T5.tuples.map(t => t.User).sort();
                    const expected = ['AdminUser', 'EditorUser'].sort();
                    const passed = JSON.stringify(qualified) === JSON.stringify(expected);
                    return {
                        passed,
                        expected,
                        actual: qualified,
                        details: `Boundary Invariance: Expected [AdminUser, EditorUser]. Found: [${qualified.join(', ')}]`
                    };
                }
            },
            {
                id: 'TC-05',
                name: 'Superset Candidate (Standard vs Exact Division)',
                category: 'Formal Verification',
                description: 'Formal Verification: Tests that a candidate with extra items qualifies in standard division (R ÷ S) but is filtered in exact division (R ÷_exact S).',
                run: () => {
                    const R = new Relation('R', ['Student', 'Course'], [
                        { Student: 'NormalStudent', Course: 'C1' },
                        { Student: 'NormalStudent', Course: 'C2' },
                        { Student: 'Overachiever', Course: 'C1' },
                        { Student: 'Overachiever', Course: 'C2' },
                        { Student: 'Overachiever', Course: 'C3_EXTRA' }
                    ]);
                    const S = new Relation('S', ['Course'], [
                        { Course: 'C1' },
                        { Course: 'C2' }
                    ]);
                    const standardRes = RelationalDivisionEngine.divide(R, S);
                    const exactRes = RelationalDivisionEngine.divideExact(R, S);

                    const stdQualified = standardRes.T5.tuples.map(t => t.Student).sort();
                    const exactQualified = exactRes.exactResult.tuples.map(t => t.Student);

                    const stdPass = stdQualified.includes('NormalStudent') && stdQualified.includes('Overachiever');
                    const exactPass = exactQualified.length === 1 && exactQualified[0] === 'NormalStudent';

                    return {
                        passed: stdPass && exactPass,
                        expected: 'Std: [NormalStudent, Overachiever], Exact: [NormalStudent]',
                        actual: `Std: [${stdQualified.join(', ')}], Exact: [${exactQualified.join(', ')}]`,
                        details: 'Formal Verification: Standard division accepts supersets; Exact division strictly enforces no extras.'
                    };
                }
            },
            {
                id: 'TC-06',
                name: 'Composite Divisor Attributes (Multi-Column B)',
                category: 'Formal Verification',
                description: 'Formal Verification: Verifies division when divisor S contains multiple composite attributes (e.g., Course AND Semester).',
                run: () => {
                    const R = new Relation('R', ['StudentID', 'Course', 'Term'], [
                        { StudentID: 'ST1', Course: 'CS101', Term: 'Fall' },
                        { StudentID: 'ST1', Course: 'CS102', Term: 'Spring' },
                        { StudentID: 'ST2', Course: 'CS101', Term: 'Fall' }
                    ]);
                    const S = new Relation('S', ['Course', 'Term'], [
                        { Course: 'CS101', Term: 'Fall' },
                        { Course: 'CS102', Term: 'Spring' }
                    ]);
                    const res = RelationalDivisionEngine.divide(R, S);
                    const qualified = res.T5.tuples.map(t => t.StudentID);
                    const sqlObj = SQLGenerator.generateAll(R, S, res.candidateAttrs, res.divisorAttrs);
                    const hasCompositeSQL = sqlObj.groupByHaving.sql.includes('Course') && sqlObj.groupByHaving.sql.includes('Term');
                    const passed = qualified.length === 1 && qualified[0] === 'ST1' && hasCompositeSQL;
                    return {
                        passed,
                        expected: ['ST1'],
                        actual: qualified,
                        details: `Formal Verification: Multi-attribute divisor correctly resolved to ST1 with valid composite SQL generation.`
                    };
                }
            },
            {
                id: 'TC-07',
                name: 'Duplicate Tuple Elimination (Set Semantics)',
                category: 'Formal Verification',
                description: 'Formal Verification: Verifies that duplicate input tuples are automatically collapsed into set semantics and do not distort counts.',
                run: () => {
                    const R = new Relation('R', ['Person', 'Cert'], [
                        { Person: 'P1', Cert: 'Security+' },
                        { Person: 'P1', Cert: 'Security+' }, // Duplicate
                        { Person: 'P1', Cert: 'Network+' }
                    ]);
                    const S = new Relation('S', ['Cert'], [
                        { Cert: 'Security+' },
                        { Cert: 'Network+' }
                    ]);
                    const res = RelationalDivisionEngine.divide(R, S);
                    const qualified = res.T5.tuples.map(t => t.Person);
                    const passed = R.cardinality === 2 && qualified.length === 1 && qualified[0] === 'P1';
                    return {
                        passed,
                        expected: 'R cardinality 2, Qualified [P1]',
                        actual: `R cardinality ${R.cardinality}, Qualified [${qualified.join(', ')}]`,
                        details: 'Formal Verification: Duplicates safely removed according to first-order relational set theory.'
                    };
                }
            },
            {
                id: 'TC-08',
                name: 'Schema Mismatch Error Handling',
                category: 'Boundary Invariance',
                description: 'Boundary Invariance: Verifies that an illegal divisor schema (where S has attributes not in R) is caught and handled with an informative error.',
                run: () => {
                    const R = new Relation('R', ['ID', 'Name'], [
                        { ID: '1', Name: 'Alice' }
                    ]);
                    const S = new Relation('S', ['NonExistentAttribute'], [
                        { NonExistentAttribute: 'Val' }
                    ]);
                    let threwException = false;
                    try {
                        RelationalDivisionEngine.divide(R, S);
                    } catch (err) {
                        threwException = err.message.includes('do not exist in R');
                    }
                    const validation = RelationalDivisionEngine.validateSchemas(R, S);
                    const passed = validation.valid === false && validation.message.includes('do not exist in R') && threwException;
                    return {
                        passed,
                        expected: 'Validation error and exception thrown: S attributes must be a subset of R',
                        actual: validation.message,
                        details: 'Boundary Invariance: Invalid schema rejected gracefully via validation and division exception.'
                    };
                }
            }
        ];
    }

    /**
     * Run all test cases and return summarized results
     */
    static runAll() {
        const tests = this.getTests();
        const results = [];
        let passedCount = 0;
        const totalStart = performance.now();

        for (const t of tests) {
            const tStart = performance.now();
            let testResult;
            try {
                testResult = t.run();
            } catch (err) {
                testResult = {
                    passed: false,
                    expected: 'Execution without error',
                    actual: err.message,
                    details: err.stack
                };
            }
            const durationMs = (performance.now() - tStart).toFixed(2);
            if (testResult.passed) passedCount++;

            results.push({
                ...t,
                ...testResult,
                durationMs
            });
        }

        const totalDurationMs = (performance.now() - totalStart).toFixed(2);

        return {
            total: tests.length,
            passed: passedCount,
            failed: tests.length - passedCount,
            passRate: Math.round((passedCount / tests.length) * 100),
            totalDurationMs,
            results
        };
    }
}

if (typeof window !== 'undefined') {
    window.TestSuiteRunner = TestSuiteRunner;
    window.TestSuite = TestSuiteRunner;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TestSuiteRunner, TestSuite: TestSuiteRunner };
}
