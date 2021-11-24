package com.CPSC542.blackboxTesting.navigation;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class NavigationTestDriver {
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.setProperty("webdriver.chrome.driver", "chromedriver_mac64");
		
		WebDriver driver = new ChromeDriver();
		
		driver.get("https://www.google.com");
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(driver.getTitle());
		
		driver.close();
		
	}
}
