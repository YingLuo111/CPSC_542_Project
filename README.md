# CPSC_542_Project

CPSC 542 Software Verification and Validation <br>
Group Project

Professor: David Heckathorn

Team Members: <br>
Ying Luo,    yingluo_holiday@csu.fullerton.edu <br>
Xiaotiam Ma, xiaotianma@csu.fullerton.edu <br>
Yixiang Yan, yyx3333@csu.fullerton.edu <br>

Open Source project tested: 
Fakeflix - https://github.com/Th3Wall/Fakeflix

How to run the project:
1.  In the root directory of Fakeflix project, run the following command to navigate to the testing directory <br>
    ```cd ./src/tests``` <br>
2.  Run the following command to install the packages <br>
    ```sh test_initializer.sh```
3.  Steps for running backbox tests: <br>
    * In the root directory of Fakeflix project, run the following command to navigate to blackbox testing directory <br>
    ```cd ./src/tests/blackbox_testing``` <br>
    * Run the following command to start the Fakeflix project <br>
    ```sh start_fakeflix.sh``` <br>
    * Each directory in the /blackbox_testing folder is separate project to test one function of the Fakeflix project, load the project in a Java or Python IDE and execute the corresponding blackbox testing for that function. Demos are available for the functional tests. <br>
3.  Steps for running whitebox tests: <br>
    * In the root directory of Fakeflix project, run the following command to navigate to  whitebox testing directory <br>
    ```cd ./src/tests/blackbox_testing``` <br>
    * Run the following command to execute the unit tests for Fakeflix project: <br>
    ```sh execute_unit_tests.sh``` <br>
    * Run the following command to execute the unit tests for Fakeflix project and get code    coverage report: <br>
    ```sh execute_code_coverage.sh``` <br>
    * In the root directory of Fakeflix project, the code coverage repoort is available at the following path <br>
    ```./coverage/lcov-report/index.html```

Tools used for blackbox testing:
* Selenium - Browser automation

Tools used for whitebox testing:
* Mocha  - Javascript test framework
* Chai   - Javascript assertion library
* Enzyme - Javascript React test Utility
* Sinon  - Javascript standalone test doubles(spies, stubs, mocks)