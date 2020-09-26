Active Work Time: 6 – 8 Hours
Total Given Time: 48 Hours

You have been provided a partially complete Flutter project and are expected to complete a range of tasks in order to get it fully functional. Complete the tasks to the best of your ability in the allotted time. A combination of readability, reusability, and patterns used will be considered when reviewing your submission. 

Once the tasks are complete, please return your work by  sending me an email confirmation with a link to the Google Drive file within 48 hours of getting this email, even if the tasks are not 100% complete.

In order to work with the project, you will need the following services installed locally:
	MySQL server version 5.7 or greater
	NodeJS version 8 or greater

Notes:
- This project uses the Redux framework
- The default login username and password is "test@mail.com" and "password"
- Widget/Unit tests cannot rely on contacting the server
- Buttons shown on the layout without corresponding designs should not do anything
- Feel free to modify the SQL data when developing
- The Medication cards display some data that will not be available, the content of the text is not important as long as the layout permits swapping placeholders with real data

You have been provided a NodeJS project (cs-test-api), running "npm install" inside the project folder will install the required packages, after that the server can be run with "npm start". The server will run on port 9000 by default.

The server will be expecting to connect to a MySQL server with the following details (you may need to manually create the schema in your database):
	Host:	127.0.0.1
	Port: 	3306
	User:	root
	Pass:	admin
	Schema:	healthhubtest
	
You can change the these and other server configuration details at cs-test-api/src/config/environment/development.ts if needed.

The flutter project (cs_test) is expecting the server to be running at 127.0.0.1:9000 and uses this for all API calls.

Tasks:

1. Complete Login Page @ lib/pages/login/login_page.dart
    Update the current login page layout to match the given design specification, don't worry about input validation or communicating login failures. The login functionality has been completed for you.

2. Complete Medications Page @ lib/pages/medication/medication_page.dart
    The medications page is set up with a tab selector for "Today's", "Active" and "Expired" medications - your task is to implement the design as well as funcionality. This will involve populating the page with cards constructed from data filtered in the MedicationViewModel.
    Medication data should be obtained from the DataStateRepository in the Redux Store, in order to populate the repository with Medications, you will have to dispatch a RequestGetMedicationsAction that will be handled by the MedicationMiddleware.
        - "Today's" Medications should display medications that will need to be taken later in the day
        - "Active" Medications should display all non-expired medications
        - "Expired" Medications should display all expired medications

3. Implement Medication Get Middleware @ lib/middleware/medication_middleware.dart
    The MedicationMiddleware should use the MedicationAPI to fetch a list of Medication entities from the server, then using the SetMedicationsAction to update the Redux store's DataStateRepository. This middleware should dispatch MedicationAPIStateActions as necessary. See the auth_middleware for reference.

4. Implement Medication API Interface @ lib/api/medication_api.dart
    The MedicationAPI acts an interface between an API data provider and anything that wishes to consume said data - the MedicationAPIProvider has been completed for you and handles making requests to the server. Your task is to create a function for getting all medications safely, see auth_api for reference.

5. Create a unit test asserting the MedicationMiddleware dispatches both a succesful MedicationAPIStateAction and a SetMedicationsAction when fetching a valid data set @ test/middleware/medication_middleware.dart
    In order to test the MedicationMiddleware without use of the server, the MedicationMiddleware will need to be given a mock data source in place of the MedicationAPI.

6. Write a Widget test that asserts the Medication page lists a number of cards equal to the number of Medications in the given data @ test/pages/medication_page_test.dart
    In order to test the MedicationPage without the use of the server, the page widget will have to be built given mock classes.