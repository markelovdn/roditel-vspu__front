type THeaderMenuItem = { name: string; hash: string; toName: string };

export const headerMenuItems: THeaderMenuItem[] = [
  {
    name: "Консультанты",
    toName: "Main",
    hash: "#consultantsAnchor",
  },
  {
    name: "Вебинары",
    toName: "Main",
    hash: "#webinarsAnchor",
  },
  {
    name: "Формы оказания услуг",
    toName: "Main",
    hash: "#serviceAnchor",
  },
  {
    name: "Кому оказывается помощь",
    toName: "Main",
    hash: "#helpAnchor",
  },
];
