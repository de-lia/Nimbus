export type CertificationLevel =
  | "Foundational"
  | "Associate"
  | "Professional"
  | "Specialty";

export interface Certification {
  name: string;
  level: CertificationLevel;
  required: boolean;
}

export interface CertificationPath {
  roleId: string;
  certifications: Certification[];
}

export const CERTIFICATION_PATHS: Record<string, CertificationPath> = {
  // Architecture
  solutions_architect: {
    roleId: "solutions_architect",
    certifications: [
      { name: "AWS Cloud Practitioner", level: "Foundational", required: true },
      { name: "AI Practitioner", level: "Foundational", required: true },
      { name: "Solutions Architect Associate", level: "Associate", required: true },
      { name: "Solutions Architect Professional", level: "Professional", required: true },
      { name: "Security Specialty", level: "Specialty", required: false },
    ],
  },
  application_architect: {
    roleId: "application_architect",
    certifications: [
      { name: "AWS Cloud Practitioner", level: "Foundational", required: true },
      { name: "AI Practitioner", level: "Foundational", required: true },
      { name: "Solutions Architect Associate", level: "Associate", required: true },
      { name: "Developer Associate", level: "Associate", required: true },
      { name: "Solutions Architect Professional", level: "Professional", required: false },
    ],
  },
  // Data Analytics
  cloud_data_engineer: {
    roleId: "cloud_data_engineer",
    certifications: [
      { name: "AWS Cloud Practitioner", level: "Foundational", required: true },
      { name: "AI Practitioner", level: "Foundational", required: false },
      { name: "Data Engineer Associate", level: "Associate", required: true },
      { name: "Database Specialty", level: "Specialty", required: false },
    ],
  },
  // Development
  software_development_engineer: {
    roleId: "software_development_engineer",
    certifications: [
      { name: "AWS Cloud Practitioner", level: "Foundational", required: true },
      { name: "AI Practitioner", level: "Foundational", required: false },
      { name: "Developer Associate", level: "Associate", required: true },
      { name: "DevOps Engineer Professional", level: "Professional", required: false },
    ],
  },
  // Operations
  cloud_administrator: {
    roleId: "cloud_administrator",
    certifications: [
      { name: "AWS Cloud Practitioner", level: "Foundational", required: true },
      { name: "SysOps Administrator Associate", level: "Associate", required: true },
      { name: "DevOps Engineer Professional", level: "Professional", required: false },
    ],
  },
  cloud_engineer: {
    roleId: "cloud_engineer",
    certifications: [
      { name: "AWS Cloud Practitioner", level: "Foundational", required: true },
      { name: "SysOps Administrator Associate", level: "Associate", required: true },
      { name: "Solutions Architect Associate", level: "Associate", required: false },
      { name: "DevOps Engineer Professional", level: "Professional", required: false },
    ],
  },
  // DevOps
  test_engineer: {
    roleId: "test_engineer",
    certifications: [
      { name: "AWS Cloud Practitioner", level: "Foundational", required: true },
      { name: "Developer Associate", level: "Associate", required: true },
      { name: "DevOps Engineer Professional", level: "Professional", required: false },
    ],
  },
  cloud_devops_engineer: {
    roleId: "cloud_devops_engineer",
    certifications: [
      { name: "AWS Cloud Practitioner", level: "Foundational", required: true },
      { name: "Developer Associate", level: "Associate", required: true },
      { name: "SysOps Administrator Associate", level: "Associate", required: false },
      { name: "DevOps Engineer Professional", level: "Professional", required: true },
    ],
  },
  devsecops_engineer: {
    roleId: "devsecops_engineer",
    certifications: [
      { name: "AWS Cloud Practitioner", level: "Foundational", required: true },
      { name: "Developer Associate", level: "Associate", required: true },
      { name: "DevOps Engineer Professional", level: "Professional", required: true },
      { name: "Security Specialty", level: "Specialty", required: true },
    ],
  },
  // Security
  cloud_security_engineer: {
    roleId: "cloud_security_engineer",
    certifications: [
      { name: "AWS Cloud Practitioner", level: "Foundational", required: true },
      { name: "SysOps Administrator Associate", level: "Associate", required: false },
      { name: "Security Specialty", level: "Specialty", required: true },
    ],
  },
  cloud_security_architect: {
    roleId: "cloud_security_architect",
    certifications: [
      { name: "AWS Cloud Practitioner", level: "Foundational", required: true },
      { name: "Solutions Architect Associate", level: "Associate", required: true },
      { name: "Solutions Architect Professional", level: "Professional", required: false },
      { name: "Security Specialty", level: "Specialty", required: true },
    ],
  },
  // Networking
  network_engineer: {
    roleId: "network_engineer",
    certifications: [
      { name: "AWS Cloud Practitioner", level: "Foundational", required: true },
      { name: "Solutions Architect Associate", level: "Associate", required: false },
      { name: "Advanced Networking Specialty", level: "Specialty", required: true },
    ],
  },
  // AI/ML
  prompt_engineer: {
    roleId: "prompt_engineer",
    certifications: [
      { name: "AWS Cloud Practitioner", level: "Foundational", required: true },
      { name: "AI Practitioner", level: "Foundational", required: true },
      { name: "Machine Learning Engineer Associate", level: "Associate", required: false },
    ],
  },
  ml_engineer: {
    roleId: "ml_engineer",
    certifications: [
      { name: "AWS Cloud Practitioner", level: "Foundational", required: true },
      { name: "AI Practitioner", level: "Foundational", required: true },
      { name: "Machine Learning Engineer Associate", level: "Associate", required: true },
      { name: "Machine Learning Specialty", level: "Specialty", required: false },
    ],
  },
  ml_ops_engineer: {
    roleId: "ml_ops_engineer",
    certifications: [
      { name: "AWS Cloud Practitioner", level: "Foundational", required: true },
      { name: "AI Practitioner", level: "Foundational", required: true },
      { name: "Machine Learning Engineer Associate", level: "Associate", required: true },
      { name: "DevOps Engineer Professional", level: "Professional", required: false },
      { name: "Machine Learning Specialty", level: "Specialty", required: false },
    ],
  },
  data_scientist: {
    roleId: "data_scientist",
    certifications: [
      { name: "AWS Cloud Practitioner", level: "Foundational", required: true },
      { name: "AI Practitioner", level: "Foundational", required: true },
      { name: "Data Engineer Associate", level: "Associate", required: false },
      { name: "Machine Learning Engineer Associate", level: "Associate", required: true },
      { name: "Machine Learning Specialty", level: "Specialty", required: false },
    ],
  },
};

export const getCertificationPath = (
  roleId: string
): CertificationPath | undefined => {
  return CERTIFICATION_PATHS[roleId];
};
