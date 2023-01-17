import { JOB_LOCATIONS, STATUS_TYPES } from "./constants";

export const ACTION_TYPES = {
  UPDATE: "UPDATE",
  ERROR: "ERROR",
  RESET: "RESET",
};

export const INITIAL_STATE = {
  id: null,
  companyName: "",
  positionTitle: "",
  dateApplied: "",
  status: "",
  location: "",
  url: "",
  inPersonLoc: "",
  lastUpdated: new Date().toISOString().substring(0, 11).replace("T", ""),
};

type formState = typeof INITIAL_STATE;

export function formReducer(state: formState, action: any) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case ACTION_TYPES.RESET:
      return action.payload;
  }
}
