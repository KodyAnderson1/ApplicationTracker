import { JOB_TYPE } from "constants";

export function spliceSlice(str, index, count, add) {
  if (index < 0) {
    index = str.length + index;
    if (index < 0) {
      index = 0;
    }
  }
  return str.slice(0, index) + (add || "") + str.slice(index + count);
}

export function salaryFormatter(params) {
  if (!params) return "";
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(params);
}

export function formatJobType(params) {
  if (params === JOB_TYPE.IN_PERSON) {
    const words = params.split("-");

    for (let i = 0; i < words.length; i++)
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);

    return `${words[0]} ${words[1]}`;
  }

  return params.charAt(0).toUpperCase() + params.slice(1);
}

export function formatDate(params) {
  if (!params) return "";
  const [date, time] = params.split(["T"]);
  const [actualTime] = time.split(".");
  return `${date} ${actualTime}`;
}

export function stackToArray(stackString) {
  if (!stackString || stackString.length === 0) return "";
  if (typeof stackString === "object") return stackString;
  if (!stackString.includes(",")) return [stackString];

  stackString = stackString.replace(/,\s*$/, "");
  stackString = stackString.replace(/\s*,\s*/g, ",");
  try {
    stackString = stackString.split(",");
  } catch (err) {
    console.log(err);
  }
  return stackString;
}
