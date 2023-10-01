export function isPlainObject(o: unknown): o is Record<string, unknown> {
  if (!isObject(o)) return false;

  if (o.constructor === undefined) return true;
  if (!isObject(o.constructor.prototype)) return false;

  // eslint-disable-next-line no-prototype-builtins
  return o.constructor.prototype.hasOwnProperty("isPrototypeOf");
}

export function isObject(o: unknown): o is Record<string, unknown> {
  return Object.prototype.toString.call(o) === "[object Object]" && !Array.isArray(o) && o !== null;
}

export function omit(
  obj: unknown,
  props: string | string[],
  fn?: (val: unknown, key: string, obj: unknown) => boolean,
) {
  if (!isPlainObject(obj)) return {};

  if (typeof props === "function") {
    fn = props;
    props = [];
  }

  if (typeof props === "string") {
    props = [props];
  }

  const isFunction = typeof fn === "function";
  const keys = Object.keys(obj);
  const res = {} as Record<string, unknown>;

  for (const element of keys) {
    const key = element;
    const val = obj[key];

    if (!props || (props.indexOf(key) === -1 && (!isFunction || (fn && fn(val, key, obj))))) {
      res[key] = val;
    }
  }
  return res;
}
