export type TWebinarsLectors = string[];
export type TWebinarsRequestOption = {
  lector?: string;
  page?: number;
  category?: 1; // id категории
  actual?: "yes" | "no";
  dateBetween?: string; //Вебинары в указанный промежуток дат "04.10.2023,07.10.2023";
  searchField?: string;
};

export type TWebinarData = {
  data: {
    title: string;
    logo: string;
    webinarCategory: {
      title: string;
    };
    cost: number;
    date: string; // "17.01.2016";
    timeStart: string; // "03.58";
    timeEnd: string; //"05.36";
    questions: { id: number; questionText: string }[];
    lectors: {
      id: number;
      lectorName: string;
      lectorDescription: string;
      lectorDepartment: string;
      lectorPhoto: string;
    }[];
  }[];
  links: any;
  meta: any;
};
