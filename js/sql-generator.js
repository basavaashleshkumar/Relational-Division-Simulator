/**
 * Relational Division Simulator
 * SQL Multi-Dialect Code Generator & Query Analyzer
 * Translates Relational Division (R ÷ S) into:
 * 1. Double NOT EXISTS (Universal Quantification / Codd's Relational Completeness)
 * 2. Aggregation: GROUP BY ... HAVING COUNT(DISTINCT ...)
 * 3. Set Difference: EXCEPT / MINUS subqueries
 * 4. Exact Division SQL Formulation
 */

class SQLGenerator {
    /**
     * Generate all SQL formulations for given relations R and S
     * @param {Relation} R - Dividend relation
     * @param {Relation} S - Divisor relation
     * @param {string[]} candidateAttrs - Attributes in A (R - S)
     * @param {string[]} divisorAttrs - Attributes in B (S)
     * @returns {Object} Formatted SQL queries and theoretical explanations
     */
    static generateAll(R, S, candidateAttrs, divisorAttrs) {
        const rName = R.name.replace(/[^a-zA-Z0-9_]/g, '') || 'R';
        const sName = S.name.replace(/[^a-zA-Z0-9_]/g, '') || 'S';

        const doubleNotExists = this.generateDoubleNotExists(rName, sName, candidateAttrs, divisorAttrs);
        const groupByHaving = this.generateGroupByHaving(rName, sName, candidateAttrs, divisorAttrs);
        const setDifference = this.generateSetDifference(rName, sName, candidateAttrs, divisorAttrs);
        const exactDivision = this.generateExactDivision(rName, sName, candidateAttrs, divisorAttrs);
        const relationalAlgebra = this.generateRelationalAlgebra(rName, sName, candidateAttrs, divisorAttrs);
        const tupleCalculus = this.generateTRC(rName, sName, candidateAttrs, divisorAttrs);
        const domainCalculus = this.generateDRC(rName, sName, candidateAttrs, divisorAttrs);

        return {
            doubleNotExists,
            groupByHaving,
            setDifference,
            exactDivision,
            relationalAlgebra,
            tupleCalculus,
            domainCalculus
        };
    }

    /**
     * 1. Double NOT EXISTS formulation
     * Formula: ∀ y ∈ S, P(x, y) ≡ ¬ ∃ y ∈ S ( ¬ P(x, y) )
     */
    static generateDoubleNotExists(rName, sName, candidateAttrs, divisorAttrs) {
        const selectCols = candidateAttrs.map(a => `R1.${a}`).join(', ');
        const joinConditions = divisorAttrs.map(b => `R2.${b} = S.${b}`).join(' AND ');
        const candidateMatch = candidateAttrs.map(a => `R2.${a} = R1.${a}`).join(' AND ');

        const sql = `-- ====================================================================
-- METHOD 1: Double NOT EXISTS (Universal Quantifier Translation)
-- Theoretical Basis: Codd's Relational Completeness (∀ y ∈ S, ∃ x ∈ R)
-- Intuition: "Find candidates R1 where there DOES NOT EXIST any item in S
--             that R1 has NOT acquired."
-- Compatible with: MySQL, PostgreSQL, Oracle, SQLite, SQL Server
-- Note: Table aliases omit 'AS' for universal Oracle/ANSI SQL compliance.
-- ====================================================================

SELECT DISTINCT
    ${selectCols}
FROM
    ${rName} R1
WHERE NOT EXISTS (
    -- All required items in S
    SELECT *
    FROM ${sName} S
    WHERE NOT EXISTS (
        -- Check if candidate R1 satisfies this specific required item
        SELECT *
        FROM ${rName} R2
        WHERE ${candidateMatch}
          AND ${joinConditions}
    )
);`;

        const explanation = `
### Double NOT EXISTS Mechanics:
- **First NOT EXISTS**: Filters out candidates who are missing at least one item from \`${sName}\`.
- **Second NOT EXISTS**: Identifies whether the current candidate \`R1\` is missing the particular item \`S\`.
- **Universal Quantifier Transformation**: In classical logic, $\\forall y \\in S, P(x,y) \\iff \\neg \\exists y \\in S [ \\neg P(x,y) ]$. This is the standard method prescribed by E.F. Codd and C.J. Date.
- **Dialect Portability**: Universal across PostgreSQL, MySQL, SQLite, Oracle, and Microsoft SQL Server.
`;

        return { sql, explanation, title: 'Double NOT EXISTS (Universal Negation)' };
    }

    /**
     * 2. GROUP BY ... HAVING COUNT(DISTINCT ...) formulation
     */
    static generateGroupByHaving(rName, sName, candidateAttrs, divisorAttrs) {
        const selectCols = candidateAttrs.map(a => `R.${a}`).join(', ');
        const groupByCols = candidateAttrs.map(a => `R.${a}`).join(', ');
        const joinConditions = divisorAttrs.map(b => `R.${b} = S.${b}`).join(' AND ');
        
        // Handle single vs composite divisor attributes
        const countDistinctExpr = divisorAttrs.length === 1
            ? `R.${divisorAttrs[0]}`
            : divisorAttrs.map(b => `R.${b}`).join(" || '~' || ");

        const sql = `-- ====================================================================
-- METHOD 2: Aggregation Division (GROUP BY ... HAVING COUNT)
-- Theoretical Basis: Counting distinct matches against divisor cardinality
-- Intuition: "Join R with S, group by candidate, and retain only those
--             whose distinct count of matched S items equals |S|."
-- Compatible with: MySQL, PostgreSQL, Oracle, SQLite, SQL Server
-- Note: Composite attributes use ANSI string concatenation (||) or CONCAT().
-- ====================================================================

SELECT
    ${selectCols}
FROM
    ${rName} R
INNER JOIN
    ${sName} S
    ON ${joinConditions}
GROUP BY
    ${groupByCols}
HAVING
    COUNT(DISTINCT ${countDistinctExpr}) = (
        SELECT COUNT(*) FROM ${sName}
    );`;

        const explanation = `
### Aggregation Mechanics:
- **Inner Join**: Restricts candidate records in \`${rName}\` to only those items that exist in \`${sName}\`.
- **GROUP BY**: Groups rows by the candidate identity (\`${groupByCols}\`).
- **HAVING COUNT(DISTINCT ...)**: Verifies that the candidate has matched **every distinct requirement** in \`${sName}\`.
- **Composite Divisors**: For multi-column divisors (${divisorAttrs.join(', ')}), distinct combinations are counted via ANSI string concatenation \`||\` (or \`COUNT(DISTINCT col1, col2)\` in MySQL).
- **Performance Note**: Highly optimized by modern database query planners via Hash Joins or Index Scans, often outperforming correlated subqueries.
`;

        return { sql, explanation, title: 'Aggregation (GROUP BY ... HAVING COUNT)' };
    }

    /**
     * 3. Set Difference (EXCEPT / MINUS) formulation
     */
    static generateSetDifference(rName, sName, candidateAttrs, divisorAttrs) {
        const selectCols = candidateAttrs.map(a => `R1.${a}`).join(', ');
        const sCols = divisorAttrs.map(b => `S.${b}`).join(', ');
        const rCols = divisorAttrs.map(b => `R2.${b}`).join(', ');
        const candidateMatch = candidateAttrs.map(a => `R2.${a} = R1.${a}`).join(' AND ');

        const sql = `-- ====================================================================
-- METHOD 3: Relational Set Difference (EXCEPT / MINUS)
-- Theoretical Basis: (S - {items of candidate}) = ∅
-- Intuition: "A candidate qualifies if subtracting their acquired items from S
--             yields an empty set."
-- Dialects: PostgreSQL, SQLite, SQL Server (EXCEPT); Oracle (MINUS)
-- ====================================================================

SELECT DISTINCT
    ${selectCols}
FROM
    ${rName} R1
WHERE NOT EXISTS (
    -- Requirements in S
    SELECT ${sCols}
    FROM ${sName} S

    EXCEPT -- (Replace EXCEPT with MINUS for Oracle SQL)

    -- Items completed/held by candidate R1
    SELECT ${rCols}
    FROM ${rName} R2
    WHERE ${candidateMatch}
);`;

        const explanation = `
### Set Difference Mechanics:
- **Inner Query**: Computes the set difference $S - \\Pi_B(\\sigma_{A = r.A}(R))$.
- If this set difference is empty ($\emptyset$), the candidate has missed **zero** required items from \`S\`.
- **WHERE NOT EXISTS**: Evaluates to true precisely when the set difference produces zero rows.
- **Dialect Note**: PostgreSQL, SQLite, and SQL Server utilize \`EXCEPT\`. Oracle Database utilizes the \`MINUS\` operator.
`;

        return { sql, explanation, title: 'Set Difference (EXCEPT / MINUS)' };
    }

    /**
     * 4. Exact Division SQL Formulation
     */
    static generateExactDivision(rName, sName, candidateAttrs, divisorAttrs) {
        const selectCols = candidateAttrs.map(a => `R.${a}`).join(', ');
        const groupByCols = candidateAttrs.map(a => `R.${a}`).join(', ');
        const joinConditions = divisorAttrs.map(b => `R.${b} = S.${b}`).join(' AND ');
        
        const countDistinctS = divisorAttrs.length === 1
            ? `S.${divisorAttrs[0]}`
            : divisorAttrs.map(b => `S.${b}`).join(" || '~' || ");
        const countDistinctR = divisorAttrs.length === 1
            ? `R.${divisorAttrs[0]}`
            : divisorAttrs.map(b => `R.${b}`).join(" || '~' || ");

        const sql = `-- ====================================================================
-- METHOD 4: Exact Division (R ÷_exact S)
-- Intuition: "Candidate must possess ALL items in S AND NO extra items outside S."
-- Compatible with: MySQL, PostgreSQL, Oracle, SQLite, SQL Server
-- ====================================================================

SELECT
    ${selectCols}
FROM
    ${rName} R
LEFT JOIN
    ${sName} S
    ON ${joinConditions}
GROUP BY
    ${groupByCols}
HAVING
    -- Condition 1: Must match all items in S (universal coverage)
    COUNT(DISTINCT ${countDistinctS}) = (SELECT COUNT(*) FROM ${sName})
    -- Condition 2: Total distinct items must equal divisor cardinality (no extras)
    AND COUNT(DISTINCT ${countDistinctR}) = (SELECT COUNT(*) FROM ${sName});`;

        const explanation = `
### Exact Division Mechanics:
- **Condition 1**: Guarantees universal coverage ($S \\subseteq \\text{Candidate Items}$).
- **Condition 2**: Ensures the candidate's total distinct items equals $|S|$, proving they have no auxiliary or extraneous items outside $S$.
- **Composite Handling**: Accurately counts distinct composite key combinations across both dividend and divisor relations.
`;

        return { sql, explanation, title: 'Exact Division (All and Only)' };
    }

    /**
     * 5. Symbolic Relational Algebra (SL / RA) Formulation
     */
    static generateRelationalAlgebra(rName, sName, candidateAttrs, divisorAttrs) {
        const cAttrs = candidateAttrs.join(', ');
        const dAttrs = divisorAttrs.join(', ');

        const formula = `R ÷ S = Π_{${cAttrs}}(${rName}) - Π_{${cAttrs}}((Π_{${cAttrs}}(${rName}) × ${sName}) - ${rName})`;

        const steps = [
            `T1 = Π_{${cAttrs}}(${rName})                      -- Candidate domain space (Projection)`,
            `T2 = T1 × ${sName}                                -- Maximal Cartesian cross-product (all pairings)`,
            `T3 = T2 - ${rName}                                -- Deficit missing tuples (Set Difference)`,
            `T4 = Π_{${cAttrs}}(T3)                            -- Disqualified candidates with missing requirements`,
            `T5 = T1 - T4                                      -- Quotient relation: Universally qualified candidates`
        ].join('\n');

        const explanation = `
### Relational Algebra (SL) Proof:
- **Codd's Equivalence**: Universal quantification $(\\forall y \\in S)$ is computed without loops or recursion by subtracting disqualified candidates from all possible candidates.
- **Decomposition**: Computed via 5 deterministic relational algebra steps ($T_1 \\dots T_5$).
`;

        return {
            formula,
            steps,
            explanation,
            title: 'Relational Algebra (Symbolic Language - SL)'
        };
    }

    /**
     * 6. Tuple Relational Calculus (TRC) Formulation
     */
    static generateTRC(rName, sName, candidateAttrs, divisorAttrs) {
        const cAttrs = candidateAttrs.join(', ');
        const dAttrs = divisorAttrs.join(', ');

        const formula = `{ t[${cAttrs}] | ∃ r ∈ ${rName} (t[${cAttrs}] = r[${cAttrs}]) ∧ ∀ s ∈ ${sName} (∃ r' ∈ ${rName} (r'[${cAttrs}] = t[${cAttrs}] ∧ r'[${dAttrs}] = s[${dAttrs}])) }`;

        const safeNegationFormula = `{ t[${cAttrs}] | ∃ r ∈ ${rName} (t[${cAttrs}] = r[${cAttrs}]) ∧ ¬ ∃ s ∈ ${sName} (¬ ∃ r' ∈ ${rName} (r'[${cAttrs}] = t[${cAttrs}] ∧ r'[${dAttrs}] = s[${dAttrs}])) }`;

        const explanation = `
### Tuple Relational Calculus (TRC) Mechanics:
- **Range Variables**: \`r, r'\` range over dividend relation \`${rName}\`; \`s\` ranges over divisor \`${sName}\`.
- **First-Order Predicate Logic**: The formula enforces universal quantifier $\\forall s \\in ${sName}$, asserting that for every requirement $s$, there exists a matching tuple $r'$ confirming candidate $t$.
- **Safe Relational Calculus**: The equivalent negation formulation uses De Morgan's Law $(\\forall s, P(s) \\equiv \\neg \\exists s, \\neg P(s))$, ensuring the query is domain-independent and computationally decidable.
`;

        return {
            formula,
            safeNegationFormula,
            explanation,
            title: 'Tuple Relational Calculus (TRC)'
        };
    }

    /**
     * 7. Domain Relational Calculus (DRC) Formulation
     */
    static generateDRC(rName, sName, candidateAttrs, divisorAttrs) {
        const cVars = candidateAttrs.map((_, i) => `x_${i + 1}`).join(', ');
        const dVars = divisorAttrs.map((_, i) => `y_${i + 1}`).join(', ');

        const formula = `{ <${cVars}> | ∃ ${dVars}' (<${cVars}, ${dVars}'> ∈ ${rName}) ∧ ∀ ${dVars} (<${dVars}> ∈ ${sName} ⇒ <${cVars}, ${dVars}> ∈ ${rName}) }`;

        const safeNegationFormula = `{ <${cVars}> | ∃ ${dVars}' (<${cVars}, ${dVars}'> ∈ ${rName}) ∧ ¬ ∃ ${dVars} (<${dVars}> ∈ ${sName} ∧ <${cVars}, ${dVars}> ∉ ${rName}) }`;

        const explanation = `
### Domain Relational Calculus (DRC) Mechanics:
- **Domain Variables**: Variable tuple $\\langle ${cVars} \\rangle$ ranges over candidate entity domains.
- **Universal Implication**: $\\forall ${dVars} (\\langle ${dVars} \\rangle \\in ${sName} \\implies \\langle ${cVars}, ${dVars} \\rangle \\in ${rName})$. Any requirement in $S$ implies the combined candidate-requirement pair belongs to $R$.
- **Safe Formulation**: Rewritten with material implication $\\neg (P \\land \\neg Q)$ to satisfy Codd's safety theorem.
`;

        return {
            formula,
            safeNegationFormula,
            explanation,
            title: 'Domain Relational Calculus (DRC)'
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SQLGenerator };
}
