const MILISECONDS_IN_DAY = 86400000;

export const STATUS_TYPES = {
  REVIEW: "review",
  REJECTED: "rejected",
  ACCEPTED: "accepted",
  INTERVIEW: "interview",
  ASSESSMENT: "assessment",
};

export const JOB_TYPE = {
  REMOTE: "remote",
  IN_PERSON: "in-person",
  HYBRID: "hybrid",
};

export const TIME = {
  SEVEN: 7 * MILISECONDS_IN_DAY,
  FOURTEEN: 14 * MILISECONDS_IN_DAY,
};
