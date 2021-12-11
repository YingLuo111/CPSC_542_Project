CPSC 542 Software Verification and Validation 
Group Project

Professor: David Heckathorn

Team Members: 
Ying Luo,    yingluo_holiday@csu.fullerton.edu 
Xiaotiam Ma, xiaotianma@csu.fullerton.edu 
Yixiang Yan, yyx3333@csu.fullerton.edu 

Summary:
The project is a group project for CPSC CPSC 542 Software Verification and Validation.
The tasks completed in this project are whitebox testings and blackbox testings for an 
open source project called Fakeflix(https://github.com/Th3Wall/Fakeflix), which is a 
simulation of UI page of Netflix. Through the completion of this test project, the team
understand the black box test and the white box test, and understand the division of 
labor and test contents of these two parts. Our team tested the open-source web page 
"Fakeflix" in the black box and white box. We used the black box test to test the 
functions of each part of the website in detail. Simulate users to test as many situations 
as possible when using each component. Test whether each function can be completed as 
expected. We tested the internal logic of as many components as possible with whitebox 
tests. We have tested statement coverage, function coverage, and path coverage. 
Although we have not made special tests on conditional coverage and decision coverage, 
we have also indirectly tested these aspects in the overall unit tests.

Open Source project tested: 
Fakeflix - https://github.com/Th3Wall/Fakeflix

How to run the project:
1.  In the root directory of Fakeflix project, run the following command to navigate to the testing directory 
        > cd ./src/tests 
2.  Run the following command to install the packages 
        > sh test_initializer.sh
3.  Steps for running backbox tests: 
    * In the root directory of Fakeflix project, run the following command to navigate to blackbox testing directory 
        > cd ./src/tests/blackbox_testing 
    * Run the following command to start the Fakeflix project 
        > sh start_fakeflix.sh
    * Each directory in the /blackbox_testing folder is separate project to test one function of the Fakeflix project, 
      load the project in a Java or Python IDE and execute the corresponding blackbox testing for that function. Demos 
      are available for the functional tests. 
3.  Steps for running whitebox tests: 
    * In the root directory of Fakeflix project, run the following command to navigate to  whitebox testing directory 
        > cd ./src/tests/blackbox_testing 
    * Run the following command to execute the unit tests for Fakeflix project: 
        > sh execute_unit_tests.sh 
    * Run the following command to execute the unit tests for Fakeflix project and get code    coverage report: 
        > sh execute_code_coverage.sh 
    * In the root directory of Fakeflix project, the code coverage repoort is available at the following path 
        > ./coverage/lcov-report/index.html

CASE Tools used for blackbox testing:
* Selenium - Browser automation

CASE Tools used for whitebox testing:
* Mocha  - Javascript test framework
* Chai   - Javascript assertion library
* Enzyme - Javascript React test Utility
* Sinon  - Javascript standalone test doubles(spies, stubs, mocks)
* NYC    - Javascript coverage report utility tool