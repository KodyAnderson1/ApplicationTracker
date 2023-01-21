export const ACTION_TYPES = {
  UPDATE: "UPDATE",
  ERROR: "ERROR",
  RESET: "RESET",
  STACK: "STACK",
};

export const INITIAL_STATE = {
  companyName: "",
  positionTitle: "",
  status: "review",
  jobType: "",
  location: "",
  salary: "",
  url: "",
  stack: [],
  user_id: "",
};

export function formReducer(state, action) {
  // console.log("🚀 ~ file: formReducer.jsx:21 ~ formReducer ~ state", action);

  switch (action.type) {
    case ACTION_TYPES.UPDATE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case ACTION_TYPES.RESET:
      return action.payload;
    case ACTION_TYPES.STACK:
      return {
        ...state,
        stack: action.payload.value,
      };
    default:
      return state;
  }
}
