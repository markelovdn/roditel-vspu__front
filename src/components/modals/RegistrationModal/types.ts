export type TRegistrationPayload = {
  name: string;
  phone: string;
  email: string;
  specializationId: number | null;
  professionId: number | null;
  password: string;
};

export type TSelectItems = {
  id: number;
  title: string;
};