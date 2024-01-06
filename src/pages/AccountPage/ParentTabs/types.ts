export type TPersonalDataChildrenPayload = {
  age: number;
  id: number | null;
};

export type TPersonalDataParentPayload = {
  name?: string;
  email?: string;
  phone?: string;
  regionId?: number;
  childrens?: TPersonalDataChildrenPayload[];
};
