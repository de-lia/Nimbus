export type CategoryTag =
  | "Architecture"
  | "Data Analytics"
  | "Development"
  | "Operations"
  | "DevOps"
  | "Security"
  | "Networking"
  | "AI/ML";

export interface JobRole {
  id: string;
  displayName: string;
  description: string;
  responsibilities: string[];
  icon: string; // emoji
  category: CategoryTag;
}

export const CATEGORY_TAGS: CategoryTag[] = [
  "Architecture",
  "Data Analytics",
  "Development",
  "Operations",
  "DevOps",
  "Security",
  "Networking",
  "AI/ML",
];

export const JOB_ROLES: JobRole[] = [
  // Architecture
  {
    id: "solutions_architect",
    displayName: "Solutions Architect",
    description: "Design and deploy scalable systems on AWS",
    responsibilities: [
      "Design distributed systems",
      "Select appropriate AWS services",
      "Optimize for cost and performance",
    ],
    icon: "🏗️",
    category: "Architecture",
  },
  {
    id: "application_architect",
    displayName: "Application Architect",
    description: "Design application-level architectures on AWS",
    responsibilities: [
      "Define application patterns",
      "Integrate microservices",
      "Ensure high availability",
    ],
    icon: "📐",
    category: "Architecture",
  },
  // Data Analytics
  {
    id: "cloud_data_engineer",
    displayName: "Cloud Data Engineer",
    description: "Build data pipelines and analytics solutions",
    responsibilities: [
      "Design ETL pipelines",
      "Manage data lakes",
      "Optimize query performance",
    ],
    icon: "📊",
    category: "Data Analytics",
  },
  // Development
  {
    id: "software_development_engineer",
    displayName: "Software Development Engineer",
    description: "Build and maintain applications on AWS",
    responsibilities: [
      "Develop cloud-native apps",
      "Implement CI/CD",
      "Write infrastructure as code",
    ],
    icon: "💻",
    category: "Development",
  },
  // Operations
  {
    id: "cloud_administrator",
    displayName: "Cloud Administrator",
    description: "Manage and operate systems on AWS",
    responsibilities: [
      "Provision resources",
      "Monitor system health",
      "Manage access controls",
    ],
    icon: "🔧",
    category: "Operations",
  },
  {
    id: "cloud_engineer",
    displayName: "Cloud Engineer",
    description: "Build and maintain cloud infrastructure",
    responsibilities: [
      "Automate infrastructure",
      "Manage deployments",
      "Troubleshoot issues",
    ],
    icon: "⚙️",
    category: "Operations",
  },
  // DevOps
  {
    id: "test_engineer",
    displayName: "Test Engineer",
    description: "Design and automate testing for cloud applications",
    responsibilities: [
      "Build test frameworks",
      "Automate regression tests",
      "Performance testing",
    ],
    icon: "🧪",
    category: "DevOps",
  },
  {
    id: "cloud_devops_engineer",
    displayName: "Cloud DevOps Engineer",
    description: "Automate and optimize AWS infrastructure pipelines",
    responsibilities: [
      "Build CI/CD pipelines",
      "Infrastructure as code",
      "Monitor deployments",
    ],
    icon: "🔄",
    category: "DevOps",
  },
  {
    id: "devsecops_engineer",
    displayName: "DevSecOps Engineer",
    description: "Integrate security into DevOps workflows",
    responsibilities: [
      "Security automation",
      "Compliance as code",
      "Vulnerability scanning",
    ],
    icon: "🛡️",
    category: "DevOps",
  },
  // Security
  {
    id: "cloud_security_engineer",
    displayName: "Cloud Security Engineer",
    description: "Secure AWS infrastructure and applications",
    responsibilities: [
      "Implement security controls",
      "Incident response",
      "Encryption management",
    ],
    icon: "🔒",
    category: "Security",
  },
  {
    id: "cloud_security_architect",
    displayName: "Cloud Security Architect",
    description: "Design security architectures for cloud environments",
    responsibilities: [
      "Security architecture design",
      "Threat modeling",
      "Compliance frameworks",
    ],
    icon: "🏰",
    category: "Security",
  },
  // Networking
  {
    id: "network_engineer",
    displayName: "Network Engineer",
    description: "Design and manage AWS network infrastructure",
    responsibilities: [
      "VPC design",
      "Hybrid connectivity",
      "Network troubleshooting",
    ],
    icon: "🌐",
    category: "Networking",
  },
  // AI/ML
  {
    id: "prompt_engineer",
    displayName: "Prompt Engineer",
    description: "Design and optimize prompts for AI/ML models",
    responsibilities: [
      "Prompt design",
      "Model evaluation",
      "Output optimization",
    ],
    icon: "✍️",
    category: "AI/ML",
  },
  {
    id: "ml_engineer",
    displayName: "Machine Learning Engineer",
    description: "Build and deploy ML models on AWS",
    responsibilities: [
      "Model training",
      "ML pipelines",
      "Model deployment",
    ],
    icon: "🤖",
    category: "AI/ML",
  },
  {
    id: "ml_ops_engineer",
    displayName: "Machine Learning Ops Engineer",
    description: "Operationalize ML models at scale",
    responsibilities: [
      "ML pipeline automation",
      "Model monitoring",
      "Infrastructure for ML",
    ],
    icon: "🔬",
    category: "AI/ML",
  },
  {
    id: "data_scientist",
    displayName: "Data Scientist",
    description: "Analyze data and build predictive models",
    responsibilities: [
      "Statistical analysis",
      "Feature engineering",
      "Model experimentation",
    ],
    icon: "📈",
    category: "AI/ML",
  },
];

// Helper to get roles grouped by category
export const getRolesByCategory = (): Record<CategoryTag, JobRole[]> => {
  const grouped = {} as Record<CategoryTag, JobRole[]>;
  for (const tag of CATEGORY_TAGS) {
    grouped[tag] = JOB_ROLES.filter((r) => r.category === tag);
  }
  return grouped;
};

// Helper to find a role by ID
export const getJobRoleById = (id: string): JobRole | undefined => {
  return JOB_ROLES.find((r) => r.id === id);
};
