export type Consultant = {
  photo: string;
  description: string;
  user: ConsultantUser;
};

type ConsultantUser = {
  firstName: string;
  secondName: string;
  surName: string;
};
