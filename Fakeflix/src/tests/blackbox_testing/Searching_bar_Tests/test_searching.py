# CPSC 542 Software Verification and Validation
# Group Project

# Professor: David Heckathorn

# Team Members:
# Ying Luo,    yingluo_holiday@csu.fullerton.edu
# Xiaotiam Ma, xiaotianma@csu.fullerton.edu
# Yixiang Yan, yyx3333@csu.fullerton.edu

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
import random
import string


def main():

    driver = webdriver.Chrome('/home/baiyu323/selenium_chrome/drivers/chromedriver')
    driver.implicitly_wait(30)
    #self.base_url = "http://start.firefoxchina.cn/"
    base_url = "http://localhost:3000"

    accept_next_alert = True

    driver.get(base_url)
    driver.maximize_window()

    # # anonymous login
    # element00 = driver.find_element_by_id('anonymous_button')
    # element00.click()
    # time.sleep(10)
    try:
        time.sleep(2)
        username = "xiaotianma@gmail.com"
        password = "123456"
        # find username/email field and send the username itself to the input field
        driver.find_element_by_name("email").send_keys(username)
        time.sleep(2)
        # find password input field and insert password as well
        driver.find_element_by_name("password").send_keys(password)
        # click login button
        element00 = driver.find_element_by_id("submit-test")
        element00.click()
        time.sleep(10)

    except Exception as e:
        print(e)
        raise e

    #test search bar icon clickable
    try:
        element01 = driver.find_element_by_id("Searchbar--toggler_click")
        print(element01)
        #element01.click()
        driver.execute_script("arguments[0].click();", element01)
    except Exception as e:
        print(e)
        raise e

    time.sleep(5)
    # test search bar input clicable
    try:
        element02 = driver.find_element_by_id("search_bar_input")
        #element02.click()
        driver.execute_script("arguments[0].click();", element02)
    except Exception as e:
        print(e)
        raise e

    ## Equivalence class partitioning
    # valid value test： movie name
    try:
        element02.send_keys('The Shawshank Redemption')
        time.sleep(5)
        element02.send_keys(Keys.CONTROL+'a')
        element02.send_keys(Keys.DELETE)  
        time.sleep(2)
    except:
        print(e)
        raise e
        
    # valid value test: genre
    try:
        element02.send_keys('science')
        time.sleep(5)
        element02.send_keys(Keys.CONTROL+'a')
        element02.send_keys(Keys.DELETE)  
        time.sleep(2)
    except:
        print(e)
        raise e
        
    # invalid random value   Science
    value = ''.join(random.sample(string.ascii_letters + string.digits, 8))
    element02.send_keys(value)
    #element02.send_keys(Keys.ENTER)
    time.sleep(5)
             
    driver.quit()



if __name__ == '__main__':
    main()