import { Ref, toValue, unref } from "vue";

type ParamType = string | number | boolean;
export type ParamsType = Record<string, ParamType>;

export const useParamBuilder = (params: ParamsType | Ref<ParamsType>) => {
  if (params instanceof URLSearchParams) return params;
  const search = new URLSearchParams();
  const obj = toValue(params);
  const entries = Object.entries(obj)
    .filter((e) => e[1] != null)
    .filter((e) => (typeof e[1] == "string" ? e[1].length > 0 : true))
    .sort(([a], [b]) => (a > b ? 1 : a < b ? -1 : 0));
  entries.forEach(([key, value]) => search.append(key, value.toString()));
  return search;
};

export const useUrlParams = (
  base: string,
  params?: Readonly<Ref<URLSearchParams>> | URLSearchParams | Ref<string> | string,
) => {
  return `${base}?${typeof params == "string" ? params : unref(params as Readonly<Ref<URLSearchParams>>)?.toString()}`;
};
