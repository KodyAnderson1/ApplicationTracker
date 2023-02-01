## Client

1. [x] Login Page
   - [x] Design
   - [x] Formik integration
   - [x] Forgot Password? (Server-Side logic NOT DONE)
   - [x] 3rd party OAuth (Server-Side logic NOT DONE)
   - [ ] Fix input error bug (on focus)
2. [x] Sign Up Page
   - [x] Design
   - [x] Formik integration
   - [ ] Fix input error bug (on focus)
3. [x] Dashboard
   - [ ] Fix Hardcoded Name at top
   - [x] 6 Widgets representing Total Applications, interviews, under review,
         Applications that need updated, assessments, rejected.
   - [x] MUI Data Table of all Applications
   - [x] Notification Center
     - [ ] Currently, does not update until page reload.
   - [x] Pie Chart
4. [ ] New Application Form page
   - [x] Design
   - [ ] Formik integration
   - [x] Last 7 Applications display
5. [x] All Applications page
   - [x] MUI Data Table integration
6. [ ] Specific Application Page
   - [ ] Formik integration
   - [ ] Ability to Add to Programming Stack
   - [x] All Applications List
   - [x] Add server response error handling (401, 403)
7. [x] Sidebar
   - [x] Add color and icon on focused item

## Server

1. [ ] Login Route
   - [ ] Logic for "Forgot Password?"
   - [ ] Logic for 3rd party OAuth
2. [ ] Client Routes
   - [ ] Add more error handling
   - [ ] More specificity on currently errors

## Current Development (From project README)

- [x] Attatch form to state and database
- [x] Finish Dashboard (Homepage)
  - [x] Create a Notification Center
  - [x] Create limited statistics on data
  - [x] Implement date logic and remove placeholder values
    - [x] Logic to track last status change && if over 7 days, notifies (Started)
      - [x] Put Link to actual application in Notification Center for ease of change
      - [x] "Needs Attention" widgit have an actual count
- [x] For the Position input on the new application form, implment an autocomplete form with values previously submitted
- [x] Implement a form to update existing applications
- [x] Include recommended programming stacks in data gathered/displayed
- [ ] Form Validation
  - [ ] Implement Formik
    - [ ] Implement Formik in New && Update Application Forms
    - [x] Implement Formik Log In / Sign-Up
- [x] Details page for each application with more details
  - [x] Programming Stack listed
- [x] Implement log in/out && users
  - [x] Create Account Page
  - [x] Log In Page
  - [x] Log Out
- [ ] Implement an easy way of updating status without going to details page
- [x] Implement a "stack" of (5 - 7) most recently applied to jobs on new form page
