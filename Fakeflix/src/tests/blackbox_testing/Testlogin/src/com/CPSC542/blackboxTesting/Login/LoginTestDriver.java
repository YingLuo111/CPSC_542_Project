package com.CPSC542.blackboxTesting.Login;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

public class LoginTestDriver {

	public static void main(String[] args) {
		System.setProperty("webdriver.chrome.driver", "chromedriver");
		
		WebDriver driver = new ChromeDriver();
	
		try {
			//launch Fakeflix
			driver.get("http://localhost:3000");
			driver.manage().window().maximize();
			log("Fakeflix started");
			sleep(1);
			
			/* log in with account */
			//set user email
			driver.findElement(By.name("email")).sendKeys("cpsc542_fakeflix_blackbox_tests@gmail.com");
			log("Seting email for login");
			sleep(1);
			
			//set user password
			driver.findElement(By.name("password")).sendKeys("blackbox_tests");
			log("Seting password for login");
			sleep(1);
			
			//click login button
			driver.findElement(By.className("SignIn__form--button")).click();
			log("logging in");
			sleep(10);
			
			
			driver.findElement(By.xpath("//img[@class='Navbar__navprofile--avatar Navbar__navprofile--toggler']")).click(); 
			log("select account");
			sleep(5);
			
			driver.findElement(By.xpath("//div[@class='Navbar__navprofile--content active']")).click(); 
			
			log("logout");	
			sleep(5);
			
			log("Navigation tests succeeded");
		} catch (Exception e) {
			log("Navigation tests failed");
			log(e.getMessage());
		} finally {
			driver.close();
		}
	}

	private static void sleep(int timeInSeconds) {
		try {
			Thread.sleep(timeInSeconds * 1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
	
	private static void log(String message) {
		System.out.println(message);
	}
	
}
