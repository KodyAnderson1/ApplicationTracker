// import { JOB_LOCATIONS, STATUS_TYPES } from "./constants";

export const ACTION_TYPES = {
  UPDATE: "UPDATE",
  ERROR: "ERROR",
  RESET: "RESET",
};

export const INITIAL_STATE = {
  companyName: "Spiderman Inc",
  positionTitle: "Webslinger",
  status: "review",
  jobType: "remote",
  location: "New York",
  salary: "80000",
  url: "https://www.google.com/",
  stack: [],
};

// export const INITIAL_STATE = {
//   companyName: "",
//   positionTitle: "",
//   status: "",
//   jobType: "",
//   location: "",
//   salary: "",
//   url: "",
//   stack: [],
// };

export function formReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case ACTION_TYPES.RESET:
      return action.payload;
    default:
      return state;
  }
}
