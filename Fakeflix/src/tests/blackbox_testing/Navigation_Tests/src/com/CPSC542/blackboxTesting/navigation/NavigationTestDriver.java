package com.CPSC542.blackboxTesting.navigation;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class NavigationTestDriver {
	public static void main(String[] args) {
		System.setProperty("webdriver.chrome.driver", "chromedriver_mac64");
		
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
			
			/* navigation functional tests */
			//nav with Mylist tab
			driver.findElement(By.xpath("//a[@href='/mylist']")).click();
			log("Nav with Mylist tab");
			sleep(3);
			
			//nav with News & Popular tab
			driver.findElement(By.xpath("//a[@href='/popular']")).click();
			log("Nav with News & Popular tab");
			sleep(3);

			//nav with Movies tab
			driver.findElement(By.xpath("//a[@href='/movies']")).click();
			log("Nav with Movies tab");
			sleep(3);
			
			//nav with TV Series tab
			driver.findElement(By.xpath("//a[@href='/tvseries']")).click();
			log("Nav with Series tab");
			sleep(3);
			
			//nav with Home tab
			driver.findElement(By.xpath("//a[@href='/browse']")).click();
			log("Nav with Home tab");
			sleep(3);

			//nav with Fakeflix icon
			driver.findElement(By.xpath("//a[@href='/']")).click();
			log("Nav with Fakeflix icon");
			sleep(10);
			
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
