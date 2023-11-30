export function timeConvertor(time: number, type: TDateFormat) {
  const date = new Date(time);
  console.log(date);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  //   const hours = date.getHours();
  const formats = {
    "dd/mm/yyyy": `${day}.${month}.${year}`,
  };
  return formats[type];
}

export type TDateFormat = "dd/mm/yyyy";
