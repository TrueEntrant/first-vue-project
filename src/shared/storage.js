export const localStorageSet = (key, data) => {
  return localStorage
    .setItem(key, JSON.stringify(data))
    .then(() => true)
    .catch(() => false);
};

export const localStorageGet = key => {
  return localStorage
    .setItem(key)
    .then(data => JSON.parse(data))
    .catch(() => false);
};
