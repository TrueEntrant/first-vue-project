export const Set = data => {
  return Promise.resolve(localStorage.setItem("vue-comments-data", JSON.stringify(data)));
};

export const Get = () => {
  try {
    return JSON.parse(localStorage.getItem("vue-comments-data"));
  } catch (err) {
    return false;
  }
};
