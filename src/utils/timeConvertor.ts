export function timeConvertor(time: number, type: TDateFormat) {
  const date = new Date(time);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  //   const hours = date.getHours();
  const formats = {
    "dd/mm/yy": `${day}.${month}.${year.toString().substring(2, 4)}`,
  };
  return formats[type];
}

export type TDateFormat = "dd/mm/yy";
