# CPSC_542_Project

CPSC 542 Software Verification and Validation
Group Project

Professor: David Heckathorn

Team Members:
Ying Luo,    yingluo_holiday@csu.fullerton.edu
Xiaotiam Ma, xiaotianma@csu.fullerton.edu
Yixiang Yan, yyx3333@csu.fullerton.edu

Open Source project tested: 
Fakeflix - https://github.com/Th3Wall/Fakeflix

How to run the project:
1. In the root directory of Fakeflix project, run the following command to navigate to the testing 
   directory
   ```cd /tests```
1. Run the following command to install the packages
   ```sh test_initializer.sh```
3. Steps for running backbox tests:
   i.   In the root directory of Fakeflix project, run the following command to navigate to     
        blackbox testing directory
        ```cd ./src/tests/blackbox_testing```
   ii.  Run the following command to start the Fakeflix project
        ```sh start_fakeflix.sh```
   iii. Each directory in the /blackbox_testing folder is separate project to test one function
        of the Fakeflix project, load the project in a Java or Python IDE and execute the corresponding blackbox testing for that function. Demos are available for the functional tests.
3. Steps for running whitebox tests:
   i.   In the root directory of Fakeflix project, run the following command to navigate to   
        whitebox testing directory
        ```cd ./src/tests/blackbox_testing```
   ii.  Run the following command to execute the unit tests for Fakeflix project:
        ```sh execute_unit_tests.sh```
   iii. Run the following command to execute the unit tests for Fakeflix project and get code  
        coverage report:
        ```sh execute_code_coverage.sh```
        In the root directory of Fakeflix project, the code coverage repoort is available at the following path
        ```./coverage/lcov-report/index.html```

Tools used for blackbox testing:
* Selenium - Browser automation

Tools used for whitebox testing:
* Mocha  - Javascript test framework
* Chai   - Javascript assertion library
* Enzyme - Javascript React test Utility