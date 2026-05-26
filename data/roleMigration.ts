// Maps each old role ID to one or more new role IDs
export const ROLE_MIGRATION_MAP: Record<string, string[]> = {
  cloud_practitioner: ["cloud_administrator"],
  solutions_architect: ["solutions_architect"],
  developer: ["software_development_engineer"],
  devops_engineer: ["cloud_devops_engineer"],
  sysops_administrator: ["cloud_administrator"],
  security_specialist: ["cloud_security_engineer"],
  database_specialist: ["cloud_data_engineer"],
  data_engineer: ["cloud_data_engineer"],
  ml_engineer: ["ml_engineer"],
  network_specialist: ["network_engineer"],
};

export const migrateRoleId = (oldRoleId: string): string[] => {
  return ROLE_MIGRATION_MAP[oldRoleId] ?? [oldRoleId];
};
