export type Consultant = {
  photo: string;
  description: string;
  user: ConsultantUser;
};

type ConsultantUser = {
  id: number;
  firstName: string;
  secondName: string;
  surName: string;
};
