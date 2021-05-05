import { createStore } from "redux";

const initialState = {
  currentRootPath: "",
  user: {
    name: "woooooo",
    dataPath: "",
  },
  projects: [],
  editor: {
    options: {},
    content: {},
  },
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      console.log(action);
      const user = {
        name: action.payload.name,
      };
      return {
        ...state,
        user,
      };
    default:
      return initialState;
  }
};
const store = createStore(reducer, initialState);

export default store;
