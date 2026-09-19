/**
 * BACSE202: Relational Division Simulator
 * Core Relational Algebra & Division Engine
 * Implements pure Relational Algebra operations:
 * - Projection (Π)
 * - Cartesian Product (×)
 * - Set Difference (-)
 * - Selection (σ)
 * - Classical 5-Step Relational Division (R ÷ S)
 * - Exact Division (R ÷_exact S)
 * - Partial / Fuzzy Division with Coverage Metrics
 */

class Relation {
    /**
     * @param {string} name - Relation identifier (e.g. 'R', 'S', 'Enrolled')
     * @param {string[]} attributes - Ordered list of attribute names
     * @param {Array<Object<string, any>>} tuples - Array of tuple objects { attr: value }
     */
    constructor(name, attributes, tuples = []) {
        this.name = name;
        this.attributes = [...new Set(attributes)];
        this.tuples = [];
        tuples.forEach(t => this.addTuple(t));
    }

    /**
     * Normalize and add a tuple ensuring set semantics (no duplicates)
     * @param {Object<string, any>} tuple
     */
    addTuple(tuple) {
        const normalized = {};
        for (const attr of this.attributes) {
            let val = tuple[attr];
            if (val === undefined || val === null) {
                val = '';
            }
            normalized[attr] = String(val).trim();
        }

        if (!this.containsTuple(normalized)) {
            this.tuples.push(normalized);
        }
    }

    /**
     * Check if relation already contains an identical tuple
     * @param {Object<string, any>} tuple
     * @returns {boolean}
     */
    containsTuple(tuple) {
        return this.tuples.some(existing => {
            return this.attributes.every(attr => {
                const val = tuple[attr];
                const normVal = (val === undefined || val === null) ? '' : String(val).trim();
                return existing[attr] === normVal;
            });
        });
    }

    /**
     * Return cardinality (number of tuples)
     */
    get cardinality() {
        return this.tuples.length;
    }

    /**
     * Return degree (number of attributes)
     */
    get degree() {
        return this.attributes.length;
    }

    /**
     * Deep clone relation
     */
    clone(newName = this.name) {
        return new Relation(newName, this.attributes, this.tuples.map(t => ({ ...t })));
    }

    /**
     * Project relation onto a subset of attributes: Π_{attrs}(Relation)
     * @param {string[]} attrs
     * @param {string} resultName
     * @returns {Relation}
     */
    project(attrs, resultName = `Π_${attrs.join(',')}(${this.name})`) {
        const missingAttrs = attrs.filter(a => !this.attributes.includes(a));
        if (missingAttrs.length > 0) {
            throw new Error(`Projection attribute(s) [${missingAttrs.join(', ')}] do not exist in relation ${this.name}`);
        }
        const result = new Relation(resultName, attrs);
        for (const tuple of this.tuples) {
            const projected = {};
            for (const a of attrs) {
                projected[a] = tuple[a];
            }
            result.addTuple(projected);
        }
        return result;
    }

    /**
     * Cartesian Product of two relations: R × S
     * @param {Relation} other
     * @param {string} resultName
     * @returns {Relation}
     */
    cartesianProduct(other, resultName = `(${this.name} × ${other.name})`) {
        // Disambiguate duplicate attribute names if any
        const combinedAttrs = [];
        const thisMapping = {};
        const otherMapping = {};

        for (const attr of this.attributes) {
            let finalName = attr;
            if (other.attributes.includes(attr)) {
                finalName = `${this.name}_${attr}`;
            }
            combinedAttrs.push(finalName);
            thisMapping[attr] = finalName;
        }

        for (const attr of other.attributes) {
            let finalName = attr;
            if (this.attributes.includes(attr)) {
                finalName = `${other.name}_${attr}`;
            }
            if (!combinedAttrs.includes(finalName)) {
                combinedAttrs.push(finalName);
            }
            otherMapping[attr] = finalName;
        }

        const result = new Relation(resultName, combinedAttrs);

        for (const t1 of this.tuples) {
            for (const t2 of other.tuples) {
                const combinedTuple = {};
                for (const a of this.attributes) {
                    combinedTuple[thisMapping[a]] = t1[a];
                }
                for (const b of other.attributes) {
                    combinedTuple[otherMapping[b]] = t2[b];
                }
                result.addTuple(combinedTuple);
            }
        }

        return result;
    }

    /**
     * Set Difference between two union-compatible relations: R - S
     * @param {Relation} other
     * @param {string} resultName
     * @returns {Relation}
     */
    difference(other, resultName = `(${this.name} - ${other.name})`) {
        // Must have same degree and attribute names
        const result = new Relation(resultName, this.attributes);
        for (const t of this.tuples) {
            if (!other.containsTuple(t)) {
                result.addTuple(t);
            }
        }
        return result;
    }

    /**
     * Convert to array of objects
     */
    toArray() {
        return this.tuples.map(t => ({ ...t }));
    }

    /**
     * Convert to CSV string
     */
    toCSV() {
        const header = this.attributes.join(',');
        const rows = this.tuples.map(t => this.attributes.map(a => {
            const val = (t[a] === undefined || t[a] === null) ? '' : String(t[a]);
            return `"${val.replace(/"/g, '""')}"`;
        }).join(','));
        return [header, ...rows].join('\n');
    }
}

class RelationalDivisionEngine {
    /**
     * Validates that schema(S) is a non-empty strict subset of schema(R)
     * @param {Relation} R
     * @param {Relation} S
     * @returns {{ valid: boolean, message: string, candidateAttrs: string[], divisorAttrs: string[] }}
     */
    static validateSchemas(R, S) {
        if (!R || !S) {
            return { valid: false, message: 'Both Dividend Relation (R) and Divisor Relation (S) must be provided.' };
        }

        const rAttrs = R.attributes;
        const sAttrs = S.attributes;

        if (sAttrs.length === 0) {
            return { valid: false, message: 'Divisor relation (S) must have at least one attribute.' };
        }

        // Every attribute of S must exist in R
        const missingInR = sAttrs.filter(attr => !rAttrs.includes(attr));
        if (missingInR.length > 0) {
            return {
                valid: false,
                message: `Schema error: Attribute(s) [${missingInR.join(', ')}] of S do not exist in R. Divisor attributes must be a subset of Dividend attributes.`
            };
        }

        // Target / Candidate attributes: A = attr(R) - attr(S)
        const candidateAttrs = rAttrs.filter(attr => !sAttrs.includes(attr));
        if (candidateAttrs.length === 0) {
            return {
                valid: false,
                message: 'Schema error: Dividend (R) and Divisor (S) have identical schemas. Result relation would have 0 attributes (empty schema).'
            };
        }

        if (S.cardinality === 0) {
            return {
                valid: true,
                warning: 'Divisor relation (S) contains 0 tuples. In relational algebra, division by empty set vacuously qualifies all candidates, or is mathematically undefined.',
                candidateAttrs,
                divisorAttrs: sAttrs
            };
        }

        return {
            valid: true,
            candidateAttrs,
            divisorAttrs: sAttrs
        };
    }

    /**
     * Executes the Classical 5-Step Relational Division: R ÷ S
     * Step 1: T1 = Π_A(R)                 - All candidate entities in R
     * Step 2: T2 = T1 × S                 - All theoretical pairings between candidates and S
     * Step 3: T3 = T2 - R                 - Disqualifying pairings (pairings missing from R)
     * Step 4: T4 = Π_A(T3)                - Candidates that missed at least one requirement in S
     * Step 5: T5 = T1 - T4                - Final qualified candidates that satisfy ALL requirements in S
     *
     * @param {Relation} R - Dividend relation (e.g. Enrolled)
     * @param {Relation} S - Divisor relation (e.g. RequiredCourses)
     * @returns {Object} Full execution trace with intermediate relations
     */
    static divide(R, S) {
        const startTime = performance.now();
        const validation = this.validateSchemas(R, S);
        if (!validation.valid) {
            throw new Error(validation.message);
        }

        const A = validation.candidateAttrs;
        const B = validation.divisorAttrs;

        // Step 1: Candidate projection
        // T1 = Π_A(R)
        const T1 = R.project(A, `T1: Candidate Entities [Π_{${A.join(',')}}(R)]`);

        // Step 2: Cartesian Product of candidates with Divisor
        // T2 = T1 × S (attribute order aligned to R's schema A U B)
        const T2_raw = T1.cartesianProduct(S, `T2: All Theoretical Pairs [T1 × S]`);
        // Normalize attribute names of T2 to match R's exact attribute names
        const T2 = new Relation(`T2: All Theoretical Pairings [Π_A(R) × S]`, R.attributes);
        for (const t of T2_raw.tuples) {
            const norm = {};
            for (const a of A) {
                norm[a] = t[a] !== undefined ? t[a] : (t[`${T1.name}_${a}`] !== undefined ? t[`${T1.name}_${a}`] : t[`T1_${a}`]);
            }
            for (const b of B) {
                norm[b] = t[b] !== undefined ? t[b] : (t[`${S.name}_${b}`] !== undefined ? t[`${S.name}_${b}`] : t[`S_${b}`]);
            }
            T2.addTuple(norm);
        }

        // Step 3: Missing combinations (T2 - R)
        // Disqualifying pairings: combinations that candidates SHOULD have but DON'T have in R
        const T3 = T2.difference(R, `T3: Missing Disqualifying Pairs [(Π_A(R) × S) - R]`);

        // Step 4: Disqualified candidates
        // T4 = Π_A(T3)
        const T4 = T3.project(A, `T4: Disqualified Candidates [Π_A(T3)]`);

        // Step 5: Final Qualified Candidates
        // T5 = T1 - T4
        const T5 = T1.difference(T4, `T5: Final Result [R ÷ S]`);

        const executionTimeMs = (performance.now() - startTime).toFixed(2);

        // Compute Detailed Candidate Audit Breakdown
        const candidateAudit = this.generateCandidateAudit(R, S, A, B, T1, T5);

        return {
            valid: true,
            R,
            S,
            candidateAttrs: A,
            divisorAttrs: B,
            T1, // Candidates
            T2, // All theoretical pairs
            T3, // Missing pairs
            T4, // Disqualified
            T5, // Result
            candidateAudit,
            metrics: {
                executionTimeMs,
                totalCandidates: T1.cardinality,
                qualifiedCount: T5.cardinality,
                disqualifiedCount: T4.cardinality,
                divisorCount: S.cardinality,
                rTuplesCount: R.cardinality,
                theoreticalPairsCount: T2.cardinality,
                missingPairsCount: T3.cardinality
            }
        };
    }

    /**
     * Detailed breakdown for each candidate entity
     */
    static generateCandidateAudit(R, S, A, B, T1, T5) {
        const audit = [];

        for (const candidateTuple of T1.tuples) {
            // Find all B values this candidate possesses in R
            const matchingTuplesInR = R.tuples.filter(rTuple => {
                return A.every(a => rTuple[a] === candidateTuple[a]);
            });

            // Enforce set semantics: distinct B tuples possessed by this candidate
            const possessedBTuples = [];
            for (const rTuple of matchingTuplesInR) {
                const bVal = {};
                for (const b of B) bVal[b] = rTuple[b];
                const alreadyExists = possessedBTuples.some(existing => B.every(b => existing[b] === bVal[b]));
                if (!alreadyExists) {
                    possessedBTuples.push(bVal);
                }
            }

            // Compare against divisor S
            const matchedS = [];
            const missingS = [];

            for (const sTuple of S.tuples) {
                const found = possessedBTuples.some(pTuple => {
                    return B.every(b => pTuple[b] === sTuple[b]);
                });
                if (found) {
                    matchedS.push(sTuple);
                } else {
                    missingS.push(sTuple);
                }
            }

            // Unrelated / Extra items possessed by candidate outside S
            const extraItems = possessedBTuples.filter(pTuple => {
                return !S.containsTuple(pTuple);
            });

            // Under classical logic (and intermediate T5 derivation), if S is empty,
            // all candidate requirements are vacuously satisfied (0 missing).
            const isQualified = missingS.length === 0;
            const matchPercentage = S.cardinality > 0
                ? Math.round((matchedS.length / S.cardinality) * 100)
                : 100;

            audit.push({
                candidate: candidateTuple,
                candidateKey: A.map(a => `${a}=${candidateTuple[a]}`).join(', '),
                matchedS,
                missingS,
                extraItems,
                matchedCount: matchedS.length,
                totalRequired: S.cardinality,
                matchPercentage,
                isQualified,
                isExactQualified: isQualified && extraItems.length === 0
            });
        }

        // Sort: qualified first, then by match percentage descending
        audit.sort((a, b) => {
            if (a.isQualified !== b.isQualified) return a.isQualified ? -1 : 1;
            return b.matchPercentage - a.matchPercentage;
        });

        return audit;
    }

    /**
     * Exact Division: R ÷_exact S
     * Candidates that have ALL tuples in S and NO extra tuples
     */
    static divideExact(R, S) {
        const standardResult = this.divide(R, S);
        const A = standardResult.candidateAttrs;
        const exactResult = new Relation(`Result: Exact Division [R ÷_{exact} S]`, A);

        for (const item of standardResult.candidateAudit) {
            if (item.isExactQualified) {
                exactResult.addTuple(item.candidate);
            }
        }

        return {
            ...standardResult,
            exactResult,
            exactQualifiedCount: exactResult.cardinality
        };
    }

    /**
     * Partial / Fuzzy Division by threshold percentage
     * @param {Relation} R
     * @param {Relation} S
     * @param {number} thresholdPercent (0 - 100)
     */
    static dividePartial(R, S, thresholdPercent = 75) {
        const standardResult = this.divide(R, S);
        const A = standardResult.candidateAttrs;
        const partialResult = new Relation(`Result: Partial Division (≥ ${thresholdPercent}%)`, [...A, 'Match_Score']);

        for (const item of standardResult.candidateAudit) {
            if (item.matchPercentage >= thresholdPercent) {
                const tupleWithScore = { ...item.candidate, Match_Score: `${item.matchPercentage}% (${item.matchedCount}/${item.totalRequired})` };
                partialResult.addTuple(tupleWithScore);
            }
        }

        return {
            ...standardResult,
            thresholdPercent,
            partialResult,
            partialCount: partialResult.cardinality
        };
    }
}

// Export for browser and node environments
if (typeof window !== 'undefined') {
    window.RelationalDivisionEngine = RelationalDivisionEngine;
    window.RelationalEngine = RelationalDivisionEngine;
    window.Engine = RelationalDivisionEngine;
    window.Relation = Relation;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Relation, RelationalDivisionEngine, RelationalEngine: RelationalDivisionEngine, Engine: RelationalDivisionEngine };
}
