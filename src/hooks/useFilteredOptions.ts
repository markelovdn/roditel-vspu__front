import { ComputedRef, ref } from "vue";

export function useFilteredOptions(
  options: ComputedRef<
    Array<{
      label: string;
      value: string;
    }>
  >,
) {
  const filteredOptions = ref([...options.value]);
  console.log("из компазабел", options.value);

  const onFilter = (val: string, update: Function) => {
    update(() => {
      if (val === "") {
        filteredOptions.value = options.value;
      } else {
        const needle = val.toLowerCase();
        filteredOptions.value = options.value.filter((v) => v.label.toLowerCase().includes(needle));
      }
    });
  };

  return { filteredOptions, onFilter };
}
