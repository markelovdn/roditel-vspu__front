export type TSelectItems = {
  label: string;
  value: number;
};

export type TRegistrationRole = "consultant" | "parented";
export const RegistrationRoleMap: Record<"CONSULTANT" | "PARENTED", TRegistrationRole> = {
  CONSULTANT: "consultant",
  PARENTED: "parented",
};