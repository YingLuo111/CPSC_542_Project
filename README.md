# CPSC_542_test_EZBuy
Test the shopping online system

## How to run the program locally

Prerequisites: Python3, Flask, Sqlite3, Yarn

1. In the main directory of the project, run the following command: \
   `$ cd /Script`
2. Once in the `/Script` directory, run the following command to start both the Frontend React application and the Backend Flask application: \
   `$ sh ./local_start_ezbuy_with_db_init.sh`
3. Alternatively, if need to start the application without recreate the database, run the following command: \
   `$ sh ./local_start_ezbuy_without_db_init.sh`
4. After running the script above, open any browser(Chrome preferred) and visit [http://localhost:3000/](http://localhost:3000/), the EZBuy web application will showup.
5. To stop the program, presse Ctrl + C, then run the following command: \
   `sh ./local_stop_ezbuy.sh`
