export const update = (arr, item, key) => arr.map(elem => (elem[key] === item[key] ? item : elem));

export const filter = (arr, item, key) => [...arr.filter(elem => elem[key] !== item)];

export const getId = () =>
  "_" +
  Math.random()
    .toString(36)
    .substr(2, 9);
