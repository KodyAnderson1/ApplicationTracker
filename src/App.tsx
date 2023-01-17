import { useState, useReducer } from "react";
import "./App.css";
import { Container } from "@mui/material";
import { JOB_LOCATIONS, STATUS_TYPES } from "./constants";
import { NewApplicationForm } from "./NewApplicationForm";
import { DataTable } from "./DataTable";

function App() {
  return (
    <>
      <Container sx={{ width: 250, height: 500 }} className="form-container">
        <h2>Form</h2>
        <NewApplicationForm />
      </Container>
      {/* <Container sx={{ width: 1980, height: 500 }}> */}
      <DataTable />
      {/* </Container> */}
    </>
  );
}

export default App;

/**
 * 
 * 
 *   
 * 
  Form Fields:
	Company Name, // *
	position title, // *
	Date applied, (Checkbox that will say "now" or something and call Date.Now) // *
	status (enum -> UNDER REVIEW, REJECTED, ACCEPTED, INTERVIEW, ASSESSMENT) // *
		if (assessment -> track when due)
		if (interview -> track when)
		if (rejected, date.now)	
	LINK TO STATUS UPDATE PAGE FOR COMPANY // *
	Job Location (REMOTE, IN_PERSON) // *
	(If IN_PERSON) -> Where
	
	
sorting per field
filter (status)

separate "Needs update" table for applications that have not had a status update in ~2 weeks?
Email sender to notify?


 */
