import { ComputedRef, ref, watchEffect } from "vue";

export function useFilteredOptions(
  options: ComputedRef<
    Array<{
      label: string;
      value: string;
    }>
  >,
) {
  const filteredOptions = ref([...options.value]);

  watchEffect(() => {
    filteredOptions.value = [...options.value];
  });

  const onFilter = (val: string, update: Function) => {
    update(() => {
      if (!options.value.length) return;

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
