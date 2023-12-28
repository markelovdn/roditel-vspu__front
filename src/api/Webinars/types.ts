export interface TWebinarsLector {
  id: number | null;
  lectorName: string;
  lectorDescription: string;
  lectorDepartment: string;
  lectorPhotoURL?: string;
  lectorPhoto?: File | null;
}

export type TWebinarsLectors = TWebinarsLector[];
export type TRequestWebinarsLectors = {
  data: TWebinarsLectors;
};
export type TWebinarsRequestOption = {
  page: number;
  lector?: number; // lector id
  consultant?: number; // lector id
  category?: number; // id категории
  actual?: "yes" | "no" | boolean;
  dateBetween?: string; //Вебинары в указанный промежуток дат "04.10.2023,07.10.2023";
  searchField?: string;
};

export type TWebinarData = {
  data: {
    id: number;
    title: string;
    logo: string;
    webinarCategory: {
      title: string;
    };
    cost: number;
    registered: boolean;
    videoLink: string;
    date: string; // "17.01.2016";
    timeStart: string; // "03.58";
    timeEnd: string; //"05.36";
    questions: TWebinarQuestion[];
    lectors: TWebinarsLectors;
  }[];
  links: any;
  meta: any;
};

export type WebinarCategoriesResponse = {
  data: { id: string; title: string }[];
  links: any;
  meta: any;
};
export type TWebinarQuestion = { id: number | null; questionText: string };

export type TWebinarPayload = {
  id: number | null;
  title: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  videoLink: string;
  logo: File | FileList | null;
  cost: number;
  webinarCategoryId: number | null;
  webinarQuestions: Array<TWebinarQuestion>;
  webinarLectorsId: Array<number>;
};
