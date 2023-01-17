import { JOB_LOCATIONS, STATUS_TYPES } from "../constants";

function getDate(): string {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  return mm + "-" + dd + "-" + yyyy;
}

export const tableRows = [
  {
    id: 1,
    companyName: "Google",
    positionTitle: "Software Internship",
    location: "REMOTE",
    status: STATUS_TYPES.REJECTED,
    lastUpdated: getDate(),
    dateApplied: getDate(),
    url: "https://www.google.com",
    inPersonLoc: "",
  },
  {
    id: 2,
    companyName: "Meta",
    positionTitle: "Software Developer Internship",
    location: "REMOTE",
    status: STATUS_TYPES.INTERVIEW,
    lastUpdated: getDate(),
    dateApplied: getDate(),
    url: null,
    inPersonLoc: null,
  },
  {
    id: 3,
    companyName: "Navy Federal",
    positionTitle: "ISD Developer Internship",
    location: JOB_LOCATIONS.IN_PERSON,
    status: STATUS_TYPES.REVIEW,
    lastUpdated: getDate(),
    dateApplied: getDate(),
    url: null,
    inPersonLoc: "Seattle",
  },
  {
    id: 4,
    companyName: "Z Company",
    positionTitle: "Chief Technology Officer",
    location: JOB_LOCATIONS.IN_PERSON,
    status: STATUS_TYPES.REVIEW,
    lastUpdated: getDate(),
    dateApplied: getDate(),
    url: null,
    inPersonLoc: "Miami",
  },
  {
    id: 5,
    companyName: "Bob's Hardware",
    positionTitle: "Cashier",
    location: JOB_LOCATIONS.IN_PERSON,
    status: STATUS_TYPES.REVIEW,
    lastUpdated: getDate(),
    dateApplied: getDate(),
    url: null,
    inPersonLoc: "Orlando",
  },
  {
    id: 6,
    companyName: "TV Maze",
    positionTitle: "Internship",
    location: JOB_LOCATIONS.REMOTE,
    status: STATUS_TYPES.REVIEW,
    lastUpdated: getDate(),
    dateApplied: getDate(),
    url: null,
    inPersonLoc: null,
  },
  {
    id: 7,
    companyName: "McDonalds",
    positionTitle: "Line Cook",
    location: "IN PERSON",
    status: STATUS_TYPES.REVIEW,
    lastUpdated: getDate(),
    dateApplied: getDate(),
    url: null,
    inPersonLoc: "Los Angeles",
  },
];
