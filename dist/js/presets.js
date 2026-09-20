/**
 * BACSE202: Relational Division Simulator
 * Real-World Presets & Industry Case Studies
 * 6 curated domains demonstrating universal quantification (R ÷ S)
 */

const PRESETS = {
    university: {
        id: 'university',
        title: '🎓 University Academic Advisor (Core CS Courses)',
        domain: 'Higher Education & Accreditation',
        description: 'Find all students who have successfully completed ALL mandatory core courses required for a Computer Science Degree.',
        rName: 'CourseEnrollments',
        rAttrs: ['StudentID', 'StudentName', 'CourseCode'],
        rTuples: [
            { StudentID: 'CS101', StudentName: 'Alice Smith', CourseCode: 'CSE201' },
            { StudentID: 'CS101', StudentName: 'Alice Smith', CourseCode: 'CSE202' },
            { StudentID: 'CS101', StudentName: 'Alice Smith', CourseCode: 'CSE203' },
            { StudentID: 'CS101', StudentName: 'Alice Smith', CourseCode: 'CSE204' },

            { StudentID: 'CS102', StudentName: 'Bob Jones', CourseCode: 'CSE201' },
            { StudentID: 'CS102', StudentName: 'Bob Jones', CourseCode: 'CSE202' },

            { StudentID: 'CS103', StudentName: 'Charlie Brown', CourseCode: 'CSE201' },
            { StudentID: 'CS103', StudentName: 'Charlie Brown', CourseCode: 'CSE202' },
            { StudentID: 'CS103', StudentName: 'Charlie Brown', CourseCode: 'CSE203' },
            { StudentID: 'CS103', StudentName: 'Charlie Brown', CourseCode: 'CSE204' },
            { StudentID: 'CS103', StudentName: 'Charlie Brown', CourseCode: 'CSE301' }, // Superset extra

            { StudentID: 'CS104', StudentName: 'Diana Prince', CourseCode: 'CSE202' },
            { StudentID: 'CS104', StudentName: 'Diana Prince', CourseCode: 'CSE203' },

            { StudentID: 'CS105', StudentName: 'Evan Wright', CourseCode: 'HUM101' },
            { StudentID: 'CS105', StudentName: 'Evan Wright', CourseCode: 'MAT201' }
        ],
        sName: 'MandatoryCoreCS',
        sAttrs: ['CourseCode'],
        sTuples: [
            { CourseCode: 'CSE201' },
            { CourseCode: 'CSE202' },
            { CourseCode: 'CSE203' },
            { CourseCode: 'CSE204' }
        ],
        expectedQualified: ['Alice Smith', 'Charlie Brown']
    },

    devops: {
        id: 'devops',
        title: '☁️ Cloud DevOps & SRE Hiring (Mandatory Stack)',
        domain: 'Cloud Architecture & Recruitment',
        description: 'Find all DevOps engineer applicants who possess ALL mandatory infrastructure-as-code and cloud tooling certifications.',
        rName: 'EngineerSkillInventory',
        rAttrs: ['EngineerID', 'CandidateName', 'SkillName'],
        rTuples: [
            { EngineerID: 'DEV01', CandidateName: 'Vikram Mehta', SkillName: 'Kubernetes' },
            { EngineerID: 'DEV01', CandidateName: 'Vikram Mehta', SkillName: 'Terraform' },
            { EngineerID: 'DEV01', CandidateName: 'Vikram Mehta', SkillName: 'Docker' },
            { EngineerID: 'DEV01', CandidateName: 'Vikram Mehta', SkillName: 'AWS_IAM' },

            { EngineerID: 'DEV02', CandidateName: 'Priya Sharma', SkillName: 'Kubernetes' },
            { EngineerID: 'DEV02', CandidateName: 'Priya Sharma', SkillName: 'Docker' },

            { EngineerID: 'DEV03', CandidateName: 'Rahul Verma', SkillName: 'Kubernetes' },
            { EngineerID: 'DEV03', CandidateName: 'Rahul Verma', SkillName: 'Terraform' },
            { EngineerID: 'DEV03', CandidateName: 'Rahul Verma', SkillName: 'Docker' },
            { EngineerID: 'DEV03', CandidateName: 'Rahul Verma', SkillName: 'AWS_IAM' },
            { EngineerID: 'DEV03', CandidateName: 'Rahul Verma', SkillName: 'Ansible' },

            { EngineerID: 'DEV04', CandidateName: 'Sneha Patel', SkillName: 'Terraform' },
            { EngineerID: 'DEV04', CandidateName: 'Sneha Patel', SkillName: 'AWS_IAM' }
        ],
        sName: 'RequiredDevOpsStack',
        sAttrs: ['SkillName'],
        sTuples: [
            { SkillName: 'Kubernetes' },
            { SkillName: 'Terraform' },
            { SkillName: 'Docker' },
            { SkillName: 'AWS_IAM' }
        ],
        expectedQualified: ['Vikram Mehta', 'Rahul Verma']
    },

    healthcare: {
        id: 'healthcare',
        title: '🏥 Hospital Surgical Board (Pediatric Cardiac Licenses)',
        domain: 'Clinical Medicine & Hospital Governance',
        description: 'Identify surgeons who are officially credentialed to perform ALL designated high-risk pediatric cardiac procedures.',
        rName: 'SurgeonCredentials',
        rAttrs: ['SurgeonID', 'DoctorName', 'ProcedureCode'],
        rTuples: [
            { SurgeonID: 'DOC01', DoctorName: 'Dr. Aarav Menon', ProcedureCode: 'PCD_CABG' },
            { SurgeonID: 'DOC01', DoctorName: 'Dr. Aarav Menon', ProcedureCode: 'PCD_VALVE' },
            { SurgeonID: 'DOC01', DoctorName: 'Dr. Aarav Menon', ProcedureCode: 'PCD_ANGIO' },

            { SurgeonID: 'DOC02', DoctorName: 'Dr. Fatima Khan', ProcedureCode: 'PCD_CABG' },
            { SurgeonID: 'DOC02', DoctorName: 'Dr. Fatima Khan', ProcedureCode: 'PCD_ANGIO' },

            { SurgeonID: 'DOC03', DoctorName: 'Dr. Suresh Nair', ProcedureCode: 'PCD_CABG' },
            { SurgeonID: 'DOC03', DoctorName: 'Dr. Suresh Nair', ProcedureCode: 'PCD_VALVE' },
            { SurgeonID: 'DOC03', DoctorName: 'Dr. Suresh Nair', ProcedureCode: 'PCD_ANGIO' },
            { SurgeonID: 'DOC03', DoctorName: 'Dr. Suresh Nair', ProcedureCode: 'PCD_TRANS' }
        ],
        sName: 'EmergencyCardiacProtocol',
        sAttrs: ['ProcedureCode'],
        sTuples: [
            { ProcedureCode: 'PCD_CABG' },
            { ProcedureCode: 'PCD_VALVE' },
            { ProcedureCode: 'PCD_ANGIO' }
        ],
        expectedQualified: ['Dr. Aarav Menon', 'Dr. Suresh Nair']
    },

    supplychain: {
        id: 'supplychain',
        title: '🚗 EV Supply Chain (Battery Pack Modules)',
        domain: 'Automotive Manufacturing & Procurement',
        description: 'Find automotive tier-1 suppliers capable of delivering ALL critical components needed for Next-Gen 4680 EV Battery Pack assembly.',
        rName: 'SupplierPartsCatalog',
        rAttrs: ['SupplierID', 'SupplierName', 'ComponentSKU'],
        rTuples: [
            { SupplierID: 'SUP1', SupplierName: 'Apex Battery Corp', ComponentSKU: 'SKU_4680_CELL' },
            { SupplierID: 'SUP1', SupplierName: 'Apex Battery Corp', ComponentSKU: 'SKU_BMS_CONTROLLER' },
            { SupplierID: 'SUP1', SupplierName: 'Apex Battery Corp', ComponentSKU: 'SKU_THERMAL_PLATE' },

            { SupplierID: 'SUP2', SupplierName: 'VoltTech Industries', ComponentSKU: 'SKU_4680_CELL' },
            { SupplierID: 'SUP2', SupplierName: 'VoltTech Industries', ComponentSKU: 'SKU_THERMAL_PLATE' },

            { SupplierID: 'SUP3', SupplierName: 'ElectraPower Ltd', ComponentSKU: 'SKU_BMS_CONTROLLER' },

            { SupplierID: 'SUP4', SupplierName: 'Global Cell Dynamics', ComponentSKU: 'SKU_4680_CELL' },
            { SupplierID: 'SUP4', SupplierName: 'Global Cell Dynamics', ComponentSKU: 'SKU_BMS_CONTROLLER' },
            { SupplierID: 'SUP4', SupplierName: 'Global Cell Dynamics', ComponentSKU: 'SKU_THERMAL_PLATE' }
        ],
        sName: 'BatteryPackBillOfMaterials',
        sAttrs: ['ComponentSKU'],
        sTuples: [
            { ComponentSKU: 'SKU_4680_CELL' },
            { ComponentSKU: 'SKU_BMS_CONTROLLER' },
            { ComponentSKU: 'SKU_THERMAL_PLATE' }
        ],
        expectedQualified: ['Apex Battery Corp', 'Global Cell Dynamics']
    },

    cybersecurity: {
        id: 'cybersecurity',
        title: '🛡️ Zero-Trust Enterprise Servers (NIST SP 800-53)',
        domain: 'Information Security & Compliance Auditing',
        description: 'Locate database and application servers that have successfully passed audits for ALL mandatory federal Zero-Trust access controls.',
        rName: 'ServerAuditLogs',
        rAttrs: ['ServerID', 'Hostname', 'ControlID'],
        rTuples: [
            { ServerID: 'SRV01', Hostname: 'db-prod-primary', ControlID: 'AC-2' },
            { ServerID: 'SRV01', Hostname: 'db-prod-primary', ControlID: 'IA-2' },
            { ServerID: 'SRV01', Hostname: 'db-prod-primary', ControlID: 'SC-7' },
            { ServerID: 'SRV01', Hostname: 'db-prod-primary', ControlID: 'SI-4' },

            { ServerID: 'SRV02', Hostname: 'app-gateway-01', ControlID: 'AC-2' },
            { ServerID: 'SRV02', Hostname: 'app-gateway-01', ControlID: 'SC-7' },

            { ServerID: 'SRV03', Hostname: 'auth-vault-01', ControlID: 'AC-2' },
            { ServerID: 'SRV03', Hostname: 'auth-vault-01', ControlID: 'IA-2' },
            { ServerID: 'SRV03', Hostname: 'auth-vault-01', ControlID: 'SC-7' },
            { ServerID: 'SRV03', Hostname: 'auth-vault-01', ControlID: 'SI-4' }
        ],
        sName: 'MandatoryZeroTrustControls',
        sAttrs: ['ControlID'],
        sTuples: [
            { ControlID: 'AC-2' },
            { ControlID: 'IA-2' },
            { ControlID: 'SC-7' },
            { ControlID: 'SI-4' }
        ],
        expectedQualified: ['db-prod-primary', 'auth-vault-01']
    },

    projectapollo: {
        id: 'projectapollo',
        title: '🚀 Project Apollo Mission (Lunar Flight Crew)',
        domain: 'Aerospace Engineering & Spaceflight',
        description: 'Determine which astronaut candidates have completed flight certifications on ALL lunar module descent, ascent, and EVA systems.',
        rName: 'AstronautFlightHours',
        rAttrs: ['AstronautID', 'AstronautName', 'FlightModule'],
        rTuples: [
            { AstronautID: 'AST01', AstronautName: 'Neil Armstrong', FlightModule: 'LEM_DESCENT' },
            { AstronautID: 'AST01', AstronautName: 'Neil Armstrong', FlightModule: 'LEM_ASCENT' },
            { AstronautID: 'AST01', AstronautName: 'Neil Armstrong', FlightModule: 'LUNAR_EVA' },

            { AstronautID: 'AST02', AstronautName: 'Buzz Aldrin', FlightModule: 'LEM_DESCENT' },
            { AstronautID: 'AST02', AstronautName: 'Buzz Aldrin', FlightModule: 'LEM_ASCENT' },
            { AstronautID: 'AST02', AstronautName: 'Buzz Aldrin', FlightModule: 'LUNAR_EVA' },

            { AstronautID: 'AST03', AstronautName: 'Michael Collins', FlightModule: 'COMMAND_MODULE_DOCK' },
            { AstronautID: 'AST03', AstronautName: 'Michael Collins', FlightModule: 'LEM_DESCENT' }
        ],
        sName: 'LunarSurfaceMandatoryModules',
        sAttrs: ['FlightModule'],
        sTuples: [
            { FlightModule: 'LEM_DESCENT' },
            { FlightModule: 'LEM_ASCENT' },
            { FlightModule: 'LUNAR_EVA' }
        ],
        expectedQualified: ['Neil Armstrong', 'Buzz Aldrin']
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PRESETS };
}
