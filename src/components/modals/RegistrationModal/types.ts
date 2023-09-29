export type TRegistrationPayload = {
  name: string;
  phone: string;
  email: string;
  specializationId?: number | null;
  professionId?: number | null;
  password: string;
  passwordConfirm?: string;
  role_code: string;
  region_id?: number | null;
};

export type TSelectItems = {
  label: string;
  value: number;
};

export type TRequestItem = {
  id: number;
  title: string;
};

export type TRegistrationRole = "consultant" | "parented";
export const RegistrationRoleMap: Record<"CONSULTANT" | "PARENTED", TRegistrationRole> = {
  CONSULTANT: "consultant",
  PARENTED: "parented",
};
