export const Set = (data, key) => {
  return Promise.resolve(
    localStorage.setItem(key || "first-vue-app-storage", JSON.stringify(data))
  );
};

export const Get = key => {
  try {
    return JSON.parse(localStorage.getItem(key || "first-vue-app-storage")) || null;
  } catch (err) {
    return null;
  }
};
