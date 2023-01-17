// import { useState, useReducer } from "react";
import "./App.css";
import { Container, Grid } from "@mui/material";
// import { JOB_LOCATIONS, STATUS_TYPES } from "./constants";
import { NewApplicationForm } from "./NewApplicationForm";
import { DataTable } from "./Table/DataTable";
import { Stack } from "@mui/system";
import { Navbar } from "./Navbar";

function App() {
  return (
    <>
      <div className="wrapper">
        <div className="navigation">
          <Navbar />
        </div>
        <div className="header">
          <h1>Welcome, User</h1>
        </div>
        <div className="content-wrapper">
          {/* <NewApplicationForm /> */}
          <DataTable />
        </div>
      </div>
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
	(If IN_PERSON) -> Where // *
	
	
sorting per field
filter (status)

separate "Needs update" table for applications that have not had a status update in ~2 weeks?
Email sender to notify?


 */
