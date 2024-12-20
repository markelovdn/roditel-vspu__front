export const uuid = () =>
  `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, (c) =>
    (
      Number(c) ^
      ((window.crypto || (window as unknown as Window & { msCrypto: Crypto }).msCrypto).getRandomValues(
        new Uint8Array(1),
      )[0] &
        (15 >> (Number(c) / 4)))
    ).toString(16),
  );
