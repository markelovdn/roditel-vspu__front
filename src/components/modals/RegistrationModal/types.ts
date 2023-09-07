export type TRegistrationPayload = {
  name: string;
  phone: string;
  email: string;
  specializationId: number;
  professionId: number;
  password: string;
};

export type TSelectItems = {
  id: number;
  title: string;
};