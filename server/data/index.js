function getDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  return mm + "-" + dd + "-" + yyyy;
}

// ! get lastUpdated from the DB call. Timestamps have been enabled!

const STATUS_TYPES = {
  REVIEW: "review",
  REJECTED: "rejected",
  ACCEPTED: "accepted",
  INTERVIEW: "interview",
  ASSESSMENT: "assessment",
};

const JOB_TYPE = {
  REMOTE: "remote",
  IN_PERSON: "in-person",
  HYBRID: "hybrid",
};

export const ApplicationsData = [
  {
    _id: "63701d74f032399c00000151",
    companyName: "Google",
    positionTitle: "Software Internship",
    jobType: JOB_TYPE.REMOTE,
    status: STATUS_TYPES.REJECTED,
    url: "https://www.google.com",
    location: null,
    salary: null,
    stack: ["React", "JavaScript", "Material UI", "Express.js", "MongoDB"],
  },
  {
    _id: "63701d74f03239c72c0001ba",
    companyName: "Meta",
    positionTitle: "Software Developer Internship",
    jobType: JOB_TYPE.REMOTE,
    status: STATUS_TYPES.INTERVIEW,
    url: "https://www.facebook.com/",
    location: null,
    salary: null,
    stack: ["React", "JavaScript", "Material UI", "Express.js", "MongoDB"],
  },
  {
    _id: "63701d74f03239c72c0001a1",
    companyName: "Navy Federal",
    positionTitle: "ISD Developer Internship",
    jobType: JOB_TYPE.IN_PERSON,
    status: STATUS_TYPES.REVIEW,
    url: "https://www.navyfederal.org/",
    location: "Seattle",
    salary: null,
    stack: ["React", "JavaScript", "Material UI", "Express.js", "MongoDB"],
  },
  {
    _id: "63701d74f03239d81e00002a",
    companyName: "Z Company",
    positionTitle: "Chief Technology Officer",
    jobType: JOB_TYPE.IN_PERSON,
    status: STATUS_TYPES.REVIEW,
    url: null,
    location: "Miami",
    salary: 50000,
    stack: ["Vue", "Next.js", "Firebase"],
  },
  {
    _id: "63701d74f032396b8e000037",
    companyName: "Bob's Hardware",
    positionTitle: "Cashier",
    jobType: JOB_TYPE.IN_PERSON,
    status: STATUS_TYPES.REVIEW,
    url: null,
    location: "Orlando",
    salary: 55000,
    stack: ["Python", "C++"],
  },
  {
    _id: "63701d74f032396b8e00002c",
    companyName: "TV Maze",
    positionTitle: "Internship",
    jobType: JOB_TYPE.REMOTE,
    status: STATUS_TYPES.REVIEW,
    url: "https://www.tvmaze.com/api",
    location: null,
    salary: 60000,
    stack: ["React", "TypeScript", "Bootstrap", "Java Spring", "MySQL"],
  },
  {
    _id: "63701d74f03239d81e000027",
    companyName: "McDonalds",
    positionTitle: "Line Cook",
    jobType: JOB_TYPE.IN_PERSON,
    status: STATUS_TYPES.REVIEW,
    url: "https://www.mcdonalds.com/us/en-us.html",
    location: "Los Angeles",
    salary: 90000,
    stack: [],
  },
];

export const mockUser = [
  {
    _id: "63701cc1f03239b7f700000e",
    firstName: "Kody",
    lastName: "Anderson",
    email: "kodyandersoncareer@gmail.com",
    password: "YouShouldHireMe",
    applications: [
      "63701d74f03239d81e000027",
      "63701d74f032396b8e00002c",
      "63701d74f032396b8e000037",
      "63701d74f03239d81e00002a",
      "63701d74f03239c72c0001ba",
      "63701d74f032399c00000151",
      "63701d74f03239c72c0001a1",
    ],
    role: "admin",
    jobs: ["63701d74f03239bef0000133", "63701d74f032396b8e00003c"],
    stack: ["React", "JavaScript", "Java", "C++", "Bootstrap", "HTML", "CSS", "Material UI"],
  },
];

export const JobsData = [
  {
    _id: "63701d74f03239bef0000133",
    companyName: "Publix SuperMarkets",
    positionTitle: "Assistant Deli Manager",
    hiredOn: "01-08-2019",
    salary: 50000,
  },
  {
    _id: "63701d74f032396b8e00003c",
    companyName: "Publix SuperMarkets",
    positionTitle: "Deli Clerk",
    hiredOn: "01-02-2016",
    salary: 25000,
  },
];
