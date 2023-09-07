export type TRegistrationPayload = {
  firstName: string;
  secondName: string;
  surName: string;
  phone: string;
  email: string;
  specializationId: number;
  professionId: number;
  password: string;
};

export type OptionSpecializations = {
  id: number;
  title: string;
};
