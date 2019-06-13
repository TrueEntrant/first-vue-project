export const defaultState = {
  comments: [],
  user: {
    isAuth: false,
    token: null,
    name: null,
    id: null,
    email: null,
    password: null,
    avatar: null
  }
};

export const defaultCommentForm = {
  nameChanging: false,
  userName: "Anonimous",
  temp: "",
  text: "",
  userAvatar: null,
  comments: []
};
