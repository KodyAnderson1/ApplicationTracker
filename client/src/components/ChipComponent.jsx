import Chip from "@mui/material/Chip";
import { Assessment, Close, Done, Error, Grading, Person } from "@mui/icons-material";
import { STATUS_TYPES } from "constants";

export function ChipComponent({ params, sx }) {
  switch (params) {
    case STATUS_TYPES.REVIEW:
      return (
        <Chip
          icon={<Grading />}
          size="small"
          variant="outlined"
          label={STATUS_TYPES.REVIEW}
          color={"info"}
          sx={sx}
        />
      );
    case STATUS_TYPES.ASSESSMENT:
      return (
        <Chip
          icon={<Assessment />}
          size="small"
          variant="outlined"
          label={STATUS_TYPES.ASSESSMENT}
          color={"secondary"}
          sx={sx}
        />
      );

    case STATUS_TYPES.INTERVIEW:
      return (
        <Chip
          icon={<Person />}
          size="small"
          variant="outlined"
          label={STATUS_TYPES.INTERVIEW}
          color={"secondary"}
          sx={sx}
        />
      );
    case STATUS_TYPES.REJECTED:
      return (
        <Chip
          icon={<Close />}
          size="small"
          variant="outlined"
          label={STATUS_TYPES.REJECTED}
          color={"error"}
          sx={sx}
        />
      );

    case STATUS_TYPES.ACCEPTED:
      return (
        <Chip
          icon={<Done />}
          size="small"
          variant="outlined"
          label={STATUS_TYPES.ACCEPTED}
          color={"success"}
          sx={sx}
        />
      );
    default:
      return (
        <Chip
          icon={<Error />}
          size="small"
          variant="outlined"
          label={"ERROR"}
          color={"warning"}
          sx={sx}
        />
      );
  }
}

export default ChipComponent;

//
